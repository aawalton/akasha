import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { section as sectionArgument } from "akasha/commands/arguments/pages/section.argument.ts"
import {
  asJson,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { temperInventoryConfiguration as page } from "akasha/commands/pages/temper/inventory/configuration/temper-inventory-configuration.command.ts"
import { loadTemperInventoryConfigFromPath } from "akasha/temper/commands/inventory-config-reading/inventory-config-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const TAKES = [json, inventoryPathArgument, sectionArgument]

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

export type Reading = Section | { readonly refused: readonly string[] }

export function sectionIn(said: string): Reading {
  if (!SECTIONS.includes(said as Section)) {
    return {
      refused: [
        `\`${sectionArgument.said}\` takes \`${SECTIONS.join("`, `")}\`, ` +
          `and \`${said}\` is none of them`,
      ],
    }
  }
  return said as Section
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

export async function temperInventoryConfiguration(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  const held = sectionIn(taken.section)
  if (typeof held !== "string") return refusedBy(held.refused)
  const root = resolve(given.root)
  const at =
    taken.inventoryPath === undefined
      ? savedVarsFile(INVENTORY_LUA)
      : resolve(root, taken.inventoryPath)
  try {
    const config = (await loadTemperInventoryConfigFromPath(at)) as CompiledInventoryConfig
    if (taken.json) return asJson(jsonShape(config, held))
    return told([...textOf(config, held)])
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
