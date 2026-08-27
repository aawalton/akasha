import { beforeEach, describe, expect, it } from "bun:test"
import type { ActiveSessionInit } from "./playing-session"
import {
  clearPersistedSession,
  persistedToSessionInit,
  readPersistedSession,
  writePersistedSession,
} from "./playing-session-storage"

const STORAGE_KEY = "playing-session:v1"

const SESSION: ActiveSessionInit = {
  pageId: "page-a",
  pageTypeSlug: "story-chapter",
  pageHref: "/story-chapter/chapter-a-0000abcd",
  title: "Chapter A",
  medium: "audio",
  variant: "narrator-mara",
  speed: 1.25,
  nextHref: "/story-chapter/chapter-b-0000ef01",
}

beforeEach(() => {
  window.sessionStorage.clear()
})

describe("playing-session-storage — reload restore persistence", () => {
  it("round-trips a written session + position", () => {
    writePersistedSession(SESSION, 42)
    const restored = readPersistedSession()
    expect(restored).not.toBeNull()
    expect(restored?.pageId).toBe("page-a")
    expect(restored?.title).toBe("Chapter A")
    expect(restored?.variant).toBe("narrator-mara")
    expect(restored?.speed).toBe(1.25)
    expect(restored?.nextHref).toBe("/story-chapter/chapter-b-0000ef01")
    expect(restored?.position).toBe(42)
  })

  it("restores a pre-#14763 v1 blob (no pageTypeSlug) with an empty slug", () => {
    const { pageTypeSlug: _omit, ...v1 } = SESSION
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...v1, position: 7 }))
    const restored = readPersistedSession()
    expect(restored).not.toBeNull()
    expect(restored?.pageTypeSlug).toBe("")
    expect(restored?.pageId).toBe("page-a")
  })

  it("preserves a null nextHref (end-of-story session)", () => {
    writePersistedSession({ ...SESSION, nextHref: null }, 5)
    expect(readPersistedSession()?.nextHref).toBeNull()
  })

  it("coerces a negative / non-finite position to 0 on write", () => {
    writePersistedSession(SESSION, -5)
    expect(readPersistedSession()?.position).toBe(0)
    writePersistedSession(SESSION, Number.NaN)
    expect(readPersistedSession()?.position).toBe(0)
  })

  it("returns null when nothing is stored", () => {
    expect(readPersistedSession()).toBeNull()
  })

  it("clear removes the persisted session", () => {
    writePersistedSession(SESSION, 10)
    expect(readPersistedSession()).not.toBeNull()
    clearPersistedSession()
    expect(readPersistedSession()).toBeNull()
  })

  it("returns null for malformed JSON (boundary parse)", () => {
    window.sessionStorage.setItem(STORAGE_KEY, "{not valid json")
    expect(readPersistedSession()).toBeNull()
  })

  it("returns null for a partial / missing-field blob", () => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ pageId: "x", position: 1 }))
    expect(readPersistedSession()).toBeNull()
  })

  it("returns null for an unknown medium", () => {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...SESSION, medium: "hologram", position: 1 })
    )
    expect(readPersistedSession()).toBeNull()
  })

  it("returns null for a negative stored position (rejects hand-tampered blobs)", () => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...SESSION, position: -3 }))
    expect(readPersistedSession()).toBeNull()
  })

  it("rejects an extra-keyed blob (strict schema)", () => {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...SESSION, position: 1, injected: "nope" })
    )
    expect(readPersistedSession()).toBeNull()
  })

  it("persistedToSessionInit strips the position back to a pure session init", () => {
    writePersistedSession(SESSION, 99)
    const persisted = readPersistedSession()
    expect(persisted).not.toBeNull()
    if (persisted == null) return
    const init = persistedToSessionInit(persisted)
    expect(init).toEqual(SESSION)
    expect("position" in init).toBe(false)
  })
})
