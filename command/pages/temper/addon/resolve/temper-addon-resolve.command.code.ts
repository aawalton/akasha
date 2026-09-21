import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { addonName } from "akasha/command/argument/pages/addon-name.argument.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperAddonResolve as page } from "akasha/command/pages/temper/addon/resolve/temper-addon-resolve.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import {
  listAllAddons,
  resolveAddon,
} from "akasha/temper/addon/build/resolve/modules/addon-roster/addon-roster.module.code.ts"

const NAMED = [codeRootArgument, addonName]

const SPACES = 2

export function temperAddonResolve(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const root = resolve(taken.codeRoot ?? codeRoot())
  const name = taken.addonName

  const reached = resolveAddon(name, { repoRoot: root })
  const match = listAllAddons({ repoRoot: root }).find(
    (one) => one.dir === reached.dir && one.canonicalName === reached.canonicalName
  )
  if (match === undefined) {
    return refused(`${name} reaches no addon under ${root}`, DATA)
  }

  return told(JSON.stringify(match, null, SPACES).split("\n"))
}
