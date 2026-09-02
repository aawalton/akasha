export interface ApplicableEsoSkillLineInput {
  esoClassId: number
  esoRaceId: number
  classLinesByEsoClassId: ReadonlyMap<number, readonly number[]>
  racialLineByEsoRaceId: ReadonlyMap<number, number>
  baseApplicableEsoLineIds: ReadonlySet<number>
}

export function computeApplicableEsoSkillLineIds(
  input: ApplicableEsoSkillLineInput
): ReadonlySet<number> {
  const result = new Set<number>(input.baseApplicableEsoLineIds)

  const classLines = input.classLinesByEsoClassId.get(input.esoClassId)
  if (classLines !== undefined) {
    for (const esoLineId of classLines) {
      result.add(esoLineId)
    }
  }

  const racialLine = input.racialLineByEsoRaceId.get(input.esoRaceId)
  if (racialLine !== undefined) {
    result.add(racialLine)
  }

  return result
}
