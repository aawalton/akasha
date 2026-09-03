import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import {
  type CustomExerciseInput,
  deriveCustomExerciseFeatures,
} from "@akasha/exercise-access/custom-exercise-features"
import {
  chosenIn,
  chosenManyIn,
  countIn,
  decimalIn,
  optionId,
} from "@akasha/exercise-access/exercise-choosing"
import {
  CATEGORY_OPTIONS,
  EQUIPMENT_OPTIONS,
  FORCE_OPTIONS,
  LEVEL_OPTIONS,
  MECHANIC_OPTIONS,
  MUSCLE_OPTIONS,
} from "@akasha/exercise-access/exercise-vocabulary"
import { selectionFeatureProps } from "@akasha/exercise-access/selection-features"
import type { Value } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import { firstOf, JSON_SAID, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const EXERCISE = "exercise"

const ALANS_OWN = "aelwyn-custom"

const TITLE = "--title"

const SLUG = "--slug"

const CATEGORY = "--category"

const EQUIPMENT = "--equipment"

const FORCE = "--force"

const LEVEL = "--level"

const MECHANIC = "--mechanic"

const PRIMARY_MUSCLES = "--primary-muscles"

const SECONDARY_MUSCLES = "--secondary-muscles"

const LOAD_FACTOR = "--load-factor"

const IMPLEMENT_COUNT = "--implement-count"

const NO_LOAD = 0

const ONE_IMPLEMENT = 1

const NOTHING = "-"

export async function exerciseAdd(argv: readonly string[], given: Given): Promise<Answer> {
  const reading = saidIn(
    argv,
    [
      TITLE,
      SLUG,
      CATEGORY,
      EQUIPMENT,
      FORCE,
      LEVEL,
      MECHANIC,
      PRIMARY_MUSCLES,
      SECONDARY_MUSCLES,
      LOAD_FACTOR,
      IMPLEMENT_COUNT,
    ],
    [JSON_SAID],
    1
  )
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const title = firstOf(said, TITLE)
  if (title === undefined) {
    return refused(`\`${TITLE}\` names the movement, and this call names none`, INPUT)
  }
  const slug = said.held.get(SLUG) ?? optionId(title)

  const one = (
    flag: string,
    labels: readonly string[]
  ): string | { readonly refused: string } | undefined => {
    const value = said.held.get(flag)
    if (value === undefined) return undefined
    const chosen = chosenIn(flag, value, labels)
    return "refused" in chosen ? chosen : chosen.chosen
  }
  const many = (
    flag: string,
    labels: readonly string[]
  ): readonly string[] | { readonly refused: string } | undefined => {
    const value = said.held.get(flag)
    if (value === undefined) return undefined
    const chosen = chosenManyIn(flag, value, labels)
    return "refused" in chosen ? chosen : chosen.chosen
  }

  const category = one(CATEGORY, CATEGORY_OPTIONS)
  if (typeof category === "object" && category !== null && "refused" in category) {
    return refused(category.refused, INPUT)
  }
  const equipment = one(EQUIPMENT, EQUIPMENT_OPTIONS)
  if (typeof equipment === "object" && equipment !== null && "refused" in equipment) {
    return refused(equipment.refused, INPUT)
  }
  const force = one(FORCE, FORCE_OPTIONS)
  if (typeof force === "object" && force !== null && "refused" in force) {
    return refused(force.refused, INPUT)
  }
  const level = one(LEVEL, LEVEL_OPTIONS)
  if (typeof level === "object" && level !== null && "refused" in level) {
    return refused(level.refused, INPUT)
  }
  const mechanic = one(MECHANIC, MECHANIC_OPTIONS)
  if (typeof mechanic === "object" && mechanic !== null && "refused" in mechanic) {
    return refused(mechanic.refused, INPUT)
  }
  const primary = many(PRIMARY_MUSCLES, MUSCLE_OPTIONS)
  if (primary !== undefined && !Array.isArray(primary)) return refused(primary.refused, INPUT)
  const secondary = many(SECONDARY_MUSCLES, MUSCLE_OPTIONS)
  if (secondary !== undefined && !Array.isArray(secondary)) return refused(secondary.refused, INPUT)

  const loadFactor = decimalIn(LOAD_FACTOR, said.held.get(LOAD_FACTOR))
  if ("refused" in loadFactor) return refused(loadFactor.refused, INPUT)
  const implementCount = countIn(IMPLEMENT_COUNT, said.held.get(IMPLEMENT_COUNT))
  if ("refused" in implementCount) return refused(implementCount.refused, INPUT)

  const classified: CustomExerciseInput = {
    title,
    ...(typeof category === "string" ? { category } : {}),
    ...(typeof equipment === "string" ? { equipment } : {}),
    ...(typeof force === "string" ? { force } : {}),
    ...(typeof level === "string" ? { level } : {}),
    ...(typeof mechanic === "string" ? { mechanic } : {}),
    ...(Array.isArray(primary) ? { primaryMuscles: primary } : {}),
    ...(Array.isArray(secondary) ? { secondaryMuscles: secondary } : {}),
  }

  const values: Value = {
    title,
    exerciseSource: ALANS_OWN,
    loadFactor: loadFactor.number ?? NO_LOAD,
    implementCount: implementCount.number ?? ONE_IMPLEMENT,
    ...(typeof category === "string" ? { exerciseCategory: category } : {}),
    ...(typeof equipment === "string" ? { equipment } : {}),
    ...(typeof force === "string" ? { force } : {}),
    ...(typeof level === "string" ? { exerciseLevel: level } : {}),
    ...(typeof mechanic === "string" ? { mechanic } : {}),
    ...(Array.isArray(primary) ? { primaryMuscles: [...primary] } : {}),
    ...(Array.isArray(secondary) ? { secondaryMuscles: [...secondary] } : {}),
    ...selectionFeatureProps(deriveCustomExerciseFeatures(classified)),
  }

  const composed = composedFor(given.root, { pageTypeSlug: EXERCISE, slug, values })
  if ("refused" in composed) return refused(composed.refused, DATA)

  const changes: FileEdit[] = [
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  const answer = landingAsked(given, {
    changes,
    message: `add the movement ${slug}`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (answer.code !== 0) return answer

  const json = said.bare.has(JSON_SAID)
  const told = json
    ? JSON.stringify({
        path: composed.put.path,
        title,
        slug,
        source: ALANS_OWN,
        category: typeof category === "string" ? category : null,
        loadFactor: values.loadFactor,
        implementCount: values.implementCount,
      })
    : `path\t${composed.put.path}\ntitle\t${title}\nslug\t${slug}\ncategory\t${typeof category === "string" ? category : NOTHING}`
  return { report: json ? [told] : [told, ...answer.report], refusals: [], code: 0 }
}
