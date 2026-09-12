import { readFileSync } from "node:fs"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { ownRepoRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Shape } from "akasha/utils/narrow/shape-core/shape-core.module.code.ts"

const SETTINGS = "agent-settings"

const HARNESS_SETTINGS = "harness-settings"

const HELD = "json"

export function harnessSettingsAt(root: string, settingsSlug: string, unknown: string): string {
  const page = listedAt(root, SETTINGS, settingsSlug)[0]
  const at = page === undefined ? null : besideAt(page.path, HARNESS_SETTINGS, HELD)
  if (at === null) {
    throw new Error(`no \`${SETTINGS}\` is slugged \`${settingsSlug}\`, so ${unknown}`)
  }
  return at
}

export function harnessSettings<Held>(
  settingsSlug: string,
  narrows: Shape<Held>,
  unknown: string
): Held {
  const root = ownRepoRoot()
  const at = harnessSettingsAt(root, settingsSlug, unknown)
  return narrows.parse(JSON.parse(readFileSync(`${root}/${at}`, "utf8")))
}
