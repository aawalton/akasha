import { traitResearchCatalogSchema } from "@akasha/temper-game-catalog-capture-host/trait-research-catalog-schema"
import {
  CATALOG_SAVED_VARIABLES,
  type Tier,
  type TierEmit,
} from "../catalog-tier/catalog-tier.module.code.ts"

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

function extractTraitResearchFromSavedVars(
  accountWide: Record<string, unknown>
): readonly TraitResearchCraftTypeEntry[] {
  const rawCatalog = accountWide.traitResearchCatalog
  if (!rawCatalog)
    throw new Error(
      "No traitResearchCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const catalog = traitResearchCatalogSchema.parse(rawCatalog)

  const craftTypes: TraitResearchCraftTypeEntry[] = []

  for (const [craftKey, craftType] of Object.entries(catalog)) {
    const craftTypeId = Number(craftKey)

    const lineEntries: TraitResearchLineEntry[] = []

    for (const [lineKey, line] of Object.entries(craftType.lines)) {
      const lineIndex = Number(lineKey)

      const traitEntries: TraitResearchTraitEntry[] = []

      for (const [traitKey, trait] of Object.entries(line.traits)) {
        const traitIndex = Number(traitKey)
        traitEntries.push({ traitIndex, name: trait.name })
      }

      traitEntries.sort((a, b) => a.traitIndex - b.traitIndex)

      lineEntries.push({ lineIndex, name: line.name, traits: traitEntries })
    }

    lineEntries.sort((a, b) => a.lineIndex - b.lineIndex)

    craftTypes.push({ craftTypeId, name: craftType.name, lines: lineEntries })
  }

  craftTypes.sort((a, b) => a.craftTypeId - b.craftTypeId)

  return craftTypes
}

function generateDataFile(
  craftTypes: readonly TraitResearchCraftTypeEntry[],
  apiVersion: string
): string {
  const totalLines = craftTypes.reduce((sum, c) => sum + c.lines.length, 0)
  const totalTraits = craftTypes.reduce(
    (sum, c) => sum + c.lines.reduce((lSum, l) => lSum + l.traits.length, 0),
    0
  )

  return `\
/**
 * Trait Research Static Data (Generated)
 *
 * ${craftTypes.length} craft types, ${totalLines} research lines, ${totalTraits} traits
 *
 * apiVersion: ${apiVersion}
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

export const traitResearchData: TraitResearchCraftTypeEntry[] = ${JSON.stringify(craftTypes, null, 2)}
`
}

export const TRAIT_RESEARCH_TIER: Tier = {
  slug: "trait-research",
  summary: "Craftable traits, by craft type and research line",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "temper/player-completion/src/generated/trait-research-data.generated.ts",
  format: true,
  emit: (accountWide, apiVersion): TierEmit => {
    const craftTypes = extractTraitResearchFromSavedVars(accountWide)

    const totalLines = craftTypes.reduce((sum, c) => sum + c.lines.length, 0)
    const totalTraits = craftTypes.reduce(
      (sum, c) => sum + c.lines.reduce((lSum, l) => lSum + l.traits.length, 0),
      0
    )

    return {
      content: generateDataFile(craftTypes, apiVersion),
      report: [
        `Found ${craftTypes.length} craft types, ${totalLines} research lines, ${totalTraits} traits (apiVersion: ${apiVersion})`,
      ],
    }
  },
}
