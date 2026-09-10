import { readFileSync } from "node:fs"
import { shape } from "@akasha/utils/narrow/shape"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"

const DECLARED =
  "seat-system/agent-settings/pages/launch-flags/launch-flags.agent-settings.harness-settings.json"

const Declaration = shape.object({
  always: shape.array(shape.string()),
  withMcpConfig: shape.array(shape.string()),
})

function declaration(): ReturnType<typeof Declaration.parse> {
  return Declaration.parse(JSON.parse(readFileSync(`${ownRepoRoot()}/${DECLARED}`, "utf8")))
}

export function flagsAlwaysPassed(): readonly string[] {
  return declaration().always
}

export function flagsPassedWithMcpConfig(): readonly string[] {
  return declaration().withMcpConfig
}
