import { afterEach, describe, expect, test } from "bun:test"
import { configureContentPersistence, getContentPersistence } from "../singleton"
import type { ContentPagePersistencePort } from "./content-persistence"

const NOOP_PORT: ContentPagePersistencePort = {
  loadPages: () => Promise.resolve([]),
  savePages: () => undefined,
  pinPages: () => undefined,
  cachedIds: () => Promise.resolve([]),
  clear: () => undefined,
}

afterEach(() => {
  configureContentPersistence(null)
})

describe("content persistence singleton", () => {
  test("defaults to null (browser path — no port registered)", () => {
    expect(getContentPersistence()).toBeNull()
  })

  test("registers the injected port and returns it", () => {
    configureContentPersistence(NOOP_PORT)
    expect(getContentPersistence()).toBe(NOOP_PORT)
  })

  test("latest registration wins; null clears back to the browser path", () => {
    const other: ContentPagePersistencePort = { ...NOOP_PORT }
    configureContentPersistence(NOOP_PORT)
    configureContentPersistence(other)
    expect(getContentPersistence()).toBe(other)
    configureContentPersistence(null)
    expect(getContentPersistence()).toBeNull()
  })
})
