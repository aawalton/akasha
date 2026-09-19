import { describe, expect, test } from "bun:test"
import type { LrclibRecord } from "akasha/alan/music/catalog/modules/lrclib-schema/lrclib-schema.module.code.ts"
import {
  TXT,
  wordEdits,
  wordsFor,
} from "akasha/alan/music/catalog/modules/song-words/song-words.module.code.ts"
import { song as songPageType } from "akasha/alan/music/catalog/song/song.page-type.ts"

const AT = `alan/music/catalog/${songPageType.slug}/pages/queen-yellow/queen-yellow.${songPageType.slug}.ts`

const found = (over: Partial<LrclibRecord> = {}): LrclibRecord => ({
  id: 1,
  trackName: "Yellow",
  artistName: "Queen",
  instrumental: false,
  plainLyrics: "look at the stars",
  syncedLyrics: "[00:01.00] look at the stars",
  ...over,
})

describe("wordsFor", () => {
  test("reads the words LRCLIB answers", async () => {
    const held = await wordsFor(async () => [found()], "Yellow", "Queen")
    expect(held.unread).toBe(false)
    expect(held.words?.lyrics).toBe("look at the stars")
  })

  test("answers no words where LRCLIB answers nothing", async () => {
    const held = await wordsFor(async () => [], "Yellow", "Queen")
    expect(held.words).toBeNull()
    expect(held.unread).toBe(false)
  })

  test("says the words went unread where the reach throws", async () => {
    const held = await wordsFor(
      async () => {
        throw new Error("no answer")
      },
      "Yellow",
      "Queen"
    )
    expect(held.words).toBeNull()
    expect(held.unread).toBe(true)
  })
})

describe("wordEdits", () => {
  test("writes a file beside the song for each kind of words", () => {
    const edits = wordEdits("/nowhere", AT, {
      lyricsSource: "lrclib",
      lyrics: "look at the stars",
      syncedLyrics: "[00:01.00] look",
    })
    expect(edits.length).toBe(2)
    expect(edits[0]?.given).toMatchObject({ at: expect.stringContaining(`.lyrics.${TXT}`) })
    expect(edits[1]?.given).toMatchObject({
      at: expect.stringContaining(`.synced-lyrics.${TXT}`),
    })
  })

  test("writes nothing for a kind of words LRCLIB answered nothing under", () => {
    const edits = wordEdits("/nowhere", AT, {
      lyricsSource: "lrclib",
      lyrics: "look at the stars",
      syncedLyrics: null,
    })
    expect(edits.length).toBe(1)
  })
})
