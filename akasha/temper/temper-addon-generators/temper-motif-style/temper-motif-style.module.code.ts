import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const MOTIF_STYLE_EAV_SCHEMA = z
  .object({
    collectionIndex: z.number().int().nonnegative(),
    sourceDescription: z.string(),
    dropSources: z.array(z.string()).default([]),
  })
  .strict()

interface ParsedMotifStyle {
  collectionIndex: number
  name: string
  sourceDescription: string
  dropSourceIds: readonly string[]
}

interface ScribingSourceLookup {
  title: string
}

function parseMotifStyle(row: Page): ParsedMotifStyle {
  if (row.title === null) {
    throw new Error(`temper-motif-style row ${row.id} has null title`)
  }
  const eav = MOTIF_STYLE_EAV_SCHEMA.parse({
    collectionIndex: row.collectionIndex,
    sourceDescription: row.sourceDescription,
    dropSources: row.dropSources,
  })
  return {
    collectionIndex: eav.collectionIndex,
    name: row.title,
    sourceDescription: eav.sourceDescription,
    dropSourceIds: eav.dropSources,
  }
}

function buildScribingSourceLookup(
  rows: readonly Page[]
): ReadonlyMap<string, ScribingSourceLookup> {
  const out = new Map<string, ScribingSourceLookup>()
  for (const row of rows) {
    if (row.title === null) {
      throw new Error(`temper-scribing-source row ${row.id} has null title`)
    }
    if (typeof row.slug !== "string") {
      throw new Error(`temper-scribing-source row ${row.id} has no slug`)
    }
    out.set(row.slug, { title: row.title })
  }
  return out
}

function resolveLabels(
  motif: ParsedMotifStyle,
  sourceById: ReadonlyMap<string, ScribingSourceLookup>
): readonly string[] {
  const labels: string[] = []
  for (const sourceId of motif.dropSourceIds) {
    const source = sourceById.get(sourceId)
    if (source === undefined) {
      throw new Error(
        `temper-motif-style ${motif.name}: dropSources entry ${sourceId} is not a temper-scribing-source row`
      )
    }
    labels.push(source.title)
  }
  return labels
}

export function generateTemperMotifStyle(
  motifRows: readonly Page[],
  scribingSourceRows: readonly Page[]
): string {
  const motifs = motifRows.map(parseMotifStyle)
  const sourceById = buildScribingSourceLookup(scribingSourceRows)

  const sorted = [...motifs].sort((a, b) => a.collectionIndex - b.collectionIndex)

  const entries = sorted.map((m) => {
    const labels = resolveLabels(m, sourceById)
    const labelsLiteral = `[${labels.map((l) => JSON.stringify(l)).join(", ")}]`
    return `  [${m.collectionIndex}]: { name: ${JSON.stringify(m.name)}, sourceDescription: ${JSON.stringify(m.sourceDescription)}, scribingSourceLabels: ${labelsLiteral} },`
  })

  return `\
/**
 * Temper Motif Styles (Generated)
 *
 * Maps lore-library collectionIndex (category 2 = Crafting Motifs) to motif
 * style metadata, sourced from the universal pages table (page type:
 * temper-motif-style).
 *
 * \`scribingSourceLabels\` carries the resolved scribing-source titles
 * (e.g. "Mages Guild Daily") that drop this motif as a side-effect, so
 * the consumer in scribing-sources.ts can do label-only fallback matching
 * without a hardcoded alias→label bridge.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { MotifStyleEntry } from "../motif-style-lookup"

export const MOTIF_STYLE_LOOKUP: Record<number, MotifStyleEntry> = {
${entries.join("\n")}
}

export const CHAPTERS_PER_STYLE = 14
`
}
