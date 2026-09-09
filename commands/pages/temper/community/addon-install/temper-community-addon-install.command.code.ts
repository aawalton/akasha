import { listDeployables } from "akasha/temper/addons-resolve/deployable-addons/deployable-addons.module.code.ts"
import { installNamedAddon } from "akasha/temper/community-addons/install-named-addon/install-named-addon.module.code.ts"
import { addonsDir } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import {
  namesIn,
  valuesOf,
} from "../../../../../temper/commands/argument-word-reading/argument-word-reading.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../modules/calling/calling.module.code.ts"
import { saidBy as messageOf } from "../../../../modules/fault-saying/fault-saying.module.code.ts"

const SAID_WRONG = 1

const FAILED = 3

const FORCE_FLAG = "--force"

const ADDONS_DIR_FLAG = "--addons-dir"

const REPO_ROOT_FLAG = "--repo-root"

const JSON_FLAG = "--json"

const TAKING_A_VALUE = [ADDONS_DIR_FLAG, REPO_ROOT_FLAG]

const SPACES = 2

export async function temperCommunityAddonInstall(argv: readonly string[] = []): Promise<Answer> {
  const names = namesIn(argv, TAKING_A_VALUE)
  if (names.length === 0) {
    return refused(
      "nothing here names the community addon installed, so there is no name to reach one by",
      SAID_WRONG
    )
  }
  if (names.length > 1) {
    return refused(
      `an install names one addon, and ${names.join(", ")} names ${String(names.length)}`,
      SAID_WRONG
    )
  }

  const name = names[0] as string
  const addonsPath = valuesOf(argv, ADDONS_DIR_FLAG)[0] ?? addonsDir()
  const repoRoot = valuesOf(argv, REPO_ROOT_FLAG)[0]

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
    return refused(`${name} was not installed: ${messageOf(thrown)}`, FAILED)
  }

  if (argv.includes(JSON_FLAG)) {
    return {
      report: JSON.stringify({ name, addonsDir: addonsPath, ...outcome }, null, SPACES).split("\n"),
      refusals: [],
      code: 0,
    }
  }

  if (outcome.action === "skipped") {
    return {
      report: [
        `${name}\tskipped\t${outcome.dirs.join(",")}`,
        `every folder it installs is already there, and ${FORCE_FLAG} installs it again`,
      ],
      refusals: [],
      code: 0,
    }
  }

  return {
    report: [
      `${outcome.dirs.join(",")}\tinstalled\t${outcome.version}`,
      `${String(outcome.dirs.length)} folder(s) into ${addonsPath}, unmanaged, so nothing keeps it up to date`,
    ],
    refusals: [],
    code: 0,
  }
}
