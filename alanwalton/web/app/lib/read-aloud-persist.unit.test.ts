import { describe, expect, it } from "bun:test"
import type { ObjectStore } from "@shared/object-store"
import { readAloudKey, storedReadAloudExists } from "./read-aloud-persist"

const READ_ALOUD_KEY = "media-renders/page-abc/audio/read-aloud.mp3"

function fakeStore(headResult: { size: number } | null | (() => never) = null): ObjectStore {
  return {
    put: async () => {},
    append: async () => {},
    head: async () => (typeof headResult === "function" ? headResult() : headResult),
    get: async () => new Uint8Array(0),
    getStream: async () => null,
  }
}

describe("readAloudKey", () => {
  it("is the canonical media-render key for the page's audio read-aloud variant", () => {
    expect(readAloudKey("page-abc")).toBe(READ_ALOUD_KEY)
  })
})

describe("storedReadAloudExists", () => {
  it("is true when the HEAD finds the object", async () => {
    expect(await storedReadAloudExists("page-abc", fakeStore({ size: 123 }))).toBe(true)
  })

  it("is false when the HEAD returns null (no object)", async () => {
    expect(await storedReadAloudExists("page-abc", fakeStore(null))).toBe(false)
  })

  it("is false when the store is unconfigured", async () => {
    expect(await storedReadAloudExists("page-abc", null)).toBe(false)
  })

  it("is false (never throws) when the HEAD errors", async () => {
    const store = fakeStore(() => {
      throw new Error("gateway down")
    })
    expect(await storedReadAloudExists("page-abc", store)).toBe(false)
  })
})
