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
import { writeLoadOrder } from "akasha/temper/addon-build/addon-load-order/addon-load-order.module.code.ts"
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

export async function temperAddonGenerateLoadOrder(argv: readonly string[] = []): Promise<Answer> {
  const asked = valuesOf(argv, ADDON)
  if (asked.length === 0) {
    return refused(
      `name the addon a load order is written for with ${ADDON}, since writing one for an addon nobody named would overwrite build output nobody asked about`,
      INPUT
    )
  }
  if (asked.length > 1) {
    return refused(
      `one load order is written at a time, and ${asked.join(", ")} names several`,
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

  return await writtenBy({ root, dir: found.dir, canonicalName: found.canonicalName })
}
