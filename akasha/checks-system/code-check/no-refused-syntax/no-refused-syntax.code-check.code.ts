import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import ts from "typescript"
import { textOf } from "../../../code-system/body-text/body-text.module.code.ts"
import { parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { everyOfType } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import {
  besideAt,
  namedIn,
} from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import {
  overEachFile,
  overEachText,
  TEXTS,
  waking,
} from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"
import type { Judging, Standing } from "./syntax-rule/syntax-rule.page-type.ts"

const RULE = "syntax-rule"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export type Rule = {
  readonly slug: string
  readonly judge: Judging
}

type Running = (...given: readonly unknown[]) => undefined

function saidBy(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export function introducedIn(change: Change | null, path: string): string | null {
  if (change === null) return null
  if (change.before(path) !== null) return null
  return textOf(change.after(path))
}

export function compiledFrom(root: string, at: string, text: string): Record<string, unknown> {
  const full = join(root, at)
  const built = ts.transpileModule(text, {
    fileName: full,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ESNext,
      esModuleInterop: true,
    },
  }).outputText
  const holder: { exports: Record<string, unknown> } = { exports: {} }
  const run = new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    built
  ) as Running
  run(createRequire(full), holder, holder.exports, full, dirname(full))
  return holder.exports
}

export function rulesIn(
  root: string,
  shadow: Shadow,
  change: Change | null = null
): readonly Rule[] {
  const found: Rule[] = []
  for (const one of everyOfType(shadow.reading, RULE)) {
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
    const standing = shadow.codeAt(beside)
    let mod: Record<string, unknown>
    if (standing === null) {
      const carried = introducedIn(change, beside)
      if (carried === null) {
        throw new Error(
          `${one.path} is a syntax rule, and this change leaves ${beside} holding a body no path on disk holds, so it cannot be loaded to judge by`
        )
      }
      try {
        mod = compiledFrom(root, beside, carried)
      } catch (thrown) {
        throw new Error(
          `${one.path} is a syntax rule, and the body this change carries at ${beside} could not be loaded — ${saidBy(thrown)}`
        )
      }
    } else {
      try {
        mod = loadFrom(join(root, standing)) as Record<string, unknown>
      } catch (thrown) {
        throw new Error(
          `${one.path} is a syntax rule, and ${standing} could not be loaded — ${saidBy(thrown)}`
        )
      }
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

function refusedIn(change: Change, shadow: Shadow): readonly Judged[] {
  const rules = rulesIn(change.root, shadow, change)
  return overEachFile(
    change,
    overEachText((path, text) => refusalsIn(rules, path, text))
  )
}

export const noRefusedSyntax = waking(TEXTS, refusedIn)
