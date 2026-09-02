import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const FOCUS_SCRIPT_EAV_SCHEMA = z
  .object({
    key: z.string(),
    slotType: z.literal("focus-slot"),
    itemId: z.number().int().nonnegative(),
    uespId: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedFocusScript {
  key: string
  name: string
  icon: string
  slotType: "focus-slot"
  itemId: number
  uespId: number
}

function parseFocusScript(row: Page): ParsedFocusScript {
  if (row.title === null) {
    throw new Error(`temper-focus-script row ${row.id} has null title`)
  }
  const eav = FOCUS_SCRIPT_EAV_SCHEMA.parse({
    key: row.key,
    slotType: row.slotType,
    itemId: row.itemId,
    uespId: row.uespId,
  })
  const icon = typeof row.icon === "string" ? row.icon : ""
  return {
    key: eav.key,
    name: row.title,
    icon,
    slotType: eav.slotType,
    itemId: eav.itemId,
    uespId: eav.uespId,
  }
}

export function generateTemperFocusScript(rows: readonly Page[]): string {
  const parsed = rows.map(parseFocusScript)

  const sorted = [...parsed].sort((a, b) => a.uespId - b.uespId)

  const entries = sorted.map((s) => {
    return `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)}, icon: ${JSON.stringify(s.icon)}, slotType: ${JSON.stringify(s.slotType)}, itemId: ${s.itemId}, uespId: ${s.uespId} },`
  })

  return `\
/**
 * Temper Focus Scripts (Generated)
 *
 * ESO scribing focus scripts (primary slot — main effect: damage type,
 * utility function, etc.), sourced from the universal pages table
 * (page type: temper-focus-script).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * (e.g. "physical-damage") and the same string is used as the record
 * key, so \`TEMPER_FOCUS_SCRIPTS["physical-damage"]\` is well-typed and
 * feeds the \`FocusScriptId\` union and the \`focusScripts.data\` lookup in
 * @temper/game-characters-skills/scribing.
 *
 * Note: UESP IDs 11 and 21 do not exist in the source database, so this
 * dataset has 21 entries (UESP IDs 1–10, 12–20, 22–23).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { FocusScriptTemplate } from "../scribing/focus-scripts-data"

export const TEMPER_FOCUS_SCRIPTS = {
${entries.join("\n")}
} as const satisfies Record<string, FocusScriptTemplate>
`
}
