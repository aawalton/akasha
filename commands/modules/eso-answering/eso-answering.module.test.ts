import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  CALLED_AS,
  NAMING_THEM,
  PAGES,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import {
  INPUT,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type {
  Generating,
  Taking,
} from "akasha/commands/modules/eso-answering/eso-answering.module.code.ts"
import {
  answeredByPage,
  esoAnswering,
} from "akasha/commands/modules/eso-answering/eso-answering.module.code.ts"

type Handed = Taking<typeof NAMING_THEM, typeof PAGES>

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const BROKE = new Error("the module landed and the working tree would not settle")

const LANDED = "abc123"

const SEATED = ["--seat", "athena"]

const NUMBERED = ["--seat", "athena", "--limit", "2"]

const UNREAD = ["--seat", "athena", "--limit", "many"]

const TYPED: Generating<Handed> = (_done, taken) => {
  const seat: string = taken.seat
  const limit: number | undefined = taken.limit
  return told([seat, String(limit)])
}

test("what the call said reaches the work, read against the page handed in", async () => {
  const seen: Handed[] = []
  const work = (_done: string[], taken: Handed): Answer => {
    seen.push(taken)
    return told(["ran"])
  }

  const said = await esoAnswering(SEATED, GIVEN, NAMING_THEM, PAGES, work)

  expect(seen).toEqual([{ seat: "athena", dryRun: false, to: [] }])
  expect(said.report).toEqual(["ran"])
})

test("a call the reader refuses is answered with the reasons, and no work runs", async () => {
  const ran: string[] = []
  const work = (): Answer => {
    ran.push("ran")
    return told([])
  }

  const said = await esoAnswering(UNREAD, GIVEN, NAMING_THEM, PAGES, work)

  expect(ran).toEqual([])
  expect(said.refusals).toEqual(["`--limit many` is no whole number of nought or more"])
  expect(said.code).toBe(INPUT)
})

test("a work that threw after writing names what it had written", async () => {
  const work = throwingAfter([LANDED], BROKE)

  const said = await esoAnswering(SEATED, GIVEN, NAMING_THEM, PAGES, work)

  expect(said.report).toEqual([LANDED])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${LANDED}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("the work is handed values typed as the argument pages say", async () => {
  const said = await esoAnswering(NUMBERED, GIVEN, NAMING_THEM, PAGES, TYPED)

  expect(said.report).toEqual(["athena", "2"])
})

test("nothing here leaves the work for a command to open itself", async () => {
  const said = await answeredByPage(SEATED, CALLED_AS, NAMING_THEM, PAGES, async () => {
    throw new Error("the store would not open")
  })

  expect(said.refusals[0]).toBe("the store would not open")
  expect(said.code).toBe(OPERATIONAL)
})

test("nothing here adds to the reasons the reader gave", async () => {
  const read = takenFor(UNREAD, CALLED_AS, NAMING_THEM, PAGES)
  const said = await answeredByPage(UNREAD, CALLED_AS, NAMING_THEM, PAGES, async () =>
    told(["reached"])
  )

  expect("refused" in read).toBe(true)
  expect(said.refusals).toEqual("refused" in read ? read.refused : [])
  expect(said.code).toBe(INPUT)
  expect(said.report).toEqual([])
})
