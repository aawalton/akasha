import {
  type FileChange,
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  passagesOf,
  plannedCarrying,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.code.ts"
import { pageIn, typeIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { editsFor } from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { typedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  slugsIn,
  textAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const TYPES = "types"

const HOLDS = "ts"

const PAGE_TYPE = "page-type"

const SLUG = "slug"

const ABOVE = "extends"

const LIST = "a list of another type"

const UNION = "a union of other types"

export type Asked = {
  readonly at: string
}

function restating(held: ts.TypeNode): string | null {
  if (ts.isArrayTypeNode(held)) return LIST
  if (ts.isTypeOperatorNode(held) && held.operator === ts.SyntaxKind.ReadonlyKeyword) return LIST
  if (ts.isUnionTypeNode(held)) return UNION
  return null
}

export type Restated = {
  readonly key: string
  readonly why: string
}

export function restatedIn(source: ts.SourceFile, of: string): Restated | null {
  for (const one of source.statements) {
    if (!ts.isTypeAliasDeclaration(one) || one.name.text !== of) continue
    const found: Restated[] = []
    const walked = (held: ts.Node): undefined => {
      if (ts.isPropertySignature(held) && held.type !== undefined) {
        const why = restating(held.type)
        if (why !== null) found.push({ key: held.name.getText(source), why })
      }
      return ts.forEachChild(held, walked)
    }
    walked(one)
    return found[0] ?? null
  }
  return null
}

export function declaredIn(source: ts.SourceFile, of: string): boolean {
  return source.statements.some(
    (one) =>
      (ts.isTypeAliasDeclaration(one) || ts.isInterfaceDeclaration(one)) && one.name.text === of
  )
}

export type RestatedAt = Restated & {
  readonly at: string
}

export function restatedAbove(world: World, at: string): RestatedAt | null {
  const seen = new Set<string>()
  const left = [at]
  for (let one = left.shift(); one !== undefined; one = left.shift()) {
    if (seen.has(one)) continue
    seen.add(one)
    const owner = pageIn(world, one)
    if (owner === null) continue
    const slug = textAt(owner, SLUG)
    const text = world.textOf(one)
    if (slug !== null && text !== null) {
      const found = restatedIn(parsedAs(one, text), typedAs(slug))
      if (found !== null) return { ...found, at: one }
    }
    for (const above of slugsIn(owner[ABOVE])) {
      const found = world.index.listedAt(PAGE_TYPE, above)[0]
      if (found !== undefined) left.push(found.path)
    }
  }
  return null
}

export function carriedOver(
  world: World,
  at: string,
  to: string,
  of: string
): readonly FileChange[] | string {
  const made = plannedCarrying(world, { from: at, to, of: [of] })
  if ("refused" in made) return made.refused
  return passagesOf(made).map((one) => ({
    kind: "replace",
    path: one.at,
    contentFrom: one.old,
    contentTo: one.new,
  }))
}

export function addPageTypeTypes(world: World, given: Asked): Said {
  const owner = pageIn(world, given.at)
  if (owner === null) return refusing(`\`${given.at}\` names no page`)
  if (typeIn(owner) !== PAGE_TYPE) {
    return refusing(`\`${given.at}\` is no page type, so no type of a page type is written for it`)
  }
  const slug = textAt(owner, SLUG)
  if (slug === null) return refusing(`\`${given.at}\` states no slug`)
  const to = besideAt(given.at, TYPES, HOLDS)
  if (to === null) return refusing(`\`${given.at}\` is no body another file sits beside`)
  const many = restatedAbove(world, given.at)
  if (many !== null) {
    return refusing(
      `\`${many.key}\` is written as ${many.why} in \`${many.at}\`, and a written type names a ` +
        `property's own type, so that property carries that shape before this page type is ` +
        `turned over`
    )
  }
  const stated = editsFor(world, {
    path: given.at,
    written: [{ written: "put", key: TYPES, value: JSON.stringify(HOLDS) }],
  })
  if (typeof stated === "string") return refusing(stated)
  const text = world.textOf(given.at)
  if (text === null || !declaredIn(parsedAs(given.at, text), typedAs(slug))) return stating(stated)
  if (world.textOf(to) === null) {
    return refusing(
      `\`${to}\` holds no body, and a file that is not there yet is made by \`divide-file-code\``
    )
  }
  const carried = carriedOver(world, given.at, to, typedAs(slug))
  if (typeof carried === "string") return refusing(carried)
  return stating([...stated, ...carried])
}

export function runChange(world: World, given: Asked): Said {
  return addPageTypeTypes(world, given)
}
