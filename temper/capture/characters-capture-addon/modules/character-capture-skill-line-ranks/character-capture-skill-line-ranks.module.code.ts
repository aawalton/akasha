import {
  morphableSkillsDetailPerLine,
  playerSkillLines,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-line-map/character-capture-skill-line-map.module.code.ts"

type ByLine = { [esoSkillLineId: number]: number | undefined }

let maxRanks: ByLine | undefined

let morphableCounts: ByLine | undefined

let displayOrders: ByLine | undefined

export function skillLineMaxRanks(): ByLine {
  if (maxRanks !== undefined) return maxRanks
  const found: ByLine = {}
  for (const line of playerSkillLines()) {
    if (line.maxRank > 0) found[line.esoSkillLineId] = line.maxRank
  }
  maxRanks = found
  return found
}

function morphableCountsOf(this: void): ByLine {
  const details = morphableSkillsDetailPerLine()
  const found: ByLine = {}
  for (const line of playerSkillLines()) {
    const held = details[line.esoSkillLineId]
    if (held !== undefined && held.length > 0) found[line.esoSkillLineId] = held.length
  }
  return found
}

export function morphableSkillsPerLine(): ByLine {
  morphableCounts ??= morphableCountsOf()
  return morphableCounts
}

export function skillLineDisplayOrders(): ByLine {
  if (displayOrders !== undefined) return displayOrders
  const counted = morphableSkillsPerLine()
  const found: ByLine = {}
  for (const line of playerSkillLines()) {
    if (counted[line.esoSkillLineId] !== undefined) {
      found[line.esoSkillLineId] = line.displayOrder
    }
  }
  displayOrders = found
  return found
}
