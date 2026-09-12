import { expect, test } from "bun:test"
import {
  DataError,
  InputError,
  OperationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  namedIn,
  ran,
} from "akasha/commands/modules/seat-act-calling/seat-act-calling.module.code.ts"

test("the seat an act acts on is the first word past the act's name", () => {
  expect(namedIn("akasha seat reset", "reset", ["athena", "--force"])).toEqual({ name: "athena" })
})

test("an act naming no seat at all is refused", () => {
  const held = namedIn("akasha seat reset", "reset", [])
  expect("name" in held).toBe(false)
  expect((held as { refusals: readonly string[]; code: number }).code).toBe(INPUT)
  expect((held as { refusals: readonly string[] }).refusals[0]).toContain("nothing followed it")
})

test("a flag where the seat should be named is refused", () => {
  const held = namedIn("akasha seat reset", "reset", ["--force"])
  expect("name" in held).toBe(false)
  expect((held as { refusals: readonly string[] }).refusals[0]).toContain("is a flag")
})

test("an act that wrote nothing and threw nothing is answered as nothing done", async () => {
  expect(await ran(async () => {})).toEqual({ report: [], refusals: [], code: OK })
})

test("an act that finished every write says nothing over what that act printed itself", async () => {
  expect(
    await ran(async (done) => {
      done.push("stopped athena")
      done.push("minted athena-2")
    })
  ).toEqual({ report: [], refusals: [], code: OK })
})

test("an act that threw after writing is refused naming what it had written", async () => {
  const held = await ran(async (done) => {
    done.push("stopped athena")
    done.push("minted athena-2")
    throw new OperationalError("tmux would not start the session")
  })
  expect(held.report).toEqual(["stopped athena", "minted athena-2"])
  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals[0]).toBe("tmux would not start the session")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain("stopped athena; minted athena-2")
})

test("an act that threw before writing anything is refused as the fault alone", async () => {
  const held = await ran(async (done) => {
    expect(done).toEqual([])
    throw new InputError("no seat of that name")
  })
  expect(held.report).toEqual([])
  expect(held.refusals).toEqual(["no seat of that name"])
  expect(held.code).toBe(INPUT)
})

test("a refusal from a wrapped act has the exit code that act's error states", async () => {
  const held = await ran(async () => {
    throw new DataError("the seat's page names no role")
  })
  expect(held.code).toBe(DATA)
  const also = await ran(async (done) => {
    done.push("stopped athena")
    throw new DataError("the seat's page names no role")
  })
  expect(also.code).toBe(DATA)
})

test("a thrown thing that is no error is refused as what it says", async () => {
  const held = await ran(async () => {
    throw "held"
  })
  expect(held.refusals[0]).toBe("held")
})
