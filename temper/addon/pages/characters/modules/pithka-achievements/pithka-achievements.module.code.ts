import { TRIFECTA_DUNGEON_ROWS } from "akasha/temper/addon/pages/characters/modules/pithka-achievement-dungeons/pithka-achievement-dungeons.module.code.ts"
import { STARTER_DUNGEON_ROWS } from "akasha/temper/addon/pages/characters/modules/pithka-achievement-starter-dungeons/pithka-achievement-starter-dungeons.module.code.ts"
import { TRIAL_ROWS } from "akasha/temper/addon/pages/characters/modules/pithka-achievement-trials/pithka-achievement-trials.module.code.ts"

export type AchievementRow = {
  readonly NAME: string
  readonly ABBV: string
  readonly TYPE: string
  readonly VET?: number
  readonly PHM1?: number
  readonly PHM1NAME?: string
  readonly PHM2?: number
  readonly PHM2NAME?: string
  readonly HM?: number
  readonly HMNAME?: string
  readonly CHA?: number
  readonly SR?: number
  readonly ND?: number
  readonly TRI?: number
  readonly TRINAME?: string
  readonly EXT?: number
  readonly EXTNAME?: string
  readonly DLC?: boolean
  readonly LBINDEX?: number
  readonly IAINDEX?: number
  readonly portID?: number
  readonly vQueue?: number
  readonly nQueue?: number
  readonly SCORED?: boolean
}

export type AchievementColumn = keyof AchievementRow

export const ACHIEVEMENT_ROWS: readonly AchievementRow[] = [
  ...TRIAL_ROWS,
  ...TRIFECTA_DUNGEON_ROWS,
  ...STARTER_DUNGEON_ROWS,
]

export function filterAchievements(this: void, filter: Partial<AchievementRow>): AchievementRow[] {
  const found: AchievementRow[] = []
  for (const row of ACHIEVEMENT_ROWS) {
    let match = true
    for (const key in filter) {
      const column = key as AchievementColumn
      if (row[column] !== filter[column]) {
        match = false
        break
      }
    }
    if (match) found.push(row)
  }
  return found
}

export function projectColumns(
  this: void,
  rows: readonly AchievementRow[],
  columns: readonly AchievementColumn[]
): Partial<AchievementRow>[] {
  return rows.map((row) => {
    const projected: Record<string, unknown> = {}
    for (const column of columns) projected[column] = row[column]
    return projected as Partial<AchievementRow>
  })
}

export function soleValue<K extends AchievementColumn>(
  this: void,
  filter: Partial<AchievementRow>,
  column: K
): AchievementRow[K] | undefined {
  const rows = filterAchievements(filter)
  if (rows.length !== 1) return undefined
  return rows[0]?.[column]
}
