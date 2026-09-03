import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import {
  type AutomationScope,
  applyToggle,
  parseScope,
  parseValue,
  type ToggleValue,
} from "@akasha/temper-inventory-automation/automation-toggle-change"
import {
  type AutomationSettings,
  inventorySettings,
} from "../inventory-settings-handle/inventory-settings-handle.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const SCOPE = "--scope"

const TOGGLE = "--toggle"

const VALUE = "--value"

const TARGET = "--target"

const SPACES = 2

const TAKING_A_VALUE = [SCOPE, TOGGLE, VALUE, TARGET]

const NEEDED = [SCOPE, TOGGLE, VALUE]

export type Read =
  | {
      readonly scope: string
      readonly toggle: string
      readonly value: string
      readonly target: string | null
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const held = new Map<string, string>()
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!TAKING_A_VALUE.includes(one)) {
      refusals.push(
        `\`${one}\` is nothing this takes — it takes \`${SCOPE}\`, \`${TOGGLE}\`, ` +
          `\`${VALUE}\` and \`${TARGET}\``
      )
      continue
    }
    const value = argv[at + 1]
    at += 1
    if (value === undefined) {
      refusals.push(`\`${one}\` takes a value, and none followed it`)
      continue
    }
    held.set(one, value)
  }
  for (const flag of NEEDED) {
    if (!held.has(flag)) {
      refusals.push(`\`${flag}\` names part of what is set, and nothing said it`)
    }
  }
  if (refusals.length > 0) return { refused: refusals }
  return {
    scope: held.get(SCOPE) as string,
    toggle: held.get(TOGGLE) as string,
    value: held.get(VALUE) as string,
    target: held.get(TARGET) ?? null,
  }
}

export function scopeSaid(scope: AutomationScope): string {
  if (scope.kind === "global") return `global.${scope.target}`
  if (scope.kind === "character") return `character:${scope.esoCharId}`
  return `companion:${scope.companionId}`
}

type Asked =
  | { readonly scope: AutomationScope; readonly value: ToggleValue }
  | { readonly why: string }

function askedIn(read: Exclude<Read, { refused: readonly string[] }>): Asked {
  try {
    return {
      scope: parseScope(read.scope, read.toggle, read.target ?? undefined),
      value: parseValue(read.value),
    }
  } catch (thrown) {
    return { why: whyOf(thrown) }
  }
}

export async function temperInventoryAutomationSet(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }

  const asked = askedIn(read)
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
    next = applyToggle(settings, asked.scope, read.toggle, asked.value)
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

  const said = { scope: scopeSaid(asked.scope), toggle: read.toggle, value: asked.value }
  return { report: JSON.stringify(said, null, SPACES).split("\n"), refusals: [], code: 0 }
}
