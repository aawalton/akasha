import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { addonsDir as addonsDirArgument } from "akasha/commands/arguments/pages/addons-dir.argument.ts"
import { codeRoot } from "akasha/commands/arguments/pages/code-root.argument.ts"
import { communityAddon } from "akasha/commands/arguments/pages/community-addon.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  answering,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperCommunityAddonInstall as page } from "akasha/commands/pages/temper/community/addon-install/temper-community-addon-install.command.ts"
import { listDeployables } from "akasha/temper/addons-resolve/deployable-addons/deployable-addons.module.code.ts"
import { installNamedAddon } from "akasha/temper/community-addons/install-named-addon/install-named-addon.module.code.ts"
import { addonsDir } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const NAMED = [json, codeRoot, addonsDirArgument, force, communityAddon]

const SPACES = 2

export async function temperCommunityAddonInstall(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const name = taken.communityAddon
  const addonsPath = taken.addonsDir ?? addonsDir()
  const repoRoot = taken.codeRoot

  return await answering(async (done) => {
    let outcome: Awaited<ReturnType<typeof installNamedAddon>>
    try {
      const owned = new Set(
        listDeployables(repoRoot === undefined ? undefined : { repoRoot }).map((one) => one.name)
      )
      outcome = await installNamedAddon(
        name,
        { addonsPath, force: taken.force, ownedNames: owned },
        done
      )
    } catch (thrown) {
      if (done.length === 0) {
        return refused(`${name} was not installed: ${messageOf(thrown)}`, OPERATIONAL)
      }
      throw new OperationalError(`${name} was not installed whole: ${messageOf(thrown)}`)
    }

    if (taken.json) {
      return told(
        JSON.stringify({ name, addonsDir: addonsPath, ...outcome }, null, SPACES).split("\n")
      )
    }

    if (outcome.action === "skipped") {
      return told([
        `${name}\tskipped\t${outcome.dirs.join(",")}`,
        `every folder it installs is already there, and ${force.said} installs it again`,
      ])
    }

    return told([
      `${outcome.dirs.join(",")}\tinstalled\t${outcome.version}`,
      `${String(outcome.dirs.length)} folder(s) into ${addonsPath}, unmanaged, so nothing keeps it up to date`,
    ])
  })
}
