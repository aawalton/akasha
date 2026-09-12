import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { addonsDir as addonsDirArgument } from "akasha/commands/arguments/pages/addons-dir.argument.ts"
import { codeRoot } from "akasha/commands/arguments/pages/code-root.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { outdated } from "akasha/commands/arguments/pages/outdated.argument.ts"
import {
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperCommunityAddonList as page } from "akasha/commands/pages/temper/community/addon-list/temper-community-addon-list.command.ts"
import { listDeployables } from "akasha/temper/addons-resolve/deployable-addons/deployable-addons.module.code.ts"
import {
  type PlannedAddon,
  planUpdates,
} from "akasha/temper/community-addons/addon-update-plan/addon-update-plan.module.code.ts"
import { fetchCatalog } from "akasha/temper/community-addons/esoui-catalog/esoui-catalog.module.code.ts"
import { readInstalledAddons } from "akasha/temper/community-addons/installed-addons/installed-addons.module.code.ts"
import { addonsDir } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const NAMED = [json, codeRoot, addonsDirArgument, outdated]

const SPACES = 2

function ownedIn(repoRoot: string | undefined): ReadonlySet<string> {
  return new Set(
    listDeployables(repoRoot === undefined ? undefined : { repoRoot }).map((one) => one.name)
  )
}

function countsOf(all: readonly PlannedAddon[]): Record<PlannedAddon["status"], number> {
  const counts = { outdated: 0, "up-to-date": 0, unmatched: 0, "deploy-owned": 0 }
  for (const one of all) counts[one.status] += 1
  return counts
}

function countLine(counts: Record<PlannedAddon["status"], number>): string {
  return (
    `${String(counts.outdated)} outdated, ${String(counts["up-to-date"])} up-to-date, ` +
    `${String(counts.unmatched)} unmatched, ${String(counts["deploy-owned"])} deploy-owned`
  )
}

export async function temperCommunityAddonList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const addonsPath = taken.addonsDir ?? addonsDir()
  const repoRoot = taken.codeRoot

  let plan: ReturnType<typeof planUpdates>
  try {
    const owned = ownedIn(repoRoot)
    const [catalog, installed] = await Promise.all([
      fetchCatalog(),
      readInstalledAddons(addonsPath),
    ])
    plan = planUpdates(installed, catalog, owned)
  } catch (thrown) {
    return refused(
      `the community catalog was not reached, so no addon here could be weighed against it: ${messageOf(thrown)}`,
      OPERATIONAL
    )
  }

  const shown = taken.outdated
    ? plan.addons.filter((one) => one.status === "outdated")
    : plan.addons
  const counts = countsOf(plan.addons)

  if (taken.json) {
    return told(
      JSON.stringify({ addonsDir: addonsPath, counts, addons: shown }, null, SPACES).split("\n")
    )
  }

  return told([
    ...shown.map(
      (one) =>
        `${one.dir}\t${one.status}\t${one.installedVersion ?? "-"}\t${one.latestVersion ?? "-"}`
    ),
    countLine(counts),
  ])
}
