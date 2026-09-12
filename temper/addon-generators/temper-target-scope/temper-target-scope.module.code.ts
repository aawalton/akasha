import { DO_NOT_EDIT } from "akasha/temper/addon-generators/do-not-edit/do-not-edit.module.code.ts"
import type { Page } from "akasha/temper/addon-generators/modules/addon-data-page/addon-data-page.module.code.ts"
import { ranksOf } from "akasha/temper/addon-generators/rank-by-key/rank-by-key.module.code.ts"
import { targetScopes } from "akasha/temper/skill-kinds/target-scopes/target-scopes.module.code.ts"
import { z } from "zod"

const TARGET_SCOPE_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedTargetScope {
  key: string
  name: string
}

function parseTargetScope(row: Page): ParsedTargetScope {
  if (row.title === null) {
    throw new Error(`temper-target-scope row ${row.id} has null title`)
  }
  const eav = TARGET_SCOPE_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperTargetScope(rows: readonly Page[]): string {
  const parsed = rows.map(parseTargetScope)

  const precedence: Record<string, number> = ranksOf(targetScopes.ids)
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(
    (s) =>
      `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)} },`
  )

  return `\
/**
 * Temper Target Scopes (Generated)
 *
 * Four target-scope kinds — single, cone, area, line — sourced from the
 * universal pages table (page type: temper-target-scope).
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * \`TEMPER_TARGET_SCOPES["single"]\` is well-typed and feeds the
 * \`targetScopes\` lookup in @temper/game-characters-skills.
 *
 * ${DO_NOT_EDIT}
 */

import type { TargetScopeTemplate } from "../target-scope-data"

export const TEMPER_TARGET_SCOPES = {
${entries.join("\n")}
} as const satisfies Record<string, TargetScopeTemplate>
`
}
