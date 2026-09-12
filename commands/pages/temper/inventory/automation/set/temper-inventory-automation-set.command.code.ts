import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { scope } from "akasha/commands/arguments/pages/scope.argument.ts"
import { toggle } from "akasha/commands/arguments/pages/toggle.argument.ts"
import { toggleTarget } from "akasha/commands/arguments/pages/toggle-target.argument.ts"
import { value } from "akasha/commands/arguments/pages/value.argument.ts"
import {
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { temperInventoryAutomationSet as page } from "akasha/commands/pages/temper/inventory/automation/set/temper-inventory-automation-set.command.ts"
import { inventorySettings } from "akasha/temper/commands/inventory-settings-handle/inventory-settings-handle.module.code.ts"
import {
  type AutomationScope,
  applyToggle,
  parseScope,
  parseValue,
  type ToggleValue,
} from "akasha/temper/inventory-automation/automation-toggle-change/automation-toggle-change.module.code.ts"
import type { AutomationSettings } from "akasha/temper/inventory-automation/automation-toggles/automation-toggles.module.code.ts"

const SPACES = 2

const PAGES = [scope, toggle, value, toggleTarget]

function scopeSaid(held: AutomationScope): string {
  if (held.kind === "global") return `global.${held.target}`
  if (held.kind === "character") return `character:${held.esoCharId}`
  return `companion:${held.companionId}`
}

type Asked =
  | { readonly scope: AutomationScope; readonly value: ToggleValue }
  | { readonly why: string }

type Asking = {
  readonly scope: string
  readonly toggle: string
  readonly value: string
  readonly toggleTarget?: string
}

function askedIn(asking: Asking): Asked {
  try {
    return {
      scope: parseScope(asking.scope, asking.toggle, asking.toggleTarget),
      value: parseValue(asking.value),
    }
  } catch (thrown) {
    return { why: whyOf(thrown) }
  }
}

export async function temperInventoryAutomationSet(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)

  const asked = askedIn(read.taken)
  if ("why" in asked) return refused(asked.why, INPUT)

  const access = await inventorySettings()

  let settings: AutomationSettings
  try {
    settings = await access.readAutomation()
  } catch (thrown) {
    return refused(`the automation settings went unread — ${whyOf(thrown)}`, OPERATIONAL)
  }

  let next: AutomationSettings
  try {
    next = applyToggle(settings, asked.scope, read.taken.toggle, asked.value)
  } catch (thrown) {
    return refused(whyOf(thrown), INPUT)
  }

  try {
    await access.writeAutomation(next)
  } catch (thrown) {
    return refused(
      `the automation settings were not written, so no toggle changed — ${whyOf(thrown)}`,
      OPERATIONAL
    )
  }

  const said = { scope: scopeSaid(asked.scope), toggle: read.taken.toggle, value: asked.value }
  return told(JSON.stringify(said, null, SPACES).split("\n"))
}
