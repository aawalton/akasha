
import { describe, expect, it } from "bun:test"

import { changedIds, heldWatermarks } from "./poll.ts"

const AT = "2026-08-15T14:27:56.063714+00:00"
const LATER = "2026-08-15T18:02:11.900000+00:00"

function row(monarchId: string, updatedAt: string | null) {
  return { monarchId, updatedAt }
}

describe("the diff a poll runs against its watermark", () => {
  it("names nothing when every watermark is the one we hold", () => {
    const held = heldWatermarks([row("a", AT), row("b", AT)])
    expect(changedIds([{ id: "a", updatedAt: AT }, { id: "b", updatedAt: AT }], held)).toEqual([])
  })

  it("names a row whose watermark moved though its date did not", () => {
    const held = heldWatermarks([row("a", AT), row("b", AT)])
    expect(changedIds([{ id: "a", updatedAt: LATER }, { id: "b", updatedAt: AT }], held)).toEqual([
      "a",
    ])
  })

  it("names a row the mirror has never held", () => {
    expect(changedIds([{ id: "new", updatedAt: AT }], heldWatermarks([row("a", AT)]))).toEqual([
      "new",
    ])
  })

  it("names a row mirrored with no watermark at all", () => {
    expect(changedIds([{ id: "a", updatedAt: AT }], heldWatermarks([row("a", null)]))).toEqual(["a"])
  })

  it("leaves a row that Monarch stopped listing to the vanished-row reconciliation rather than refetching it", () => {
    const held = heldWatermarks([row("a", AT), row("gone", AT)])
    expect(changedIds([{ id: "a", updatedAt: AT }], held)).toEqual([])
  })

  it("reads an empty window as nothing changed rather than as everything changed", () => {
    expect(changedIds([], heldWatermarks([row("a", AT)]))).toEqual([])
  })
})
