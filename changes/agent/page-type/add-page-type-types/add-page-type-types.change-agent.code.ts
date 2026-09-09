import { parsedAs } from "@akasha/code/code-source"
import { typedAs } from "@akasha/pages/page-export-name"
import { besideAt } from "@akasha/pages/page-file-name"
import { textAt } from "@akasha/pages/page-value-reading"
import ts from "typescript"
import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const MOVE_CODE_EXPORT = "change-mechanical/move-code-export"

const AT = "at"

const TYPES = "types"

const HOLDS = "ts"

const PAGE_TYPE = "page-type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const SLUG = "slug"

export type AddPageTypeTypesAsked = {
  readonly at: string
}

function listed(held: ts.TypeNode): boolean {
  if (ts.isArrayTypeNode(held)) return true
  return ts.isTypeOperatorNode(held) && held.operator === ts.SyntaxKind.ReadonlyKeyword
}

export function listedIn(source: ts.SourceFile, of: string): string | null {
  for (const one of source.statements) {
    if (!ts.isTypeAliasDeclaration(one) || one.name.text !== of) continue
    const found: string[] = []
    const walked = (held: ts.Node): undefined => {
      if (ts.isPropertySignature(held) && held.type !== undefined && listed(held.type)) {
        found.push(held.name.getText(source))
      }
      return ts.forEachChild(held, walked)
    }
    walked(one)
    return found[0] ?? null
  }
  return null
}

export async function addPageTypeTypes(
  world: World,
  given: AddPageTypeTypesAsked
): Promise<Answer> {
  const owner = pageIn(world, given.at)
  if (owner === null) return refusing(`\`${given.at}\` names no page`)
  if (textAt(owner, PAGE_TYPE_SLUG) !== PAGE_TYPE) {
    return refusing(`\`${given.at}\` is no page type, so no type of a page type is written for it`)
  }
  const slug = textAt(owner, SLUG)
  if (slug === null) return refusing(`\`${given.at}\` states no slug`)
  const to = besideAt(given.at, TYPES, HOLDS)
  if (to === null) return refusing(`\`${given.at}\` is no body another file sits beside`)
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const many = listedIn(parsedAs(given.at, text), typedAs(slug))
  if (many !== null) {
    return refusing(
      `\`${many}\` is written as a list of another type, and a written type names a property's ` +
        `own type, so that property carries its list before this page type is turned over`
    )
  }
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  const stated = await reach(over, ADD_PAGE_PROPERTY, {
    at: given.at,
    key: TYPES,
    value: JSON.stringify(HOLDS),
  })
  if (stated.said.refused !== null) return stated.said
  over = stated.world
  answers.push(stated.said)
  const moved = await reach(over, MOVE_CODE_EXPORT, {
    from: given.at,
    to,
    of: typedAs(slug),
  })
  if (moved.said.refused !== null) return moved.said
  answers.push(moved.said)
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await addPageTypeTypes(world, { at })
}
