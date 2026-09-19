import { harnessSettings } from "akasha/agent/settings/modules/harness-settings-reading/harness-settings-reading.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const SETTINGS_SLUG = "launch-flags"

const UNKNOWN = "the flags a launch passes are unknown"

const Declaration = SHAPE.object({
  always: SHAPE.array(SHAPE.string()),
  withMcpConfig: SHAPE.array(SHAPE.string()),
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
