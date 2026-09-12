import { resolve } from "node:path"
import {
  answering,
  DATA,
  INPUT,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { copyAddonMetadata } from "akasha/temper/addon-build/addon-metadata-copy/addon-metadata-copy.module.code.ts"
import {
  listAllAddons,
  resolveAddon,
} from "akasha/temper/addons-resolve/addon-roster/addon-roster.module.code.ts"
import { valuesOf } from "akasha/temper/commands/argument-word-reading/argument-word-reading.module.code.ts"

const ADDON = "--addon"
const CODE_ROOT = "--code-root"

export type Named = {
  readonly root: string
  readonly dir: string
  readonly canonicalName: string
}

export type Copying = (done: string[], named: Named) => Promise<Answer>

async function copied(done: string[], named: Named): Promise<Answer> {
  const made = await copyAddonMetadata(named.root, named.dir, named.canonicalName, done)
  const siblings = made.siblings.length === 0 ? "" : `: ${made.siblings.join(", ")}`
  return told([
    `copied ${named.canonicalName} metadata from ${named.dir} into ${made.distDir}`,
    `${String(made.namedFiles)} named file(s), ${String(made.metadataFolders)} metadata folder(s), ` +
      `${String(made.siblings.length)} sibling addon(s)${siblings}`,
  ])
}

export async function copiedBy(named: Named, copying: Copying = copied): Promise<Answer> {
  return await answering(async (done) => await copying(done, named))
}

export async function temperAddonCopyMetadata(argv: readonly string[] = []): Promise<Answer> {
  const asked = valuesOf(argv, ADDON)
  if (asked.length === 0) {
    return refused(
      `name the addon whose metadata is copied with ${ADDON}, since copying for an addon nobody named would overwrite build output nobody asked about`,
      INPUT
    )
  }
  if (asked.length > 1) {
    return refused(
      `one addon's metadata is copied at a time, and ${asked.join(", ")} names several`,
      INPUT
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

  return await copiedBy({ root, dir: found.dir, canonicalName: found.canonicalName })
}
