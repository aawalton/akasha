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
  partWay,
  refusedBy,
  told,
  UNCLASSIFIED,
  unclassified,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"

test("what was done by then is named in one sentence", () => {
  expect(partWay([])).toEqual([])
  const said = partWay(["wrote /one.png", "wrote /two.png"])[0] as string
  expect(said).toContain("stopped part way")
  expect(said).toContain("wrote /one.png; wrote /two.png")
})

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

test("a fault is answered as its message and where that fault was thrown", () => {
  const held = faulted(new DataError("no row answers"))
  expect(held.report).toEqual([])
  expect(held.code).toBe(DATA)
  expect(held.refusals[0]).toBe("no row answers")
  expect(held.refusals[1]).toMatch(/^thrown at \/.+\.module\.test\.ts:\d+:\d+$/)
})

test("a fault carrying no frame is answered as its message alone", () => {
  expect(faulted("held")).toEqual({ report: [], refusals: ["held"], code: OPERATIONAL })
})

test("work that threw is answered as the fault it threw", async () => {
  expect(await answering(() => told(["done"]))).toEqual({
    report: ["done"],
    refusals: [],
    code: OK,
  })
  const held = await answering(() => {
    throw new InputError("--app names a value")
  })
  expect(held.report).toEqual([])
  expect(held.code).toBe(INPUT)
  expect(held.refusals[0]).toBe("--app names a value")
})

test("a fault is answered with what the work had done by then", async () => {
  const held = await answering((done) => {
    done.push("wrote 4 bytes (alpha matte) to /one.png")
    done.push("wrote 9 bytes (cutout) to /two.png")
    throw new OperationalError("the pool dropped the call")
  })
  expect(held.report).toEqual([
    "wrote 4 bytes (alpha matte) to /one.png",
    "wrote 9 bytes (cutout) to /two.png",
  ])
  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals[0]).toBe("the pool dropped the call")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain("wrote 4 bytes (alpha matte) to /one.png")
  expect(last).toContain("wrote 9 bytes (cutout) to /two.png")
})

test("a fault with nothing done by then is answered as the fault alone", async () => {
  const held = await answering((done) => {
    expect(done).toEqual([])
    throw new InputError("--app names a value")
  })
  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a fault caught outside every command is answered as unclassified", () => {
  const held = unclassified(new Error("the environment itself failed"), "akasha")
  expect(held.report).toEqual([])
  expect(held.code).toBe(UNCLASSIFIED)
  expect(held.refusals).toEqual(["akasha: the environment itself failed"])
})

test("such a refusal opens with the name the call was made by", () => {
  expect(unclassified("held", "akasha page tree").refusals[0]).toBe("akasha page tree: held")
})

test("a word where a command takes flags alone is the caller's mistake", () => {
  expect(flagsAloneIn({ loose: [] })).toEqual([])
  expect(flagsAloneIn({ loose: ["held"] })[0]).toContain("it takes flags alone")
})
