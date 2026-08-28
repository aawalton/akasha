import { listField, textField } from "../frontmatter.ts"
import { slugNamed } from "../page-address.ts"
import { computedOn } from "./computed.ts"
import { DEFINED_ON, PROPERTY_GLOBS, PROPERTY_KINDS } from "../page-types.ts"
import { blockOf, stringAt } from "../text/text.ts"
import { pageStemOf } from "../name/name.ts"
import { TYPE } from "./value.ts"
import { SLUG_PROPERTY, VALUES } from "./stated.ts"
import type { Held, Stated } from "./stated.ts"
import type { Property } from "./property.ts"
import type { FileTree } from "../file-tree.ts"
import { shapeMarkOf } from "../shape/mark.ts"
import { answeredWhole } from "./answer-cache.ts"
import { indexedPaths, indexStamp } from "./registry.ts"

export const PROPERTY_KEY = "key"

export const DEFAULT = "default"

const ROWS = "rows"

const TARGET = "target-slug"

const MAY_BE_GONE = "may-be-gone"

const SLUG = "slug"

const FROM = "from"

const BACK = "back-from"

const EXPRESSION = "expression"

const RELATION = "relation"

const REDUCTION = "function"

const OVER = "target"

export interface Declarations {
  readonly bySlug: ReadonlyMap<string, readonly Property[]>
  readonly fault: string | null
}

interface DeclarationsData {
  readonly bySlug: readonly (readonly [string, readonly Property[]])[]
  readonly fault: string | null
}

const asDeclarationsData = (one: Declarations): DeclarationsData => ({
  bySlug: [...one.bySlug],
  fault: one.fault,
})

const fromDeclarationsData = (one: DeclarationsData): Declarations => ({
  bySlug: new Map(one.bySlug),
  fault: one.fault,
})

const anyDeclared = (one: Declarations): boolean => one.bySlug.size > 0

function heldDeclarations(tree: FileTree): Declarations {
  const shape = shapeMarkOf(tree)
  const mark = shape === null ? null : `${shape}-${indexStamp()}`
  const root = tree.root
  const make = (): Declarations => readDeclarations(tree)
  if (mark === null || root === undefined) return make()
  return answeredWhole(
    root,
    mark,
    "declarations",
    make,
    asDeclarationsData,
    fromDeclarationsData,
    anyDeclared
  )
}

const declarations = new WeakMap<FileTree, Declarations>()

export function declarationsOf(tree: FileTree): Declarations {
  const held = declarations.get(tree)
  if (held !== undefined) return held
  const made = heldDeclarations(tree)
  declarations.set(tree, made)
  return made
}

const fromFiles = new WeakMap<FileTree, Declarations>()

export function declarationsFromFiles(tree: FileTree): Declarations {
  const held = fromFiles.get(tree)
  if (held !== undefined) return held
  const made = readDeclarations(tree)
  fromFiles.set(tree, made)
  return made
}

type Declared = { readonly on: string; readonly one: Property } | { readonly fault: string }

function declaredIn(relPath: string, text: string): Declared | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return { fault: `\`${relPath}\` — ${why}` }
  const named = stringAt(fm, DEFINED_ON)
  if (named === null) return null
  const on = slugNamed(named)
  const stated = stringAt(fm, TYPE)
  return {
    on,
    one: {
      name: stringAt(fm, PROPERTY_KEY) ?? pageStemOf(relPath),
      slug: stringAt(fm, SLUG) ?? pageStemOf(relPath),
      at: relPath,
      on,
      type: stated ?? "",
      from: listField(fm, FROM),
      back: stringAt(fm, BACK),
      expression: textField(fm, EXPRESSION),
      relation: stringAt(fm, RELATION),
      reduction: stringAt(fm, REDUCTION),
      over: stringAt(fm, OVER),
      required: stringAt(fm, "required") === "true",
      secret: stringAt(fm, "secret") === "true",
      attachment: stringAt(fm, "attachment"),
      default: (fm.fields.get(DEFAULT) as Held | undefined) ?? null,
      computed: computedOn(fm),
      blank: stringAt(fm, "blank") === "true",
      oneOf: stringAt(fm, "one-of"),
      rows: stringAt(fm, ROWS),
      uncommitted: stringAt(fm, "uncommitted") === "true",
      target: stringAt(fm, TARGET),
      mayBeGone: stringAt(fm, MAY_BE_GONE) === "true",
      narrowsSlug: stringAt(fm, "narrows-slug"),
      slugProperty: stringAt(fm, SLUG_PROPERTY),
      stated: {
        pattern: stringAt(fm, "pattern"),
        backstop: stringAt(fm, "backstop"),
        values: (fm.fields.get(VALUES) as Held | undefined) ?? null,
        max: stringAt(fm, "max"),
      },
    },
  }
}

function declaredOver(tree: FileTree): ReadonlyMap<string, Declared> {
  const composed = tree.root === undefined || (tree.pending?.size ?? 0) > 0
  const made = new Map<string, Declared>()
  for (const relPath of indexedPaths(tree, PROPERTY_KINDS, PROPERTY_GLOBS)) {
    const text = tree.open(relPath)
    if (text === null) {
      if (composed) made.set(relPath, { fault: `\`${relPath}\` is not in the repo this call would produce` })
      continue
    }
    const said = declaredIn(relPath, text)
    if (said !== null) made.set(relPath, said)
  }
  return made
}

function readDeclarations(tree: FileTree): Declarations {
  const bySlug = new Map<string, Property[]>()
  let fault: string | null = null
  for (const said of declaredOver(tree).values()) {
    if ("fault" in said) {
      fault ??= said.fault
      continue
    }
    const standing = bySlug.get(said.on) ?? []
    standing.push(said.one)
    bySlug.set(said.on, standing)
  }
  return { bySlug, fault }
}
