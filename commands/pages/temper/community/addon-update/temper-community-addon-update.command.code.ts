import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { addonsDir as addonsDirArgument } from "akasha/commands/arguments/pages/addons-dir.argument.ts"
import { codeRoot } from "akasha/commands/arguments/pages/code-root.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { only as onlyArgument } from "akasha/commands/arguments/pages/only.argument.ts"
import {
  answeredWith,
  INPUT,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperCommunityAddonUpdate as page } from "akasha/commands/pages/temper/community/addon-update/temper-community-addon-update.command.ts"
import { listDeployables } from "akasha/temper/addons-resolve/deployable-addons/deployable-addons.module.code.ts"
import {
  fetchCatalog,
  fetchFileDetails,
} from "akasha/temper/community-addons/esoui-catalog/esoui-catalog.module.code.ts"
import { readInstalledAddons } from "akasha/temper/community-addons/installed-addons/installed-addons.module.code.ts"
import {
  clearedSaid,
  downloadAndInstall,
  laidSaid,
} from "akasha/temper/community-addons/modules/addon-download/addon-download.module.code.ts"
import {
  distinctUids,
  type PlannedAddon,
  planUpdates,
  selectTargets,
  unknownOnlyDirs,
} from "akasha/temper/community-addons/modules/addon-update-plan/addon-update-plan.module.code.ts"
import { addonsDir } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const NAMED = [json, codeRoot, addonsDirArgument, force, onlyArgument]

const SPACES = 2

export type Outcome = {
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

export type Saying = (dir: string, addonsPath: string) => string

export function amongDone(
  group: readonly PlannedAddon[],
  done: readonly string[],
  addonsPath: string,
  saying: Saying
): ReadonlySet<string> {
  const found = group.filter((one) => done.includes(saying(one.dir, addonsPath)))
  return new Set(found.map((one) => one.dir))
}

export function carriedNothingSaid(uid: string): string {
  return `the ESOUI download for file ${uid} carried nothing for it`
}

export function wentSaid(dir: string, addonsPath: string, why: string): string {
  return (
    `${dir} was cleared from ${addonsPath} and the new one never landed, so ${dir} is gone ` +
    `rather than left as it was — ${why}`
  )
}

export function outcomesFor(
  group: readonly PlannedAddon[],
  to: string | undefined,
  laid: ReadonlySet<string>,
  why: (dir: string) => string
): readonly Outcome[] {
  return group.map((one) => {
    const both = { dir: one.dir, from: one.installedVersion, to }
    if (laid.has(one.dir)) return { ...both, action: "updated" as const }
    return { ...both, action: "failed" as const, error: why(one.dir) }
  })
}

async function updatedGroup(
  group: readonly PlannedAddon[],
  uid: string,
  dirs: readonly string[],
  addonsPath: string
): Promise<readonly Outcome[]> {
  const latest = group[0]?.latestVersion
  const done: string[] = []
  try {
    const details = await fetchFileDetails(uid)
    const held = await downloadAndInstall(details, [...dirs], addonsPath, done)
    return outcomesFor(group, held.version, new Set(held.installedDirs), () =>
      carriedNothingSaid(uid)
    )
  } catch (thrown) {
    const cleared = amongDone(group, done, addonsPath, clearedSaid)
    const why = messageOf(thrown)
    return outcomesFor(group, latest, amongDone(group, done, addonsPath, laidSaid), (dir) =>
      cleared.has(dir) ? wentSaid(dir, addonsPath, why) : why
    )
  }
}

function lineOf(one: Outcome): string {
  if (one.action === "failed") {
    return `${one.dir}\tfailed\t${one.from ?? "-"}\t${one.error ?? ""}`
  }
  return `${one.dir}\tupdated\t${one.from ?? "-"}\t${one.to ?? "-"}`
}

export async function temperCommunityAddonUpdate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const addonsPath = taken.addonsDir ?? addonsDir()
  const repoRoot = taken.codeRoot
  const only = taken.only

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
      OPERATIONAL
    )
  }

  const unknown = unknownOnlyDirs(plan, only)
  if (unknown.length > 0) {
    return refused(`${onlyArgument.said} names no installable addon: ${unknown.join(", ")}`, INPUT)
  }

  const selected = selectTargets(plan, { force: taken.force, only })
  const grouped = dirsByUid(selected)

  const outcomes: Outcome[] = []
  for (const uid of distinctUids(selected)) {
    const group = selected.filter((one) => one.uid === uid)
    outcomes.push(...(await updatedGroup(group, uid, grouped.get(uid) ?? [], addonsPath)))
  }

  const failed = outcomes.filter((one) => one.action === "failed")
  const updated = outcomes.length - failed.length

  const refusals = failed.map((one) => `${one.dir} was not updated: ${one.error ?? ""}`)
  const code = failed.length > 0 ? OPERATIONAL : OK

  if (taken.json) {
    return answeredWith(
      JSON.stringify({ addonsDir: addonsPath, outcomes }, null, SPACES).split("\n"),
      refusals,
      code
    )
  }

  return answeredWith(
    [...outcomes.map(lineOf), `${String(updated)} updated, ${String(failed.length)} failed`],
    refusals,
    code
  )
}
