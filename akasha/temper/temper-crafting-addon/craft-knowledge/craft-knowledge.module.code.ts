import * as Characters from "../craft-characters/craft-characters.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const RESEARCH_CRAFTS: number[] = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]

export function isInitialized(this: void): boolean {
  const [firstKey] = next(LibCharacterKnowledge.GetCharacterList())
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
  LibCharacterKnowledge.RegisterForCallback(name, LibCharacterKnowledge.EVENT_INITIALIZED, callback)
}

export function charIdForName(this: void, char: string): string | undefined {
  for (const [, entry] of ipairs(LibCharacterKnowledge.GetCharacterList())) {
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
    LibCharacterKnowledge.GetItemKnowledgeForCharacter(link, undefined, charId) ===
    LibCharacterKnowledge.KNOWLEDGE_KNOWN
  )
}

export function isItemKnownById(this: void, char: string, itemId: number): boolean {
  const charId = charIdForName(char)
  if (charId === undefined) {
    return false
  }
  return (
    LibCharacterKnowledge.GetItemKnowledgeForCharacter(itemId, undefined, charId) ===
    LibCharacterKnowledge.KNOWLEDGE_KNOWN
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
    LibCharacterKnowledge.GetMotifKnowledgeForCharacter(styleId, chapterId, undefined, charId) ===
    LibCharacterKnowledge.KNOWLEDGE_KNOWN
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
  const [, , isKnown] = LibCharacterKnowledge.GetSmithingResearchLineTraitInfoForCharacter(
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
