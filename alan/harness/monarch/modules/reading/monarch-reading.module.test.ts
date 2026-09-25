import { afterAll, expect, test } from "bun:test"
import {
  readingTimedOut,
  takeReading,
} from "akasha/alan/harness/monarch/modules/reading/monarch-reading.module.code.ts"
import { monarchReading } from "akasha/alan/harness/monarch/modules/reading/monarch-reading.module.ts"
import { readingKept } from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const TAKEN = new Date("2026-08-31T12:00:00.000Z")

const SERVED_BY = namedAs(module.slug, monarchReading.slug, null)

const BODY = `export const it = { type: "${pageType.slug}/${readout.slug}", servedBy: ["${SERVED_BY}"] }\n`

const READOUT = "readout"

const READOUT_SLUG = "probe-readout"

const READOUT_PAGE = "alan/harness/readout/pages/probe-readout/probe-readout.readout.ts"

const READOUT_ID = "01a057fa-c464-7f2b-9f87-031b5dbedab0"

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

function rootFor(): string {
  const root = scratch.rootFor("monarch-reading-")
  nothingFiled(root)
  listedFiled(root, READOUT, READOUT_SLUG, [{ path: READOUT_PAGE, id: READOUT_ID }])
  writing(root, READOUT_PAGE, BODY)
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

test("the readout kept on is the one whose page names this module as serving it", async () => {
  const root = rootFor()
  writing(root, READOUT_PAGE, `export const it = { type: "${pageType.slug}/${readout.slug}" }\n`)
  await expect(takeReading(root, "cookie", TAKEN, answering(3))).rejects.toThrow()
})

test("a taking that ran out of time is named as one", () => {
  expect(readingTimedOut(new DOMException("The operation timed out.", "TimeoutError"))).toBe(true)
})

test("every other refusal is not named as one that ran out of time", () => {
  expect(readingTimedOut(new Error("dead credential"))).toBe(false)
  expect(readingTimedOut(new TypeError("fetch failed"))).toBe(false)
})

test("a refusal that is no object at all is not named as one that ran out of time", () => {
  expect(readingTimedOut(null)).toBe(false)
  expect(readingTimedOut("TimeoutError")).toBe(false)
  expect(readingTimedOut(undefined)).toBe(false)
})
