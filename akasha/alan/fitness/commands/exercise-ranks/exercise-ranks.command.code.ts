import type { Answer } from "@akasha/command-system/calling"
import { exerciseNamed } from "@akasha/exercise-access/exercise-finding"
import {
  boolIn,
  numberIn,
  type Row,
  rowsFor,
  textIn,
  textsIn,
  titleOf,
} from "@akasha/exercise-access/exercise-rows"
import type { GoalWeights } from "@akasha/exercise-access/selection-policy"
import { readSelectionPolicy } from "@akasha/exercise-access/selection-policy"
import type { GoalScores, MovementFeatures } from "@akasha/session-planning/movement-scoring"
import { scoreMovement } from "@akasha/session-planning/movement-scoring"
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

const DEFAULT_PATTERN = "isolation-other"

const DEFAULT_LATERALITY = "bilateral"

const DEFAULT_SKILL_COST = "moderate"

const DEFAULT_GRIP_DEMAND = "none"

const DEFAULT_CATEGORY = "strength"

const SELECT_FIELDS = [
  "id",
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

/**
 * A movement's scoring features, read off a page row.
 *
 * The row carries the page file's own humped names, so `exerciseCategory` is what the category is
 * asked for here rather than the bare `category` the markdown reader asked for. Asking the bare
 * name answers nothing and every category-sensitive score would silently read as zero.
 */
export function featuresOf(row: Row): MovementFeatures {
  return {
    movementPattern: (textIn(row, "movementPattern") ??
      DEFAULT_PATTERN) as MovementFeatures["movementPattern"],
    secondaryPattern: textIn(row, "secondaryPattern") as MovementFeatures["secondaryPattern"],
    laterality: (textIn(row, "laterality") ?? DEFAULT_LATERALITY) as MovementFeatures["laterality"],
    isBallistic: boolIn(row, "isBallistic") ?? false,
    skillCost: (textIn(row, "skillCost") ?? DEFAULT_SKILL_COST) as MovementFeatures["skillCost"],
    trainsLengthenedRange: boolIn(row, "trainsLengthenedRange") ?? false,
    gripDemand: (textIn(row, "gripDemand") ??
      DEFAULT_GRIP_DEMAND) as MovementFeatures["gripDemand"],
    sfrScore: numberIn(row, "sfrScore") ?? 0,
    exerciseCategory: (textIn(row, "exerciseCategory") ??
      DEFAULT_CATEGORY) as MovementFeatures["exerciseCategory"],
    mechanic: textIn(row, "mechanic") as MovementFeatures["mechanic"],
    primaryMuscles: textsIn(row, "primaryMuscles") as MovementFeatures["primaryMuscles"],
    secondaryMuscles: textsIn(row, "secondaryMuscles") as MovementFeatures["secondaryMuscles"],
  }
}

export function rankedBy(rows: readonly Row[], weights: GoalWeights): readonly RankedMovement[] {
  return rows
    .map((row) => ({
      id: row.id,
      name: titleOf(row),
      scores: scoreMovement(featuresOf(row), weights),
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
): Promise<{ readonly rows: readonly Row[] } | { readonly refused: string }> {
  const found: Row[] = []
  for (const ref of refs) {
    const one = await exerciseNamed(ref)
    if ("refused" in one) return { refused: one.refused }
    found.push(one.row)
  }
  return { rows: found }
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

  let weights: GoalWeights
  try {
    weights = readSelectionPolicy().weights
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }

  const read =
    refs !== null
      ? await namedRows(refs)
      : await rowsFor({
          pageTypeSlug: EXERCISE,
          select: SELECT_FIELDS,
          limit: CATALOG_READ_LIMIT,
        })
  if ("refused" in read) return refusedBy([read.refused], DATA)
  if ("unread" in read) return refusedBy([read.unread], DATA)

  const ranked = rankedBy(read.rows, weights)
  const shown = refs !== null ? ranked : ranked.slice(0, limit)

  if (wantsJson(said)) return asJson({ weights, movements: shown })
  return told([
    `weights\tL ${weights.longevity} / E ${weights.energy} / F ${weights.functionality} / A ${weights.aesthetics}`,
    "#\tblend\tL\tE\tF\tA\tmovement",
    ...shown.map(rowOf),
  ])
}
