import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import { textOf } from "@akasha/code-system/body-text"
import { parsedAs } from "@akasha/code-system/code-source"
import { saidBy } from "@akasha/command-system/fault-saying"
import type { Change } from "@akasha/pages-system/change"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, partedIn } from "@akasha/pages-system/page-file-name"
import type { Shadow } from "@akasha/pages-system/shadow"
import ts from "typescript"
import {
  input,
  overEachFile,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Judging, Standing } from "./syntax-rules/syntax-rule.page-type.ts"

const RULE = "syntax-rule"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export type Rule = {
  readonly slug: string
  readonly judge: Judging
}

type Running = (...given: readonly unknown[]) => undefined

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
  for (const one of shadow.index.everyOfType(RULE)) {
    const said = partedIn(one.path)
    if (said === null) {
      throw new Error(`${one.path} is a syntax rule, and its name says no slug`)
    }
    const slug = said.slug
    const beside = besideAt(one.path, CODE, TS)
    if (beside === null) {
      throw new Error(
        `${one.path} is a syntax rule, and no code file can stand beside a name like it`
      )
    }
    const codePath = shadow.codeAt(beside)
    let mod: Record<string, unknown>
    if (codePath === null) {
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
        mod = loadFrom(join(root, codePath)) as Record<string, unknown>
      } catch (thrown) {
        throw new Error(
          `${one.path} is a syntax rule, and ${codePath} could not be loaded — ${saidBy(thrown)}`
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
  const parsed: Standing = { path, source: parsedAs(path, text) }
  const said: string[] = []
  for (const rule of rules) {
    for (const one of rule.judge(parsed)) {
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

export const noRefusedSyntax = input(TEXTS, refusedIn)
