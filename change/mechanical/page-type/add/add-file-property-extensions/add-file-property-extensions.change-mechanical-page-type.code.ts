import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  editsOver,
  type Page,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { typedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const FILE_PROPERTY = "file-property"

const EXTENSIONS = "extensions"

const AFTER = "definition"

const SLUG = "slug"

export type Asked = {
  readonly under?: string
}

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

function pagesIn(world: World, given: Asked): readonly Page[] | string {
  const listed = filePropertiesIn(world, given.under)
  if (listed.length === 0) return `no page is a \`${FILE_PROPERTY}\``
  const found: Page[] = []
  for (const at of listed) {
    const owner = pageIn(world, at)
    if (owner !== null && owner[EXTENSIONS] !== undefined) continue
    const slug = owner === null ? null : textAt(owner, SLUG)
    if (slug === null) return `\`${at}\` states no slug to name a type`
    const text = world.textOf(at)
    if (text === null) return `\`${at}\` could not be read`
    const named = typedAs(slug)
    const endings = endingsIn(at, text, named)
    if (endings === null) return `\`${at}\` writes \`${named}\` as no run of endings`
    found.push({
      path: at,
      written: [
        { written: "put", key: EXTENSIONS, value: JSON.stringify(endings), after: AFTER } as const,
      ],
    })
  }
  if (found.length === 0) return `every \`${FILE_PROPERTY}\` states its endings already`
  return found
}

export function addFilePropertyExtensions(world: World, given: Asked): Said {
  const held = pagesIn(world, given)
  if (typeof held === "string") return refusing(held)
  const made = editsOver(world, held)
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return addFilePropertyExtensions(world, given)
}
