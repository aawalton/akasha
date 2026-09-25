import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import { mergeTraitResearch } from "akasha/temper/addon/pages/characters/modules/characters-trait-research-merge/characters-trait-research-merge.module.code.ts"
import type {
  TraitResearchCraftType,
  TraitResearchLine,
  TraitResearchTrait,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const CRAFTING_TYPES = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]

function readTrait(
  craftingType: number,
  lineIndex: number,
  traitIndex: number
): TraitResearchTrait {
  const [traitType, , known] = GetSmithingResearchLineTraitInfo(craftingType, lineIndex, traitIndex)
  return { name: GetString("SI_ITEMTRAITTYPE", traitType), known }
}

function scanTraitResearch(): Record<number, TraitResearchCraftType> {
  const result: Record<number, TraitResearchCraftType> = {}

  for (const craftingType of CRAFTING_TYPES) {
    const craftName = zo_strformat("<<1>>", GetCraftingSkillName(craftingType))
    const numLines = GetNumSmithingResearchLines(craftingType)
    const lines: Record<number, TraitResearchLine> = {}

    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const [lineName, , numTraits] = GetSmithingResearchLineInfo(craftingType, lineIndex)
      if (lineName === undefined || lineName === "") continue

      const traits: Record<number, TraitResearchTrait> = {}

      for (let traitIndex = 1; traitIndex <= numTraits; traitIndex++) {
        traits[traitIndex] = readTrait(craftingType, lineIndex, traitIndex)
      }

      lines[lineIndex] = { name: zo_strformat("<<1>>", lineName), traits }
    }

    result[craftingType] = { name: craftName, lines }
  }

  return result
}

export function collectTraitResearch(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.traitResearch = mergeTraitResearch(charEntry.traitResearch, scanTraitResearch())
}

export function updateTraitResearch(
  craftingSkillType: number,
  researchLineIndex: number,
  traitIndex: number
): undefined {
  const traitResearch = currentCharacterEntry()?.traitResearch
  if (traitResearch === undefined) return

  const line = traitResearch[craftingSkillType]?.lines[researchLineIndex]
  if (line === undefined) return

  line.traits[traitIndex] = readTrait(craftingSkillType, researchLineIndex, traitIndex)
}

export function refreshAllTraitResearch(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.traitResearch = scanTraitResearch()
}
