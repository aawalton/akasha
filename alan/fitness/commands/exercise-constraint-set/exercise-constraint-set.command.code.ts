import { landingAsked, mistaking, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { chosenIn, chosenManyIn, countIn } from "@akasha/exercise-access/exercise-choosing"
import {
  CONSTRAINT_FOCUS_OPTIONS,
  CONSTRAINT_KIND_OPTIONS,
} from "@akasha/exercise-access/exercise-vocabulary"
import { listedAt } from "@akasha/indexes"
import { pageStem } from "@akasha/named-for/page-stem"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import { firstOf, JSON_SAID, proseIn, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const COACHING_CONSTRAINT = "coaching-constraint"

const TITLE = "--title"

const BODY = "--body"

const KIND = "--kind"

const FOCUS = "--focus"

const INACTIVE = "--inactive"

const SORT_ORDER = "--sort-order"

const ASKS = "asks"

const TXT = "txt"

const NOTHING = "-"

export async function exerciseConstraintSet(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const reading = saidIn(
    argv,
    [TITLE, `${TITLE}-file`, BODY, `${BODY}-file`, KIND, FOCUS, SORT_ORDER],
    [INACTIVE, JSON_SAID],
    1
  )
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const titled = proseIn(said, TITLE)
  if ("refused" in titled) return refused(titled.refused, INPUT)
  const title = titled.text ?? firstOf(said, TITLE)
  if (title === undefined) {
    return refused(`\`${TITLE}\` carries the headline, and this call gives none`, INPUT)
  }

  const values: Value = { title }

  const kindSaid = said.held.get(KIND)
  if (kindSaid !== undefined) {
    const chosen = chosenIn(KIND, kindSaid, CONSTRAINT_KIND_OPTIONS)
    if ("refused" in chosen) return refused(chosen.refused, INPUT)
    values.coachingConstraintKind = chosen.chosen
  }
  const focusSaid = said.held.get(FOCUS)
  if (focusSaid !== undefined) {
    const chosen = chosenManyIn(FOCUS, focusSaid, CONSTRAINT_FOCUS_OPTIONS)
    if ("refused" in chosen) return refused(chosen.refused, INPUT)
    values.focusTags = [...chosen.chosen]
  }
  const order = countIn(SORT_ORDER, said.held.get(SORT_ORDER))
  if ("refused" in order) return refused(order.refused, INPUT)
  if (order.number !== undefined) values.coachingConstraintSortOrder = order.number

  const body = proseIn(said, BODY)
  if ("refused" in body) return refused(body.refused, INPUT)
  if (body.text !== undefined) values[ASKS] = TXT

  const slug = pageStem(title)
  const listed = listedAt(given.root, COACHING_CONSTRAINT, slug)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  const was = at === undefined ? null : valueAt(at, given.root)
  if (at !== undefined && was === null) {
    return refused(`${at} would not load, so what it holds is unknown`, DATA)
  }
  const inactive = said.bare.has(INACTIVE)
  const active = inactive ? false : ((was?.coachingConstraintActive as boolean | undefined) ?? true)

  const composed = composedFor(given.root, {
    pageTypeSlug: COACHING_CONSTRAINT,
    slug,
    values: { ...(was ?? {}), ...values, coachingConstraintActive: active },
  })
  if ("refused" in composed) return refused(composed.refused, DATA)

  const changes: FileEdit[] = [
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  if (body.text !== undefined) {
    const beside = besideAt(composed.put.path, ASKS, TXT)
    if (beside === null) {
      return mistaking([`no \`${ASKS}\` file can sit beside a name like ${composed.put.path}`])
    }
    changes.push({ path: beside, body: new TextEncoder().encode(body.text) })
  }

  const answer = landingAsked(given, {
    changes,
    message: `record the coaching constraint ${slug}`,
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
        kind: values.coachingConstraintKind ?? null,
        focusTags: values.focusTags ?? [],
        active,
      })
    : `path\t${composed.put.path}\ntitle\t${title}\nkind\t${values.coachingConstraintKind ?? NOTHING}`
  return { report: json ? [told] : [told, ...answer.report], refusals: [], code: 0 }
}
