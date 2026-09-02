import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-functions-06"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-language-extensions"

import type {
  TraitResearchCatalogCraftType,
  TraitResearchCatalogLine,
  TraitResearchCatalogTrait,
} from "@akasha/temper-capture-shapes/trait-research-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

export const CRAFTING_TYPES = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]

export function collectTraitResearchCatalog(
  this: void,
  onComplete: (this: void) => void
): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, TraitResearchCatalogCraftType> = {}

  for (const craftingType of CRAFTING_TYPES) {
    const craftName = zo_strformat("<<1>>", GetCraftingSkillName(craftingType))
    const numLines = GetNumSmithingResearchLines(craftingType)
    const lines: Record<number, TraitResearchCatalogLine> = {}

    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const [lineName, , numTraits] = GetSmithingResearchLineInfo(craftingType, lineIndex)
      if (lineName === undefined || lineName === "") continue

      const traits: Record<number, TraitResearchCatalogTrait> = {}

      for (let traitIndex = 1; traitIndex <= numTraits; traitIndex++) {
        const [traitType] = GetSmithingResearchLineTraitInfo(craftingType, lineIndex, traitIndex)
        traits[traitIndex] = { name: GetString("SI_ITEMTRAITTYPE", traitType) }
      }

      lines[lineIndex] = { name: zo_strformat("<<1>>", lineName), traits }
    }

    catalog[craftingType] = { name: craftName, lines }
  }

  savedVars.traitResearchCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "traitResearchCatalog", collect: collectTraitResearchCatalog })
