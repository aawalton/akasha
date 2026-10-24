import { expect, test } from "bun:test"
import { readsAsTheirPages as reads } from "akasha/alan/web/.server/alan-answer-ask/alan-answer-ask.module.test-fixtures.ts"
import { heldToReader } from "akasha/alan/web/.server/page-detail-loading/page-detail-loading.module.code.ts"
import {
  testsHeldTo,
  whereHeldTo,
} from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"

const AT = new Request("https://alanwalton.com/seat/astra-e02d8ca0")

const BY_SUFFIX = { id: { "ends-with": "e02d8ca0" } }

function readerIs(person: string | null) {
  return async () => ({ user: person === null ? null : { person } })
}

async function statusOf(work: Promise<unknown>): Promise<number | null> {
  try {
    await work
    return null
  } catch (thrown) {
    return thrown instanceof Response ? thrown.status : null
  }
}

test("Alan reads every page the loader asks for as it was asked", async () => {
  const held = await heldToReader(
    AT,
    async () => [await testsHeldTo("seat", BY_SUFFIX), await whereHeldTo("persona", undefined)],
    readerIs("alan"),
    reads
  )
  expect(held).toEqual([BY_SUFFIX, undefined])
})

test("Jenny's seat page is looked for only among the seat she may read", async () => {
  const held = await heldToReader(
    AT,
    () => testsHeldTo("seat", BY_SUFFIX),
    readerIs("jenny"),
    reads
  )
  expect(held).toEqual({ ...BY_SUFFIX, slug: { is: "claudius" } })
})

test("Jenny's book page is looked for only among the alan-and-jenny book", async () => {
  const held = await heldToReader(
    AT,
    () => testsHeldTo("alan-book", BY_SUFFIX),
    readerIs("jenny"),
    reads
  )
  expect(held).toEqual({ ...BY_SUFFIX, slug: { is: "alan-and-jenny" } })
})

test("Jenny's topic page is looked for among the alan-and-jenny topics as it was asked", async () => {
  const held = await heldToReader(
    AT,
    () => testsHeldTo("alan-and-jenny-topic", BY_SUFFIX),
    readerIs("jenny"),
    reads
  )
  expect(held).toEqual(BY_SUFFIX)
})

test("a page of a type its reader may not read is answered as no such page", async () => {
  const jenny = heldToReader(AT, () => testsHeldTo("persona", BY_SUFFIX), readerIs("jenny"), reads)
  expect(await statusOf(jenny)).toBe(404)
  const nobody = heldToReader(AT, () => whereHeldTo("seat", undefined), readerIs(null), reads)
  expect(await statusOf(nobody)).toBe(404)
})

test("a fault other than a withheld read is thrown on as it was", async () => {
  const failing = heldToReader(
    AT,
    async () => {
      throw new Error("the store is away")
    },
    readerIs("alan"),
    reads
  )
  await expect(failing).rejects.toThrow("the store is away")
})
