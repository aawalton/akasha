import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { loadTemperInventoryConfigFromPath } from "../inventory-config-reading/inventory-config-reading.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const SECTION = "--section"

const JSON_FLAG = "--json"

const INVENTORY_LUA = "TemperInventory.lua"

const SECTIONS = ["rules", "consumables", "priority", "all"] as const

const NAMED_KEYS = 3

type Section = (typeof SECTIONS)[number]

type CompiledRule = {
  readonly id: string
  readonly action: string
  readonly destination?: string
  readonly categoryId?: string
  readonly [extra: string]: unknown
}

type CompiledInventoryConfig = {
  readonly rules: ReadonlyArray<CompiledRule>
  readonly wantedConsumables: Record<string, unknown>
  readonly characterPriority: ReadonlyArray<string>
}

export type Read =
  | {
      readonly inventoryPath: string | null
      readonly section: Section
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let section: Section = "all"
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === INVENTORY_PATH || one === SECTION) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${one}\` takes a value, and none followed it`)
        continue
      }
      if (one === INVENTORY_PATH) {
        inventoryPath = value
        continue
      }
      if (!SECTIONS.includes(value as Section)) {
        refusals.push(
          `\`${SECTION}\` takes \`${SECTIONS.join("`, `")}\`, and \`${value}\` is none of them`
        )
        continue
      }
      section = value as Section
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\`, ` +
        `\`${SECTION}\` and \`${JSON_FLAG}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, section, json }
}

const RULE_IDENTITY = new Set(["id", "action", "destination", "categoryId"])

function conditionCount(rule: CompiledRule): number {
  let held = 0
  for (const key of Object.keys(rule)) if (!RULE_IDENTITY.has(key)) held += 1
  return held
}

function ruleShape(rule: CompiledRule): Record<string, unknown> {
  return {
    id: rule.id,
    action: rule.action,
    destination: rule.destination ?? "",
    categoryId: rule.categoryId ?? "",
    conditionCount: conditionCount(rule),
  }
}

function consumableSaid(value: unknown): string {
  if (Array.isArray(value)) return `[${value.length} char(s)]`
  if (value !== null && typeof value === "object") {
    const keys = Object.keys(value)
    return `{${keys.length} field(s): ${keys.slice(0, NAMED_KEYS).join(", ")}}`
  }
  if (value === null) return "(null)"
  return String(value)
}

export function rulesSaid(rules: ReadonlyArray<CompiledRule>): readonly string[] {
  if (rules.length === 0) return ["(no compiled rules)"]
  const lines: string[] = []
  for (let at = 0; at < rules.length; at += 1) {
    const rule = rules[at]
    if (rule === undefined) continue
    const shape = ruleShape(rule)
    lines.push(
      [at, shape.id, shape.action, shape.destination, shape.categoryId, shape.conditionCount].join(
        "\t"
      )
    )
  }
  return lines
}

export function consumablesSaid(wanted: Record<string, unknown>): readonly string[] {
  const keys = Object.keys(wanted)
  if (keys.length === 0) return ["(no wanted consumables)"]
  return keys.map((one) => `${one}\t${consumableSaid(wanted[one])}`)
}

export function prioritySaid(priority: ReadonlyArray<string>): readonly string[] {
  return priority.length === 0 ? ["(no character priority)"] : [...priority]
}

function jsonShape(config: CompiledInventoryConfig, section: Section): Record<string, unknown> {
  const rules = config.rules.map(ruleShape)
  if (section === "rules") return { rules }
  if (section === "consumables") return { wantedConsumables: config.wantedConsumables }
  if (section === "priority") return { characterPriority: config.characterPriority }
  return {
    rules,
    wantedConsumables: config.wantedConsumables,
    characterPriority: config.characterPriority,
  }
}

function textOf(config: CompiledInventoryConfig, section: Section): readonly string[] {
  if (section === "rules") return rulesSaid(config.rules)
  if (section === "consumables") return consumablesSaid(config.wantedConsumables)
  if (section === "priority") return prioritySaid(config.characterPriority)
  return [
    `# rules (${config.rules.length})`,
    ...rulesSaid(config.rules),
    "",
    `# consumables (${Object.keys(config.wantedConsumables).length})`,
    ...consumablesSaid(config.wantedConsumables),
    "",
    `# priority (${config.characterPriority.length})`,
    ...prioritySaid(config.characterPriority),
  ]
}

export async function temperInventoryRules(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  try {
    const config = (await loadTemperInventoryConfigFromPath(at)) as CompiledInventoryConfig
    if (read.json) {
      return { report: [JSON.stringify(jsonShape(config, read.section))], refusals: [], code: 0 }
    }
    return { report: [...textOf(config, read.section)], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
