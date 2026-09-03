import { readFileSync } from "node:fs"

import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { shape } from "@tools/lib/shape"

const DECLARED =
  "akasha/seat-system/agent-settings/pages/tool-access/tool-access.agent-settings.harness-settings.json"

const Declaration = shape.object({
  builtinTools: shape.array(shape.string()).nullable(),
  disallowedTools: shape.array(shape.string()),
  alwaysAllowed: shape.array(shape.string()),
})

function declaration(): ReturnType<typeof Declaration.parse> {
  return Declaration.parse(JSON.parse(readFileSync(`${ownRepoRoot()}/${DECLARED}`, "utf8")))
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
