import type {
  ExpectedMorphableSkill,
  MorphSkillLineProgressMap,
} from "../character-morph-progress-eso/character-morph-progress-eso.module.code.ts"

interface MorphVariantProgress {
  name: string
  rank: number | undefined
}

interface MorphSkillProgress {
  base: MorphVariantProgress
  morph1: MorphVariantProgress
  morph2: MorphVariantProgress
}

function pointsFor(morph: MorphSkillProgress): number {
  return (
    Math.min(morph.base.rank ?? 0, 4) +
    Math.min(morph.morph1.rank ?? 0, 4) +
    Math.min(morph.morph2.rank ?? 0, 4)
  )
}

export interface SkillMorphLineProgressInput {
  expectedSkillsForLine: ReadonlyArray<ExpectedMorphableSkill>
  lineSkills: Record<number, MorphSkillProgress> | undefined
}

export function resolveSkillMorphLineProgress(input: SkillMorphLineProgressInput): {
  current: number
  total: number
} {
  const total = input.expectedSkillsForLine.length * 12

  if (!input.lineSkills) return { current: 0, total }

  const addonLookup = new Map<string, MorphSkillProgress>()
  for (const morphData of Object.values(input.lineSkills)) {
    addonLookup.set(morphData.base.name, morphData)
  }

  let current = 0
  for (const expected of input.expectedSkillsForLine) {
    const morph = addonLookup.get(expected.baseName)
    if (morph !== undefined) current += pointsFor(morph)
  }
  return { current, total }
}

export interface SkillMorphSkillProgressInput {
  expectedSkillsForLine: ReadonlyArray<ExpectedMorphableSkill>
  lineSkills: Record<number, MorphSkillProgress> | undefined
  skillBaseName: string
}

export function resolveSkillMorphSkillProgress(
  input: SkillMorphSkillProgressInput
): { current: number; total: number } | undefined {
  const isExpected = input.expectedSkillsForLine.some((s) => s.baseName === input.skillBaseName)
  if (!isExpected) return undefined

  if (!input.lineSkills) return { current: 0, total: 12 }

  for (const morph of Object.values(input.lineSkills)) {
    if (morph.base.name === input.skillBaseName) {
      return { current: pointsFor(morph), total: 12 }
    }
  }
  return { current: 0, total: 12 }
}

export interface SkillMorphProgressByPathInput {
  esoLineId: number
  skillBaseName?: string
  expectedSkillsForLine: ReadonlyArray<ExpectedMorphableSkill> | undefined
  skillLineProgress: MorphSkillLineProgressMap | null | undefined
}

export function resolveSkillMorphProgressByPath(
  input: SkillMorphProgressByPathInput
): { current: number; total: number } | undefined {
  if (input.expectedSkillsForLine === undefined) return undefined
  const sl = input.skillLineProgress?.[input.esoLineId]

  if (input.skillBaseName !== undefined) {
    return resolveSkillMorphSkillProgress({
      expectedSkillsForLine: input.expectedSkillsForLine,
      lineSkills: sl?.skills,
      skillBaseName: input.skillBaseName,
    })
  }

  if (!sl?.skills) return undefined
  return resolveSkillMorphLineProgress({
    expectedSkillsForLine: input.expectedSkillsForLine,
    lineSkills: sl.skills,
  })
}
