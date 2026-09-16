import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Recording } from "akasha/check/modules/audit-recording/audit-recording.module.code.ts"
import type { Verdict } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import type { Gathered } from "akasha/check/modules/checking/checking.module.code.ts"
import { recorded } from "akasha/check/modules/cost/check-cost.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { runGit } from "akasha/git/modules/answering/git-answering.module.code.ts"
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

export function taking(slug: string, root: string, ending: string): Gathered {
  return { ...gathered(slug, root), isInput: (path) => path.endsWith(ending) }
}

export function checked(slug: string, root: string): Gathered {
  const one = gathered(slug, root)
  mkdirSync(join(root, dirname(one.page)), { recursive: true })
  writeFileSync(join(root, one.page), "export const one = {}\n", "utf8")
  return one
}

export async function repoOf(commits: number): Promise<{ root: string; made: readonly string[] }> {
  const root = scratch.rootFor("akasha-audit-serving-")
  await runGit(["init", "-q", "-b", "main"], root)
  await runGit(["config", "user.email", "serving@example.com"], root)
  await runGit(["config", "user.name", "serving"], root)
  const made: string[] = []
  for (let at = 0; at < commits; at += 1) {
    writeFileSync(join(root, "one.txt"), `${at}\n`, "utf8")
    await runGit(["add", "one.txt"], root)
    await runGit(["commit", "-q", "-m", `${at}`], root)
    made.push((await runGit(["rev-parse", "HEAD"], root)).stdout)
  }
  return { root, made }
}
