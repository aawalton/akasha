import { gathered, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { pageIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"
import { typedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const FILE_PROPERTY = "file-property"

const EXTENSIONS = "extensions"

const AFTER = "definition"

const SLUG = "slug"

const UNDER = "under"

function endingsOf(held: ts.TypeNode): readonly string[] | null {
  const named = ts.isUnionTypeNode(held) ? held.types : [held]
  const found: string[] = []
  for (const one of named) {
    if (!ts.isLiteralTypeNode(one) || !ts.isStringLiteral(one.literal)) return null
    found.push(one.literal.text)
  }
  return found.length === 0 ? null : found
}

function endingsIn(at: string, text: string, named: string): readonly string[] | null {
  for (const one of parsedAs(at, text).statements) {
    if (ts.isTypeAliasDeclaration(one) && one.name.text === named) return endingsOf(one.type)
  }
  return null
}

function filePropertiesIn(world: World, under: string | undefined): readonly string[] {
  const found = new Set<string>()
  for (const kind of world.index.kindsUnder(FILE_PROPERTY)) {
    for (const one of world.index.everyOfType(kind)) {
      if (under === undefined || one.path.startsWith(under)) found.add(one.path)
    }
  }
  return [...found].sort()
}

export type AddFilePropertyExtensionsAsked = {
  readonly under?: string
}

export async function addFilePropertyExtensions(
  world: World,
  given: AddFilePropertyExtensionsAsked
): Promise<Answer> {
  const listed = filePropertiesIn(world, given.under)
  if (listed.length === 0) return refusing(`no page is a \`${FILE_PROPERTY}\``)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  let left = 0
  for (const at of listed) {
    const owner = pageIn(world, at)
    if (owner !== null && owner[EXTENSIONS] !== undefined) continue
    const slug = owner === null ? null : textAt(owner, SLUG)
    if (slug === null) return refusing(`\`${at}\` states no slug to name a type`)
    const text = world.textOf(at)
    if (text === null) return refusing(`\`${at}\` could not be read`)
    const named = typedAs(slug)
    const endings = endingsIn(at, text, named)
    if (endings === null) return refusing(`\`${at}\` writes \`${named}\` as no run of endings`)
    left += 1
    const stated = await reach(over, ADD_PAGE_PROPERTY, {
      after: AFTER,
      at,
      key: EXTENSIONS,
      value: JSON.stringify(endings),
    })
    if (stated.said.refused !== null) {
      return refusing(`\`${at}\` is refused, and ${stated.said.refused}`)
    }
    over = stated.world
    answers.push(stated.said)
  }
  if (left === 0) return refusing(`every \`${FILE_PROPERTY}\` states its endings already`)
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const under = given[UNDER]
  return await addFilePropertyExtensions(world, under === undefined ? {} : { under })
}
