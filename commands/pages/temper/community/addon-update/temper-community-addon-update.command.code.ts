import { listDeployables } from "@akasha/temper-addons-resolve/deployable-addons"
import { downloadAndInstall } from "akasha/temper/community-addons/addon-download/addon-download.module.code.ts"
import {
  distinctUids,
  type PlannedAddon,
  planUpdates,
  selectTargets,
  unknownOnlyDirs,
} from "akasha/temper/community-addons/addon-update-plan/addon-update-plan.module.code.ts"
import {
  fetchCatalog,
  fetchFileDetails,
} from "akasha/temper/community-addons/esoui-catalog/esoui-catalog.module.code.ts"
import { readInstalledAddons } from "akasha/temper/community-addons/installed-addons/installed-addons.module.code.ts"
import { addonsDir } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { valuesOf } from "../../../../../temper/temper-commands/argument-word-reading/argument-word-reading.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../modules/calling/calling.module.code.ts"
import { saidBy as messageOf } from "../../../../modules/fault-saying/fault-saying.module.code.ts"

const SAID_WRONG = 1

const FAILED = 3

const ONLY_FLAG = "--only"

const FORCE_FLAG = "--force"

const ADDONS_DIR_FLAG = "--addons-dir"

const REPO_ROOT_FLAG = "--repo-root"

const JSON_FLAG = "--json"

const SPACES = 2

type Outcome = {
  readonly dir: string
  readonly action: "updated" | "failed"
  readonly from: string | undefined
  readonly to: string | undefined
  readonly error?: string
}

function dirsByUid(selected: readonly PlannedAddon[]): ReadonlyMap<string, string[]> {
  const found = new Map<string, string[]>()
  for (const one of selected) {
    if (one.uid === undefined) continue
    const held = found.get(one.uid) ?? []
    held.push(one.dir)
    found.set(one.uid, held)
  }
  return found
}

function versionOf(group: readonly PlannedAddon[], dir: string): string | undefined {
  return group.find((one) => one.dir === dir)?.installedVersion
}

async function updatedGroup(
  group: readonly PlannedAddon[],
  uid: string,
  dirs: readonly string[],
  addonsPath: string
): Promise<readonly Outcome[]> {
  const latest = group[0]?.latestVersion
  try {
    const details = await fetchFileDetails(uid)
    const done = await downloadAndInstall(details, [...dirs], addonsPath)
    return done.installedDirs.map((dir) => ({
      dir,
      action: "updated" as const,
      from: versionOf(group, dir),
      to: done.version,
    }))
  } catch (thrown) {
    const why = messageOf(thrown)
    return group.map((one) => ({
      dir: one.dir,
      action: "failed" as const,
      from: one.installedVersion,
      to: latest,
      error: why,
    }))
  }
}

function lineOf(one: Outcome): string {
  if (one.action === "failed") {
    return `${one.dir}\tfailed\t${one.from ?? "-"}\t${one.error ?? ""}`
  }
  return `${one.dir}\tupdated\t${one.from ?? "-"}\t${one.to ?? "-"}`
}

export async function temperCommunityAddonUpdate(argv: readonly string[] = []): Promise<Answer> {
  const addonsPath = valuesOf(argv, ADDONS_DIR_FLAG)[0] ?? addonsDir()
  const repoRoot = valuesOf(argv, REPO_ROOT_FLAG)[0]
  const only = valuesOf(argv, ONLY_FLAG)

  let plan: ReturnType<typeof planUpdates>
  try {
    const owned = new Set(
      listDeployables(repoRoot === undefined ? undefined : { repoRoot }).map((one) => one.name)
    )
    const [catalog, installed] = await Promise.all([
      fetchCatalog(),
      readInstalledAddons(addonsPath),
    ])
    plan = planUpdates(installed, catalog, owned)
  } catch (thrown) {
    return refused(
      `the community catalog was not reached, so nothing here was updated: ${messageOf(thrown)}`,
      FAILED
    )
  }

  const unknown = unknownOnlyDirs(plan, only)
  if (unknown.length > 0) {
    return refused(`${ONLY_FLAG} names no installable addon: ${unknown.join(", ")}`, SAID_WRONG)
  }

  const selected = selectTargets(plan, { force: argv.includes(FORCE_FLAG), only })
  const grouped = dirsByUid(selected)

  const outcomes: Outcome[] = []
  for (const uid of distinctUids(selected)) {
    const group = selected.filter((one) => one.uid === uid)
    outcomes.push(...(await updatedGroup(group, uid, grouped.get(uid) ?? [], addonsPath)))
  }

  const failed = outcomes.filter((one) => one.action === "failed")
  const updated = outcomes.length - failed.length

  if (argv.includes(JSON_FLAG)) {
    return {
      report: JSON.stringify({ addonsDir: addonsPath, outcomes }, null, SPACES).split("\n"),
      refusals: failed.map((one) => `${one.dir} was not updated: ${one.error ?? ""}`),
      code: failed.length > 0 ? FAILED : 0,
    }
  }

  return {
    report: [
      ...outcomes.map(lineOf),
      `${String(updated)} updated, ${String(failed.length)} failed`,
    ],
    refusals: failed.map((one) => `${one.dir} was not updated: ${one.error ?? ""}`),
    code: failed.length > 0 ? FAILED : 0,
  }
}
