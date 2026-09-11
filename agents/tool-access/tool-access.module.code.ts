import { harnessSettings } from "akasha/agents/settings/harness-settings-reading/harness-settings-reading.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"

const SETTINGS_SLUG = "tool-access"

const UNKNOWN = "which tools an agent may reach is unknown"

const Declaration = shape.object({
  builtinTools: shape.array(shape.string()).nullable(),
  disallowedTools: shape.array(shape.string()),
  alwaysAllowed: shape.array(shape.string()),
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
