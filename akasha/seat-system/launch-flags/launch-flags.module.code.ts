import { readFileSync } from "node:fs"

import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { shape } from "@tools/lib/shape"

const DECLARED =
  "akasha/seat-system/agent-settings/pages/launch-flags/launch-flags.agent-settings.harness-settings.json"

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
