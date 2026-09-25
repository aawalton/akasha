import type { Splice } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  without,
  withProperty,
} from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import { literalIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { placeOf } from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { bodyOf, type Rendering, saidAs } from "akasha/page/modules/body/page-body.module.code.ts"
import { bodyAt, valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

type Editing = {
  readonly path: string
  readonly text: string
  readonly was: Value
  readonly rendering: Rendering
}

type Step =
  | { readonly step: "gone"; readonly key: string }
  | { readonly step: "said"; readonly key: string; readonly value: unknown }
  | {
      readonly step: "put"
      readonly key: string
      readonly value: unknown
      readonly after: string | null
    }

type Line = {
  readonly opened: number
  readonly indent: string
  readonly shut: number
  readonly comma: boolean
}

const COMMA = ","

const COMMENT = "//"

export function keptOrderIn(declared: readonly string[], had: readonly string[]): string[] {
  const placed = had.filter((one) => declared.includes(one))
  for (const [at, one] of declared.entries()) {
    if (placed.includes(one)) continue
    const before = at === 0 ? -1 : placed.indexOf(declared[at - 1] ?? "")
    placed.splice(before + 1, 0, one)
  }
  return placed
}

export function stepsFor(was: Value, rendering: Rendering): readonly Step[] {
  const carried = rendering.keys.filter((one) => rendering.values[one] !== undefined)
  const named = new Set(carried)
  const steps: Step[] = Object.keys(was)
    .filter((one) => !named.has(one))
    .map((key) => ({ step: "gone", key }))
  let after: string | null = null
  for (const key of carried) {
    const value = rendering.values[key]
    if (!Object.hasOwn(was, key)) steps.push({ step: "put", key, value, after })
    else if (saidAs(was[key]) !== saidAs(value)) steps.push({ step: "said", key, value })
    after = key
  }
  return steps
}

function lineOf(text: string, source: ts.SourceFile, held: ts.Node): Line | null {
  const started = held.getStart(source)
  const opened = text.lastIndexOf("\n", started - 1) + 1
  const indent = text.slice(opened, started)
  const shut = text.indexOf("\n", held.getEnd())
  if (indent.trim() !== "" || shut < 0) return null
  const rest = text.slice(held.getEnd(), shut).trim()
  const comma = rest.startsWith(COMMA)
  const past = (comma ? rest.slice(COMMA.length) : rest).trim()
  if (past !== "" && !past.startsWith(COMMENT)) return null
  return { opened, indent, shut: shut + 1, comma }
}

function goneFrom(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  at: number
): Splice {
  const held = owner.properties[at]
  const line = held === undefined ? null : lineOf(text, source, held)
  if (line === null) return without(text, source, owner, owner.properties, at)
  return { from: line.opened, to: line.shut, put: "" }
}

function putIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  stated: string,
  after: string | null
): Splice {
  const anchor = after === null ? undefined : owner.properties[placeOf(owner, after)]
  const first = owner.properties[0]
  if (anchor === undefined && first !== undefined) {
    const line = lineOf(text, source, first)
    const at = line?.opened ?? first.getStart(source)
    return { from: at, to: at, put: line === null ? `${stated}, ` : `${line.indent}${stated},\n` }
  }
  const line = anchor === undefined ? null : lineOf(text, source, anchor)
  if (line === null || !line.comma) {
    return withProperty(text, source, owner, stated, after ?? undefined)
  }
  return { from: line.shut, to: line.shut, put: `${line.indent}${stated},\n` }
}

function spliceFor(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  one: Step
): Splice | null {
  const at = placeOf(owner, one.key)
  if (one.step === "gone") return at < 0 ? null : goneFrom(text, source, owner, at)
  const put = saidAs(one.value)
  if (one.step === "put") return putIn(text, source, owner, `${one.key}: ${put}`, one.after)
  const held = owner.properties[at]
  if (held === undefined || !ts.isPropertyAssignment(held)) return null
  return { from: held.initializer.getStart(source), to: held.initializer.getEnd(), put }
}

export function editedIn(given: Editing): string | null {
  let text = given.text
  for (const one of stepsFor(given.was, given.rendering)) {
    const source = parsedAs(given.path, text)
    const owner = literalIn(source)
    if (owner === null) return null
    const made = spliceFor(text, source, owner, one)
    if (made === null) return null
    text = `${text.slice(0, made.from)}${made.put}${text.slice(made.to)}`
  }
  return text
}

export function bodyOver(root: string, held: string | undefined, rendering: Rendering): string {
  const text = held === undefined ? null : bodyAt(held, root)
  const was = text === null ? null : valueIn(text)
  if (held === undefined || text === null || was === null) return bodyOf(rendering)
  const ordered = { ...rendering, keys: keptOrderIn(rendering.keys, Object.keys(was)) }
  return editedIn({ path: held, text, was, rendering: ordered }) ?? bodyOf(ordered)
}
