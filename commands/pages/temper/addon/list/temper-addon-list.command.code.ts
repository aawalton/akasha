import { resolve } from "node:path"
import { DATA, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  type AddonInfo,
  listAllAddons,
} from "akasha/temper/addons-resolve/addon-roster/addon-roster.module.code.ts"
import { valuesOf } from "akasha/temper/commands/argument-word-reading/argument-word-reading.module.code.ts"

const ROOT_FLAG = "--code-root"

const JSON_FLAG = "--json"

const SPACES = 2

function widthOf(all: readonly AddonInfo[], of: (one: AddonInfo) => string): number {
  return all.reduce((widest, one) => Math.max(widest, of(one).length), 0)
}

function rowsOf(all: readonly AddonInfo[]): readonly string[] {
  const nameWidth = widthOf(all, (one) => one.canonicalName)
  const dirWidth = widthOf(all, (one) => one.repoRelDir)
  return all.map(
    (one) =>
      `${one.canonicalName.padEnd(nameWidth)}  ${one.repoRelDir.padEnd(dirWidth)}  closure=${String(one.workspaceClosure.length)}`
  )
}

export function temperAddonList(argv: readonly string[] = []): Answer {
  const root = resolve(valuesOf(argv, ROOT_FLAG)[0] ?? codeRoot())

  const all = listAllAddons({ repoRoot: root })
  if (all.length === 0) {
    return refused(
      `${root} holds no addon folder carrying an addon manifest, so a clean run here would name no addon`,
      DATA
    )
  }

  if (argv.includes(JSON_FLAG)) {
    return { report: JSON.stringify(all, null, SPACES).split("\n"), refusals: [], code: OK }
  }

  return {
    report: [...rowsOf(all), `${String(all.length)} addon(s) under ${root}`],
    refusals: [],
    code: OK,
  }
}
