import { expect, test } from "bun:test"
import { join } from "node:path"
import { ran } from "@akasha/utils-run/running"
import { payloadOf } from "../../hook-payload/hook-payload.module.code.ts"
import { refusalFor, refusalIn, SCOPE } from "./block-git-writes.agent-hook.code.ts"

const SCRIPT = join(import.meta.dir, "block-git-writes.agent-hook.code.ts")

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

test("every act it names is refused when the call names no paths", () => {
  for (const act of ["commit", "add", "mv", "apply", "am"]) {
    expect(refusalIn(`git ${act}`)).not.toBeNull()
  }
})

test("a call naming its paths after `--` is refused too, whatever those paths are", () => {
  expect(refusalIn('git commit -m "one" -- tools/one.ts')).not.toBeNull()
  expect(refusalIn("git add -- tools/one.ts tools/two.ts")).not.toBeNull()
  expect(refusalIn("git mv -- tools/one.ts tools/two.ts")).not.toBeNull()
})

test("a path that reads as outside this repository bounds nothing either", () => {
  expect(refusalIn("git add -- /elsewhere/one.ts")).not.toBeNull()
  expect(refusalIn("git commit -m one -- ../sibling/two.ts")).not.toBeNull()
  expect(refusalIn("git -C /elsewhere commit -m one -- one.ts")).not.toBeNull()
})

test("a refusal says why no pathspec bounds a call here", () => {
  expect(refusalIn("git add -- tools/one.ts")).toContain(
    "Every path this repository tracks is akasha content"
  )
})

test("a whole-tree pathspec after the separator does not let the call through", () => {
  expect(refusalIn("git add -- .")).not.toBeNull()
  expect(refusalIn("git add -- :/")).not.toBeNull()
  expect(refusalIn("git add -- '*'")).not.toBeNull()
})

test("paths before the separator do not let a call through either", () => {
  expect(refusalIn("git add tools/one.ts")).not.toBeNull()
  expect(refusalIn("git commit -m one tools/one.ts")).not.toBeNull()
})

test("a separator with nothing after it is refused", () => {
  expect(refusalIn("git add --")).not.toBeNull()
})

test("a bare add of everything is refused", () => {
  expect(refusalIn("git add -A")).not.toBeNull()
  expect(refusalIn("git add .")).not.toBeNull()
  expect(refusalIn("git add -u")).not.toBeNull()
})

test("a patch names its paths inside itself, and the refusal says so", () => {
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

test("no refusal prescribes a form of the call this hook would refuse anyway", () => {
  for (const command of ["git commit", "git add .", "git mv one two", "git apply one.patch"]) {
    const said = refusalIn(command) ?? ""
    expect(said).not.toContain("after `--`")
    expect(said).not.toContain("-- <path>")
    expect(said).not.toContain("-- <from>")
  }
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

test("an act this does not name is stood aside from, whatever else it does", () => {
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

test("a prefix that only runs the call does not hide it", () => {
  for (const one of [
    "timeout 900 git commit -m one",
    "timeout -k 5 900 git commit",
    "nice -n 10 git add .",
    "nohup git mv one two",
    "stdbuf -oL git apply one.patch",
    "time git am one.patch",
    "command git commit",
    'timeout 900 git commit -m "one" -- tools/one.ts',
  ]) {
    expect(refusalIn(one)).not.toBeNull()
  }
})

test("a prefix around a read is let through", () => {
  expect(refusalIn("timeout 900 git status")).toBeNull()
  expect(refusalIn("timeout 900 git add --dry-run .")).toBeNull()
})

test("sudo, an assignment and a path to git do not hide the call", () => {
  expect(refusalIn("sudo git commit -m one")).not.toBeNull()
  expect(refusalIn("FOO=1 git -C /elsewhere add .")).not.toBeNull()
  expect(refusalIn("/usr/bin/git commit")).not.toBeNull()
})

test("an act inside a quoted payload is not a call, and is stood aside from", () => {
  expect(refusalIn('echo "git commit -am one"')).toBeNull()
})

test("git carrying no act is stood aside from", () => {
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
  expect(refusalFor({ act: "commit", rest: [] })).not.toBeNull()
  expect(refusalFor({ act: "commit", rest: ["--", "tools/one.ts"] })).not.toBeNull()
  expect(refusalFor({ act: "status", rest: [] })).toBeNull()
})

test("the scope says what it does not reach, and refuses to be extended", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding that it is safe")
  expect(said).toContain("a longer list is a longer search prompt")
  expect(said).toContain("git commit-tree")
  expect(said).toContain("every writer that is not git")
})

test("the scope says which acts it leaves to the other hook, and why", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("block-destructive-git")
  expect(said).toContain("`rm`, `checkout` and `restore`")
  expect(said).toContain("second reason for a call already refused")
})

test("the scope says no pathspec bounds a call, and prescribes none", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("There is nothing left for a pathspec to prove.")
  expect(said).toContain("That is over-refusal, not a gap.")
  expect(said).not.toContain("is let through only when it names paths")
})

test("the scope names the prefixes it steps over and says that list samples a class too", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER")
  expect(said).toContain("timeout")
  expect(said).toContain("That list samples an open class too.")
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf('git commit -m "one"')) })
  expect(done.code).toBe(2)
  const said: unknown = JSON.parse(done.out)
  expect(said).toMatchObject({ decision: "block" })
  expect((said as { reason: string }).reason).toContain("akasha")
})

test("the hook refuses a bounded call on stdin too", () => {
  const done = ran(["bun", SCRIPT], {
    stdin: Buffer.from(payloadOf("git add -- tools/one.ts")),
  })
  expect(done.code).toBe(2)
  expect(done.out).toContain("block-git-writes refused this call.")
})

test("the hook stands aside on stdin for a call it does not name", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("git status")) })
  expect(done.code).toBe(0)
  expect(done.out).toBe("")
})

test("a payload that will not parse lets the call through rather than refusing it", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from("{") })
  expect(done.code).toBe(5)
  expect(done.err).toContain("the call was not refused")
})

test("the hook prints its scope when it is asked", () => {
  const done = ran(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(done.code).toBe(0)
  expect(done.out).toContain("commit")
})
