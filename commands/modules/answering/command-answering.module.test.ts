import { expect, test } from "bun:test"
import {
  DataError,
  InputError,
  OperationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  asJson,
  codeOf,
  DATA,
  faulted,
  flagsAloneIn,
  INPUT,
  OK,
  OPERATIONAL,
  refusedBy,
  told,
} from "./command-answering.module.code.ts"

test("a refusal is the caller's mistake unless the caller names another code", () => {
  expect(refusedBy(["--app names a value"])).toEqual({
    report: [],
    refusals: ["--app names a value"],
    code: INPUT,
  })
  expect(refusedBy(["no session carries that slug"], DATA).code).toBe(DATA)
})

test("a report answered with no refusal is the answer of a command that worked", () => {
  expect(told(["one", "two"])).toEqual({ report: ["one", "two"], refusals: [], code: OK })
})

test("a value answered as JSON is one line of JSON", () => {
  expect(asJson({ held: 1 })).toEqual({ report: ['{"held":1}'], refusals: [], code: OK })
})

test("a fault carrying a code of its own is answered with that code", () => {
  expect(codeOf(new InputError("nothing followed --app"))).toBe(INPUT)
  expect(codeOf(new DataError("no row answers"))).toBe(DATA)
  expect(codeOf(new OperationalError("the simulator would not boot"))).toBe(OPERATIONAL)
})

test("a fault carrying no code of its own is answered as operational", () => {
  expect(codeOf(new Error("it would not load"))).toBe(OPERATIONAL)
  expect(codeOf("held")).toBe(OPERATIONAL)
})

test("a fault is answered as the one refusal its message makes", () => {
  expect(faulted(new DataError("no row answers"))).toEqual({
    report: [],
    refusals: ["no row answers"],
    code: DATA,
  })
})

test("work that threw is answered as the fault it threw", async () => {
  expect(await answering(() => told(["done"]))).toEqual({
    report: ["done"],
    refusals: [],
    code: OK,
  })
  expect(
    await answering(() => {
      throw new InputError("--app names a value")
    })
  ).toEqual({ report: [], refusals: ["--app names a value"], code: INPUT })
})

test("a word where a command takes flags alone is the caller's mistake", () => {
  expect(flagsAloneIn({ loose: [] })).toEqual([])
  expect(flagsAloneIn({ loose: ["held"] })[0]).toContain("it takes flags alone")
})
