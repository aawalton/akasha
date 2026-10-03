import { statSync } from "node:fs"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"
import { drawSeed } from "akasha/infrastructure/inference/client/modules/inference-seed/inference-seed.module.code.ts"
import { baseOf } from "akasha/infrastructure/inference/generation/zimage/modules/explore-batch/zimage-explore-batch.module.code.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  type Drawing,
  drawingOf,
  drawnAt,
  type Row,
  refusalSaid,
  repointed,
  writtenBy,
} from "akasha/story/world/stories/played/modules/cover-rerolling/cover-rerolling.module.code.ts"

const TURN = "story-turn-played"

const PLAYED = "story-chapter-played"

const WRITTEN = "story-chapter-written"

const IMAGE_OPENS = "image/"

const REJECTED = "F"

const WRITER = "portrait redrawer <cover-reroller@alanwalton.com>"

const BUSY_PERCENT = 15

const QUIET_TICKS = 2

export type Redrawing = Drawing & { readonly seed: number }

export type Held = {
  readonly turns: readonly Row[]
  readonly played: readonly Row[]
  readonly written: readonly Row[]
}

type Queue = { readonly queue_running?: unknown; readonly queue_pending?: unknown }

export function landscape(image: Value | null): boolean {
  if (image === null) return false
  const { width, height } = image
  return typeof width === "number" && typeof height === "number" && width > height
}

function coverOfEntry(entry: unknown): unknown {
  return typeof entry === "object" && entry !== null && !Array.isArray(entry)
    ? (entry as Readonly<Record<string, unknown>>)["cover"]
    : null
}

function coversIn(one: Row, kind: string): readonly unknown[] {
  if (kind === TURN) return [one.value["cover"]]
  if (kind === PLAYED) {
    const listed = one.value["turnCovers"]
    return Array.isArray(listed) ? listed.map(coverOfEntry) : []
  }
  const scenes = one.value["scenes"]
  return [...(Array.isArray(scenes) ? scenes : []), one.value["cover"]]
}

export function nextLandscape(held: Held, image: (address: string) => Value | null): string | null {
  const kinds: readonly (readonly [string, readonly Row[]])[] = [
    [TURN, held.turns],
    [PLAYED, held.played],
    [WRITTEN, held.written],
  ]
  for (const [kind, rows] of kinds) {
    for (const one of rows) {
      for (const cover of coversIn(one, kind)) {
        if (typeof cover === "string" && cover.startsWith(IMAGE_OPENS) && landscape(image(cover))) {
          return cover
        }
      }
    }
  }
  return null
}

export function redrawingOf(
  image: Value | null,
  seed: () => number
): Redrawing | { readonly refused: string } {
  const drawing = drawingOf(image)
  if ("refused" in drawing) return drawing
  const own = image?.["seed"]
  return { ...drawing, seed: typeof own === "number" && Number.isInteger(own) ? own : seed() }
}

function writtenRepointed(written: readonly Row[], from: string, to: string): readonly Naming[] {
  const named: Naming[] = []
  for (const one of written) {
    const slug = one.value["slug"]
    if (typeof slug !== "string") continue
    const values: Record<string, unknown> = {}
    const scenes = one.value["scenes"]
    if (Array.isArray(scenes) && scenes.includes(from)) {
      values["scenes"] = scenes.map((scene: unknown) => (scene === from ? to : scene))
    }
    if (one.value["cover"] === from) values["cover"] = to
    if (Object.keys(values).length > 0) {
      named.push({ pageTypeSlug: WRITTEN, slug, values, merge: true })
    }
  }
  return named
}

export function redrawWriting(held: Held, from: string, to: string, read: string): Writing {
  return {
    writer: WRITER,
    message: `the picture ${from}, drawn at a landscape size, is drawn again at 832 by 1216 as ${to}, and ${from} is graded F`,
    read,
    pages: [
      ...repointed(held.turns, held.played, from, to),
      ...writtenRepointed(held.written, from, to),
      {
        pageTypeSlug: "image",
        slug: from.slice(IMAGE_OPENS.length),
        values: { grade: REJECTED },
        merge: true,
      },
    ],
  }
}

export function queueQuiet(queue: Queue): boolean {
  const empty = (listed: unknown): boolean => Array.isArray(listed) && listed.length === 0
  return empty(queue.queue_running) && empty(queue.queue_pending)
}

export function cardQuiet(said: string | null): boolean {
  if (said === null) return true
  const percent = Number(said.trim())
  return !Number.isFinite(percent) || percent < BUSY_PERCENT
}

export type Redrawer = {
  readonly held: () => Held
  readonly image: (address: string) => Value | null
  readonly head: () => string
  readonly draw: (redrawing: Redrawing) => Promise<string>
  readonly write: (writing: Writing) => Promise<string | null>
}

export const NONE_LEFT = "none left"

export const DRAWN = "drawn"

export async function redrawNext(effects: Redrawer, passed: Set<string>): Promise<string> {
  const asked = nextLandscape(effects.held(), (address) =>
    passed.has(address) ? null : effects.image(address)
  )
  if (asked === null) return NONE_LEFT
  passed.add(asked)
  const redrawing = redrawingOf(effects.image(asked), drawSeed)
  if ("refused" in redrawing) return `${asked}: ${redrawing.refused}`
  const drawn = `${IMAGE_OPENS}${await effects.draw(redrawing)}`
  if (drawn === asked) return `${asked}: drawn the same as before`
  const read = effects.head()
  const refused = await effects.write(redrawWriting(effects.held(), asked, drawn, read))
  return refused === null ? DRAWN : `${asked}: ${refused}`
}

function newestFirst(root: string, rows: readonly Row[]): readonly Row[] {
  const when = (path: string): number => {
    try {
      return statSync(join(root, path)).mtimeMs
    } catch {
      return 0
    }
  }
  return [...rows].sort((a, b) => when(b.path) - when(a.path))
}

function heldAt(root: string): Held {
  return {
    turns: newestFirst(root, valuesOfType(root, TURN)),
    played: newestFirst(root, valuesOfType(root, PLAYED)),
    written: newestFirst(root, valuesOfType(root, WRITTEN)),
  }
}

async function gpuQuiet(): Promise<boolean> {
  try {
    const answer = await fetch(`${baseOf()}/queue`)
    if (!queueQuiet((await answer.json()) as Queue)) return false
  } catch {
    return false
  }
  try {
    const card = ran(["nvidia-smi", "--query-gpu=utilization.gpu", "--format=csv,noheader,nounits"])
    return cardQuiet(card.code === 0 ? card.out : null)
  } catch {
    return cardQuiet(null)
  }
}

function imageAt(root: string, address: string): Value | null {
  const listed = listedAt(root, "image", address.slice(IMAGE_OPENS.length))
  const path = listed.length === 1 ? listed[0]?.path : undefined
  return path === undefined ? null : valueAt(path, root)
}

function redrawerAt(root: string): Redrawer {
  return {
    held: () => heldAt(root),
    image: (address) => imageAt(root, address),
    head: () => headOf(root),
    draw: (redrawing) => drawnAt(redrawing, redrawing.seed),
    write: writtenBy,
  }
}

export function quietRedrawing(
  quiet: () => Promise<boolean> = gpuQuiet,
  redraw: (passed: Set<string>) => Promise<string> = (passed) =>
    redrawNext(redrawerAt(akashaRoot()), passed)
): () => Promise<undefined> {
  const passed = new Set<string>()
  let quietTicks = 0
  let finished = false
  return async () => {
    if (finished) return undefined
    if (!(await quiet())) {
      quietTicks = 0
      return undefined
    }
    quietTicks += 1
    if (quietTicks < QUIET_TICKS) return undefined
    quietTicks = 0
    let said: string
    try {
      said = await redraw(passed)
    } catch (thrown) {
      said = refusalSaid(thrown)
    }
    if (said === NONE_LEFT) finished = true
    if (said !== DRAWN) process.stderr.write(`portrait redraw: ${said}\n`)
    return undefined
  }
}
