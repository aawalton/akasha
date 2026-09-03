import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { listDeployables } from "@akasha/temper-addons-resolve/deployable-addons"
import { installNamedAddon } from "@akasha/temper-community-addons/install-named-addon"
import { addonsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"

const SAID_WRONG = 1

const FAILED = 3

const FORCE_FLAG = "--force"

const ADDONS_DIR_FLAG = "--addons-dir"

const REPO_ROOT_FLAG = "--repo-root"

const JSON_FLAG = "--json"

const TAKING_A_VALUE = [ADDONS_DIR_FLAG, REPO_ROOT_FLAG]

const SPACES = 2

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function namesIn(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (TAKING_A_VALUE.includes(one)) {
      at += 1
      continue
    }
    if (one.startsWith("-")) continue
    found.push(one)
  }
  return found
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export async function temperCommunityAddonInstall(argv: readonly string[] = []): Promise<Answer> {
  const names = namesIn(argv)
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
