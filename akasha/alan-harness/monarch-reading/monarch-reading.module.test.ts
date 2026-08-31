import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { readingKept } from "../../readout-system/readout-reading/readout-reading.module.code.ts"
import { READOUT_PAGE, takeReading } from "./monarch-reading.module.code.ts"

const TAKEN = new Date("2026-08-31T12:00:00.000Z")

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

const answering = (unreviewed: number) => async () => ({ unreviewed })

test("the count taken is the count kept on the readout", async () => {
  const root = scratch.rootFor("monarch-reading-")
  await takeReading(root, "cookie", TAKEN, answering(19))
  expect(readingKept(root, READOUT_PAGE)).toEqual({
    value: 19,
    at: "2026-08-31T12:00:00.000Z",
  })
})

test("the moment kept is the moment the reading was asked for", async () => {
  const root = scratch.rootFor("monarch-reading-")
  await takeReading(root, "cookie", TAKEN, answering(4))
  expect(readingKept(root, READOUT_PAGE)?.at).toBe(TAKEN.toISOString())
})

test("a count of nothing is kept rather than passed over", async () => {
  const root = scratch.rootFor("monarch-reading-")
  await takeReading(root, "cookie", TAKEN, answering(0))
  expect(readingKept(root, READOUT_PAGE)?.value).toBe(0)
})

test("a taking that refuses keeps nothing", async () => {
  const root = scratch.rootFor("monarch-reading-")
  const refusing = async (): Promise<never> => {
    throw new Error("dead credential")
  }
  await expect(takeReading(root, "cookie", TAKEN, refusing)).rejects.toThrow("dead credential")
  expect(readingKept(root, READOUT_PAGE)).toBeNull()
})
