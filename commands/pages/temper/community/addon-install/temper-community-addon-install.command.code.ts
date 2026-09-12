import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { listDeployables } from "akasha/temper/addons-resolve/deployable-addons/deployable-addons.module.code.ts"
import {
  namesIn,
  valuesOf,
} from "akasha/temper/commands/argument-word-reading/argument-word-reading.module.code.ts"
import { installNamedAddon } from "akasha/temper/community-addons/install-named-addon/install-named-addon.module.code.ts"
import { addonsDir } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const FORCE_FLAG = "--force"

const ADDONS_DIR_FLAG = "--addons-dir"

const CODE_ROOT_FLAG = "--code-root"

const JSON_FLAG = "--json"

const TAKING_A_VALUE = [ADDONS_DIR_FLAG, CODE_ROOT_FLAG]

const SPACES = 2

export async function temperCommunityAddonInstall(argv: readonly string[] = []): Promise<Answer> {
  const names = namesIn(argv, TAKING_A_VALUE)
  if (names.length === 0) {
    return refused(
      "nothing here names the community addon installed, so there is no name to reach one by",
      INPUT
    )
  }
  if (names.length > 1) {
    return refused(
      `an install names one addon, and ${names.join(", ")} names ${String(names.length)}`,
      INPUT
    )
  }

  const name = names[0] as string
  const addonsPath = valuesOf(argv, ADDONS_DIR_FLAG)[0] ?? addonsDir()
  const repoRoot = valuesOf(argv, CODE_ROOT_FLAG)[0]

  let outcome: Awaited<ReturnType<typeof installNamedAddon>>
  try {
    const owned = new Set(
      listDeployables(repoRoot === undefined ? undefined : { repoRoot }).map((one) => one.name)
    )
    outcome = await installNamedAddon(name, {
      addonsPath,
      force: argv.includes(FORCE_FLAG),
      ownedNames: owned,
    })
  } catch (thrown) {
    return refused(`${name} was not installed: ${messageOf(thrown)}`, OPERATIONAL)
  }

  if (argv.includes(JSON_FLAG)) {
    return {
      report: JSON.stringify({ name, addonsDir: addonsPath, ...outcome }, null, SPACES).split("\n"),
      refusals: [],
      code: OK,
    }
  }

  if (outcome.action === "skipped") {
    return {
      report: [
        `${name}\tskipped\t${outcome.dirs.join(",")}`,
        `every folder it installs is already there, and ${FORCE_FLAG} installs it again`,
      ],
      refusals: [],
      code: OK,
    }
  }

  return {
    report: [
      `${outcome.dirs.join(",")}\tinstalled\t${outcome.version}`,
      `${String(outcome.dirs.length)} folder(s) into ${addonsPath}, unmanaged, so nothing keeps it up to date`,
    ],
    refusals: [],
    code: OK,
  }
}
