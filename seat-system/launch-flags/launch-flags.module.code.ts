import { harnessSettings } from "akasha/seat-system/agent-settings/harness-settings-reading/harness-settings-reading.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"

const SETTINGS_SLUG = "launch-flags"

const UNKNOWN = "the flags a launch passes are unknown"

const Declaration = shape.object({
  always: shape.array(shape.string()),
  withMcpConfig: shape.array(shape.string()),
})

function declaration(): ReturnType<typeof Declaration.parse> {
  return harnessSettings(SETTINGS_SLUG, Declaration, UNKNOWN)
}

export function flagsAlwaysPassed(): readonly string[] {
  return declaration().always
}

export function flagsPassedWithMcpConfig(): readonly string[] {
  return declaration().withMcpConfig
}
