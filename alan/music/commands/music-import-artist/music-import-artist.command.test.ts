import { expect, test } from "bun:test"
import { rootOf } from "@akasha/command-system/rooting"
import type { LrclibRecord } from "../../catalog/lrclib-schema/lrclib-schema.module.code.ts"
import type {
  MbArtist,
  MbRecording,
  MbWork,
} from "../../catalog/musicbrainz-schema/musicbrainz-schema.module.code.ts"
import { gathered, jsonOf, type Reach, rowsOf, taken } from "./music-import-artist.command.code.ts"

const ROOT = rootOf(import.meta.dir)

const MBID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"

const ARTIST_NAME = "Probe Artist Nine"

const ARTIST_SLUG = "probe-artist-nine"

const TODAY = "2026-09-02"

const REACHED = "a reach was asked for what this test does not answer"

const ARTIST: MbArtist = {
  id: MBID,
  name: ARTIST_NAME,
  genres: [
    { name: "folk", count: 9 },
    { name: "ambient", count: 2 },
  ],
}

function workOf(id: string, title: string): MbWork {
  return {
    id,
    title,
    relations: [
      { type: "writer", "target-type": "artist", artist: { id: MBID, name: ARTIST_NAME } },
    ],
  }
}

function recordingOf(id: string, title: string, workId: string | null): MbRecording {
  return {
    id,
    title,
    relations:
      workId === null
        ? []
        : [{ type: "performance", "target-type": "work", work: { id: workId, title } }],
  }
}

function lyricsOf(title: string): LrclibRecord {
  return {
    id: 1,
    trackName: title,
    artistName: ARTIST_NAME,
    instrumental: false,
    plainLyrics: `the words of ${title}\n`,
    syncedLyrics: `[00:01.00] the words of ${title}\n`,
  }
}

function reachOf(over: Partial<Reach>): Reach {
  const nothing = async () => {
    throw new Error(REACHED)
  }
  return {
    searchArtist: over.searchArtist ?? nothing,
    getArtist: over.getArtist ?? (async () => ARTIST),
    browseWorks: over.browseWorks ?? (async () => []),
    browseRecordings: over.browseRecordings ?? (async () => []),
    searchLyrics: over.searchLyrics ?? (async () => []),
  }
}

async function gatheringOf(reach: Reach, limit: number | null = null) {
  const found = await gathered(ROOT, { name: null, mbid: MBID, limit, json: false }, reach, TODAY)
  if ("refused" in found) throw new Error(`the import was refused — ${found.refused}`)
  return found
}

function pathsOf(found: { readonly changes: readonly { readonly path: string }[] }): string[] {
  return found.changes.map((one) => one.path)
}

function bodyAt(
  found: {
    readonly changes: readonly { readonly path: string; readonly body: Uint8Array | null }[]
  },
  path: string
): string {
  const one = found.changes.find((each) => each.path === path)
  if (one === undefined || one.body === null) throw new Error(`${path} is in no change here`)
  return new TextDecoder().decode(one.body)
}

test("a call naming no artist is refused", () => {
  const held = taken(["--json"])
  expect("refused" in held && held.refused).toContain("names no artist")
})

test("an artist is named after the command as well as at a flag", () => {
  const held = taken(["Mitski"])
  expect("refused" in held).toBe(false)
  expect(!("refused" in held) && held.name).toBe("Mitski")
})

test("a second artist after the command is refused", () => {
  const held = taken(["Mitski", "Aurora"])
  expect("refused" in held && held.refused).toContain("one artist is brought in")
})

test("a limit that is no whole number is refused", () => {
  const held = taken(["--mbid", MBID, "--limit", "half"])
  expect("refused" in held && held.refused).toContain("whole number")
})

test("a flag this takes nothing of is refused", () => {
  const held = taken(["--mbid", MBID, "--today", "2026-01-01"])
  expect("refused" in held && held.refused).toContain("`--today` is nothing this takes")
})

test("the artist page and a song page are composed from the works", async () => {
  const found = await gatheringOf(
    reachOf({
      browseWorks: async () => [workOf("w-1", "First Probe"), workOf("w-2", "Second Probe")],
      browseRecordings: async () => [recordingOf("r-1", "First Probe", "w-1")],
      searchLyrics: async (title) => (title === "First Probe" ? [lyricsOf(title)] : []),
    })
  )
  expect(found.said.derivedFrom).toBe("works")
  expect(found.said.songsWritten).toBe(2)
  expect(found.said.songsWithLyrics).toBe(1)
  expect(found.said.songsLyricsUnread).toBe(0)
  expect(found.said.artistSlug).toBe(ARTIST_SLUG)

  const artistAt = `alan/music/catalog/artists/pages/${ARTIST_SLUG}/${ARTIST_SLUG}.artist.ts`
  const firstAt = `alan/music/catalog/songs/pages/${ARTIST_SLUG}-first-probe/${ARTIST_SLUG}-first-probe.song.ts`
  expect(pathsOf(found)).toContain(artistAt)
  expect(pathsOf(found)).toContain(firstAt)
  expect(pathsOf(found)).toContain(
    `alan/music/catalog/songs/pages/${ARTIST_SLUG}-first-probe/${ARTIST_SLUG}-first-probe.song.lyrics.txt`
  )

  const artistBody = bodyAt(found, artistAt)
  expect(artistBody).toContain(`externalId: "${MBID}"`)
  expect(artistBody).toContain(`externalLink: "https://musicbrainz.org/artist/${MBID}"`)
  expect(artistBody).toContain(`genre: ["folk","ambient"]`)
  expect(artistBody).toContain(`lastSyncedAt: "${TODAY}"`)
  expect(artistBody).not.toContain("\n  id:")

  const songBody = bodyAt(found, firstAt)
  expect(songBody).toContain(`artistSlug: "${ARTIST_SLUG}"`)
  expect(songBody).toContain("performed: true")
  expect(songBody).toContain(`written: "solo"`)
  expect(songBody).toContain(`lyricsSource: "lrclib"`)
  expect(songBody).toContain(`lyrics: "txt"`)
})

test("an artist filed under no work is read from their recordings", async () => {
  const found = await gatheringOf(
    reachOf({
      browseWorks: async () => [],
      browseRecordings: async () => [
        recordingOf("r-1", "Bare Probe", null),
        recordingOf("r-2", "Bare Probe (Live)", null),
      ],
    })
  )
  expect(found.said.derivedFrom).toBe("recordings")
  expect(found.said.songsWritten).toBe(2)
  const liveAt = `alan/music/catalog/songs/pages/${ARTIST_SLUG}-bare-probe-live/${ARTIST_SLUG}-bare-probe-live.song.ts`
  expect(bodyAt(found, liveAt)).toContain(`songType: "derivative"`)
})

test("a limit caps how many songs are brought in", async () => {
  const found = await gatheringOf(
    reachOf({
      browseWorks: async () => [workOf("w-1", "One Probe"), workOf("w-2", "Two Probe")],
    }),
    1
  )
  expect(found.said.songsWritten).toBe(1)
})

test("a song LRCLIB will not answer for is counted as unread and brought in anyway", async () => {
  const found = await gatheringOf(
    reachOf({
      browseWorks: async () => [workOf("w-1", "Silent Probe")],
      searchLyrics: async () => {
        throw new Error("LRCLIB 503")
      },
    })
  )
  expect(found.said.songsWithLyrics).toBe(0)
  expect(found.said.songsLyricsUnread).toBe(1)
  expect(found.said.songsWritten).toBe(1)
})

test("an artist MusicBrainz answers nothing for is refused", async () => {
  const found = await gathered(
    ROOT,
    { name: "Nobody At All Here", mbid: null, limit: null, json: false },
    reachOf({ searchArtist: async () => [] }),
    TODAY
  )
  expect("refused" in found && found.refused).toContain("no artist")
})

test("what was brought in is said as rows and as JSON", () => {
  const said = {
    mbid: MBID,
    artistName: ARTIST_NAME,
    artistSlug: ARTIST_SLUG,
    songsTotal: 3,
    songsWritten: 3,
    songsWithLyrics: 2,
    songsLyricsUnread: 0,
    derivedFrom: "works",
  } as const
  expect(rowsOf(said)).toEqual([
    `artist\t${ARTIST_NAME}\t${MBID}\t${ARTIST_SLUG}`,
    "songs\t3",
    "lyrics\t2",
    "source\tworks",
  ])
  expect(JSON.parse(jsonOf(said)).artist).toEqual({
    name: ARTIST_NAME,
    mbid: MBID,
    slug: ARTIST_SLUG,
  })
})
