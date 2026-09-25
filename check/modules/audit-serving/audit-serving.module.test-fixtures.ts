import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  type Recording,
  verdictSent,
} from "akasha/check/modules/audit-recording/audit-recording.module.code.ts"
import type { Verdict } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import type { Gathered } from "akasha/check/modules/checking/checking.module.code.ts"
import { recorded } from "akasha/check/modules/cost/check-cost.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { ranAwaited } from "akasha/git/modules/running/git-running.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

export const scratch = scratchWorld()

export const NOW = "2026-09-11T00:00:00.000Z"

export const LOGS = "audit.logs"

export const CLEAN: Verdict = { commit: "a", ranAt: NOW, refusals: [], unrun: false }

export const NOTHING: Change = {
  root: "/nowhere",
  changed: [],
  before: () => null,
  after: () => null,
}

export function into(root: string): Recording {
  return (page, under, line) => Promise.resolve(recorded(root, page, `${line}\n`, under))
}

export async function cleanKept(root: string, check: Gathered, commit: string): Promise<void> {
  await verdictSent(check.page, check.slug, { ...CLEAN, commit }, LOGS, into(root))
}

export function gathered(slug: string, root: string): Gathered {
  return {
    slug,
    page: `check/code/pages/${slug}/${slug}.check-code.ts`,
    root,
    runsOn: ["audit"],
    isInput: null,
    run: () => [],
  }
}

export function checked(slug: string, root: string): Gathered {
  const one = gathered(slug, root)
  mkdirSync(join(root, dirname(one.page)), { recursive: true })
  writeFileSync(join(root, one.page), "export const one = {}\n", "utf8")
  return one
}

export async function repoOf(commits: number): Promise<{ root: string; made: readonly string[] }> {
  const root = scratch.rootFor("akasha-audit-serving-")
  await ranAwaited(root, ["init", "-q", "-b", "main"])
  await ranAwaited(root, ["config", "user.email", "serving@example.com"])
  await ranAwaited(root, ["config", "user.name", "serving"])
  const made: string[] = []
  for (let at = 0; at < commits; at += 1) {
    writeFileSync(join(root, "one.txt"), `${at}\n`, "utf8")
    await ranAwaited(root, ["add", "one.txt"])
    await ranAwaited(root, ["commit", "-q", "-m", `${at}`])
    made.push((await ranAwaited(root, ["rev-parse", "HEAD"])).out.trim())
  }
  return { root, made }
}
