import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import {
  type Held,
  keptOf,
  keysOf,
  ownValued,
  partedOver,
} from "akasha/command/pages/music/fold-songs/music-fold-songs.command.code.ts"

function heldOf(slug: string, over: Partial<Held> = {}): Held {
  return {
    slug,
    path: `${slug}.song.ts`,
    own: false,
    base: false,
    wrote: false,
    artist: slug,
    value: {},
    ...over,
  }
}

const WORK = [
  {
    source: "musicbrainz",
    externalId: "w1",
    externalLink: "https://musicbrainz.org/work/w1",
  },
]

const WRITER = "probe-writer"

const COVERER = "probe-coverer"

const COVERER_AT = `${artist.slug}/${COVERER}` as const

test("the page a person has written on is the page that stays", () => {
  const group = [heldOf("sia-alive", { base: true }), heldOf("sia-alive-3", { own: true })]
  expect(keptOf(group)?.slug).toBe("sia-alive-3")
})

test("where no page is written on, a page whose artist is named a writer stays", () => {
  const group = [
    heldOf("probe-coverer-blank-space", { base: true }),
    heldOf("probe-writer-blank-space", { base: true, wrote: true }),
  ]
  expect(keptOf(group)?.slug).toBe("probe-writer-blank-space")
})

test("songs holding one musicbrainz work share a key whoever performs them", () => {
  const one = keysOf({ externalIdentity: WORK, title: "Blank Space", artist: WRITER })
  const two = keysOf({ externalIdentity: WORK, title: "Blank Space", artist: COVERER })
  expect(one.filter((key) => two.includes(key))).toHaveLength(1)
})

test("the page that stays is part of every artist the pages that go were under", () => {
  const keep = heldOf("probe-writer-blank-space", { artist: WRITER })
  const gone = heldOf("probe-coverer-blank-space", { artist: COVERER, value: { artist: COVERER } })
  expect(partedOver(keep, [keep, gone])).toMatchObject({ partOfCollections: [COVERER_AT] })
})

test("a page already under every artist of its group gains nothing", () => {
  expect(partedOver(heldOf("probe-writer-blank-space", { artist: WRITER }), [])).toBeNull()
})

test("where no page names its artist a writer, a page titled the composition stays", () => {
  const group = [heldOf("ariana-grande-34-35-remix"), heldOf("ariana-grande-34-35", { base: true })]
  expect(keptOf(group)?.slug).toBe("ariana-grande-34-35")
})

test("the shortest slug settles which of those stays", () => {
  const group = [
    heldOf("ariana-grande-hampstead-2", { base: true }),
    heldOf("ariana-grande-hampstead", { base: true }),
  ]
  expect(keptOf(group)?.slug).toBe("ariana-grande-hampstead")
})

test("a group titling no page the composition still keeps one of them", () => {
  const group = [heldOf("aurora-runaway-live"), heldOf("aurora-runaway-acoustic")]
  expect(keptOf(group)?.slug).toBe("aurora-runaway-live")
})

test("a group written on in more than one place is left alone", () => {
  const group = [heldOf("sia-alive", { own: true }), heldOf("sia-alive-3", { own: true })]
  expect(keptOf(group)).toBeNull()
})

test("a page is written on where it states what a person judged of it", () => {
  expect(ownValued({ title: "Alive", singability: "S-" })).toBe(true)
  expect(ownValued({ title: "Alive", insights: "txt" })).toBe(true)
  expect(ownValued({ title: "Alive", rank: "S" })).toBe(true)
  expect(ownValued({ title: "Alive", written: "solo", performed: true })).toBe(false)
})
