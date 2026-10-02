import { expect, test } from "bun:test"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Row } from "akasha/story/world/stories/played/modules/cover-rerolling/cover-rerolling.module.code.ts"
import {
  cardQuiet,
  DRAWN,
  type Held,
  landscape,
  NONE_LEFT,
  nextLandscape,
  queueQuiet,
  quietRedrawing,
  type Redrawer,
  type Redrawing,
  redrawingOf,
  redrawNext,
  redrawWriting,
} from "akasha/story/world/stories/played/modules/portrait-redrawing/portrait-redrawing.module.code.ts"

const WIDE = {
  model: "beyond-reality-3",
  prompt: "a lighthouse at dusk",
  seed: 381241034,
  steps: 8,
  guidance: 1,
  width: 1216,
  height: 832,
}

const TALL = { ...WIDE, width: 832, height: 1216 }

function row(slug: string, value: Record<string, unknown>): Row {
  return { path: `x/${slug}.ts`, value: { slug, ...value } }
}

const IMAGES: Readonly<Record<string, Value>> = {
  "image/image-wide": WIDE,
  "image/image-tall": TALL,
  "image/image-wide-2": WIDE,
}

const look = (address: string): Value | null => IMAGES[address] ?? null

function held(over: Partial<Held> = {}): Held {
  return { turns: [], played: [], written: [], ...over }
}

test("a picture is landscape only where its page records a width over its height", () => {
  expect(landscape(WIDE)).toBe(true)
  expect(landscape(TALL)).toBe(false)
  expect(landscape({ prompt: "an edit records no size" })).toBe(false)
  expect(landscape(null)).toBe(false)
})

test("turns go before played chapters, and played chapters before written ones", () => {
  const all = held({
    turns: [row("t-1", { cover: "image/image-tall" }), row("t-2", { cover: "image/image-wide-2" })],
    played: [row("c-1", { turnCovers: [{ position: 1, cover: "image/image-wide" }] })],
  })
  expect(nextLandscape(all, look)).toBe("image/image-wide-2")
  expect(nextLandscape(held({ played: all.played }), look)).toBe("image/image-wide")
  expect(
    nextLandscape(
      held({ written: [row("w-1", { scenes: ["image/image-tall", "image/image-wide"] })] }),
      look
    )
  ).toBe("image/image-wide")
  expect(
    nextLandscape(held({ turns: [row("t-1", { cover: "image/image-tall" })] }), look)
  ).toBeNull()
})

test("a picture is drawn again at its own seed at the one portrait size", () => {
  expect(redrawingOf(WIDE, () => 7)).toEqual({
    model: "beyond-reality-3",
    prompt: "a lighthouse at dusk",
    steps: 8,
    guidance: 1,
    width: 832,
    height: 1216,
    seed: 381241034,
  })
  expect(redrawingOf({ ...WIDE, seed: undefined }, () => 7)).toHaveProperty("seed", 7)
  expect(redrawingOf({ ...WIDE, prompt: "" }, () => 7)).toHaveProperty("refused")
})

test("every turn and chapter naming the old picture names the new one, and the old is graded F", () => {
  const all = held({
    turns: [row("t-1", { cover: "image/image-wide" })],
    played: [row("c-1", { turnCovers: [{ position: 1, cover: "image/image-wide", anchor: 3 }] })],
    written: [
      row("w-1", { scenes: ["image/image-tall", "image/image-wide"], cover: "image/image-wide" }),
    ],
  })
  const writing = redrawWriting(all, "image/image-wide", "image/image-new", "head")
  expect(writing.read).toBe("head")
  expect(writing.pages).toEqual([
    {
      pageTypeSlug: "story-turn-played",
      slug: "t-1",
      values: { cover: "image/image-new" },
      merge: true,
    },
    {
      pageTypeSlug: "story-chapter-played",
      slug: "c-1",
      values: { turnCovers: [{ position: 1, cover: "image/image-new", anchor: 3 }] },
      merge: true,
    },
    {
      pageTypeSlug: "story-chapter-written",
      slug: "w-1",
      values: { scenes: ["image/image-tall", "image/image-new"], cover: "image/image-new" },
      merge: true,
    },
    { pageTypeSlug: "image", slug: "image-wide", values: { grade: "F" }, merge: true },
  ])
})

test("the GPU is quiet only with nothing running or waiting and the card idle", () => {
  expect(queueQuiet({ queue_running: [], queue_pending: [] })).toBe(true)
  expect(queueQuiet({ queue_running: [[1]], queue_pending: [] })).toBe(false)
  expect(queueQuiet({ queue_running: [], queue_pending: [[2]] })).toBe(false)
  expect(queueQuiet({})).toBe(false)
  expect(cardQuiet("3\n")).toBe(true)
  expect(cardQuiet("55\n")).toBe(false)
  expect(cardQuiet(null)).toBe(true)
})

function redrawer(rows: Held, written: Writing[], drawn: Redrawing[]): Redrawer {
  return {
    held: () => rows,
    image: look,
    head: () => "head",
    draw: (redrawing) => {
      drawn.push(redrawing)
      return Promise.resolve("image-new")
    },
    write: (writing) => {
      written.push(writing)
      return Promise.resolve(null)
    },
  }
}

test("a redraw draws the next landscape picture once, and a tried one is passed over", async () => {
  const written: Writing[] = []
  const drawn: Redrawing[] = []
  const rows = held({ turns: [row("t-1", { cover: "image/image-wide" })] })
  const passed = new Set<string>()
  expect(await redrawNext(redrawer(rows, written, drawn), passed)).toBe(DRAWN)
  expect(drawn).toHaveLength(1)
  expect(written).toHaveLength(1)
  expect(await redrawNext(redrawer(rows, written, drawn), passed)).toBe(NONE_LEFT)
  expect(drawn).toHaveLength(1)
})

test("nothing is drawn until the GPU has been quiet two ticks running", async () => {
  const quiet = [true, false, true, true, true, true]
  let redraws = 0
  const tick = quietRedrawing(
    () => Promise.resolve(quiet.shift() ?? true),
    () => {
      redraws += 1
      return Promise.resolve(redraws === 1 ? DRAWN : NONE_LEFT)
    }
  )
  for (let at = 0; at < 8; at += 1) await tick()
  expect(redraws).toBe(2)
})
