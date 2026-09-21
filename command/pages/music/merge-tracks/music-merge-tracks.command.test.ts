import { expect, test } from "bun:test"
import { slugSortingFirst } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import {
  carriersOver,
  collectionsOver,
  groupedOver,
  type Held,
  heardOver,
  messageOf,
  orderedBySlug,
  rowsOf,
  songOver,
  survivorOf,
  valuesMerged,
} from "akasha/command/pages/music/merge-tracks/music-merge-tracks.command.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PIXIE = "release/sylvia-daley-pixie"

const DELUXE = "release/sylvia-daley-pixie-deluxe"

const SONG = "song/sylvia-daley-elf"

const KEY = "elf|sp-artist|90000"

const ON_PIXIE = { release: PIXIE, discNumber: 1, position: 3, externalId: "t7" }

const ON_DELUXE = { release: DELUXE, discNumber: 2, position: 11, externalId: "t9" }

const COUNTS = { tracks: 4059, keys: 3358, groups: 475, merged: 475, removed: 701, skipped: 0 }

function held(slug: string, value: Value): Held {
  return { slug, path: `alan/music/catalog/track/pages/${slug}.track.ts`, value }
}

const ELF = held("sylvia-daley-pixie-elf", {
  slug: "sylvia-daley-pixie-elf",
  title: "Elf",
  trackKey: KEY,
  ownLength: 1.5,
  ownProgress: 0,
  status: "not-started",
  song: SONG,
  partOfCollections: [PIXIE],
  carriedBy: [ON_PIXIE],
})

const ELF_DELUXE = held("sylvia-daley-pixie-deluxe-elf", {
  slug: "sylvia-daley-pixie-deluxe-elf",
  title: "Elf",
  trackKey: KEY,
  ownLength: 1.5,
  ownProgress: 1.5,
  status: "completed",
  partOfCollections: [DELUXE],
  carriedBy: [ON_DELUXE],
})

const FOOL = held("sylvia-daley-pixie-fool", {
  slug: "sylvia-daley-pixie-fool",
  trackKey: "fool|sp-artist|150000",
  partOfCollections: [PIXIE],
})

const NAMELESS = held("sylvia-daley-pixie-untitled", {
  slug: "sylvia-daley-pixie-untitled",
  partOfCollections: [PIXIE],
})

test("the page left is the one whose slug sorts first, whatever order the group arrives in", () => {
  expect(orderedBySlug([ELF, ELF_DELUXE])[0]?.slug).toBe(ELF_DELUXE.slug)
  expect(survivorOf([ELF, ELF_DELUXE])?.slug).toBe(ELF_DELUXE.slug)
  expect(survivorOf([ELF_DELUXE, ELF])?.slug).toBe(ELF_DELUXE.slug)
})

test("the page left is the page a sweep files the recording under", () => {
  const group = [ELF, ELF_DELUXE]
  let swept: string | null = null
  for (const one of group) swept = slugSortingFirst(swept, one.slug)
  expect(survivorOf(group)?.slug ?? null).toBe(swept)
})

test("a group of one leaves that one, and a group of none leaves nothing", () => {
  expect(survivorOf([ELF_DELUXE])?.slug).toBe(ELF_DELUXE.slug)
  expect(survivorOf([])).toBeNull()
})

test("a group is ordered by slug whatever order it arrives in", () => {
  expect(orderedBySlug([ELF_DELUXE, FOOL, ELF]).map((one) => one.slug)).toEqual([
    ELF_DELUXE.slug,
    ELF.slug,
    FOOL.slug,
  ])
})

test("the pages stating one key are gathered under that key", () => {
  const groups = groupedOver([ELF, FOOL, ELF_DELUXE])
  expect(groups.get(KEY)?.map((one) => one.slug)).toEqual([ELF.slug, ELF_DELUXE.slug])
  expect(groups.get("fool|sp-artist|150000")?.length).toBe(1)
})

test("a track stating no key is gathered under no key", () => {
  expect([...groupedOver([NAMELESS]).keys()]).toEqual([])
})

test("the page left states one carrier for every release its group named", () => {
  expect(carriersOver([ELF, ELF_DELUXE])).toEqual([ON_PIXIE, ON_DELUXE])
})

test("two pages naming one release give that release's carrier from the first of them", () => {
  const other = held("sylvia-daley-zzz-elf", {
    slug: "sylvia-daley-zzz-elf",
    trackKey: KEY,
    carriedBy: [{ release: PIXIE, discNumber: 9, position: 9, externalId: "t0" }],
  })
  expect(carriersOver([other, ELF])).toEqual([ON_PIXIE])
})

test("a carrier naming no release is left out", () => {
  const other = held("sylvia-daley-zzz-elf", {
    slug: "sylvia-daley-zzz-elf",
    trackKey: KEY,
    carriedBy: [{ externalId: "t0" }],
  })
  expect(carriersOver([other])).toEqual([])
})

test("the page left names every collection its group named, its own first", () => {
  expect(collectionsOver(ELF_DELUXE, [ELF, ELF_DELUXE])).toEqual([DELUXE, PIXIE])
  expect(collectionsOver(ELF, [ELF, ELF_DELUXE])).toEqual([PIXIE, DELUXE])
})

test("a collection two pages named is named once", () => {
  expect(collectionsOver(ELF, [ELF, FOOL])).toEqual([PIXIE])
})

test("the page left is heard where any page in its group was heard", () => {
  expect(heardOver([ELF, ELF_DELUXE])).toBe(true)
  expect(heardOver([ELF, FOOL])).toBe(false)
})

test("a page left naming a song already takes no other song", () => {
  expect(songOver(ELF, [ELF, ELF_DELUXE])).toBeNull()
})

test("a page left naming no song takes the song the first page in its group names", () => {
  expect(songOver(ELF_DELUXE, [ELF, ELF_DELUXE])).toBe(SONG)
})

test("a group naming no song anywhere leaves the page left naming none", () => {
  expect(songOver(ELF_DELUXE, [ELF_DELUXE, FOOL])).toBeNull()
})

test("the page left carries every release, every collection and the listening of its group", () => {
  expect(valuesMerged(ELF, [ELF, ELF_DELUXE])).toEqual({
    slug: ELF.slug,
    title: "Elf",
    trackKey: KEY,
    ownLength: 1.5,
    ownProgress: 1.5,
    status: "completed",
    song: SONG,
    partOfCollections: [PIXIE, DELUXE],
    carriedBy: [ON_PIXIE, ON_DELUXE],
  })
})

test("a group none of which was heard leaves the listening the page left had", () => {
  expect(valuesMerged(ELF, [ELF, FOOL])["status"]).toBe("not-started")
  expect(valuesMerged(ELF, [ELF, FOOL])["ownProgress"]).toBe(0)
})

test("the rows say every count the run made", () => {
  expect(rowsOf(COUNTS)).toEqual([
    "tracks\t4059",
    "keys\t3358",
    "groups\t475",
    "merged\t475",
    "removed\t701",
    "skipped\t0",
  ])
})

test("the message counts the recordings left and the pages taken away", () => {
  expect(messageOf(COUNTS)).toBe("leave one track page for 475 recording(s) and take 701 away")
})

test("a page left that was heard already stays heard", () => {
  expect(valuesMerged(ELF_DELUXE, [ELF_DELUXE, ELF])["status"]).toBe("completed")
  expect(valuesMerged(ELF_DELUXE, [ELF_DELUXE, ELF])["ownProgress"]).toBe(1.5)
})
