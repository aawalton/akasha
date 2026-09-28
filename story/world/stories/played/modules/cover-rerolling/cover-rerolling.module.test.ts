import { expect, test } from "bun:test"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  answered,
  askedIn,
  type Drawing,
  drawingOf,
  holdsStory,
  type Rerolling,
  type Row,
  refusalSaid,
  repointed,
  rerollOf,
} from "akasha/story/world/stories/played/modules/cover-rerolling/cover-rerolling.module.code.ts"

const STORY = "story/world/pages/w/stories/played/s/s.story-played.ts"

const OLD = "image/image-old"

const NEW_SLUG = "image-new"

const MADE = {
  model: "beyond-reality-3",
  prompt: "a lighthouse at dusk",
  steps: 8,
  guidance: 1,
  width: 1216,
  height: 832,
}

function turn(slug: string, cover: string): Row {
  return {
    path: `story/world/pages/w/stories/played/s/turns/${slug}.story-turn-played.ts`,
    value: { slug, cover },
  }
}

function chapter(slug: string, covers: readonly string[]): Row {
  return {
    path: `story/world/pages/w/stories/played/s/chapters/${slug}.story-chapter-played.ts`,
    value: {
      slug,
      turnCovers: covers.map((cover, at) => ({ position: at + 1, cover })),
    },
  }
}

type Faked = {
  readonly effects: Rerolling
  readonly drawn: Drawing[]
  readonly written: Writing[]
  readonly answers: (string | null)[]
}

function faked(
  rows: Readonly<Record<string, readonly Row[]>>,
  over: Partial<Rerolling> = {}
): Faked {
  const drawn: Drawing[] = []
  const written: Writing[] = []
  const answers: (string | null)[] = []
  const effects: Rerolling = {
    beside: () => ({ coverReroll: OLD }),
    image: () => MADE,
    rows: (pageTypeSlug) => rows[pageTypeSlug] ?? [],
    draw: (drawing) => {
      drawn.push(drawing)
      return Promise.resolve(NEW_SLUG)
    },
    write: (writing) => {
      written.push(writing)
      return Promise.resolve(null)
    },
    answer: (_story, refused) => {
      answers.push(refused)
      return undefined
    },
    ...over,
  }
  return { effects, drawn, written, answers }
}

test("an ask names an image, and anything else asks nothing", () => {
  expect(askedIn({ coverReroll: OLD })).toBe(OLD)
  expect(askedIn({ coverReroll: "story-played/s" })).toBeNull()
  expect(askedIn({})).toBeNull()
  expect(askedIn(null)).toBeNull()
})

test("a cover is drawn again from what its image page records", () => {
  expect(drawingOf(MADE)).toEqual(MADE)
  expect(drawingOf({ ...MADE, prompt: " " })).toHaveProperty("refused")
  expect(drawingOf({ ...MADE, model: "flux" })).toHaveProperty("refused")
  expect(drawingOf(null)).toHaveProperty("refused")
})

test("every turn and chapter entry naming the old cover is pointed at the new one", () => {
  const named = repointed(
    [turn("t-1", OLD), turn("t-2", "image/image-other")],
    [chapter("c-1", ["image/image-a", OLD])],
    OLD,
    "image/image-new"
  )
  expect(named).toEqual([
    {
      pageTypeSlug: "story-turn-played",
      slug: "t-1",
      values: { cover: "image/image-new" },
      merge: true,
    },
    {
      pageTypeSlug: "story-chapter-played",
      slug: "c-1",
      values: {
        turnCovers: [
          { position: 1, cover: "image/image-a" },
          { position: 2, cover: "image/image-new" },
        ],
      },
      merge: true,
    },
  ])
})

test("a reroll draws at the recorded size, points the story at the new cover and grades the old one F", async () => {
  const held = faked({ "story-turn-played": [turn("t-1", OLD)] })
  expect(await rerollOf(STORY, held.effects)).toBe(true)
  expect(held.drawn).toEqual([MADE])
  expect(held.written).toHaveLength(1)
  expect(held.written[0]?.pages).toEqual([
    {
      pageTypeSlug: "story-turn-played",
      slug: "t-1",
      values: { cover: "image/image-new" },
      merge: true,
    },
    { pageTypeSlug: "image", slug: "image-old", values: { grade: "F" }, merge: true },
  ])
  expect(held.answers).toEqual([null])
})

test("a turn of another story naming the same cover is left alone", async () => {
  const elsewhere: Row = {
    path: "story/world/pages/w/stories/played/other/turns/t-9.story-turn-played.ts",
    value: { slug: "t-9", cover: OLD },
  }
  const held = faked({ "story-turn-played": [elsewhere] })
  await rerollOf(STORY, held.effects)
  expect(held.drawn).toEqual([])
  expect(held.answers[0]).toContain("No turn")
})

test("a render that fails is refused in words, and nothing is written", async () => {
  const held = faked(
    { "story-turn-played": [turn("t-1", OLD)] },
    {
      draw: () =>
        Promise.reject(new Error("Unable to connect. Is the computer able to access the url?")),
    }
  )
  await rerollOf(STORY, held.effects)
  expect(held.written).toEqual([])
  expect(held.answers).toEqual([
    "The picture service is not running right now, so nothing was drawn.",
  ])
})

test("a story with nothing asked is passed over", async () => {
  const held = faked({}, { beside: () => ({}) })
  expect(await rerollOf(STORY, held.effects)).toBe(false)
  expect(held.answers).toEqual([])
})

test("an answer takes the ask off and leaves only the latest refusal", () => {
  const beside = { coverReroll: OLD, coverRerollRefused: "earlier", other: 1 }
  expect(answered(beside, null)).toEqual({ other: 1 })
  expect(answered(beside, "now")).toEqual({ other: 1, coverRerollRefused: "now" })
})

test("a refusal names what went wrong, and a closed service is said plainly", () => {
  expect(refusalSaid(new Error("run did not complete"))).toBe("run did not complete")
  expect(refusalSaid(new Error("fetch failed"))).toContain("not running")
})

test("the watch follows a story's uncommitted values and nothing else", () => {
  expect(holdsStory("/a/s/s.story-played.uncommitted.ts")).toBe(true)
  expect(holdsStory("/a/s/s.story-played.ts")).toBe(false)
})
