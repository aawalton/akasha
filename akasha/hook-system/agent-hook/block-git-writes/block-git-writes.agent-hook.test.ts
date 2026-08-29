import { expect, test } from "bun:test"
import {
  bounded,
  outsideAkasha,
  refusalFor,
  refusalIn,
  SCOPE,
} from "./block-git-writes.agent-hook.code.ts"

const COMMANDS = "  akasha write, akasha edit, akasha move, akasha remove"

const HELP = "Say `akasha --help` for what each takes."

test("a commit naming no paths is refused, and this is the call that took the gate down", () => {
  expect(refusalIn('git commit -m "one"')).not.toBeNull()
  expect(refusalIn("git commit")).not.toBeNull()
  expect(refusalIn('git commit -am "one"')).not.toBeNull()
  expect(refusalIn('git commit --no-verify -m "one"')).not.toBeNull()
})

test("a commit refusal says what a commit taking akasha content costs", () => {
  expect(refusalIn("git commit")).toContain("leaves the akasha index behind HEAD")
})

test("every verb it names is refused when the call names no paths", () => {
  for (const verb of ["commit", "add", "mv", "apply", "am"]) {
    expect(refusalIn(`git ${verb}`)).not.toBeNull()
  }
})

test("a call bounded by paths outside the akasha folder is stood aside from", () => {
  expect(refusalIn('git commit -m "one" -- tools/one.ts')).toBeNull()
  expect(refusalIn("git add -- tools/one.ts tools/two.ts")).toBeNull()
  expect(refusalIn("git mv -- tools/one.ts tools/two.ts")).toBeNull()
})

test("a call bounded by a path inside the akasha folder is refused", () => {
  expect(refusalIn('git commit -m "one" -- akasha/one.ts')).not.toBeNull()
  expect(refusalIn("git add -- akasha")).not.toBeNull()
  expect(refusalIn("git add -- tools/one.ts akasha/two.ts")).not.toBeNull()
  expect(refusalIn("git mv -- akasha/one.ts akasha/two.ts")).not.toBeNull()
})

test("a path is judged segment by segment, so a name merely containing akasha is outside", () => {
  expect(outsideAkasha("tools/akasha-notes.ts")).toBe(true)
  expect(outsideAkasha("akasha/one.ts")).toBe(false)
  expect(outsideAkasha("akasha")).toBe(false)
  expect(outsideAkasha("/repo/akasha/one.ts")).toBe(false)
})

test("a path that could climb or spread does not bound a call", () => {
  for (const path of [".", "..", "./", "/", "*", "../akasha/one.ts", "tools/*", ":/", ":!akasha"]) {
    expect(outsideAkasha(path)).toBe(false)
  }
})

test("a whole-tree pathspec after the separator does not let the call through", () => {
  expect(refusalIn("git add -- .")).not.toBeNull()
  expect(refusalIn("git add -- :/")).not.toBeNull()
  expect(refusalIn("git add -- '*'")).not.toBeNull()
})

test("paths before the separator do not bound a call, so a flag's value is never read as one", () => {
  expect(refusalIn("git add tools/one.ts")).not.toBeNull()
  expect(refusalIn("git commit -m one tools/one.ts")).not.toBeNull()
})

test("a separator with nothing after it bounds nothing", () => {
  expect(bounded(["--"])).toBe(false)
  expect(refusalIn("git add --")).not.toBeNull()
})

test("a bare add of everything is refused", () => {
  expect(refusalIn("git add -A")).not.toBeNull()
  expect(refusalIn("git add .")).not.toBeNull()
  expect(refusalIn("git add -u")).not.toBeNull()
})

test("a patch is never bounded, and the refusal says why", () => {
  const said = refusalIn("git apply -- tools/one.patch") ?? ""
  expect(said).toContain("names its paths inside itself")
  expect(refusalIn("git am -- tools/one.patch")).not.toBeNull()
})

test("a read that writes nothing is stood aside from", () => {
  expect(refusalIn("git apply --check tools/one.patch")).toBeNull()
  expect(refusalIn("git apply --stat tools/one.patch")).toBeNull()
  expect(refusalIn("git add --dry-run .")).toBeNull()
  expect(refusalIn("git mv --dry-run one two")).toBeNull()
})

test("`-n` is not read as a dry run, because for commit it is --no-verify", () => {
  expect(refusalIn("git commit -n")).not.toBeNull()
  expect(refusalIn("git add -n .")).not.toBeNull()
})

test("commit has no read let through", () => {
  expect(refusalIn("git commit --dry-run")).not.toBeNull()
})

test("every refusal names the akasha commands and sends the reader to the help", () => {
  for (const command of ["git commit", "git add .", "git apply one.patch", "git am one.patch"]) {
    const said = refusalIn(command) ?? ""
    expect(said).toContain(COMMANDS)
    expect(said).toContain(HELP)
  }
})

test("a refusal spells no akasha flag, so no flag of ours can go stale in it", () => {
  for (const command of ["git commit", "git add .", "git mv one two"]) {
    const said = refusalIn(command) ?? ""
    expect(said).not.toContain("--file-path <path>")
    expect(said).not.toContain("--message-file <file>")
  }
})

test("a move refusal names the move command and where to read its flags", () => {
  const said = refusalIn("git mv one two") ?? ""
  expect(said).toContain("To move an akasha file, use `akasha move`.")
  expect(said).toContain("Say `akasha --help` for what it takes.")
})

test("a refusal names the bounded form of the call for a write that reaches no akasha path", () => {
  expect(refusalIn("git commit")).toContain('git commit -m "<why>" -- <path> <path>')
  expect(refusalIn("git add .")).toContain("git add -- <path> <path>")
  expect(refusalIn("git mv one two")).toContain("git mv -- <from> <to>")
})

test("every refusal names the hook that made it", () => {
  expect(refusalIn("git commit")).toContain("block-git-writes refused this call.")
})

test("an akasha command stands aside, and commits for itself", () => {
  expect(
    refusalIn('akasha write --file-path akasha/one.ts --content-file /tmp/one --message "one"')
  ).toBeNull()
  expect(refusalIn("akasha index refresh")).toBeNull()
})

test("a verb this does not name is stood aside from, whatever else it does", () => {
  for (const command of [
    "git rm akasha/one.ts",
    "git checkout -- akasha/one.ts",
    "git restore .",
  ]) {
    expect(refusalIn(command)).toBeNull()
  }
})

test("a read is stood aside from", () => {
  for (const command of ["git status", "git log --oneline", "git diff --cached", "git show HEAD"]) {
    expect(refusalIn(command)).toBeNull()
  }
})

test("sudo, an assignment and a path to git do not hide the call", () => {
  expect(refusalIn("sudo git commit -m one")).not.toBeNull()
  expect(refusalIn("FOO=1 git -C /elsewhere add .")).not.toBeNull()
  expect(refusalIn("/usr/bin/git commit")).not.toBeNull()
})

test("a verb inside a quoted payload is not a call, and is stood aside from", () => {
  expect(refusalIn('echo "git commit -am one"')).toBeNull()
})

test("git carrying no verb is stood aside from", () => {
  expect(refusalIn("git")).toBeNull()
  expect(refusalIn("git -C /elsewhere")).toBeNull()
})

test("a call standing behind another on the same line is still refused", () => {
  expect(refusalIn("git status && git commit -m one")).not.toBeNull()
  expect(refusalIn("git add -- tools/one.ts && git commit -m one")).not.toBeNull()
})

test("an empty command is stood aside from", () => {
  expect(refusalIn("")).toBeNull()
})

test("refusalFor judges one call, and reads no other word on the line", () => {
  expect(refusalFor({ verb: "commit", rest: [] })).not.toBeNull()
  expect(refusalFor({ verb: "commit", rest: ["--", "tools/one.ts"] })).toBeNull()
  expect(refusalFor({ verb: "status", rest: [] })).toBeNull()
})

test("the scope says what it does not reach, and refuses to be extended", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding that it is safe")
  expect(said).toContain("a longer list is a longer search prompt")
  expect(said).toContain("git commit-tree")
  expect(said).toContain("every writer that is not git")
})

test("the scope says which verbs it leaves to the other hook, and why", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("block-destructive-git")
  expect(said).toContain("`rm`, `checkout` and `restore`")
  expect(said).toContain("second reason for a call already refused")
})

test("the scope names the over-refusal an absolute path into this repository causes", () => {
  expect(SCOPE.join("\n")).toContain("That is over-refusal, not a gap.")
})
