import { skills } from "@akasha/temper-character-skills/character-skills"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"

export interface MorphableSkillInfo {
  baseName: string
  morph1Name: string
  morph2Name: string
  skillType: "active" | "ultimate"
  lineRankNeeded: number
}

export const morphableSkillLineIds: ReadonlySet<SkillLineId> = (() => {
  const ids = new Set<SkillLineId>()
  for (const skill of skills.list) {
    if (
      skill.esoSkillId !== 0 &&
      skill.skillType !== "passive" &&
      skill.subcategoryId !== "scribed"
    ) {
      ids.add(skill.skillLineId)
    }
  }
  return ids
})()

export const morphableSkillsByLine: ReadonlyMap<SkillLineId, MorphableSkillInfo[]> = (() => {
  const groups = new Map<
    string,
    {
      skillLineId: SkillLineId
      baseName: string
      morph1Name: string
      morph2Name: string
      skillType: "active" | "ultimate"
      lineRankNeeded: number
      hasBase: boolean
    }
  >()
  for (const skill of skills.list) {
    if (
      skill.esoSkillId === 0 ||
      skill.skillType === "passive" ||
      skill.subcategoryId === "scribed"
    )
      continue
    const key = `${skill.skillLineId}:${skill.baseName}`
    let group = groups.get(key)
    if (!group) {
      group = {
        skillLineId: skill.skillLineId,
        baseName: skill.baseName,
        morph1Name: "",
        morph2Name: "",
        skillType: skill.skillType === "ultimate" ? "ultimate" : "active",
        lineRankNeeded: 0,
        hasBase: false,
      }
      groups.set(key, group)
    }
    if (skill.morphIndex === 0) {
      group.hasBase = true
    } else if (skill.morphIndex === 1) {
      group.morph1Name = skill.name
      group.lineRankNeeded = skill.lineRankNeeded
    } else if (skill.morphIndex === 2) {
      group.morph2Name = skill.name
    }
  }

  const result = new Map<SkillLineId, { info: MorphableSkillInfo; lineRankNeeded: number }[]>()
  for (const group of groups.values()) {
    if (!group.hasBase) continue
    let line = result.get(group.skillLineId)
    if (!line) {
      line = []
      result.set(group.skillLineId, line)
    }
    line.push({
      info: {
        baseName: group.baseName,
        morph1Name: group.morph1Name,
        morph2Name: group.morph2Name,
        skillType: group.skillType,
        lineRankNeeded: group.lineRankNeeded,
      },
      lineRankNeeded: group.lineRankNeeded,
    })
  }

  const sorted = new Map<SkillLineId, MorphableSkillInfo[]>()
  for (const [slId, entries] of result) {
    entries.sort((a, b) => a.lineRankNeeded - b.lineRankNeeded)
    sorted.set(
      slId,
      entries.map((e) => e.info)
    )
  }
  return sorted
})()
