import { harnessSettings } from "akasha/agent/settings/modules/harness-settings-reading/harness-settings-reading.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const SETTINGS_SLUG = "tool-access"

const UNKNOWN = "which tools an agent may reach is unknown"

const Declaration = SHAPE.object({
  builtinTools: SHAPE.array(SHAPE.string()).nullable(),
  disallowedTools: SHAPE.array(SHAPE.string()),
  alwaysAllowed: SHAPE.array(SHAPE.string()),
})

function declaration(): ReturnType<typeof Declaration.parse> {
  return harnessSettings(SETTINGS_SLUG, Declaration, UNKNOWN)
}

export interface ToolRestrictions {
  readonly tools: readonly string[] | null
  readonly disallowedTools: readonly string[]
}

export function toolRestrictions(): ToolRestrictions {
  const declared = declaration()
  return { tools: declared.builtinTools, disallowedTools: declared.disallowedTools }
}

export function alwaysAllowedTools(): readonly string[] {
  return declaration().alwaysAllowed
}
