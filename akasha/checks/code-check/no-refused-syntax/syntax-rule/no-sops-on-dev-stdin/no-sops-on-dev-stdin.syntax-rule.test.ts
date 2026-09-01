import { expect, test } from "bun:test"
import { parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"
import { PROBE_AT, parsed } from "../../no-refused-syntax.code-check.test-fixtures.ts"
import { noSopsOnDevStdin, spelledIn } from "./no-sops-on-dev-stdin.syntax-rule.code.ts"

test("a file calling nothing is refused nothing", () => {
  expect(noSopsOnDevStdin(parsed("export const one = 1\n"))).toEqual([])
})

test("sops handed the pipe straight is refused", () => {
  const said = noSopsOnDevStdin(parsed('run("sops", "-e", "/dev/stdin")\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("/dev/stdin")
})

test("sops handed the pipe through an argument list is refused", () => {
  const text = 'spawnSync("sops", ["-e", "/dev/stdin"])\n'
  expect(noSopsOnDevStdin(parsed(text))).toHaveLength(1)
})

test("a nested list is flattened, so the pipe is found however deep it is gathered", () => {
  const text = 'run(["sops", ["-e", ["/dev/stdin"]]])\n'
  expect(noSopsOnDevStdin(parsed(text))).toHaveLength(1)
})

test("the override flag marks the call as sops's, the binary being named elsewhere", () => {
  const text = 'run(bin, ["--filename-override", "held.sops.yaml", "/dev/stdin"])\n'
  expect(noSopsOnDevStdin(parsed(text))).toHaveLength(1)
})

test("the pipe without a sops marker stands", () => {
  expect(noSopsOnDevStdin(parsed('run("cat", "/dev/stdin")\n'))).toEqual([])
})

test("sops on a real file stands, being what this asks for", () => {
  expect(noSopsOnDevStdin(parsed('run("sops", "-e", "held.yaml")\n'))).toEqual([])
})

test("a template spelling of the pipe is read as a plain one", () => {
  const text = 'run("sops", `/dev/stdin`)\n'
  expect(noSopsOnDevStdin(parsed(text))).toHaveLength(1)
})

test("the line named is the line the call stands on", () => {
  const text = 'const one = 1\nconst two = 2\nrun("sops", "/dev/stdin")\n'
  expect(noSopsOnDevStdin(parsed(text))[0]?.line).toBe(3)
})

test("two such calls are refused once each", () => {
  const text = 'run("sops", "/dev/stdin")\nrun("sops", "/dev/stdin")\n'
  expect(noSopsOnDevStdin(parsed(text))).toHaveLength(2)
})

test("a call reached through a property is judged like any other", () => {
  const text = 'held.run("sops", "/dev/stdin")\n'
  expect(noSopsOnDevStdin(parsed(text))).toHaveLength(1)
})

test("the reason carries what to do instead", () => {
  const said = noSopsOnDevStdin(parsed('run("sops", "/dev/stdin")\n'))
  expect(said[0]?.reason).toContain("--filename-override")
})

test("only whole literals are read, so a joined path is not seen", () => {
  const text = 'run("sops", `${dir}/dev/stdin`)\n'
  expect(noSopsOnDevStdin(parsed(text))).toEqual([])
})

test("strings are gathered out of a nested list and nothing else", () => {
  const source = parsedAs(PROBE_AT, 'const one = ["a", ["b"], 1, held]\n')
  const said = source.statements[0]
  const first =
    said !== undefined && ts.isVariableStatement(said)
      ? said.declarationList.declarations[0]?.initializer
      : undefined
  expect(first === undefined ? [] : [...spelledIn(first)]).toEqual(["a", "b"])
})
