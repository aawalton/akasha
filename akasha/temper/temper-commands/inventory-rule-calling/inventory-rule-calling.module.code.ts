import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { exitCodeForThrowable } from "@akasha/errors-core/exit-code"
import {
  duplicateBuyRule,
  lockBuyRule,
  removeBuyRule,
} from "@akasha/temper-items-rules-core/buy-rule-settings"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import { buildAllControlledRules } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import {
  duplicateCategoryRule,
  duplicateItemRule,
  lockCategoryRule,
  lockItemRule,
  removeCategoryRule,
  removeItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type {
  CategoryRule,
  InventoryRuleSettings,
  ItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { emitJson, emitTsv } from "@tools/lib/format-output"
import {
  BUY_RULE_COLUMNS,
  ITEM_RULE_COLUMNS,
  itemRuleRow,
  RULE_SHOW_COLUMNS,
} from "../inventory-rule-rows/inventory-rule-rows.module.code.ts"
import { inventorySettings } from "../inventory-settings-handle/inventory-settings-handle.module.code.ts"

export const INPUT = 1

export const DATA = 2

export const OPERATIONAL = 3

export const FORCE = "--force"

export const JSON_FLAG = "--json"

export const TSV = "--tsv"

export const ACTIVE = "--active"

export const TITLE = "--title"

export const NOTES = "--notes"

export const GOAL = "--goal"

export type Kind = "category" | "item" | "buy"

export type Held = { readonly id: string; readonly locked?: boolean }

export type Shape = {
  readonly takes: readonly string[]
  readonly alone: readonly string[]
  readonly whole: readonly string[]
  readonly yesNo: readonly string[]
  readonly namesARule: boolean
  readonly required: readonly string[]
}

export type Read =
  | { readonly id: string | null; readonly said: ReadonlyMap<string, string> }
  | { readonly refused: readonly string[] }

type Kindly = {
  readonly named: string
  readonly heldIn: (settings: InventoryRuleSettings) => readonly Held[]
  readonly locking: (
    settings: InventoryRuleSettings,
    id: string,
    locked: boolean
  ) => InventoryRuleSettings
  readonly dropping: (settings: InventoryRuleSettings, id: string) => InventoryRuleSettings
  readonly copying: (settings: InventoryRuleSettings, id: string) => InventoryRuleSettings
  readonly rowOf: (rule: Held) => Record<string, unknown>
  readonly columns: readonly string[]
}

export function categoryRow(rule: CategoryRule): Record<string, unknown> {
  return {
    id: rule.id,
    categoryId: rule.categoryId,
    action: rule.action,
    active: rule.active,
    locked: rule.locked,
    destination: rule.destination,
  }
}

export function buyRuleRow(rule: BuyRule): Record<string, unknown> {
  return {
    id: rule.id,
    itemId: rule.itemId,
    itemName: rule.itemName,
    targetQuantity: rule.targetQuantity,
    source: rule.source,
    active: rule.active,
    locked: rule.locked,
  }
}

const KINDLY: Record<Kind, Kindly> = {
  category: {
    named: "category rule",
    heldIn: (settings) => settings.rules,
    locking: lockCategoryRule,
    dropping: removeCategoryRule,
    copying: duplicateCategoryRule,
    rowOf: (rule) => categoryRow(rule as CategoryRule),
    columns: RULE_SHOW_COLUMNS,
  },
  item: {
    named: "item rule",
    heldIn: (settings) => settings.itemRules ?? [],
    locking: lockItemRule,
    dropping: removeItemRule,
    copying: duplicateItemRule,
    rowOf: (rule) => itemRuleRow(rule as ItemRule),
    columns: ITEM_RULE_COLUMNS,
  },
  buy: {
    named: "buy rule",
    heldIn: (settings) => settings.buyRules ?? [],
    locking: lockBuyRule,
    dropping: removeBuyRule,
    copying: duplicateBuyRule,
    rowOf: (rule) => buyRuleRow(rule as BuyRule),
    columns: BUY_RULE_COLUMNS,
  },
}

export function named(every: readonly string[]): string {
  return `\`${every.join("`, `")}\``
}

export function shapeOf(
  takes: readonly string[],
  how: {
    readonly alone?: readonly string[]
    readonly whole?: readonly string[]
    readonly yesNo?: readonly string[]
    readonly namesARule?: boolean
    readonly required?: readonly string[]
  } = {}
): Shape {
  return {
    takes,
    alone: how.alone ?? [],
    whole: how.whole ?? [],
    yesNo: how.yesNo ?? [],
    namesARule: how.namesARule ?? false,
    required: how.required ?? [],
  }
}

export function readIn(argv: readonly string[], calledAs: string, shape: Shape): Read {
  const refusals: string[] = []
  const held = new Map<string, string>()
  const alone = new Set(shape.alone)
  const whole = new Set(shape.whole)
  const yesNo = new Set(shape.yesNo)
  let id: string | null = null
  for (let step = 0; step < argv.length; step += 1) {
    const one = argv[step]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      if (!shape.namesARule) {
        refusals.push(`\`${one}\` follows \`${calledAs}\`, which names no rule`)
        continue
      }
      if (id !== null) {
        refusals.push(`\`${one}\` follows the rule \`${id}\`, and one call names one rule`)
        continue
      }
      id = one
      continue
    }
    if (!shape.takes.includes(one)) {
      refusals.push(
        shape.takes.length === 0
          ? `\`${one}\` is no flag \`${calledAs}\` takes, and it takes none`
          : `\`${one}\` is no flag \`${calledAs}\` takes — it takes ${named(shape.takes)}`
      )
      continue
    }
    if (held.has(one)) {
      refusals.push(`\`${one}\` was said twice, and one call says it once`)
      continue
    }
    if (alone.has(one)) {
      held.set(one, "")
      continue
    }
    const value = argv[step + 1]
    if (value === undefined || value.startsWith("-")) {
      refusals.push(`\`${one}\` names a value, and nothing that could be one followed it`)
      continue
    }
    step += 1
    if (whole.has(one) && !/^\d+$/.test(value)) {
      refusals.push(
        `\`${one}\` takes a whole number of nought or more, and \`${value}\` is not one`
      )
      continue
    }
    if (yesNo.has(one) && value !== "true" && value !== "false") {
      refusals.push(`\`${one}\` takes \`true\` or \`false\`, and \`${value}\` is neither`)
      continue
    }
    held.set(one, value)
  }
  if (shape.namesARule && id === null) {
    refusals.push(`\`${calledAs}\` names the rule to act on, and nothing followed it`)
  }
  for (const one of shape.required) {
    if (!held.has(one)) refusals.push(`\`${calledAs}\` takes \`${one}\`, and it was not said`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { id, said: held }
}

export function told(text: string): Answer {
  return { report: text.split("\n"), refusals: [], code: 0 }
}

export function toldOf(value: unknown): Answer {
  return told(emitJson(value))
}

export function toldRows(
  rows: ReadonlyArray<Record<string, unknown>>,
  columns: readonly string[]
): Answer {
  return told(emitTsv(rows, columns))
}

export function refusedAll(why: readonly string[]): Answer {
  return { report: [], refusals: why, code: INPUT }
}

export function refusing(why: string, code: number): Answer {
  return refused(why, code)
}

export function wholeOf(held: ReadonlyMap<string, string>, flag: string): number | undefined {
  const value = held.get(flag)
  return value === undefined ? undefined : Number(value)
}

export function webIn(held: ReadonlyMap<string, string>): Record<string, unknown> {
  const title = held.get(TITLE)
  const notes = held.get(NOTES)
  const goal = held.get(GOAL)
  const active = held.get(ACTIVE)
  return {
    ...(title !== undefined ? { title } : {}),
    ...(notes !== undefined ? { notes } : {}),
    ...(goal !== undefined ? { goal } : {}),
    ...(active !== undefined ? { active: active === "true" } : {}),
  }
}

export function unfound(kind: Kind, id: string): Answer {
  return refused(`no ${KINDLY[kind].named} carries the id \`${id}\``, DATA)
}

export function lockedOff(kind: Kind, id: string): Answer {
  return refused(
    `the ${KINDLY[kind].named} \`${id}\` is locked — say \`${FORCE}\` to act on it anyway, or unlock it first`,
    INPUT
  )
}

export function settingsOf(): ReturnType<typeof inventorySettings> {
  return inventorySettings()
}

export function heldIn(kind: Kind, settings: InventoryRuleSettings): readonly Held[] {
  return KINDLY[kind].heldIn(settings)
}

export function nameOf(kind: Kind): string {
  return KINDLY[kind].named
}

export async function shownRule(
  kind: Kind,
  id: string,
  held: ReadonlyMap<string, string>
): Promise<Answer> {
  const kindly = KINDLY[kind]
  const access = await inventorySettings()
  const settings = await access.read()
  let found = kindly.heldIn(settings).find((one) => one.id === id)
  if (found === undefined && kind === "category") {
    const derived = buildAllControlledRules(await access.readAutomation())
    found = [...derived.characterRules, ...derived.companionRules].find((one) => one.id === id)
  }
  if (found === undefined) return unfound(kind, id)
  if (held.has(TSV)) return toldRows([kindly.rowOf(found)], kindly.columns)
  return toldOf(found)
}

export async function lockedRule(kind: Kind, id: string, on: boolean): Promise<Answer> {
  const kindly = KINDLY[kind]
  const access = await inventorySettings()
  const settings = await access.read()
  const found = kindly.heldIn(settings).find((one) => one.id === id)
  if (found === undefined) return unfound(kind, id)
  const next = kindly.locking(settings, id, on)
  await access.write(next)
  return toldOf(kindly.heldIn(next).find((one) => one.id === id) ?? found)
}

export async function droppedRule(kind: Kind, id: string, force: boolean): Promise<Answer> {
  const kindly = KINDLY[kind]
  const access = await inventorySettings()
  const settings = await access.read()
  const found = kindly.heldIn(settings).find((one) => one.id === id)
  if (found === undefined) return unfound(kind, id)
  if (found.locked === true && !force) return lockedOff(kind, id)
  const unlocked = found.locked === true && force ? kindly.locking(settings, id, false) : settings
  await access.write(kindly.dropping(unlocked, id))
  return toldOf(found)
}

export async function copiedRule(kind: Kind, id: string): Promise<Answer> {
  const kindly = KINDLY[kind]
  const access = await inventorySettings()
  const settings = await access.read()
  const at = kindly.heldIn(settings).findIndex((one) => one.id === id)
  if (at === -1) return unfound(kind, id)
  const next = kindly.copying(settings, id)
  const clone = kindly.heldIn(next)[at + 1]
  if (clone === undefined) {
    return refused(
      `the ${kindly.named} \`${id}\` was copied and no clone stands after it, so the settings are wrong`,
      DATA
    )
  }
  await access.write(next)
  return toldOf(clone)
}

function codeOf(thrown: unknown): number {
  const held = exitCodeForThrowable(thrown)
  return held === INPUT || held === DATA ? held : OPERATIONAL
}

export function whySaid(thrown: unknown): string {
  const said = thrown instanceof Error ? thrown.message : String(thrown)
  return said.replace(/\s+/g, " ").trim()
}

export async function answering(run: () => Promise<Answer>): Promise<Answer> {
  try {
    return await run()
  } catch (thrown) {
    return refused(whySaid(thrown), codeOf(thrown))
  }
}
