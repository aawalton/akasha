import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"
import {
  fetchImage,
  runComfyGraph,
} from "akasha/infrastructure/inference/client/modules/comfy-client/comfy-client.module.code.ts"
import { drawSeed } from "akasha/infrastructure/inference/client/modules/inference-seed/inference-seed.module.code.ts"
import { makingValues } from "akasha/infrastructure/inference/generation/image/modules/making/image-making.module.code.ts"
import { landImage } from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { baseOf } from "akasha/infrastructure/inference/generation/zimage/modules/explore-batch/zimage-explore-batch.module.code.ts"
import { buildModelGraph } from "akasha/infrastructure/inference/generation/zimage/modules/graph/zimage-graph.module.code.ts"
import {
  MODELS,
  toModelId,
} from "akasha/infrastructure/inference/generation/zimage/modules/models/zimage-models.module.code.ts"
import { defaultPersistImageDeps } from "akasha/infrastructure/inference/run/modules/persist-image/persist-image.module.code.ts"
import { followWithin } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"
import {
  everyOfType,
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  changeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Writing,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type {
  Naming,
  Put,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { recordIn } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"

const STORY = "story-played"

const TURN = "story-turn-played"

const CHAPTER = "story-chapter-played"

const WRITTEN = "story-written"

const WRITTEN_CHAPTER = "story-chapter-written"

const SCENES = "scenes"

const PICTURED = "pictured"

const BEATS = "beats"

const PAGE_ENDS = /\.ts$/

const IMAGE = "image"

const IMAGE_OPENS = `${IMAGE}/`

const ASKED = "coverReroll"

const REFUSED = "coverRerollRefused"

const COVER = "cover"

const TURN_COVERS = "turnCovers"

const PAGE_TAIL = `.${STORY}.ts`

const BESIDE_TAIL = `.${STORY}.uncommitted.ts`

const WRITTEN_PAGE_TAIL = `.${WRITTEN}.ts`

const WRITTEN_BESIDE_TAIL = `.${WRITTEN}.uncommitted.ts`

const REJECTED = "F"

const DRAWN_WITHIN_MS = 15 * 60_000

const QUIET_TICK_MS = 30_000

const WIDTH = 832

const HEIGHT = 1216

const WRITER = "cover reroller <cover-reroller@alanwalton.com>"

const NOT_ANSWERING = "The picture service is not running right now, so nothing was drawn."

const CLOSED = /ECONNREFUSED|Unable to connect|fetch failed/

export type Drawing = {
  readonly model: string
  readonly prompt: string
  readonly steps: number
  readonly guidance: number
  readonly width: number
  readonly height: number
}

export type Row = { readonly path: string; readonly value: Value }

type Refused = { readonly refused: string }

export function askedIn(beside: Value | null): string | null {
  const asked = beside === null ? null : textAt(beside, ASKED)
  return asked?.startsWith(IMAGE_OPENS) === true ? asked : null
}

function numberIn(value: Value, key: string, fallback: number): number {
  const held = value[key]
  return typeof held === "number" && Number.isFinite(held) ? held : fallback
}

export function drawingOf(image: Value | null): Drawing | Refused {
  if (image === null) return { refused: "That picture is no longer there to draw again." }
  const prompt = textAt(image, "prompt")
  if (prompt === null || prompt.trim() === "") {
    return { refused: "That picture records no prompt to draw it again from." }
  }
  const model = toModelId(textAt(image, "model") ?? "")
  if (model === undefined) {
    return { refused: "That picture was made by a model nothing here renders with." }
  }
  const spec = MODELS[model]
  return {
    model,
    prompt,
    steps: numberIn(image, "steps", spec.defaultSteps),
    guidance: numberIn(image, "guidance", spec.defaultGuidance),
    width: WIDTH,
    height: HEIGHT,
  }
}

function within(folder: string, rows: readonly Row[]): readonly Row[] {
  const opens = `${folder}/`
  return rows.filter((one) => one.path.startsWith(opens))
}

function coverEntryIn(one: unknown, from: string, to: string): unknown {
  if (typeof one !== "object" || one === null || Array.isArray(one)) return one
  const entry = one as Readonly<Record<string, unknown>>
  return entry[COVER] === from ? { ...entry, [COVER]: to } : entry
}

export function repointed(
  turns: readonly Row[],
  chapters: readonly Row[],
  from: string,
  to: string
): readonly Naming[] {
  const named: Naming[] = []
  for (const one of turns) {
    const slug = textAt(one.value, "slug")
    if (slug !== null && one.value[COVER] === from) {
      named.push({ pageTypeSlug: TURN, slug, values: { [COVER]: to }, merge: true })
    }
  }
  for (const one of chapters) {
    const slug = textAt(one.value, "slug")
    const listed = one.value[TURN_COVERS]
    if (slug === null || !Array.isArray(listed)) continue
    const moved = listed.map((entry) => coverEntryIn(entry, from, to))
    if (moved.every((entry, at) => entry === listed[at])) continue
    named.push({ pageTypeSlug: CHAPTER, slug, values: { [TURN_COVERS]: moved }, merge: true })
  }
  return named
}

export type Held = { readonly pages: readonly Naming[]; readonly puts: readonly Put[] }

export function beatsRepointed(text: string, from: string, to: string): string | null {
  let moved = false
  const lines = text.split("\n").map((line) => {
    if (!line.includes(from)) return line
    const held = recordIn(line)
    if (held === null) return line
    const listed = held[PICTURED]
    if (!Array.isArray(listed)) return line
    const pictured = listed.map((entry) => coverEntryIn(entry, from, to))
    if (pictured.every((entry, at) => entry === listed[at])) return line
    moved = true
    return JSON.stringify({ ...held, [PICTURED]: pictured })
  })
  return moved ? lines.join("\n") : null
}

export function writtenRepointed(
  chapters: readonly Row[],
  beatsOf: (path: string) => string | null,
  from: string,
  to: string
): Held {
  const pages: Naming[] = []
  const puts: Put[] = []
  for (const one of chapters) {
    const slug = textAt(one.value, "slug")
    if (slug === null) continue
    const values: Value = {}
    if (one.value[COVER] === from) values[COVER] = to
    const scenes = one.value[SCENES]
    if (Array.isArray(scenes) && scenes.includes(from)) {
      values[SCENES] = scenes.map((scene: unknown) => (scene === from ? to : scene))
    }
    if (Object.keys(values).length > 0) {
      pages.push({ pageTypeSlug: WRITTEN_CHAPTER, slug, values, merge: true })
    }
    const ending = textAt(one.value, BEATS)
    if (ending === null) continue
    const path = one.path.replace(PAGE_ENDS, `.${BEATS}.${ending}`)
    const text = beatsOf(path)
    const content = text === null ? null : beatsRepointed(text, from, to)
    if (content !== null) puts.push({ path, content })
  }
  return { pages, puts }
}

export function rerollWriting(held: Held, from: string, to: string, read: string): Writing {
  return {
    writer: WRITER,
    message: `the picture ${from} is drawn again as ${to}, and ${from} is graded F`,
    read,
    ...(held.puts.length === 0 ? {} : { puts: held.puts }),
    pages: [
      ...held.pages,
      {
        pageTypeSlug: IMAGE,
        slug: from.slice(IMAGE_OPENS.length),
        values: { grade: REJECTED },
        merge: true,
      },
    ],
  }
}

export function refusalSaid(thrown: unknown): string {
  const why = thrown instanceof Error ? thrown.message : String(thrown)
  return CLOSED.test(why) ? NOT_ANSWERING : why
}

export function askAnswered(
  beside: Value | null,
  asked: string,
  refusedKey: string,
  refused: string | null
): Value {
  const kept: Record<string, unknown> = { ...(beside ?? {}) }
  delete kept[asked]
  delete kept[refusedKey]
  if (refused !== null) kept[refusedKey] = refused
  return kept as Value
}

export function answered(beside: Value | null, refused: string | null): Value {
  return askAnswered(beside, ASKED, REFUSED, refused)
}

export type Rerolling = {
  readonly beside: (story: string) => Value | null
  readonly image: (address: string) => Value | null
  readonly head: () => string
  readonly rows: (pageTypeSlug: string) => readonly Row[]
  readonly file: (path: string) => string | null
  readonly draw: (drawing: Drawing) => Promise<string>
  readonly write: (writing: Writing) => Promise<string | null>
  readonly answer: (story: string, refused: string | null) => undefined
}

function holdersIn(story: string, effects: Rerolling, from: string, to: string): Held {
  const folder = dirname(story)
  if (story.endsWith(WRITTEN_PAGE_TAIL)) {
    return writtenRepointed(within(folder, effects.rows(WRITTEN_CHAPTER)), effects.file, from, to)
  }
  const turns = within(folder, effects.rows(TURN))
  return { pages: repointed(turns, within(folder, effects.rows(CHAPTER)), from, to), puts: [] }
}

async function redrawn(story: string, asked: string, effects: Rerolling): Promise<string | null> {
  const drawing = drawingOf(effects.image(asked))
  if ("refused" in drawing) return drawing.refused
  const held = holdersIn(story, effects, asked, asked)
  if (held.pages.length === 0 && held.puts.length === 0) {
    return "Nothing in this story shows that picture any more."
  }
  let drawn: string
  try {
    drawn = `${IMAGE_OPENS}${await effects.draw(drawing)}`
  } catch (thrown) {
    return refusalSaid(thrown)
  }
  if (drawn === asked) return "The picture came out the same as before, so nothing changed."
  const read = effects.head()
  return await effects.write(
    rerollWriting(holdersIn(story, effects, asked, drawn), asked, drawn, read)
  )
}

export async function rerollOf(story: string, effects: Rerolling): Promise<boolean> {
  const asked = askedIn(effects.beside(story))
  if (asked === null) return false
  effects.answer(story, await redrawn(story, asked, effects))
  return true
}

async function drawnAs(drawing: Drawing): Promise<string> {
  return await drawnAt(drawing, drawSeed())
}

export async function drawnAt(drawing: Drawing, seed: number): Promise<string> {
  const spec = MODELS[drawing.model as keyof typeof MODELS]
  const base = baseOf()
  const run = await runComfyGraph({
    baseUrl: base,
    buildGraph: () =>
      buildModelGraph(spec, {
        prompt: drawing.prompt,
        negativePrompt: spec.defaultNegative,
        width: drawing.width,
        height: drawing.height,
        steps: drawing.steps,
        guidance: drawing.guidance,
        seed,
        loraStrength: 1,
        filenamePrefix: "cover-reroll",
      }),
    pollDeadlineMs: DRAWN_WITHIN_MS,
  })
  const png = await fetchImage(base, run.image)
  const made = {
    service: "zimage",
    operation: "generate",
    model: drawing.model,
    prompt: drawing.prompt,
    seed,
    steps: drawing.steps,
    guidance: drawing.guidance,
    width: drawing.width,
    height: drawing.height,
  }
  const values = makingValues(made, () => false)
  const landed = await landImage(defaultPersistImageDeps(), png, values, [])
  return landed.slug
}

export async function writtenBy(writing: Writing): Promise<string | null> {
  const wrote = await writingFor(writing)
  return "refused" in wrote
    ? `The new picture was made but not put in place: ${wrote.refused}`
    : null
}

function rerollingAt(root: string): Rerolling {
  return {
    beside: (story) => uncommittedIn(root, story),
    image: (address) => {
      const listed = listedAt(root, IMAGE, address.slice(IMAGE_OPENS.length))
      const path = listed.length === 1 ? listed[0]?.path : undefined
      return path === undefined ? null : valueAt(path, root)
    },
    head: () => headOf(root),
    rows: (pageTypeSlug) => valuesOfType(root, pageTypeSlug),
    file: (path) => {
      try {
        return readFileSync(join(root, path), "utf8")
      } catch {
        return null
      }
    },
    draw: drawnAs,
    write: writtenBy,
    answer: (story, refused) => {
      changeUncommitted(root, story, (held) => answered(held, refused))
      return undefined
    },
  }
}

export function storiesIn(root: string): readonly string[] {
  return everyOfType(root, STORY)
    .map((one) => one.path)
    .filter((path) => path.endsWith(PAGE_TAIL))
}

export function writtenIn(root: string): readonly string[] {
  return everyOfType(root, WRITTEN)
    .map((one) => one.path)
    .filter((path) => path.endsWith(WRITTEN_PAGE_TAIL))
}

export function holdsStory(at: string): boolean {
  return at.endsWith(BESIDE_TAIL) || at.endsWith(WRITTEN_BESIDE_TAIL)
}

export function watchCoverRerolls(whenQuiet?: () => Promise<undefined>): () => undefined {
  const root = akashaRoot()
  const stories = [...storiesIn(root), ...writtenIn(root)]
  const effects = rerollingAt(root)
  const busy = new Set<string>()
  let lane: Promise<unknown> = Promise.resolve()
  let quietOnLane = false
  const tick = (): undefined => {
    if (whenQuiet === undefined || quietOnLane || busy.size > 0) return undefined
    quietOnLane = true
    lane = lane
      .then(whenQuiet)
      .catch((thrown: unknown) => {
        process.stderr.write(`quiet work: ${refusalSaid(thrown)}\n`)
      })
      .finally(() => {
        quietOnLane = false
      })
    return undefined
  }
  const ticking = setInterval(tick, QUIET_TICK_MS)
  const round = (): undefined => {
    for (const story of stories) {
      if (busy.has(story) || askedIn(effects.beside(story)) === null) continue
      busy.add(story)
      lane = lane
        .then(() => rerollOf(story, effects))
        .catch((thrown: unknown) => {
          process.stderr.write(`${story}: ${refusalSaid(thrown)}\n`)
        })
        .finally(() => busy.delete(story))
    }
    return undefined
  }
  const folders = new Set(stories.map((one) => dirname(join(root, one))))
  const following = followWithin(folders, holdsStory, round)
  for (const one of following.unfollowed) process.stderr.write(`No watch on ${one}.\n`)
  round()
  return () => {
    following.stop()
    clearInterval(ticking)
    return undefined
  }
}
