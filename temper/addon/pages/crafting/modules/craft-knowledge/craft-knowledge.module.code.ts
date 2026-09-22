import * as Characters from "akasha/temper/addon/pages/crafting/modules/craft-characters/craft-characters.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/crafting/modules/crafting-state/crafting-state.module.code.ts"
import { PUBLIC as CHARACTER_KNOWLEDGE } from "akasha/temper/addon/pages/crafting/modules/knowledge-state/knowledge-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"

const RESEARCH_CRAFTS: number[] = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]

export function isInitialized(this: void): boolean {
  const [firstKey] = next(CHARACTER_KNOWLEDGE.GetCharacterList())
  return firstKey !== undefined
}

export function onInitialized(
  this: void,
  name: string,
  callback: (this: void) => undefined
): undefined {
  if (isInitialized()) {
    callback()
    return
  }
  CHARACTER_KNOWLEDGE.RegisterForCallback(name, CHARACTER_KNOWLEDGE.EVENT_INITIALIZED, callback)
}

export function charIdForName(this: void, char: string): string | undefined {
  for (const [, entry] of ipairs(CHARACTER_KNOWLEDGE.GetCharacterList())) {
    if (entry.name === char) {
      return entry.id
    }
  }
  return undefined
}

export function isItemKnownByLink(this: void, char: string, link: string): boolean {
  const charId = charIdForName(char)
  if (charId === undefined) {
    return false
  }
  return (
    CHARACTER_KNOWLEDGE.GetItemKnowledgeForCharacter(link, undefined, charId) ===
    CHARACTER_KNOWLEDGE.KNOWLEDGE_KNOWN
  )
}

export function isItemKnownById(this: void, char: string, itemId: number): boolean {
  const charId = charIdForName(char)
  if (charId === undefined) {
    return false
  }
  return (
    CHARACTER_KNOWLEDGE.GetItemKnowledgeForCharacter(itemId, undefined, charId) ===
    CHARACTER_KNOWLEDGE.KNOWLEDGE_KNOWN
  )
}

export function isMotifChapterKnown(
  this: void,
  char: string,
  styleId: number,
  chapterId: number
): boolean {
  const charId = charIdForName(char)
  if (charId === undefined) {
    return false
  }
  return (
    CHARACTER_KNOWLEDGE.GetMotifKnowledgeForCharacter(styleId, chapterId, undefined, charId) ===
    CHARACTER_KNOWLEDGE.KNOWLEDGE_KNOWN
  )
}

export function isResearchKnown(
  this: void,
  char: string,
  craft: number,
  line: number,
  trait: number
): boolean {
  const charId = charIdForName(char)
  if (charId === undefined) {
    return false
  }
  const [, , isKnown] = CHARACTER_KNOWLEDGE.GetSmithingResearchLineTraitInfoForCharacter(
    craft,
    line,
    trait,
    undefined,
    charId
  )
  return isKnown
}

export function rebuildResearched(this: void, char: string): undefined {
  const researched: Record<number, Record<number, Record<number, boolean | number>>> = {}
  STATE.Data.crafting.researched[char] = researched
  for (const [, craft] of ipairs(RESEARCH_CRAFTS)) {
    const craftTable: Record<number, Record<number, boolean | number>> = {}
    researched[craft] = craftTable
    const numLines = GetNumSmithingResearchLines(craft)
    for (let line = 1; line <= numLines; line++) {
      const lineTable: Record<number, boolean | number> = {}
      craftTable[line] = lineTable
      for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
        lineTable[trait] = isResearchKnown(char, craft, line, trait)
      }
    }
  }
}

export function rebuildAll(this: void): undefined {
  for (const [, char] of ipairs(Characters.getCharacters())) {
    rebuildResearched(char)
  }
}
