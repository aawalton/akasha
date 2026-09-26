import {
  type Answer,
  refusing,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  editsOver,
  type Page,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import { image } from "akasha/infrastructure/inference/generation/image/image.page-type.ts"
import {
  imageSlugOfSha256,
  type Making,
  MakingSchema,
  makingValues,
} from "akasha/infrastructure/inference/generation/image/modules/making/image-making.module.code.ts"
import { generationLog } from "akasha/infrastructure/inference/generation/log/generation-log.page-type.ts"
import { generationRuns } from "akasha/infrastructure/inference/generation/log/properties/generation-runs.file-property.ts"
import { rowIn } from "akasha/infrastructure/inference/run/modules/generation-log/generation-log.module.code.ts"
import { IMAGE_OPERATIONS } from "akasha/infrastructure/inference/run/modules/persist-image/persist-image.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { partsReading } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT_MOST = "at-most"

const HELD = "jsonl"

const LINE = "\n"

const COMPLETED = "completed"

const STATUS = "status"

const OPERATION = "operation"

const STARTED_AT = "started-at"

const OUTPUT_SHA256 = "output-image-sha256"

const SERVICE = "service"

const SLUG = "slug"

const DONE = "every image a run made states how that run made it already"

type Row = Readonly<Record<string, unknown>>

type Run = { readonly startedAt: string; readonly row: Row }

export type Made = { readonly making: Making } | { readonly refused: string }

function runIn(row: Row): { readonly slug: string; readonly run: Run } | null {
  const sha256 = row[OUTPUT_SHA256]
  const startedAt = row[STARTED_AT]
  const operation = row[OPERATION]
  if (row[STATUS] !== COMPLETED || typeof sha256 !== "string") return null
  if (typeof startedAt !== "string" || typeof operation !== "string") return null
  if (!IMAGE_OPERATIONS.has(operation)) return null
  return { slug: imageSlugOfSha256(sha256), run: { startedAt, row } }
}

function madeOf(row: Row): Made {
  const camel: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(row)) camel[exportedAs(key)] = value
  const read = MakingSchema.safeParse(camel)
  if (read.success) return { making: read.data }
  return { refused: `the run \`${String(row["id"])}\` states no making: ${read.error.message}` }
}

export function earliestRunsIn(texts: Iterable<string>): ReadonlyMap<string, Made> {
  const found = new Map<string, Run>()
  for (const text of texts) {
    for (const line of text.split(LINE)) {
      const row = line === "" ? null : rowIn(line)
      const one = row === null ? null : runIn(row)
      if (one === null) continue
      const held = found.get(one.slug)
      if (held === undefined || one.run.startedAt < held.startedAt) found.set(one.slug, one.run)
    }
  }
  const made = new Map<string, Made>()
  for (const [slug, run] of found) made.set(slug, madeOf(run.row))
  return made
}

export function writtenOf(values: Value): readonly Written[] {
  return Object.entries(values).map(
    ([key, value]): Written => ({
      written: "put",
      key,
      value: JSON.stringify(value),
    })
  )
}

function* logTexts(world: World): Generator<string> {
  for (const log of world.index.everyOfType(generationLog.slug)) {
    for (const [, text] of partsReading(
      log.path,
      generationRuns.propertySlug,
      HELD,
      world.textOf
    )) {
      yield text
    }
  }
}

function slugsIn(images: ReadonlyMap<string, Value>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const value of images.values()) {
    const slug = value[SLUG]
    if (typeof slug === "string") found.add(slug)
  }
  return found
}

export function addImageMakingFromRuns(world: World, atMost: number | null): Answer {
  const images = world.index.valuesByPath(image.slug)
  const held = slugsIn(images)
  const runs = earliestRunsIn(logTexts(world))
  const pages: Page[] = []
  for (const path of [...images.keys()].sort()) {
    if (atMost !== null && pages.length >= atMost) break
    const value = images.get(path)
    const slug = value?.[SLUG]
    if (value === undefined || typeof slug !== "string" || value[SERVICE] !== undefined) continue
    const made = runs.get(slug)
    if (made === undefined) continue
    if ("refused" in made) return refusing(`\`${path}\` is refused, and ${made.refused}`)
    pages.push({ path, written: writtenOf(makingValues(made.making, (one) => held.has(one))) })
  }
  if (pages.length === 0) return telling(stating([]), [DONE])
  const edits = editsOver(world, pages)
  if (typeof edits === "string") return refusing(edits)
  return telling(stating(edits), [`stated how ${pages.length} images were made`])
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT_MOST]

export function runChange(world: World, given: Asked): Answer {
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  return addImageMakingFromRuns(world, atMost)
}
