import { splicedIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Splice,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  without,
  withProperty,
} from "akasha/changes/modules/literal-splicing/literal-splicing.module.code.ts"
import { keyOf, literalIn } from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

export type Written =
  | {
      readonly written: "put"
      readonly key: string
      readonly value: string
      readonly after?: string
      readonly insteadOf?: string
    }
  | { readonly written: "dropped"; readonly key: string }

export type Page = {
  readonly path: string
  readonly written: readonly Written[]
}

export function placeOf(owner: ts.ObjectLiteralExpression, key: string): number {
  return owner.properties.findIndex((one) => ts.isPropertyAssignment(one) && keyOf(one) === key)
}

function putIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  one: Written & { readonly written: "put" }
): Splice | string {
  const put = `${one.key}: ${one.value}`
  if (one.insteadOf === undefined) return withProperty(text, source, owner, put, one.after)
  const was = owner.properties[placeOf(owner, one.insteadOf)]
  if (was === undefined) return `\`${one.insteadOf}\` is stated nowhere, so \`${put}\` has no place`
  return { from: was.getStart(source), to: was.getEnd(), put }
}

export function splicesIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  written: readonly Written[]
): readonly Splice[] | string {
  const found: Splice[] = []
  for (const one of written) {
    const held = placeOf(owner, one.key)
    if (one.written === "dropped") {
      if (held >= 0) found.push(without(text, source, owner, owner.properties, held))
      continue
    }
    if (held >= 0) return `\`${one.key}\` is stated already, so \`${one.value}\` is a restatement`
    const made = putIn(text, source, owner, one)
    if (typeof made === "string") return made
    found.push(made)
  }
  return found
}

export function editsFor(world: World, one: Page): readonly FileChange[] | string {
  const text = world.textOf(one.path)
  if (text === null) return `\`${one.path}\` could not be read`
  const source = parsedAs(one.path, text)
  const owner = literalIn(source)
  if (owner === null) return `\`${one.path}\` exports no object`
  const spots = splicesIn(text, source, owner, one.written)
  if (typeof spots === "string") return `\`${one.path}\` is refused, and ${spots}`
  return splicedIn(one.path, text, spots)
}

export function editsOver(world: World, pages: readonly Page[]): readonly FileChange[] | string {
  const found: FileChange[] = []
  for (const one of pages) {
    const made = editsFor(world, one)
    if (typeof made === "string") return made
    found.push(...made)
  }
  return found
}
