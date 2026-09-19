import { expect, test } from "bun:test"
import { EXIT } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import type { Catalogue } from "akasha/alan/music/catalog/modules/catalogue-held/catalogue-held.module.code.ts"
import { catalogueNamesFrom } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import { songKey } from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { throwingAfter } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.test-fixtures.ts"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"

import type { Applied } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  askedOf,
  type Gathered,
  gathered,
  jsonOf,
  musicImportArtist,
  oneEach,
  type Reach,
  rowsOf,
  taken,
  WRITE,
} from "akasha/command/pages/music/import-artist/music-import-artist.command.code.ts"
import {
  ARTIST,
  ARTIST_NAME,
  ARTIST_SLUG,
  lyricsOf,
  MBID,
  recordingOf,
  TODAY,
  workOf,
} from "akasha/command/pages/music/import-artist/music-import-artist.command.test-fixtures.ts"

const ROOT = rootOf(process.cwd())

const GIVEN: Given = { root: ROOT, calledAs: "akasha", from: ".", writer: null, agentId: null }

const REACHED = "a reach was asked for what this test does not answer"

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

const CALLED_AS = "akasha music import-artist"

test("a call naming no artist is refused in the words the reader refuses with", () => {
  const held = taken(["--json"], CALLED_AS)
  expect("refused" in held && held.refused).toContain(
    "takes `<name>`, `--name` or `--mbid`, and nothing said any of them"
  )
})

test("a name said blank with no mbid is refused by what this command narrows past the reader", () => {
  const held = taken(["--name", "  "], CALLED_AS)
  expect("refused" in held && held.refused).toContain("`--name` names no artist")
})

test("an artist is named after the command as well as at a flag", () => {
  const held = taken(["Mitski"], CALLED_AS)
  expect("refused" in held).toBe(false)
  expect(!("refused" in held) && held.name).toBe("Mitski")
})

test("a second artist after the command is refused", () => {
  const held = taken(["Mitski", "Aurora"], CALLED_AS)
  expect("refused" in held && held.refused).toContain("takes 1 word and this call says 2 words")
})

test("a limit that is no whole number is refused", () => {
  const held = taken(["--mbid", MBID, "--limit", "half"], CALLED_AS)
  expect("refused" in held && held.refused).toContain("whole number")
})

test("a limit of nought is refused rather than read as no limit", () => {
  const held = taken(["--mbid", MBID, "--limit", "0"], CALLED_AS)
  expect("refused" in held && held.refused).toContain("one or more")
})

test("a flag this takes nothing of is refused", () => {
  const held = taken(["--mbid", MBID, "--today", "2026-01-01"], CALLED_AS)
  expect("refused" in held && held.refused).toContain("`--today` is no argument")
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

  const artistAt = `alan/music/catalog/artist/pages/${ARTIST_SLUG}/${ARTIST_SLUG}.artist.ts`
  const firstAt = `alan/music/catalog/song/pages/${ARTIST_SLUG}-first-probe/${ARTIST_SLUG}-first-probe.song.ts`
  expect(pathsOf(found)).toContain(artistAt)
  expect(pathsOf(found)).toContain(firstAt)
  expect(pathsOf(found)).toContain(
    `alan/music/catalog/song/pages/${ARTIST_SLUG}-first-probe/${ARTIST_SLUG}-first-probe.song.lyrics.txt`
  )

  const artistBody = bodyAt(found, artistAt)
  expect(artistBody).toContain(`externalIdentity: [{source:"musicbrainz"`)
  expect(artistBody).toContain(`externalId:"${MBID}"`)
  expect(artistBody).toContain(`externalLink:"https://musicbrainz.org/artist/${MBID}"`)
  expect(artistBody).toContain(`lastSyncedAt:"${TODAY}"`)
  expect(artistBody).toContain(`genre: ["folk","ambient"]`)
  expect(artistBody).not.toContain("\n  id:")
  expect(artistBody).not.toMatch(/\n {2}externalId:/)
  expect(artistBody).not.toMatch(/\n {2}source:/)

  const songBody = bodyAt(found, firstAt)
  expect(songBody).toMatch(new RegExp(`(?:artist|artistSlug): "artist/${ARTIST_SLUG}"`))
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
  const liveAt = `alan/music/catalog/song/pages/${ARTIST_SLUG}-bare-probe-live/${ARTIST_SLUG}-bare-probe-live.song.ts`
  expect(bodyAt(found, liveAt)).not.toContain("songType")
})

function catalogueOf(slug: string, title: string): Catalogue {
  return {
    names: catalogueNamesFrom([{ slug, externalId: null }]),
    held: new Map(),
    byTitle: new Map([[songKey(ARTIST_SLUG, title), slug]]),
    byWork: new Map(),
  }
}

function fieldsOf(id: string, title: string) {
  return {
    title,
    artist: `artist/${ARTIST_SLUG}`,
    externalIdentity: [
      {
        source: "musicbrainz",
        externalId: id,
        externalLink: `https://musicbrainz.org/work/${id}`,
        lastSyncedAt: TODAY,
      },
    ],
    performed: true,
  } as const
}

test("a song already filed under this artist with this title is filled in rather than filed twice", () => {
  const filed = `${ARTIST_SLUG}-first-probe`
  const catalogue = catalogueOf(filed, "First Probe")
  expect(askedOf(catalogue, ARTIST_SLUG, fieldsOf("w-1", "First Probe")).slug).toBe(filed)
  expect(catalogue.names.filed.get("w-1")).toBe(filed)
})

test("a song no title of this artist names is filed under a slug of its own", () => {
  const catalogue = catalogueOf(`${ARTIST_SLUG}-first-probe`, "First Probe")
  expect(askedOf(catalogue, ARTIST_SLUG, fieldsOf("w-2", "Second Probe")).slug).toBe(
    `${ARTIST_SLUG}-second-probe`
  )
})

test("two works of one title already filed are brought in as one song", () => {
  const filed = `${ARTIST_SLUG}-first-probe`
  const catalogue = catalogueOf(filed, "First Probe")
  const both = [
    askedOf(catalogue, ARTIST_SLUG, fieldsOf("w-1", "First Probe")),
    askedOf(catalogue, ARTIST_SLUG, fieldsOf("w-2", "First Probe")),
  ]
  expect(both.map((one) => one.slug)).toEqual([filed, filed])
  expect(oneEach(both).length).toBe(1)
})

test("a work already filed under another artist takes this artist rather than a page", () => {
  const filed = "other-probe-first-probe"
  const catalogue: Catalogue = {
    names: catalogueNamesFrom([{ slug: filed, externalId: null }]),
    held: new Map([[filed, { slug: filed, title: "First Probe", artist: "other-probe" }]]),
    byTitle: new Map(),
    byWork: new Map([["w-1", filed]]),
  }
  const asked = askedOf(catalogue, ARTIST_SLUG, fieldsOf("w-1", "First Probe"))
  expect(asked.joins).toBe(true)
  expect(asked.slug).toBe(filed)
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
    songsJoined: 0,
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
  const songAt = `alan/music/catalog/song/pages/${ARTIST_SLUG}-first-probe/${ARTIST_SLUG}-first-probe.song`
  expect([...writesIn(seen.changes).keys()]).toEqual([
    `alan/music/catalog/artist/pages/${ARTIST_SLUG}/${ARTIST_SLUG}.artist.ts`,
    `${songAt}.ts`,
    `${songAt}.lyrics.txt`,
    `${songAt}.synced-lyrics.txt`,
  ])
})

test("a landing that refused is answered with the refusal and nothing brought in", async () => {
  const refused = { refusals: ["the lock was held"], code: EXIT.OPERATIONAL }
  const said = await importingProbe(landingOnto(unseen(), refused))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["the lock was held"])
  expect(said.report).toEqual([])
})

test("what a landing answers wrong is answered as a refusal over what landed", async () => {
  const answer = { ...LANDED, landed: ["one/page.ts"], wrong: ["the install would not take"] }
  const said = await importingProbe(landingOnto(unseen(), answer))
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["the install would not take"])
  expect(said.report).toEqual(["wrote one/page.ts"])
})

const WENT_WRONG = new Error("the artist landed and the commit went wrong")

test("a run that landed the pages and then threw says what it had landed", async () => {
  const said = await importingProbe(throwingAfter(["abc123"], WENT_WRONG))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before a page landed says why it threw and no more", async () => {
  const said = await importingProbe(throwingAfter([], WENT_WRONG))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the artist landed and the commit went wrong")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote twice names each write in the order it was written", async () => {
  const wrote = ["wrote one/page.ts", "abc123"]
  const said = await importingProbe(throwingAfter(wrote, WENT_WRONG))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "wrote one/page.ts; abc123. Nothing after that ran."
  )
})
