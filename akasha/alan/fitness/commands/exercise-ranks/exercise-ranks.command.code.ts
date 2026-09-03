import type { Answer } from "@akasha/command-system/calling"
import { exerciseNamed } from "@akasha/exercise-access/exercise-finding"
import { type Row, rowsFor, titleOf } from "@akasha/exercise-access/exercise-rows"
import type { GoalScores } from "@akasha/exercise-access/movement-scoring"
import { movementFeaturesIn, scoreMovement } from "@akasha/exercise-access/movement-scoring"
import type { GoalWeights } from "@akasha/exercise-access/selection-policy"
import { readSelectionPolicy } from "@akasha/exercise-access/selection-policy"
import {
  asJson,
  countIn,
  DATA,
  JSON_SAID,
  refusedBy,
  told,
  wantsJson,
  wordsIn,
} from "../exercise-saying/exercise-saying.module.code.ts"

const EXERCISES = "--exercises"

const LIMIT = "--limit"

const SHAPE = { valued: [EXERCISES, LIMIT], switches: [JSON_SAID] }

const DEFAULT_LIMIT = 15

const CATALOG_READ_LIMIT = 2000

const EXERCISE = "exercise"

const SELECT_FIELDS = [
  "id",
  "slug",
  "title",
  "exerciseCategory",
  "mechanic",
  "primaryMuscles",
  "secondaryMuscles",
  "movementPattern",
  "secondaryPattern",
  "laterality",
  "isBallistic",
  "skillCost",
  "trainsLengthenedRange",
  "gripDemand",
  "sfrScore",
]

export type RankedMovement = {
  readonly id: string
  readonly name: string
  readonly scores: GoalScores
}

export function refsIn(csv: string): readonly string[] {
  return csv
    .split(",")
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

export function rankedBy(rows: readonly Row[], weights: GoalWeights): readonly RankedMovement[] {
  return rows
    .map((row) => ({
      id: row.id,
      name: titleOf(row),
      scores: scoreMovement(movementFeaturesIn(row), weights),
    }))
    .sort((a, b) => b.scores.blend - a.scores.blend)
}

const PLACES = 3

const GOAL_PLACES = 2

export function rowOf(one: RankedMovement, at: number): string {
  const s = one.scores
  return (
    `${at + 1}\t${s.blend.toFixed(PLACES)}\t${s.longevity.toFixed(GOAL_PLACES)}` +
    `\t${s.energy.toFixed(GOAL_PLACES)}\t${s.functionality.toFixed(GOAL_PLACES)}` +
    `\t${s.aesthetics.toFixed(GOAL_PLACES)}\t${one.name}`
  )
}

async function namedRows(
  refs: readonly string[]
): Promise<{ readonly rows: readonly Row[] } | { readonly refused: readonly string[] }> {
  const rows: Row[] = []
  const refusals: string[] = []
  for (const ref of refs) {
    const found = await exerciseNamed(ref)
    if ("refused" in found) refusals.push(found.refused)
    else rows.push(found.row)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { rows }
}

export async function exerciseRanks(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const limit = countIn(said, LIMIT, DEFAULT_LIMIT)
  if (typeof limit === "object") return refusedBy(limit.refused)
  const csv = said.named[EXERCISES]
  const refs = csv === undefined ? null : refsIn(csv)
  if (refs !== null && refs.length === 0) {
    return refusedBy([`\`${EXERCISES}\` names no movement, so there is nothing to rank`])
  }

  try {
    const weights = readSelectionPolicy().weights
    const found =
      refs !== null
        ? await namedRows(refs)
        : await rowsFor({
            pageTypeSlug: EXERCISE,
            select: SELECT_FIELDS,
            limit: CATALOG_READ_LIMIT,
          })
    if ("refused" in found) return refusedBy(found.refused, DATA)
    if ("unread" in found) return refusedBy([found.unread], DATA)
    const ranked = rankedBy(found.rows, weights)
    const shown = refs !== null ? ranked : ranked.slice(0, limit)

    if (wantsJson(said)) return asJson({ weights, movements: shown })
    return told([
      `weights\tL ${weights.longevity} / E ${weights.energy} / F ${weights.functionality} / A ${weights.aesthetics}`,
      "#\tblend\tL\tE\tF\tA\tmovement",
      ...shown.map(rowOf),
    ])
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
