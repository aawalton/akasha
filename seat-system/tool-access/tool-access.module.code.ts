import { readFileSync } from "node:fs"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"

const SETTINGS = "agent-settings"

const SETTINGS_SLUG = "tool-access"

const HARNESS_SETTINGS = "harness-settings"

const HELD = "json"

const Declaration = shape.object({
  builtinTools: shape.array(shape.string()).nullable(),
  disallowedTools: shape.array(shape.string()),
  alwaysAllowed: shape.array(shape.string()),
})

function declaredAt(root: string): string {
  const page = listedAt(root, SETTINGS, SETTINGS_SLUG)[0]
  const at = page === undefined ? null : besideAt(page.path, HARNESS_SETTINGS, HELD)
  if (at === null) {
    throw new Error(
      `no \`${SETTINGS}\` is slugged \`${SETTINGS_SLUG}\`, so which tools an agent may reach is unknown`
    )
  }
  return at
}

function declaration(): ReturnType<typeof Declaration.parse> {
  const root = ownRepoRoot()
  return Declaration.parse(JSON.parse(readFileSync(`${root}/${declaredAt(root)}`, "utf8")))
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
