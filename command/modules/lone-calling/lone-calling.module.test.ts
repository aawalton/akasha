import { expect, test } from "bun:test"
import {
  type Call,
  callNow,
  handedBy,
  refusalOf,
} from "akasha/command/modules/lone-calling/lone-calling.module.code.ts"

const DISPATCHER = "/home/one/repos/akasha/command/modules/cli/cli.module.code.ts"

const HEREDOC_CHANGE = "akasha change apply <<'HEREDOC'\nmessage: what it is for\nHEREDOC"

function harnessOf(command: string, piped: boolean): readonly string[] {
  const quoted = command.replaceAll("'", `'"'"'`)
  const stdin = piped ? "" : " < /dev/null"
  return [
    "/bin/bash",
    "-c",
    `source /home/one/snapshot.sh 2>/dev/null || true && shopt -u extglob 2>/dev/null || true && { \\builtin unalias -- 'unsetenv'; } >/dev/null 2>&1 || true && eval '${quoted}'${stdin} && pwd -P >| /var/tmp/claude-a1b2-cwd`,
    "",
  ]
}

function callOf(said: Partial<Call>): Call {
  return {
    argv: ["change", "apply"],
    acting: true,
    dispatcher: DISPATCHER,
    parent: harnessOf(HEREDOC_CHANGE, true),
    out: null,
    err: null,
    ...said,
  }
}

function saidOf(said: readonly string[] | null): string {
  return (said ?? []).join("\n")
}

test("the command an agent's shell was handed is read back off that shell's command line", () => {
  expect(handedBy(harnessOf(HEREDOC_CHANGE, true))).toBe(HEREDOC_CHANGE)
  expect(handedBy(harnessOf("akasha change list", false))).toBe("akasha change list")
})

test("the line naming the agent a call acts as is not part of what the agent handed the shell", () => {
  const exported = "export ACTING_AGENT_ID='seat-id--sub-id'\nakasha change list"
  expect(handedBy(harnessOf(exported, false))).toBe("akasha change list")
})

test("a process that is no agent's shell was handed nothing", () => {
  expect(handedBy(["xargs", "akasha", "change", "apply"])).toBeNull()
  expect(handedBy(["/bin/bash", "-c", "akasha change apply"])).toBeNull()
  expect(handedBy(["-bash"])).toBeNull()
})

test("a change run alone on the line is let through", () => {
  expect(refusalOf(callOf({}))).toBeNull()
  const listed = callOf({
    argv: ["change", "list"],
    parent: harnessOf("akasha change list", false),
  })
  expect(refusalOf(listed)).toBeNull()
})

test("a read run alone on the line is let through", () => {
  const read = "akasha read --file-path a.ts"
  expect(refusalOf(callOf({ argv: ["read"], parent: harnessOf(read, false) }))).toBeNull()
})

test("a change reached through a substitution is refused, quoting what the shell was handed", () => {
  const disguised = "$(which akasha) change apply <<'HEREDOC'\nmessage: x\nHEREDOC"
  const said = saidOf(refusalOf(callOf({ parent: harnessOf(disguised, true) })))
  expect(said).toContain("  $(which akasha) change apply <<'HEREDOC'")
})

test("a change reached through quoting and joined to another command is refused", () => {
  const disguised = "ak''asha change list; rm -rf x"
  const said = refusalOf(callOf({ argv: ["change", "list"], parent: harnessOf(disguised, false) }))
  expect(saidOf(said)).toContain("ak''asha change list; rm -rf x")
})

test("a change piped into is refused, since a pipe into it is no approved form", () => {
  const piped = "echo 'message: x' | akasha change apply"
  expect(refusalOf(callOf({ parent: harnessOf(piped, false) }))).not.toBeNull()
})

test("a change started by a program other than the agent's shell is refused", () => {
  const said = saidOf(refusalOf(callOf({ parent: ["xargs", "akasha", "change", "apply"] })))
  expect(said).toContain("`xargs`")
})

test("a change whose starter's command line would not read is refused", () => {
  expect(refusalOf(callOf({ parent: null }))).not.toBeNull()
})

test("a shell handed a read does not answer for a change", () => {
  const read = "akasha read --file-path a.ts"
  expect(refusalOf(callOf({ parent: harnessOf(read, false) }))).not.toBeNull()
})

test("a change whose output or errors reach nobody is refused, saying where they went", () => {
  expect(saidOf(refusalOf(callOf({ out: "a pipe" })))).toContain("a pipe")
  expect(saidOf(refusalOf(callOf({ err: "/dev/null" })))).toContain("/dev/null")
})

test("a change the akasha dispatcher started for a change was judged with that change", () => {
  const repeat = ["/usr/bin/bun", DISPATCHER, "change", "repeat", "some-change"]
  expect(refusalOf(callOf({ parent: repeat, out: "a pipe", err: "a pipe" }))).toBeNull()
})

test("the dispatcher running anything but a change vouches for nothing", () => {
  const other = ["/usr/bin/bun", DISPATCHER, "git", "status"]
  expect(refusalOf(callOf({ parent: other }))).not.toBeNull()
})

test("a call acting for no agent is not judged", () => {
  expect(refusalOf(callOf({ acting: false, parent: ["-bash"], out: "a pipe" }))).toBeNull()
})

test("a help call is not judged", () => {
  const helped = callOf({ argv: ["change", "apply", "--help"], parent: ["xargs"] })
  expect(refusalOf(helped)).toBeNull()
  expect(refusalOf(callOf({ argv: ["read", "-h"], parent: ["xargs"] }))).toBeNull()
})

test("every command but read and change is not judged", () => {
  expect(refusalOf(callOf({ argv: ["git", "status"], parent: ["xargs"] }))).toBeNull()
  expect(refusalOf(callOf({ argv: [], parent: ["xargs"] }))).toBeNull()
})

test("the call now reads the parent's command line and acts for no agent where none is named", () => {
  const now = callNow(["change"], {}, DISPATCHER)
  expect(now.acting).toBe(false)
  expect(now.parent === null ? null : typeof now.parent[0]).toBe("string")
})
