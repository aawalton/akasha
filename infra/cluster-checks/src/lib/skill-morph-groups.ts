export interface SkillCatalogRow {
  readonly key: string
  readonly name: string
  readonly baseName: string
  readonly skillLineId: string
  readonly skillType: string
  readonly esoSkillId: number
  readonly morphIndex: number
  readonly subcategoryId: string
}

export interface BaseLessMorphGroupViolation {
  readonly kind: "BaseLessMorphGroup"
  readonly skillLineId: string
  readonly baseName: string
  readonly morphKeys: readonly string[]
  readonly message: string
}

export function isMorphCandidate(row: SkillCatalogRow): boolean {
  return row.esoSkillId !== 0 && row.skillType !== "passive" && row.subcategoryId !== "scribed"
}

export function countMorphGroups(rows: readonly SkillCatalogRow[]): number {
  const keys = new Set<string>()
  for (const row of rows) {
    if (!isMorphCandidate(row)) continue
    keys.add(`${row.skillLineId}:${row.baseName}`)
  }
  return keys.size
}

export function findBaseLessMorphGroups(
  rows: readonly SkillCatalogRow[]
): readonly BaseLessMorphGroupViolation[] {
  const hasBase = new Map<string, boolean>()
  const morphKeysByGroup = new Map<string, string[]>()
  const meta = new Map<string, { readonly skillLineId: string; readonly baseName: string }>()
  for (const row of rows) {
    if (!isMorphCandidate(row)) {
      continue
    }
    const key = `${row.skillLineId}:${row.baseName}`
    if (!meta.has(key)) {
      meta.set(key, { skillLineId: row.skillLineId, baseName: row.baseName })
      hasBase.set(key, false)
      morphKeysByGroup.set(key, [])
    }
    if (row.morphIndex === 0) {
      hasBase.set(key, true)
    } else if (row.morphIndex === 1 || row.morphIndex === 2) {
      morphKeysByGroup.get(key)?.push(row.key)
    }
  }

  const out: BaseLessMorphGroupViolation[] = []
  for (const [key, m] of meta) {
    const groupMorphKeys = morphKeysByGroup.get(key) ?? []
    if (hasBase.get(key) === true || groupMorphKeys.length === 0) continue
    const morphKeys: readonly string[] = [...groupMorphKeys]
    out.push({
      kind: "BaseLessMorphGroup",
      skillLineId: m.skillLineId,
      baseName: m.baseName,
      morphKeys,
      message: `${m.skillLineId} / "${m.baseName}": morph rows [${morphKeys.join(", ")}] have no morphIndex:0 base row`,
    })
  }

  out.sort((a, b) => {
    if (a.skillLineId !== b.skillLineId) return a.skillLineId < b.skillLineId ? -1 : 1
    if (a.baseName !== b.baseName) return a.baseName < b.baseName ? -1 : 1
    return 0
  })
  return out
}
