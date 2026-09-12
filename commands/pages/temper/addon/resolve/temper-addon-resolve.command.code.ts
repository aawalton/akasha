import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { addonName } from "akasha/commands/arguments/pages/addon-name.argument.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperAddonResolve as page } from "akasha/commands/pages/temper/addon/resolve/temper-addon-resolve.command.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"
import {
  listAllAddons,
  resolveAddon,
} from "akasha/temper/addons-resolve/modules/addon-roster/addon-roster.module.code.ts"

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
