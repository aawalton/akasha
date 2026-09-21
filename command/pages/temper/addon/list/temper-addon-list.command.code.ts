import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperAddonList as page } from "akasha/command/pages/temper/addon/list/temper-addon-list.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import {
  type AddonInfo,
  listAllAddons,
} from "akasha/temper/addon/addons-resolve/modules/addon-roster/addon-roster.module.code.ts"

const NAMED = [json, codeRootArgument]

const SPACES = 2

function widthOf(all: readonly AddonInfo[], of: (one: AddonInfo) => string): number {
  return all.reduce((widest, one) => Math.max(widest, of(one).length), 0)
}

function rowsOf(all: readonly AddonInfo[]): readonly string[] {
  const nameWidth = widthOf(all, (one) => one.canonicalName)
  const dirWidth = widthOf(all, (one) => one.repoRelDir)
  return all.map(
    (one) => `${one.canonicalName.padEnd(nameWidth)}  ${one.repoRelDir.padEnd(dirWidth)}`
  )
}

export function temperAddonList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const root = resolve(taken.codeRoot ?? codeRoot())

  const all = listAllAddons({ repoRoot: root })
  if (all.length === 0) {
    return refused(
      `${root} holds no addon folder carrying an addon manifest, so a clean run here would name no addon`,
      DATA
    )
  }

  if (taken.json) {
    return told(JSON.stringify(all, null, SPACES).split("\n"))
  }

  return told([...rowsOf(all), `${String(all.length)} addon(s) under ${root}`])
}
