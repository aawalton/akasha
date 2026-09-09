import type { AutomationSettings } from "akasha/temper/inventory-automation/automation-toggles/automation-toggles.module.code.ts"
import {
  inventorySettings,
  type Toggles,
} from "../../../../../../temper/temper-commands/inventory-settings-handle/inventory-settings-handle.module.code.ts"
import type { Answer } from "../../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../../modules/calling/calling.module.code.ts"
import { whyOf } from "../../../../../modules/fault-saying/fault-saying.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const JSON_FLAG = "--json"

const SPACES = 2

const HEADING = "scope\ttoggle\tvalue"

const GLOBAL_CHARACTERS = "global.characters"

const GLOBAL_COMPANIONS = "global.companions"

type Row = { readonly scope: string; readonly toggle: string; readonly value: boolean }

export type Read = { readonly json: boolean } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let json = false
  for (const one of argv) {
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    refusals.push(`\`${one}\` is nothing this takes — it takes \`${JSON_FLAG}\``)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { json }
}

function rowsFor(scope: string, toggles: Toggles | undefined): readonly Row[] {
  if (toggles === undefined) return []
  const found: Row[] = []
  for (const [toggle, value] of Object.entries(toggles)) {
    if (typeof value !== "boolean") continue
    found.push({ scope, toggle, value })
  }
  return found
}

export function rowsOf(settings: AutomationSettings): readonly Row[] {
  return [
    ...rowsFor(GLOBAL_CHARACTERS, settings.global?.characters),
    ...rowsFor(GLOBAL_COMPANIONS, settings.global?.companions),
    ...Object.entries(settings.characters).flatMap(([esoCharId, toggles]) =>
      rowsFor(`character:${esoCharId}`, toggles)
    ),
    ...Object.entries(settings.companions).flatMap(([companionId, toggles]) =>
      rowsFor(`companion:${companionId}`, toggles)
    ),
  ]
}

export async function temperInventoryAutomationShow(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }

  let settings: AutomationSettings
  try {
    settings = await (await inventorySettings()).readAutomation()
  } catch (thrown) {
    return refused(`the automation settings went unread — ${whyOf(thrown)}`, OPERATIONAL)
  }

  if (read.json) {
    return { report: JSON.stringify(settings, null, SPACES).split("\n"), refusals: [], code: 0 }
  }

  return {
    report: [
      HEADING,
      ...rowsOf(settings).map((one) => `${one.scope}\t${one.toggle}\t${one.value}`),
    ],
    refusals: [],
    code: 0,
  }
}
