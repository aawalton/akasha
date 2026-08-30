import { createRequire } from "node:module"
import { join } from "node:path"
import { parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { everyOfType } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Reading } from "../../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import {
  besideAt,
  namedIn,
} from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import { overEachFile, overEachText } from "../../checking/checking.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"
import type { Judging, Standing } from "./syntax-rule/syntax-rule.page-type.ts"

const RULE = "syntax-rule"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export type Rule = {
  readonly slug: string
  readonly judge: Judging
}

export function rulesIn(root: string, given: string | Reading): readonly Rule[] {
  const found: Rule[] = []
  for (const one of everyOfType(given, RULE)) {
    const said = namedIn(one.path)
    if (said === null) {
      throw new Error(`${one.path} is a syntax rule, and its name says no slug`)
    }
    const slug = said.stem
    const beside = besideAt(one.path, CODE, TS)
    if (beside === null) {
      throw new Error(
        `${one.path} is a syntax rule, and no code file can stand beside a name like it`
      )
    }
    let mod: Record<string, unknown>
    try {
      mod = loadFrom(join(root, beside)) as Record<string, unknown>
    } catch (thrown) {
      throw new Error(
        `${one.path} is a syntax rule, and ${beside} could not be loaded — ${thrown instanceof Error ? thrown.message : String(thrown)}`
      )
    }
    const named = mod[exportedAs(slug)]
    if (typeof named !== "function") {
      throw new Error(
        `${one.path} is a syntax rule, and ${beside} answers to nothing that can judge`
      )
    }
    found.push({ slug, judge: named as Judging })
  }
  if (found.length === 0) {
    throw new Error(
      "no syntax rule stands, so every file would be judged by nothing and a clean answer would mean nothing"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function refusalsIn(rules: readonly Rule[], path: string, text: string): readonly string[] {
  const standing: Standing = { path, source: parsedAs(path, text) }
  const said: string[] = []
  for (const rule of rules) {
    for (const one of rule.judge(standing)) {
      said.push(`line ${one.line}: ${one.reason} — \`${rule.slug}\``)
    }
  }
  return said
}

export function noRefusedSyntax(leaving: Leaving, shadow: Shadow): readonly Judged[] {
  const rules = rulesIn(leaving.root, shadow.reading)
  return overEachFile(
    leaving,
    overEachText((path, text) => refusalsIn(rules, path, text))
  )
}
