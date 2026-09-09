import { resolve } from "node:path"
import { saidBy as messageOf } from "@akasha/command-system/fault-saying"
import { codeRoot } from "@akasha/pages/code-root"
import { listAllAddons, resolveAddon } from "@akasha/temper-addons-resolve/addon-roster"
import { writeLoadOrder } from "akasha/temper/addon-build/addon-load-order/addon-load-order.module.code.ts"
import { valuesOf } from "../../../../../temper/temper-commands/argument-word-reading/argument-word-reading.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../modules/calling/calling.module.code.ts"

const SAID_WRONG = 1
const DATA = 2

const ADDON = "--addon"
const CODE_ROOT = "--code-root"

export async function temperAddonGenerateLoadOrder(argv: readonly string[] = []): Promise<Answer> {
  const asked = valuesOf(argv, ADDON)
  if (asked.length === 0) {
    return refused(
      `name the addon a load order is written for with ${ADDON}, since writing one for an addon nobody named would overwrite build output nobody asked about`,
      SAID_WRONG
    )
  }
  if (asked.length > 1) {
    return refused(
      `one load order is written at a time, and ${asked.join(", ")} names several`,
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
    const written = await writeLoadOrder(root, found.dir, found.canonicalName)
    return {
      report: [
        `wrote ${found.canonicalName} over ${String(written.luaCount)} Lua file(s) from ${found.dir}`,
        `${String(written.bytes)} byte(s) at ${written.manifestPath}, beside ${written.buildIdPath}`,
      ],
      refusals: [],
      code: 0,
    }
  } catch (thrown) {
    return refused(`${found.canonicalName}: ${messageOf(thrown)}`, DATA)
  }
}
