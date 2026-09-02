import { describe, expect, test } from "bun:test"
import type { LrclibRecord } from "../lrclib-schema/lrclib-schema.module.code.ts"
import { lyricsFieldsOf, pickBestLyrics } from "./lrclib-map.module.code.ts"

function record(over: Partial<LrclibRecord> = {}): LrclibRecord {
  return {
    id: 1,
    trackName: "Under Pressure",
    artistName: "Queen",
    instrumental: false,
    plainLyrics: "pressure pushing down on me",
    syncedLyrics: null,
    ...over,
  }
}

describe("pickBestLyrics", () => {
  test("answers nothing where LRCLIB answered nothing", () => {
    expect(pickBestLyrics([], "Under Pressure", "Queen")).toBeNull()
  })

  test("takes a record whose title and artist match", () => {
    expect(pickBestLyrics([record()], "Under Pressure", "Queen")?.id).toBe(1)
  })

  test("sets case and punctuation aside when matching the title", () => {
    const held = record({ trackName: "under   pressure!!!" })
    expect(pickBestLyrics([held], "Under Pressure", "Queen")?.id).toBe(1)
  })

  test("refuses a title that is only nearly the same", () => {
    const held = record({ trackName: "Under Pressure (Live)" })
    expect(pickBestLyrics([held], "Under Pressure", "Queen")).toBeNull()
  })

  test("takes an artist name that holds the one asked for", () => {
    const held = record({ artistName: "Queen & David Bowie" })
    expect(pickBestLyrics([held], "Under Pressure", "Queen")?.id).toBe(1)
  })

  test("refuses an artist name that does not hold the one asked for", () => {
    const held = record({ artistName: "David Bowie" })
    expect(pickBestLyrics([held], "Under Pressure", "Queen")).toBeNull()
  })

  test("refuses an instrumental", () => {
    const held = record({ instrumental: true })
    expect(pickBestLyrics([held], "Under Pressure", "Queen")).toBeNull()
  })

  test("refuses a record holding no words at all", () => {
    const held = record({ plainLyrics: null, syncedLyrics: null })
    expect(pickBestLyrics([held], "Under Pressure", "Queen")).toBeNull()
  })

  test("refuses a record whose words are the empty string", () => {
    const held = record({ plainLyrics: "", syncedLyrics: "" })
    expect(pickBestLyrics([held], "Under Pressure", "Queen")).toBeNull()
  })

  test("takes the stamped record over the plain one that came first", () => {
    const plain = record({ id: 1 })
    const stamped = record({ id: 2, syncedLyrics: "[00:12.00] pressure" })
    expect(pickBestLyrics([plain, stamped], "Under Pressure", "Queen")?.id).toBe(2)
  })

  test("takes the first qualifying record where none is stamped", () => {
    const first = record({ id: 1 })
    const second = record({ id: 2 })
    expect(pickBestLyrics([first, second], "Under Pressure", "Queen")?.id).toBe(1)
  })

  test("looks past a record it refuses to one it takes", () => {
    const refused = record({ id: 1, instrumental: true })
    const taken = record({ id: 2 })
    expect(pickBestLyrics([refused, taken], "Under Pressure", "Queen")?.id).toBe(2)
  })
})

describe("lyricsFieldsOf", () => {
  test("names lrclib as the source", () => {
    expect(lyricsFieldsOf(record()).lyricsSource).toBe("lrclib")
  })

  test("carries the plain words and no stamped ones", () => {
    expect(lyricsFieldsOf(record())).toEqual({
      lyricsSource: "lrclib",
      lyrics: "pressure pushing down on me",
      syncedLyrics: null,
    })
  })

  test("carries the stamped words where LRCLIB gave them", () => {
    const held = lyricsFieldsOf(record({ syncedLyrics: "[00:12.00] pressure" }))
    expect(held.syncedLyrics).toBe("[00:12.00] pressure")
  })

  test("reads empty words as none", () => {
    const held = lyricsFieldsOf(record({ plainLyrics: "", syncedLyrics: "" }))
    expect(held).toEqual({ lyricsSource: "lrclib", lyrics: null, syncedLyrics: null })
  })
})
