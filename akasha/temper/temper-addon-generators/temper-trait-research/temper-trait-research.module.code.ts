import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const TRAIT_SCHEMA = z
  .object({
    id: z.string(),
    traitIndex: z.number(),
    traitName: z.string(),
  })
  .strict()

const LINE_SCHEMA = z
  .object({
    title: z.string(),
    displayOrder: z.number(),
    parent: z.string(),
    traits: z.array(TRAIT_SCHEMA),
  })
  .strict()

const CRAFT_TYPE_SCHEMA = z
  .object({
    slug: z.string(),
    title: z.string(),
    esoCraftTypeId: z.number(),
  })
  .strict()

interface OutTrait {
  traitIndex: number
  name: string
}

interface OutLine {
  lineIndex: number
  name: string
  traits: OutTrait[]
}

interface ParsedLine {
  parent: string
  line: OutLine
}

interface OutCraftType {
  craftTypeId: number
  name: string
  lines: OutLine[]
}

function lineOf(row: Page): ParsedLine {
  const held = LINE_SCHEMA.parse({
    title: row.title,
    displayOrder: row.displayOrder,
    parent: row.parent,
    traits: row.traits ?? [],
  })
  const traits = [...held.traits].sort((a, b) => a.traitIndex - b.traitIndex)
  return {
    parent: held.parent,
    line: {
      lineIndex: held.displayOrder,
      name: held.title,
      traits: traits.map((trait) => ({ traitIndex: trait.traitIndex, name: trait.traitName })),
    },
  }
}

function craftTypeOf(row: Page, lines: readonly ParsedLine[]): OutCraftType {
  const held = CRAFT_TYPE_SCHEMA.parse({
    slug: row.slug,
    title: row.title,
    esoCraftTypeId: row.esoCraftTypeId,
  })
  const mine = lines
    .filter((parsed) => parsed.parent === held.slug)
    .map((parsed) => parsed.line)
    .sort((a, b) => a.lineIndex - b.lineIndex)
  if (mine.length === 0) throw new Error(`no research line hangs beneath \`${held.slug}\``)
  return { craftTypeId: held.esoCraftTypeId, name: held.title, lines: mine }
}

function trailedIn(shown: string): string {
  return shown.replace(/\n(\s*[}\]])/g, ",\n$1")
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "trait-research")
  if (found === undefined) {
    throw new Error("no `temper-catalog-domain` page is slugged `trait-research`")
  }
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `trait-research` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

export function generateTemperTraitResearch(
  craftTypeRows: readonly Page[],
  lineRows: readonly Page[],
  catalogDomains: readonly Page[]
): string {
  const lines = lineRows.map(lineOf)
  const craftTypes = craftTypeRows
    .map((row) => craftTypeOf(row, lines))
    .sort((a, b) => a.craftTypeId - b.craftTypeId)
  const placed = craftTypes.reduce((held, craftType) => held + craftType.lines.length, 0)
  if (placed !== lines.length) {
    throw new Error(`${lines.length} research lines were read and ${placed} were placed`)
  }
  const traitCount = craftTypes.reduce(
    (held, craftType) =>
      held + craftType.lines.reduce((each, line) => each + line.traits.length, 0),
    0
  )
  return `\
/**
 * Trait Research Static Data (Generated)
 *
 * ${craftTypes.length} craft types, ${lines.length} research lines, ${traitCount} traits
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate trait-research
 */

interface TraitResearchTraitEntry {
  traitIndex: number
  name: string
}

interface TraitResearchLineEntry {
  lineIndex: number
  name: string
  traits: readonly TraitResearchTraitEntry[]
}

interface TraitResearchCraftTypeEntry {
  craftTypeId: number
  name: string
  lines: readonly TraitResearchLineEntry[]
}

export const traitResearchData: TraitResearchCraftTypeEntry[] = ${trailedIn(JSON.stringify(craftTypes, null, 2))}
`
}
