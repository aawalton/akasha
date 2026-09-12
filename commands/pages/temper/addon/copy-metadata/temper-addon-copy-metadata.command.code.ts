import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { addon } from "akasha/commands/arguments/pages/addon.argument.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperAddonCopyMetadata as page } from "akasha/commands/pages/temper/addon/copy-metadata/temper-addon-copy-metadata.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { copyAddonMetadata } from "akasha/temper/addon-build/addon-metadata-copy/addon-metadata-copy.module.code.ts"
import {
  listAllAddons,
  resolveAddon,
} from "akasha/temper/addons-resolve/addon-roster/addon-roster.module.code.ts"

const NAMED = [codeRootArgument, addon]

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

export async function temperAddonCopyMetadata(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const root = resolve(taken.codeRoot ?? codeRoot())
  const roster = listAllAddons({ repoRoot: root })
  const name = taken.addon
  const found = resolveAddon(name, { repoRoot: root })
  if (!roster.some((one) => one.dir === found.dir)) {
    return refused(
      `${name} names no addon under ${root}, whose roster holds ${String(roster.length)} of them`,
      DATA
    )
  }

  return await copiedBy({ root, dir: found.dir, canonicalName: found.canonicalName })
}
