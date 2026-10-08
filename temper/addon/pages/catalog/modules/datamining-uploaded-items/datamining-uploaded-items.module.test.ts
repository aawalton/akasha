import { describe, expect, test } from "bun:test"
import { itemsKeptAfterUpload } from "akasha/temper/addon/pages/catalog/modules/datamining-uploaded-items/datamining-uploaded-items.module.code.ts"

const UPLOADED = { apiVersion: "eso.live.12.1.5", throughItemId: 200 }
const DONE = { apiVersion: "eso.live.12.1.5", completed: true }

function items(): Record<number, string> {
  return { 100: "a", 200: "b", 300: "c" }
}

describe("itemsKeptAfterUpload", () => {
  test("drops every item at or below the uploaded id and keeps the rest", () => {
    expect(itemsKeptAfterUpload(items(), UPLOADED, DONE)).toEqual({ 300: "c" })
  })

  test("keeps everything while mining is not complete", () => {
    const all = items()
    expect(itemsKeptAfterUpload(all, UPLOADED, { ...DONE, completed: false })).toBe(all)
  })

  test("keeps everything when the upload was of another game version", () => {
    const all = items()
    expect(itemsKeptAfterUpload(all, UPLOADED, { ...DONE, apiVersion: "eso.live.12.2.0" })).toBe(
      all
    )
  })

  test("keeps everything when no upload is recorded", () => {
    const all = items()
    expect(itemsKeptAfterUpload(all, undefined, DONE)).toBe(all)
  })

  test("hands back the same table when nothing is at or below the uploaded id", () => {
    const later = { 300: "c" }
    expect(itemsKeptAfterUpload(later, UPLOADED, DONE)).toBe(later)
  })

  test("leaves absent items absent", () => {
    expect(itemsKeptAfterUpload(undefined, UPLOADED, DONE)).toBeUndefined()
  })
})
