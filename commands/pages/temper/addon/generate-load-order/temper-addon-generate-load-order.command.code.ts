import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
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
import { temperAddonGenerateLoadOrder as page } from "akasha/commands/pages/temper/addon/generate-load-order/temper-addon-generate-load-order.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { writeLoadOrder } from "akasha/temper/addon-build/modules/addon-load-order/addon-load-order.module.code.ts"
import {
  listAllAddons,
  resolveAddon,
} from "akasha/temper/addons-resolve/modules/addon-roster/addon-roster.module.code.ts"

const NAMED = [codeRootArgument, addon]

export type Named = {
  readonly root: string
  readonly dir: string
  readonly canonicalName: string
}

export type Writing = (done: string[], named: Named) => Promise<Answer>

async function written(done: string[], named: Named): Promise<Answer> {
  const made = await writeLoadOrder(named.root, named.dir, named.canonicalName, done)
  return told([
    `wrote ${named.canonicalName} over ${String(made.luaCount)} Lua file(s) from ${named.dir}`,
    `${String(made.bytes)} byte(s) at ${made.manifestPath}, beside ${made.buildIdPath}`,
  ])
}

export async function writtenBy(named: Named, writing: Writing = written): Promise<Answer> {
  return await answering(async (done) => await writing(done, named))
}

export async function temperAddonGenerateLoadOrder(
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

  return await writtenBy({ root, dir: found.dir, canonicalName: found.canonicalName })
}
