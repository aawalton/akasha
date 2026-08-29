import { expect, test } from "bun:test"
import { INPUT, OK, UNCLASSIFIED, answering, outsideOf, rootOf, saidOf } from "./cli.module.code.ts"

const AT = "/somewhere/akasha/command-system/cli.module.code.ts"

test("the root is the folder two above the dispatcher when nothing states one", () => {
  expect(rootOf(AT)).toBe("/somewhere")
})

test("a stated root wins over where the dispatcher stands", () => {
  const said = outsideOf([], { AKASHA_ROOT: "/elsewhere" }, AT, "/nowhere")
  expect(said.root).toBe("/elsewhere")
})

test("an empty stated root is treated as none stated", () => {
  const said = outsideOf([], { AKASHA_ROOT: "" }, AT, "/nowhere")
  expect(said.root).toBe("/somewhere")
})

test("the name it was invoked by is carried in", () => {
  const said = outsideOf([], {}, AT, "/nowhere")
  expect(said.calledAs).toBe("akasha")
  expect(said.from).toBe("/nowhere")
})

test("what was done and what refused it are answered apart", () => {
  const said = saidOf({ report: ["wrote one"], refusals: ["refused two"], code: INPUT })
  expect(said.out).toEqual(["wrote one"])
  expect(said.err).toEqual(["refused two"])
  expect(said.code).toBe(INPUT)
})

test("naming no command is a caller's mistake rather than an unclassified failure", () => {
  const said = answering([], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("takes a command")
})

test("a name no command carries is a caller's mistake too", () => {
  const said = answering(["held"], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("is no command akasha carries")
})

test("a failure of no known kind says so rather than claiming one", () => {
  const said = answering([], {}, undefined as unknown as string, "/nowhere")
  expect(said.code).toBe(UNCLASSIFIED)
  expect(said.err[0]).toStartWith("akasha: ")
})

test("the codes are the ones the outer cli uses", () => {
  expect(OK).toBe(0)
  expect(INPUT).toBe(1)
  expect(UNCLASSIFIED).toBe(70)
})
