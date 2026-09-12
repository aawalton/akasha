import { expect, test } from "bun:test"
import {
  DataError,
  InputError,
  OperationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answeredWith,
  answering,
  asIndentedJson,
  asJson,
  codeOf,
  DATA,
  faulted,
  INPUT,
  keeping,
  naming,
  OK,
  OPERATIONAL,
  partWay,
  refused,
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

test("a refusal naming one reason is the refusal of a list holding that reason alone", () => {
  expect(refused("no row answers", DATA)).toEqual(refusedBy(["no row answers"], DATA))
})

test("a refusal built from reasons alone reports nothing", () => {
  expect(refusedBy(["--app names a value"], INPUT).report).toEqual([])
  expect(refused("no row answers", DATA).report).toEqual([])
})

test("a report is answered beside its refusals where a write came before the refusal", () => {
  expect(answeredWith(["wrote /one.png"], ["the pool dropped the call"], OPERATIONAL)).toEqual({
    report: ["wrote /one.png"],
    refusals: ["the pool dropped the call"],
    code: OPERATIONAL,
  })
})

test("only that answer carries a report and refusals at once", () => {
  const both = answeredWith(["wrote /one.png"], ["the pool dropped the call"], OPERATIONAL)
  expect(both.report.length > 0 && both.refusals.length > 0).toBe(true)
  const one = [told(["wrote /one.png"]), refusedBy(["the pool dropped the call"])]
  for (const said of one) expect(said.report.length > 0 && said.refusals.length > 0).toBe(false)
})

test("a value answered as JSON is one line of JSON", () => {
  expect(asJson({ held: 1 })).toEqual({ report: ['{"held":1}'], refusals: [], code: OK })
})

test("a value answered as indented JSON is one report line to each line of it", () => {
  expect(asIndentedJson({ held: 1 })).toEqual({
    report: ["{", '  "held": 1', "}"],
    refusals: [],
    code: OK,
  })
})

test("those lines are one value broken up rather than one value to a line", () => {
  expect(asIndentedJson([{ a: 1 }, { b: 2 }]).report).toEqual([
    "[",
    "  {",
    '    "a": 1',
    "  },",
    "  {",
    '    "b": 2',
    "  }",
    "]",
  ])
  expect(asJson([{ a: 1 }, { b: 2 }]).report).toEqual(['[{"a":1},{"b":2}]'])
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

const WROTE = ["left a dev server running at pid 4242 on port 3000"]

const REFUSED = {
  report: ["auto-bootstrapped /w/.env.local (3 vars)"],
  refusals: ["the dev server exited straight away with code 1"],
  code: OPERATIONAL,
}

test("an answer refusing after a write names what was written beside that refusal", () => {
  const said = keeping(WROTE, REFUSED)
  expect(said.report).toEqual([...WROTE, "auto-bootstrapped /w/.env.local (3 vars)"])
  expect(said.refusals[0]).toBe("the dev server exited straight away with code 1")
  expect(said.refusals[1]).toContain("stopped part way")
  expect(said.refusals[1]).toContain("pid 4242 on port 3000")
  expect(said.code).toBe(OPERATIONAL)
})

test("an answer refusing with nothing written is left as that answer was", () => {
  expect(keeping([], REFUSED)).toEqual(REFUSED)
})

test("a refusal names what was written where the report already carries it", () => {
  const said = naming(WROTE, REFUSED)
  expect(said.report).toEqual(REFUSED.report)
  expect(said.refusals[0]).toBe("the dev server exited straight away with code 1")
  expect(said.refusals[1]).toContain("stopped part way")
  expect(said.refusals[1]).toContain("pid 4242 on port 3000")
  expect(said.code).toBe(OPERATIONAL)
})

test("naming leaves an answer alone where nothing was written or nothing refused", () => {
  expect(naming([], REFUSED)).toEqual(REFUSED)
  const worked = { report: ["pid=4242 port=3000"], refusals: [], code: OK }
  expect(naming(WROTE, worked)).toEqual(worked)
})

test("an answer refusing nothing is left as that answer was, whatever was written", () => {
  const worked = { report: ["pid=4242 port=3000"], refusals: [], code: OK }
  expect(keeping(WROTE, worked)).toEqual(worked)
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
