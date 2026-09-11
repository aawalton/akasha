import { gathered, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { pageIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { typedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const CHANGE_CODE = "change-mechanical-file-content/change-file-content-code"

const COMPUTED = "computed-property"

const CODE = "code"

const TYPES = "types"

const HOLDS = "ts"

const SLUG = "slug"

const UNDER = "under"

const PACKAGE = "akasha/"

const WORK_FROM =
  /import type \{[^}]*\} from "akasha\/pages\/computed-properties\/computed-property\.page-type\.ts"/

const WORKED = /export const work: Work<\s*([\w]+)\s*,\s*([^<>]+?)\s*>/d

type Worked = {
  readonly said: string
  readonly held: string
  readonly from: number
  readonly upto: number
}

function workedIn(text: string): Worked | null {
  const found = WORKED.exec(text)
  if (found === null) return null
  const held = found[2]
  const span = found.indices?.[2]
  if (held === undefined || span === undefined) return null
  return { from: span[0] - found.index, held, said: found[0], upto: span[1] - found.index }
}

function calculationsIn(world: World, under: string | undefined): readonly string[] {
  const found = new Set<string>()
  for (const kind of world.index.kindsUnder(COMPUTED)) {
    for (const one of world.index.everyOfType(kind)) {
      if (under === undefined || one.path.startsWith(under)) found.add(one.path)
    }
  }
  return [...found].sort()
}

export type ChangeCalculationHeldTypeAsked = {
  readonly under?: string
}

export async function changeCalculationHeldType(
  world: World,
  given: ChangeCalculationHeldTypeAsked
): Promise<Answer> {
  const listed = calculationsIn(world, given.under)
  if (listed.length === 0) return refusing(`no page is a \`${COMPUTED}\``)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  let left = 0
  for (const at of listed) {
    const owner = pageIn(world, at)
    if (owner === null || owner[CODE] !== HOLDS || owner[TYPES] !== HOLDS) continue
    const slug = textAt(owner, SLUG)
    const code = besideAt(at, CODE, HOLDS)
    const typesAt = besideAt(at, TYPES, HOLDS)
    if (slug === null || code === null || typesAt === null) {
      return refusing(`\`${at}\` states no slug to name a type`)
    }
    const text = over.textOf(code)
    if (text === null) return refusing(`\`${code}\` could not be read`)
    const worked = workedIn(text)
    if (worked === null) return refusing(`\`${code}\` exports no calculation this change reads`)
    const named = typedAs(slug)
    if (worked.held === named) continue
    left += 1
    const told = await reach(over, CHANGE_CODE, {
      at: code,
      new: `${worked.said.slice(0, worked.from)}${named}${worked.said.slice(worked.upto)}`,
      old: worked.said,
    })
    if (told.said.refused !== null)
      return refusing(`\`${code}\` is refused, and ${told.said.refused}`)
    over = told.world
    answers.push(told.said)
    const drawn = WORK_FROM.exec(text)
    if (drawn === null) return refusing(`\`${code}\` takes the calculation shape from nowhere`)
    const shown = await reach(over, CHANGE_CODE, {
      at: code,
      new: `import type { ${named} } from "${PACKAGE}${typesAt}"\n${drawn[0]}`,
      old: drawn[0],
    })
    if (shown.said.refused !== null)
      return refusing(`\`${code}\` is refused, and ${shown.said.refused}`)
    over = shown.world
    answers.push(shown.said)
  }
  if (left === 0) return refusing(`every calculation names its property's type already`)
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const under = given[UNDER]
  return await changeCalculationHeldType(world, under === undefined ? {} : { under })
}
