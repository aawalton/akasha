import { expect, test } from "bun:test"
import type { Asking } from "@akasha/changes/mechanical-change-running"
import type { Given } from "@akasha/command-system/calling"
import type { Refused } from "@akasha/command-system/landing"
import { rootOf } from "@akasha/command-system/rooting"
import type { LrclibRecord } from "../../../../alan/music/catalog/lrclib-schema/lrclib-schema.module.code.ts"
import type {
  MbArtist,
  MbRecording,
  MbWork,
} from "../../../../alan/music/catalog/musicbrainz-schema/musicbrainz-schema.module.code.ts"
import type { Applied } from "../../../modules/applying/applying.module.code.ts"
import {
  type Gathered,
  gathered,
  jsonOf,
  type Landing,
  musicImportArtist,
  type Reach,
  rowsOf,
  taken,
  WRITE,
} from "./music-import-artist.command.code.ts"

const ROOT = rootOf(process.cwd())

const GIVEN: Given = { root: ROOT, calledAs: "akasha", from: ".", writer: null, agentId: null }

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

function writesIn(changes: readonly Asking[]): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  for (const one of changes) {
    if (one.at !== WRITE) continue
    held.set(one.given.at, one.given.body)
  }
  return held
}

function pathsOf(found: Gathered): readonly string[] {
  return [...writesIn(found.changes).keys()]
}

function bodyAt(found: Gathered, path: string): string {
  const body = writesIn(found.changes).get(path)
  if (body === undefined) throw new Error(`${path} is in no change here`)
  return body
}

const LANDED: Applied = {
  base: "4444444444444444444444444444444444444444",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "5555555555555555555555555555555555555555",
}

type Seen = { changes: readonly Asking[]; message: string }

function landingOnto(seen: Seen, answer: Applied | Refused = LANDED): Landing {
  return async (_root, changes, message) => {
    seen.changes = changes
    seen.message = message
    return answer
  }
}

function unseen(): Seen {
  return { changes: [], message: "" }
}

function importingProbe(landing: Landing) {
  return musicImportArtist(
    ["--mbid", MBID],
    GIVEN,
    reachOf({
      browseWorks: async () => [workOf("w-1", "First Probe")],
      searchLyrics: async (title) => [lyricsOf(title)],
    }),
    landing
  )
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
  expect(songBody).toMatch(new RegExp(`(?:artist|artistSlug): "${ARTIST_SLUG}"`))
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

test("the artist, the song and its words are named to the landing at one change each", async () => {
  const seen = unseen()
  const said = await importingProbe(landingOnto(seen))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(seen.message).toBe(`import ${ARTIST_NAME} and 1 songs from MusicBrainz`)
  expect(seen.changes.map((one) => one.at)).toEqual([WRITE, WRITE, WRITE, WRITE])
  const songAt = `alan/music/catalog/songs/pages/${ARTIST_SLUG}-first-probe/${ARTIST_SLUG}-first-probe.song`
  expect([...writesIn(seen.changes).keys()]).toEqual([
    `alan/music/catalog/artists/pages/${ARTIST_SLUG}/${ARTIST_SLUG}.artist.ts`,
    `${songAt}.ts`,
    `${songAt}.lyrics.txt`,
    `${songAt}.synced-lyrics.txt`,
  ])
})

test("the words named to the landing are text rather than bytes", async () => {
  const seen = unseen()
  await importingProbe(landingOnto(seen))
  const words = `alan/music/catalog/songs/pages/${ARTIST_SLUG}-first-probe/${ARTIST_SLUG}-first-probe.song.lyrics.txt`
  expect(writesIn(seen.changes).get(words)).toContain("the words of First Probe")
})

test("a landing that refused is answered with the refusal and nothing brought in", async () => {
  const said = await importingProbe(landingOnto(unseen(), { refusals: ["the lock was held"] }))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["the lock was held"])
  expect(said.report).toEqual([])
})

test("a landing answering something wrong is answered as a refusal", async () => {
  const answer = { ...LANDED, wrong: ["the install would not take"] }
  const said = await importingProbe(landingOnto(unseen(), answer))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["the install would not take"])
})

test("what landed is reported under the rows saying what was brought in", async () => {
  const answer = { ...LANDED, landed: ["one/page.ts"] }
  const said = await importingProbe(landingOnto(unseen(), answer))
  expect(said.report[0]).toBe(`artist\t${ARTIST_NAME}\t${MBID}\t${ARTIST_SLUG}`)
  expect(said.report).toContain("wrote one/page.ts")
})
