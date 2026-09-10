import { readFileSync } from "node:fs"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"

const SETTINGS = "agent-settings"

const SETTINGS_SLUG = "launch-flags"

const HARNESS_SETTINGS = "harness-settings"

const HELD = "json"

const Declaration = shape.object({
  always: shape.array(shape.string()),
  withMcpConfig: shape.array(shape.string()),
})

function declaredAt(root: string): string {
  const page = listedAt(root, SETTINGS, SETTINGS_SLUG)[0]
  const at = page === undefined ? null : besideAt(page.path, HARNESS_SETTINGS, HELD)
  if (at === null) {
    throw new Error(
      `no \`${SETTINGS}\` is slugged \`${SETTINGS_SLUG}\`, so the flags a launch passes are unknown`
    )
  }
  return at
}

function declaration(): ReturnType<typeof Declaration.parse> {
  const root = ownRepoRoot()
  return Declaration.parse(JSON.parse(readFileSync(`${root}/${declaredAt(root)}`, "utf8")))
}

export function flagsAlwaysPassed(): readonly string[] {
  return declaration().always
}

export function flagsPassedWithMcpConfig(): readonly string[] {
  return declaration().withMcpConfig
}
