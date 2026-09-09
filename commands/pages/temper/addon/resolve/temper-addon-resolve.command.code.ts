import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages/code-root"
import { listAllAddons, resolveAddon } from "@akasha/temper-addons-resolve/addon-roster"
import { valuesOf } from "../../../../../temper/commands/argument-word-reading/argument-word-reading.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../modules/calling/calling.module.code.ts"

const DATA = 2

const ROOT_FLAG = "--repo-root"

const TAKES_A_VALUE = [ROOT_FLAG]

const FLAG_MARK = "--"

const SPACES = 2

function namesIn(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (TAKES_A_VALUE.includes(one)) {
      at += 1
      continue
    }
    if (one.startsWith(FLAG_MARK)) continue
    found.push(one)
  }
  return found
}

export function temperAddonResolve(argv: readonly string[] = []): Answer {
  const root = resolve(valuesOf(argv, ROOT_FLAG)[0] ?? codeRoot())

  const name = namesIn(argv)[0]
  if (name === undefined) {
    return refused(
      "nothing here names the addon resolved, so there is no name to reach one by",
      DATA
    )
  }

  const reached = resolveAddon(name, { repoRoot: root })
  const match = listAllAddons({ repoRoot: root }).find(
    (one) => one.dir === reached.dir && one.canonicalName === reached.canonicalName
  )
  if (match === undefined) {
    return refused(`${name} reaches no addon under ${root}`, DATA)
  }

  return { report: JSON.stringify(match, null, SPACES).split("\n"), refusals: [], code: 0 }
}
