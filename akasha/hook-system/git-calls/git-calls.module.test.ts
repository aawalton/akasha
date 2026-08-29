import { expect, test } from "bun:test"
import { gitCallIn, gitCallsIn } from "./git-calls.module.code.ts"

test("a plain call is read into its verb and the words after it", () => {
  expect(gitCallIn("git reset --hard")).toEqual({ verb: "reset", rest: ["--hard"] })
})

test("sudo in front is stepped over, and the call behind it is read", () => {
  expect(gitCallIn("sudo git reset --hard")).toEqual({ verb: "reset", rest: ["--hard"] })
})

test("an assignment in front is stepped over", () => {
  expect(gitCallIn("FOO=1 git clean -fd")).toEqual({ verb: "clean", rest: ["-fd"] })
})

test("env in front is stepped over, and an assignment after it too", () => {
  expect(gitCallIn("env FOO=1 git stash")).toEqual({ verb: "stash", rest: [] })
})

test("a global flag taking a value swallows the word after it, which is no verb", () => {
  expect(gitCallIn("FOO=1 git -C /elsewhere clean -fd")).toEqual({ verb: "clean", rest: ["-fd"] })
})

test("every global flag that takes a value swallows its word", () => {
  expect(gitCallIn("git -c user.name=one commit")?.verb).toBe("commit")
  expect(gitCallIn("git --git-dir /elsewhere/.git rm one")?.verb).toBe("rm")
  expect(gitCallIn("git --work-tree /elsewhere checkout .")?.verb).toBe("checkout")
  expect(gitCallIn("git --namespace one add .")?.verb).toBe("add")
  expect(gitCallIn("git --super-prefix one/ mv a b")?.verb).toBe("mv")
  expect(gitCallIn("git --exec-path /opt/git apply one.patch")?.verb).toBe("apply")
})

test("a global flag joined to its value by an equals sign carries no word away", () => {
  expect(gitCallIn("git --git-dir=/elsewhere/.git commit")).toEqual({ verb: "commit", rest: [] })
})

test("a global flag taking no value is stepped over", () => {
  expect(gitCallIn("git --no-pager --paginate reset")).toEqual({ verb: "reset", rest: [] })
})

test("git named by a path is git, because the basename is what is matched", () => {
  expect(gitCallIn("/usr/bin/git stash")).toEqual({ verb: "stash", rest: [] })
})

test("a tool with a subcommand grammar of its own is not read as git", () => {
  expect(gitCallIn("kubectl rm one")).toBeNull()
  expect(gitCallIn("ssh reset --hard")).toBeNull()
})

test("a command that is not git is no call here", () => {
  expect(gitCallIn("rm -rf one")).toBeNull()
  expect(gitCallIn("bun akasha/command-system/cli.module.code.ts write")).toBeNull()
})

test("git carrying no verb is no call here", () => {
  expect(gitCallIn("git")).toBeNull()
  expect(gitCallIn("git --no-pager")).toBeNull()
  expect(gitCallIn("git -C /elsewhere")).toBeNull()
})

test("an empty segment is no call here", () => {
  expect(gitCallIn("")).toBeNull()
})

test("a message of more than one line does not cut the paths off its own call", () => {
  expect(gitCallsIn('git commit -m "one\ntwo" -- one.ts')).toEqual([
    { verb: "commit", rest: ["-m", "--", "one.ts"] },
  ])
})

test("an unclosed quote leaves the lines under it standing to be judged", () => {
  expect(gitCallsIn('echo "one\ngit reset --hard')).toEqual([{ verb: "reset", rest: ["--hard"] }])
})

test("a verb inside a quoted payload is not read as a call", () => {
  expect(gitCallsIn('echo "git reset --hard"')).toEqual([])
})

test("the verb of the call carrying a quoted payload is still read", () => {
  expect(gitCallsIn('git commit -m "reset the thing"')).toEqual([{ verb: "commit", rest: ["-m"] }])
})

test("a line continuation is joined, so the verb behind it is read", () => {
  expect(gitCallsIn("git \\\nreset --hard")).toEqual([{ verb: "reset", rest: ["--hard"] }])
})

test("a separator cuts one line into segments, and each is read on its own", () => {
  expect(gitCallsIn("cd one && git reset --hard")).toEqual([{ verb: "reset", rest: ["--hard"] }])
})

test("every separator form cuts", () => {
  for (const between of ["&&", "||", ";", "|", "&"]) {
    expect(gitCallsIn(`echo one ${between} git stash`)).toEqual([{ verb: "stash", rest: [] }])
  }
})

test("a newline cuts as a separator does", () => {
  expect(gitCallsIn("echo one\ngit stash")).toEqual([{ verb: "stash", rest: [] }])
})

test("leading space on a segment is taken off before the head is read", () => {
  expect(gitCallsIn("  git stash")).toEqual([{ verb: "stash", rest: [] }])
})

test("every call on a line is read, not only the first", () => {
  expect(gitCallsIn("git add . && git commit -m one")).toEqual([
    { verb: "add", rest: ["."] },
    { verb: "commit", rest: ["-m", "one"] },
  ])
})

test("a heredoc body naming a verb is read as a call, which this does not tell apart", () => {
  expect(gitCallsIn("cat <<EOF\ngit reset --hard\nEOF")).toEqual([
    { verb: "reset", rest: ["--hard"] },
  ])
})
