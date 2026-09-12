import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { temperInventoryAutomationList as page } from "akasha/commands/pages/temper/inventory/automation/list/temper-inventory-automation-list.command.ts"
import {
  inventorySettings,
  type Toggles,
} from "akasha/temper/commands/inventory-settings-handle/inventory-settings-handle.module.code.ts"
import type { AutomationSettings } from "akasha/temper/inventory-automation/automation-toggles/automation-toggles.module.code.ts"

const SPACES = 2

const HEADING = "scope\ttoggle\tvalue"

const GLOBAL_CHARACTERS = "global.characters"

const GLOBAL_COMPANIONS = "global.companions"

type Row = { readonly scope: string; readonly toggle: string; readonly value: boolean }

function rowsFor(scope: string, toggles: Toggles | undefined): readonly Row[] {
  if (toggles === undefined) return []
  const found: Row[] = []
  for (const [toggle, value] of Object.entries(toggles)) {
    if (typeof value !== "boolean") continue
    found.push({ scope, toggle, value })
  }
  return found
}

function rowsOf(settings: AutomationSettings): readonly Row[] {
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

export async function temperInventoryAutomationList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return refusedBy(read.refused)

  let settings: AutomationSettings
  try {
    settings = await (await inventorySettings()).readAutomation()
  } catch (thrown) {
    return refused(`the automation settings went unread — ${whyOf(thrown)}`, OPERATIONAL)
  }

  if (read.taken.json) {
    return told(JSON.stringify(settings, null, SPACES).split("\n"))
  }

  return told([
    HEADING,
    ...rowsOf(settings).map((one) => `${one.scope}\t${one.toggle}\t${one.value}`),
  ])
}
