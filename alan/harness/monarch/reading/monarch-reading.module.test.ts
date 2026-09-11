import { afterAll, expect, test } from "bun:test"
import {
  READOUT_SLUG,
  takeReading,
} from "akasha/alan/harness/monarch/reading/monarch-reading.module.code.ts"
import { readingKept } from "akasha/alan/harness/readouts/reading/readout-reading.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import {
  listedFiled,
  nothingFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const TAKEN = new Date("2026-08-31T12:00:00.000Z")

const READOUT = "readout"

const READOUT_PAGE = "alan/harness/readouts/pages/probe-readout/probe-readout.readout.ts"

const READOUT_ID = "01a057fa-c464-7f2b-9f87-031b5dbedab0"

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

function rootFor(): string {
  const root = scratch.rootFor("monarch-reading-")
  nothingFiled(root)
  listedFiled(root, READOUT, READOUT_SLUG, [{ path: READOUT_PAGE, id: READOUT_ID }])
  return root
}

const answering = (unreviewed: number) => async () => ({ unreviewed })

test("the count taken is the count kept on the readout", async () => {
  const root = rootFor()
  await takeReading(root, "cookie", TAKEN, answering(19))
  expect(readingKept(root, READOUT_PAGE)).toEqual({
    value: 19,
    at: "2026-08-31T12:00:00.000Z",
    fallsPerHour: 0,
  })
})

test("the moment kept is the moment the reading was asked for", async () => {
  const root = rootFor()
  await takeReading(root, "cookie", TAKEN, answering(4))
  expect(readingKept(root, READOUT_PAGE)?.at).toBe(TAKEN.toISOString())
})

test("a count of nothing is kept rather than passed over", async () => {
  const root = rootFor()
  await takeReading(root, "cookie", TAKEN, answering(0))
  expect(readingKept(root, READOUT_PAGE)?.value).toBe(0)
})

test("a taking that refuses keeps nothing", async () => {
  const root = rootFor()
  const refusing = async (): Promise<never> => {
    throw new Error("dead credential")
  }
  await expect(takeReading(root, "cookie", TAKEN, refusing)).rejects.toThrow("dead credential")
  expect(readingKept(root, READOUT_PAGE)).toBeNull()
})
