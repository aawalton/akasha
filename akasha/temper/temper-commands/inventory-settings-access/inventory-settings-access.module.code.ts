import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import { AutomationSettingsShape } from "@akasha/temper-inventory-automation/automation-settings-shape"
import type { AutomationSettings } from "@akasha/temper-inventory-automation/automation-toggles"
import { createDefaultRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { isJson } from "@akasha/utils-narrow/is-json"
import { InventoryRuleSettingsShape } from "../inventory-rule-settings-shape/inventory-rule-settings-shape.module.code.ts"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

const INDENT = 2

type SliceKey = "inventory" | "automation"

interface PlayerPage {
  readonly name: string
  readonly settings: Record<string, unknown>
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function extractSliceValue(settings: unknown, sliceKey: SliceKey): unknown {
  if (!isPlainObject(settings)) return undefined
  return settings[sliceKey]
}

function parseSettings(value: unknown): Record<string, unknown> {
  if (isPlainObject(value)) return value
  if (typeof value !== "string" || value === "") return {}
  try {
    const held: unknown = JSON.parse(value)
    return isPlainObject(held) ? held : {}
  } catch {
    return {}
  }
}

async function readPlayerPage(accountUserId: string, caller: string): Promise<PlayerPage> {
  const asked = await askComposed({
    "page-type": PLAYER_PAGE_TYPE_SLUG,
    where: { title: { is: accountUserId } },
    keys: ["slug", "settings"],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`${caller}: ${PLAYER_PAGE_TYPE_SLUG} went unread — ${asked.why}`)
  }
  const row = asked.answer.rows[0]
  if (row === undefined) {
    throw new Error(`${caller}: no ${PLAYER_PAGE_TYPE_SLUG} page carries title='${accountUserId}'`)
  }
  const name = row.values.slug
  if (typeof name !== "string" || name === "") {
    throw new Error(
      `${caller}: the ${PLAYER_PAGE_TYPE_SLUG} page carrying title='${accountUserId}' states no name of its own`
    )
  }
  return { name, settings: parseSettings(row.values.settings) }
}

async function readSettings(
  accountUserId: string,
  caller: string
): Promise<Record<string, unknown>> {
  return (await readPlayerPage(accountUserId, caller)).settings
}

// EVERY RULE A PLAYER SETS IS READ BACK AND NONE OF THEM IS KEPT. Both slices live in one
// `settings` key on the player page, patched with `patchPage`, which the store refuses
// unconditionally. So the reads below answer every `list` and `show` command, and every command
// that changes something — create, update, delete, reorder, lock, unlock and duplicate across the
// rule, item-rule and buy-rule families, plus `automation set` — ends here.
//
// The slice is still assembled before the refusal, because assembling it is where a rule that
// cannot be represented would be caught, and that judgement should not be lost behind a store that
// says no first. What is dropped is named by size, so a run says how much of the settings blob went
// unkept rather than only that a write refused.
const NO_KEYED_WRITE = "the page store refuses every keyed write"

async function writeSlice(
  accountUserId: string,
  sliceKey: SliceKey,
  next: unknown,
  caller: string
): Promise<undefined> {
  const player = await readPlayerPage(accountUserId, caller)
  const settings = JSON.stringify({ ...player.settings, [sliceKey]: next }, null, INDENT)
  throw new Error(
    `${caller}: the \`${sliceKey}\` settings of \`${PLAYER_PAGE_TYPE_SLUG}/${player.name}\` were ` +
      `not patched — ${NO_KEYED_WRITE}. ${settings.length} character(s) of settings were built ` +
      `and dropped, and every read of these rules still answers with what stood before`
  )
}

export async function readInventoryRuleSettings(
  accountUserId: string
): Promise<InventoryRuleSettings> {
  const settings = await readSettings(accountUserId, "readInventoryRuleSettings")
  const sliceValue = extractSliceValue(settings, "inventory")
  if (sliceValue === undefined) {
    return createDefaultRuleSettings()
  }
  return InventoryRuleSettingsShape.parse(sliceValue)
}

export async function writeInventoryRuleSettings(
  accountUserId: string,
  next: InventoryRuleSettings
): Promise<undefined> {
  if (!isJson(next)) {
    throw new Error("writeInventoryRuleSettings: next is not JSON-serializable")
  }
  await writeSlice(accountUserId, "inventory", next, "writeInventoryRuleSettings")
}

export async function readAutomationSettings(accountUserId: string): Promise<AutomationSettings> {
  const settings = await readSettings(accountUserId, "readAutomationSettings")
  const sliceValue = extractSliceValue(settings, "automation")
  if (sliceValue === undefined) {
    return { characters: {}, companions: {} }
  }
  return AutomationSettingsShape.parse(sliceValue)
}

export async function writeAutomationSettings(
  accountUserId: string,
  next: AutomationSettings
): Promise<undefined> {
  if (!isJson(next)) {
    throw new Error("writeAutomationSettings: next is not JSON-serializable")
  }
  await writeSlice(accountUserId, "automation", next, "writeAutomationSettings")
}
