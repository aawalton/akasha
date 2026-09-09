import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages/code-root"
import { listAllAddons, resolveAddon } from "@akasha/temper-addons-resolve/addon-roster"
import { copyAddonMetadata } from "akasha/temper/addon-build/addon-metadata-copy/addon-metadata-copy.module.code.ts"
import { valuesOf } from "../../../../../temper/commands/argument-word-reading/argument-word-reading.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../modules/calling/calling.module.code.ts"
import { saidBy as messageOf } from "../../../../modules/fault-saying/fault-saying.module.code.ts"

const SAID_WRONG = 1
const DATA = 2

const ADDON = "--addon"
const CODE_ROOT = "--code-root"

export async function temperAddonCopyMetadata(argv: readonly string[] = []): Promise<Answer> {
  const asked = valuesOf(argv, ADDON)
  if (asked.length === 0) {
    return refused(
      `name the addon whose metadata is copied with ${ADDON}, since copying for an addon nobody named would overwrite build output nobody asked about`,
      SAID_WRONG
    )
  }
  if (asked.length > 1) {
    return refused(
      `one addon's metadata is copied at a time, and ${asked.join(", ")} names several`,
      SAID_WRONG
    )
  }

  const root = resolve(valuesOf(argv, CODE_ROOT)[0] ?? codeRoot())
  const roster = listAllAddons({ repoRoot: root })
  const name = asked[0] as string
  const found = resolveAddon(name, { repoRoot: root })
  if (!roster.some((one) => one.dir === found.dir)) {
    return refused(
      `${name} names no addon under ${root}, whose roster holds ${String(roster.length)} of them`,
      DATA
    )
  }

  try {
    const done = await copyAddonMetadata(root, found.dir, found.canonicalName)
    return {
      report: [
        `copied ${found.canonicalName} metadata from ${found.dir} into ${done.distDir}`,
        `${String(done.namedFiles)} named file(s), ${String(done.metadataFolders)} metadata folder(s), ${String(done.siblings.length)} sibling addon(s)${done.siblings.length === 0 ? "" : `: ${done.siblings.join(", ")}`}`,
      ],
      refusals: [],
      code: 0,
    }
  } catch (thrown) {
    return refused(`${found.canonicalName}: ${messageOf(thrown)}`, DATA)
  }
}
