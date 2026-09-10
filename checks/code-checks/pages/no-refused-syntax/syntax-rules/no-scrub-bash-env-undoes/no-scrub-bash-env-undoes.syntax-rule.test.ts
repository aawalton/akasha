import { expect, test } from "bun:test"
import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { PROBE_AT, parsed } from "../../no-refused-syntax.code-check.decision.test-fixtures.ts"
import { noScrubBashEnvUndoes, saidIn } from "./no-scrub-bash-env-undoes.syntax-rule.code.ts"

test("a file calling nothing is refused nothing", () => {
  expect(noScrubBashEnvUndoes(parsed("export const one = 1\n"))).toEqual([])
})

test("a bash handed what the scrub left is refused", () => {
  const said = noScrubBashEnvUndoes(parsed('run("env", "-u", "SOMETHING", "bash", "-c", one)\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("BASH_ENV")
})

test("the same words gathered into a list are read the same way", () => {
  const text = 'spawn(["env", "-u", "SOMETHING", "bash", "-c", one])\n'
  expect(noScrubBashEnvUndoes(parsed(text))).toHaveLength(1)
})

test("a list written down the page is one command line, the parse holding the whole of it", () => {
  const text = 'const cmd = [\n  "env",\n  "-u",\n  "SOMETHING",\n  "bash",\n  "-c",\n  one,\n]\n'
  expect(noScrubBashEnvUndoes(parsed(text))).toHaveLength(1)
})

test("a command written as one string is split into that same word line", () => {
  expect(noScrubBashEnvUndoes(parsed('run("env -u SOMETHING bash -c ls")\n'))).toHaveLength(1)
})

test("a value put into a template is one word whose spelling is unknown", () => {
  expect(noScrubBashEnvUndoes(parsed("run(`env -u ${named} bash -c ls`)\n"))).toHaveLength(1)
})

test("the command is the first word past the flags and the assignments env is given", () => {
  expect(
    noScrubBashEnvUndoes(parsed('run("env -u HELD HELD_TWO=1 -i bash -c ls")\n'))
  ).toHaveLength(1)
})

test("`BASH_ENV=` in the same call leaves the call alone", () => {
  const text = 'run("env", "-u", "SOMETHING", "BASH_ENV=", "bash", "-c", one)\n'
  expect(noScrubBashEnvUndoes(parsed(text))).toEqual([])
})

test("`BASH_ENV` taken away in the same call leaves the call alone", () => {
  const text = 'run("env", "-u", "BASH_ENV", "-u", "SOMETHING", "bash", "-c", one)\n'
  expect(noScrubBashEnvUndoes(parsed(text))).toEqual([])
})

test("a scrub handing neither a bash nor a script is left", () => {
  const text = 'run("env", "-u", "HELD", "tmux", "new-session")\n'
  expect(noScrubBashEnvUndoes(parsed(text))).toEqual([])
})

test("a scrub naming no command at all is left", () => {
  expect(noScrubBashEnvUndoes(parsed('run("env", "-u", "HELD", "-u", "ALSO")\n'))).toEqual([])
})

test("a scrubbed script is refused, and the reason names the script", () => {
  const said = noScrubBashEnvUndoes(parsed('run("env", "-u", "SOMETHING", "./one/two.sh")\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("./one/two.sh")
})

test("`BASH_ENV=` before a script leaves that call alone too", () => {
  const text = 'run("env", "-u", "SOMETHING", "BASH_ENV=", "./one/two.sh")\n'
  expect(noScrubBashEnvUndoes(parsed(text))).toEqual([])
})

test("a bash named by a path is a bash, and so is an env", () => {
  const text = 'run("/usr/bin/env", "-u", "SOMETHING", "/usr/bin/bash", "-c", one)\n'
  expect(noScrubBashEnvUndoes(parsed(text))).toHaveLength(1)
})

test("a bash handed no scrub is left, this asking about the scrub", () => {
  expect(noScrubBashEnvUndoes(parsed('run("bash", "-c", one)\n'))).toEqual([])
})

test("a name the scrub takes away is one unknown word rather than the command", () => {
  expect(noScrubBashEnvUndoes(parsed('run("env", "-u", named, "bash", "-c", one)\n'))).toHaveLength(
    1
  )
})

test("a command nothing here can spell leaves the call alone", () => {
  expect(noScrubBashEnvUndoes(parsed('run("env", "-u", "HELD", tool)\n'))).toEqual([])
})

test("a shebang word names the shell that follows it, and no scrub is there", () => {
  expect(noScrubBashEnvUndoes(parsed('const one = "#!/usr/bin/env bash"\n'))).toEqual([])
})

test("the line named is the line the call is on", () => {
  const text = 'const one = 1\nconst two = 2\nrun("env -u SOMETHING bash -c ls")\n'
  expect(noScrubBashEnvUndoes(parsed(text))[0]?.line).toBe(3)
})

test("two such calls are refused once each", () => {
  const text = 'run("env -u SOMETHING bash -c ls")\nrun("env -u SOMETHING bash -c ls")\n'
  expect(noScrubBashEnvUndoes(parsed(text))).toHaveLength(2)
})

test("a call refused is not read again through the string that call holds", () => {
  expect(noScrubBashEnvUndoes(parsed('run("env -u SOMETHING bash -c ls")\n'))).toHaveLength(1)
})

test("the reason carries what to write instead", () => {
  const said = noScrubBashEnvUndoes(parsed('run("env -u SOMETHING bash -c ls")\n'))
  expect(said[0]?.reason).toContain("BASH_ENV=")
})

test("words are gathered out of a nested list, and what cannot be spelled is marked", () => {
  const source = parsedAs(PROBE_AT, 'const one = ["a b", ["c"], named]\n')
  const first = source.statements[0]
  const held =
    first !== undefined && ts.isVariableStatement(first)
      ? first.declarationList.declarations[0]?.initializer
      : undefined
  expect(held === undefined ? [] : [...saidIn(held)]).toEqual(["a", "b", "c", null])
})
