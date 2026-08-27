import { describe, expect, it } from "bun:test"
import { lyricsToProps, pickBestLyrics } from "./map"
import type { LrclibRecord } from "./schemas"

function rec(partial: Partial<LrclibRecord> & { id: number }): LrclibRecord {
  return {
    trackName: "Afterglow",
    artistName: "Taylor Swift",
    albumName: null,
    duration: null,
    instrumental: false,
    plainLyrics: "plain",
    syncedLyrics: null,
    ...partial,
  }
}

describe("pickBestLyrics", () => {
  it("returns null for no records", () => {
    expect(pickBestLyrics([], "Afterglow", "Taylor Swift")).toBeNull()
  })

  it("returns null when no record's artist matches", () => {
    const recs = [rec({ id: 1, artistName: "Some Other Band" })]
    expect(pickBestLyrics(recs, "Afterglow", "Taylor Swift")).toBeNull()
  })

  it("returns null when no record's title matches", () => {
    const recs = [rec({ id: 1, trackName: "Different Song" })]
    expect(pickBestLyrics(recs, "Afterglow", "Taylor Swift")).toBeNull()
  })

  it("matches title case- and punctuation-insensitively", () => {
    const recs = [rec({ id: 1, trackName: "AFTERGLOW" })]
    expect(pickBestLyrics(recs, "Afterglow", "Taylor Swift")?.id).toBe(1)
  })

  it("matches when the artist name is a superset (featured credit)", () => {
    const recs = [rec({ id: 1, artistName: "Taylor Swift feat. Bon Iver", trackName: "exile" })]
    expect(pickBestLyrics(recs, "exile", "Taylor Swift")?.id).toBe(1)
  })

  it("excludes instrumental records", () => {
    const recs = [rec({ id: 1, instrumental: true, plainLyrics: null, syncedLyrics: null })]
    expect(pickBestLyrics(recs, "Afterglow", "Taylor Swift")).toBeNull()
  })

  it("excludes records with neither plain nor synced lyrics", () => {
    const recs = [rec({ id: 1, plainLyrics: null, syncedLyrics: null })]
    expect(pickBestLyrics(recs, "Afterglow", "Taylor Swift")).toBeNull()
  })

  it("prefers a synced record over a plain-only one", () => {
    const recs = [
      rec({ id: 1, plainLyrics: "p", syncedLyrics: null }),
      rec({ id: 2, plainLyrics: "p", syncedLyrics: "[00:01.00] line" }),
    ]
    expect(pickBestLyrics(recs, "Afterglow", "Taylor Swift")?.id).toBe(2)
  })
})

describe("lyricsToProps", () => {
  it("maps plain, synced, and source onto the song page's declared keys", () => {
    const props = lyricsToProps(
      rec({ id: 1, plainLyrics: "the plain words", syncedLyrics: "[00:01.00] the plain words" })
    )
    expect(props).toEqual({
      lyrics: "the plain words",
      "synced-lyrics": "[00:01.00] the plain words",
      "lyrics-source": "lrclib",
    })
  })

  it("omits lyrics when there is no plain text (synced only)", () => {
    const props = lyricsToProps(rec({ id: 1, plainLyrics: null, syncedLyrics: "[00:01.00] x" }))
    expect(props.lyrics).toBeUndefined()
    expect(props).toMatchObject({ "synced-lyrics": "[00:01.00] x", "lyrics-source": "lrclib" })
  })

  it("omits synced-lyrics when there is no synced text (plain only)", () => {
    const props = lyricsToProps(rec({ id: 1, plainLyrics: "x", syncedLyrics: null }))
    expect(props["synced-lyrics"]).toBeUndefined()
    expect(props).toMatchObject({ lyrics: "x", "lyrics-source": "lrclib" })
  })
})
