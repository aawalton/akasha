import { describe, expect, test } from "bun:test"
import { scanForGitGuard } from "./check-git-guard-both-forms.ts"

const REL = "packages/infra/workflow-dsl/src/dsl/templates/example.ts"
const OUTSIDE = "packages/infra/ci/workflows/src/prep.workflow.ts"

describe("scanForGitGuard — one-form `.git` guard rule", () => {
  test("flags a `-d`-only `.git` guard with the correct line number", () => {
    const content = [
      "return [",
      "  `set -e`,",
      '  `if [ -d "$CHECKOUT_ROOT/.git" ] && DIFF_PATHS=$(git -C "$CHECKOUT_ROOT" diff); then`,',
      "]",
    ].join("\n")
    const v = scanForGitGuard(content, REL)
    expect(v.map((x) => x.kind)).toEqual(["git-guard-d-only"])
    expect(v[0]?.line).toBe(3)
    expect(v[0]?.file).toBe(REL)
  })

  test("accepts the dual form `{ [ -d … ] || [ -f … ]; }` (both on one line)", () => {
    const content =
      '  `if { [ -d "$CHECKOUT_ROOT/.git" ] || [ -f "$CHECKOUT_ROOT/.git" ]; } && DIFF_PATHS=$(git -C "$CHECKOUT_ROOT" diff); then`,\n'
    expect(scanForGitGuard(content, REL)).toEqual([])
  })

  test("accepts the `-f`-first ordering too", () => {
    const content = '  `if [ -f "$WS/.git" ] || [ -d "$WS/.git" ]; then`,\n'
    expect(scanForGitGuard(content, REL)).toEqual([])
  })

  test("does not flag non-guard `.git` mentions (index.lock cleanup, git fetch)", () => {
    const content = [
      '  `rm -f "$CHECKOUT_ROOT/.git/index.lock"`,',
      '  `kubectl exec "$POD" -- sh -c "cd /app/repo && git fetch origin --prune"`,',
      '  `find "$PACKAGES_ROOT" -name "*.worker.ts"`,',
    ].join("\n")
    expect(scanForGitGuard(content, REL)).toEqual([])
  })

  test("flags each of multiple `-d`-only guards independently", () => {
    const content = [
      '  `[ -d "$A/.git" ] && echo a`,',
      '  `[ -d "$B/.git" ] || [ -f "$B/.git" ]`,',
      '  `[ -d "$C/.git" ] && echo c`,',
    ].join("\n")
    const v = scanForGitGuard(content, REL)
    expect(v.map((x) => x.line)).toEqual([1, 3])
  })
})

describe("scanForGitGuard — a guard is judged whole however the source wraps it", () => {
  test("accepts a guard broken across two array elements", () => {
    const content = [
      "const cmds = [",
      '  `  if { [ -d "$WS/.git" ] ||`,',
      '  `       [ -f "$WS/.git" ]; } && DIFF=$(git -C "$WS" diff); then`,',
      "]",
    ].join("\n")
    expect(scanForGitGuard(content, OUTSIDE)).toEqual([])
  })

  test("accepts a guard broken across a string concatenation", () => {
    const content = [
      "const line =",
      `  'if { [ -d "$WS/.git" ] ||' +`,
      `  ' [ -f "$WS/.git" ]; } && DIFF=$(git -C "$WS" diff); then'`,
    ].join("\n")
    expect(scanForGitGuard(content, OUTSIDE)).toEqual([])
  })

  test("accepts a guard broken across a shell line continuation", () => {
    const content = ['[ -d "$WS/.git" ] || \\', '  [ -f "$WS/.git" ] || exit 1'].join("\n")
    expect(scanForGitGuard(content, OUTSIDE)).toEqual([])
  })

  test("accepts an `-f`-first guard that wraps", () => {
    const content = ['  `if [ -f "$WS/.git" ] ||`,', '  `   [ -d "$WS/.git" ]; then`,'].join("\n")
    expect(scanForGitGuard(content, OUTSIDE)).toEqual([])
  })

  test("does not pair two tests with no `||` joining them", () => {
    const content = ['  `[ -d "$A/.git" ]`,', '  `[ -f "$A/.git" ]`,'].join("\n")
    expect(scanForGitGuard(content, OUTSIDE).map((v) => v.line)).toEqual([1])
  })

  test("does not pair across an intervening command", () => {
    const content = [
      '  `[ -d "$WS/.git" ] && echo reuse`,',
      '  `[ -f "$WS/.git" ] && echo reuse`,',
    ].join("\n")
    expect(scanForGitGuard(content, OUTSIDE).map((v) => v.line)).toEqual([1])
  })
})

describe("scanForGitGuard — the rule does not turn on where the file sits", () => {
  test("a one-form guard outside the template tree is refused the same way", () => {
    const content = ['  if [ -d "$WS/.git" ]; then', '    echo "Reusing worktree"', "  fi"].join(
      "\n"
    )
    const v = scanForGitGuard(content, OUTSIDE)
    expect(v.map((x) => x.file)).toEqual([OUTSIDE])
    expect(v[0]?.line).toBe(1)
  })

  test("the refusal shows a guard that this check itself accepts", () => {
    const message = scanForGitGuard('if [ -d "$WS/.git" ]; then', OUTSIDE)[0]?.message ?? ""
    expect(message).toMatch(/\[\s*-d\s+"[^"]*\/\.git"\s*\]/)
    expect(scanForGitGuard(message, OUTSIDE)).toEqual([])
  })
})

describe("scanForGitGuard — a negated guard is a guard", () => {
  test("flags a lone `! -d` guard, which reads as not-cloned for a worktree checkout", () => {
    const content = 'if [ ! -d "$CLONE/.git" ]; then\n  git clone "$REPO" "$CLONE"\nfi\n'
    const v = scanForGitGuard(content, OUTSIDE)
    expect(v.map((x) => x.kind)).toEqual(["git-guard-d-only"])
    expect(v[0]?.line).toBe(1)
  })

  test("accepts a negated pair joined by `&&`, which is what covers both forms inverted", () => {
    const content = 'if [ ! -d "$CLONE/.git" ] && [ ! -f "$CLONE/.git" ]; then\n'
    expect(scanForGitGuard(content, OUTSIDE)).toEqual([])
  })

  test("refuses a negated pair joined by `||`, which is true whenever either form stands", () => {
    const content = 'if [ ! -d "$CLONE/.git" ] || [ ! -f "$CLONE/.git" ]; then\n'
    expect(scanForGitGuard(content, OUTSIDE).map((v) => v.line)).toEqual([1])
  })

  test("refuses a plain pair joined by `&&`, which is true only when .git is both", () => {
    const content = 'if [ -d "$WS/.git" ] && [ -f "$WS/.git" ]; then\n'
    expect(scanForGitGuard(content, OUTSIDE).map((v) => v.line)).toEqual([1])
  })

  test("does not pair a negated test with a plain one", () => {
    const content = 'if [ ! -d "$WS/.git" ] && [ -f "$WS/.git" ]; then\n'
    expect(scanForGitGuard(content, OUTSIDE).map((v) => v.line)).toEqual([1])
  })

  test("the negated refusal shows a guard that this check itself accepts", () => {
    const message = scanForGitGuard('if [ ! -d "$WS/.git" ]; then', OUTSIDE)[0]?.message ?? ""
    expect(message).toMatch(/\[\s*!\s+-d\s+"[^"]*\/\.git"\s*\]/)
    expect(scanForGitGuard(message, OUTSIDE)).toEqual([])
  })
})
