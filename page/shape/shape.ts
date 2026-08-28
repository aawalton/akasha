import { check } from "../document/check.ts"
import { holeFaults } from "../document/holes.ts"
import { parse } from "../document/parse.ts"
import type { Document, Refusal, Verdict } from "../document/types.ts"
import type { Choice, PartDef, CompiledShape } from "../document/shape-types.ts"
import { levelOf, type Level } from "./level.ts"
import { pageStemOf } from "../name/name.ts"
import { refusalText } from "../../refusal/refusal.ts"

export interface Shape {
  readonly compiled: CompiledShape | null
  readonly why: string | null
  readonly pagesDeclareShapes: boolean
  readonly pagesHoldFreeText: boolean
  readonly bindsHoles: boolean
}

export interface Forebear {
  readonly relPath: string
  readonly text: string
}

const PROPERTY_SIDE = "page/property/frontmatter.ts"

export function shapeOf(slug: string, relPath: string, text: string, above: readonly Forebear[] = []): Shape {
  const bare = { domain: slug, extends: [], regions: [], frontmatter: [], fragments: {} } as const
  const no = (why: string | null): Shape => ({
    compiled: null,
    why,
    pagesDeclareShapes: false,
    pagesHoldFreeText: false,
    bindsHoles: false,
  })
  const sections: PartDef[] = []
  const choices: Choice[] = []
  const from = new Map<string, string[]>()
  let bindsHoles = false
  const take = (at: string, level: Level): string | null => {
    for (const [key, narrows] of level.keys) {
      const already = from.get(key) ?? []
      if (narrows !== null) {
        if (!already.some((one) => pageStemOf(one) === narrows))
          return refusalText("page-block-narrowing-unresolved", { path: at, key, narrows })
      } else if (already.length > 0) {
        return refusalText("page-block-redeclaration-silent", {
          path: at,
          key,
          above: already[already.length - 1]!,
          side: PROPERTY_SIDE,
        })
      }
      from.set(key, [...already, at])
    }
    sections.push(...level.sections)
    choices.push(...level.choices)
    bindsHoles = bindsHoles || level.bindsHoles
    return null
  }
  for (const one of [...above].reverse()) {
    const { level, why } = levelOf(one.relPath, one.text)
    if (level === null) return no(`\`${one.relPath}\` states no shape to inherit: ${why}`)
    const clash = take(one.relPath, level)
    if (clash !== null) return no(clash)
  }
  const { level, why } = levelOf(relPath, text)
  if (level === null) return no(why)
  if (level.declaresShapes)
    return {
      compiled: { ...bare, sections: [] },
      why: null,
      pagesDeclareShapes: true,
      pagesHoldFreeText: false,
      bindsHoles: false,
    }
  if (level.holdsFreeText)
    return {
      compiled: { ...bare, sections: [] },
      why: null,
      pagesDeclareShapes: false,
      pagesHoldFreeText: true,
      bindsHoles: false,
    }
  const clash = take(relPath, level)
  if (clash !== null) return no(clash)
  if (choices.length === 0)
    return {
      compiled: { ...bare, sections },
      why: null,
      pagesDeclareShapes: false,
      pagesHoldFreeText: false,
      bindsHoles,
    }
  return {
    compiled: { ...bare, sections, choices },
    why: null,
    pagesDeclareShapes: false,
    pagesHoldFreeText: false,
    bindsHoles,
  }
}

export function bodyOf(doc: Document): Document {
  return { ...doc, frontmatter: [], unreadable: [] }
}

export function judge(relPath: string, text: string, compiled: CompiledShape): Verdict {
  return check(bodyOf(parse(text, relPath)), compiled, () => null)
}

function alsoHeld(verdict: Verdict, more: readonly Refusal[]): Verdict {
  if (more.length === 0) return verdict
  return { ok: false, path: verdict.path, refusals: verdict.ok ? more : [...verdict.refusals, ...more] }
}

export function hold(shape: Shape, relPath: string, text: string, above: readonly Forebear[] = []): Verdict {
  if (shape.pagesHoldFreeText) return { ok: true, path: relPath, parts: 1 }
  if (!shape.pagesDeclareShapes) {
    const doc = parse(text, relPath)
    const verdict = check(bodyOf(doc), shape.compiled!, () => null)
    if (!shape.bindsHoles) return verdict
    return alsoHeld(verdict, holeFaults(doc).map((one) => ({ path: relPath, ...one })))
  }
  const declared = shapeOf(pageStemOf(relPath), relPath, text, above)
  if (declared.compiled !== null) return { ok: true, path: relPath, parts: 1 }
  return {
    ok: false,
    path: relPath,
    refusals: [
      {
        path: relPath,
        span: parse(text, relPath).span,
        part: "its shape declaration",
        expected: "a template this can compile",
        measured: declared.why!,
      },
    ],
  }
}
