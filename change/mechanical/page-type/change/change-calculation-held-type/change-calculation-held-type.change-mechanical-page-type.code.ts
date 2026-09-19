import {
  type FileChange,
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { importedFrom, saidAs } from "akasha/page/modules/body/page-body.module.code.ts"
import {
  nameFaultIn,
  typedAs,
} from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const COMPUTED = "computed-property"

const CODE = "code"

const TYPES = "types"

const HOLDS = "ts"

const SLUG = "slug"

const WORK_FROM =
  /import type \{[^}]*\} from "akasha\/page\/computed-property\/computed-property\.page-type\.ts"/

const WORKED = /export const work: Work<\s*([\w]+)\s*,\s*([^<>]+?)\s*>/d

export type Asked = {
  readonly under?: string
}

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

function editsFor(world: World, at: string): readonly FileChange[] | string | null {
  const owner = pageIn(world, at)
  if (owner === null || owner[CODE] !== HOLDS || owner[TYPES] !== HOLDS) return null
  const slug = textAt(owner, SLUG)
  const code = besideAt(at, CODE, HOLDS)
  const typesAt = besideAt(at, TYPES, HOLDS)
  if (slug === null || code === null || typesAt === null) {
    return `\`${at}\` states no slug to name a type`
  }
  const fault = nameFaultIn(slug)
  if (fault !== null) return `\`${at}\` is refused, and ${fault}`
  const text = world.textOf(code)
  if (text === null) return `\`${code}\` could not be read`
  const worked = workedIn(text)
  if (worked === null) return `\`${code}\` exports no calculation this change reads`
  const named = typedAs(slug)
  if (worked.held === named) return null
  const drawn = WORK_FROM.exec(text)
  if (drawn === null) return `\`${code}\` takes the calculation shape from nowhere`
  return [
    {
      kind: "replace",
      path: code,
      contentFrom: worked.said,
      contentTo: `${worked.said.slice(0, worked.from)}${named}${worked.said.slice(worked.upto)}`,
    },
    {
      kind: "replace",
      path: code,
      contentFrom: drawn[0],
      contentTo: `import type { ${named} } from ${saidAs(importedFrom(typesAt))}\n${drawn[0]}`,
    },
  ]
}

export function changeCalculationHeldType(world: World, given: Asked): Said {
  const listed = calculationsIn(world, given.under)
  if (listed.length === 0) return refusing(`no page is a \`${COMPUTED}\``)
  const edits: FileChange[] = []
  for (const at of listed) {
    const made = editsFor(world, at)
    if (typeof made === "string") return refusing(made)
    if (made !== null) edits.push(...made)
  }
  if (edits.length === 0) return refusing("every calculation names its property's type already")
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return changeCalculationHeldType(world, given)
}
