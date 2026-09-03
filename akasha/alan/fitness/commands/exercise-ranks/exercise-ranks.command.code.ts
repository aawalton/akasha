import type { Answer } from "@akasha/command-system/calling"
import { readSelectionPolicy } from "@akasha/exercise-access/selection-policy"
import { displayTitle } from "@collections/exercises/cli/fields"
import { resolveExercise } from "@collections/exercises/cli/resolve"
import { getPages } from "@collections/exercises/pages/access"
import type { Page } from "@collections/exercises/pages/page"
import { movementFeaturesFromPage } from "@collections/exercises/selection/movement-features"
import type { GoalScores, GoalWeights } from "@collections/exercises/selection/scorer"
import { scoreMovement } from "@collections/exercises/selection/scorer"
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

export function rankedBy(pages: readonly Page[], weights: GoalWeights): readonly RankedMovement[] {
  return pages
    .map((page) => ({
      id: page.id,
      name: displayTitle(page),
      scores: scoreMovement(movementFeaturesFromPage(page), weights),
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
    const pages =
      refs !== null
        ? await Promise.all(refs.map((ref) => resolveExercise(ref)))
        : (
            await getPages({
              pageTypeSlug: "exercise",
              select: SELECT_FIELDS,
              limit: CATALOG_READ_LIMIT,
            })
          ).rows
    const ranked = rankedBy(pages, weights)
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
