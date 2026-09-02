import type { Finding } from "../finding.page-type.ts"

export const anAuditCannotFinishBeforeTheTreeItJudgedIsGone = {
  id: "01a062cd-7242-7780-86ba-1e193ec95ab9",
  pageTypeSlug: "finding",
  slug: "an-audit-cannot-finish-before-the-tree-it-judged-is-gone",
  domainSlug: "domain/akasha-check",
  claim:
    "An audit reads every file the index names and holds nothing still while it runs, so under a swarm it reports on a tree that has already gone. Two runs were killed at thirty minutes having written nothing at all. A verdict that arrives after its subject cannot be acted on, and a run that never finishes cannot be told from one that found nothing.",
  evidence:
    "`akasha audit --help` states the design plainly: it runs `over every file the akasha folder holds`, `--check narrows which checks run and never which files they see`, and `it writes nothing, and holds nothing still while it runs`. So there is no way to scope a run by path, and no snapshot.\n\nMeasured 2026-09-02 while twenty seats worked one shared worktree. A full `akasha audit` was killed at thirty minutes with exit 143 and an empty output file. `akasha audit --check typecheck` alone was killed the same way at `30b247e057`, having completed earlier the same day at `1 check judged 25722 files, and none refused`. Between those two runs the tree went from 25,722 judged files to 28,685 tracked under `akasha/`, and 625 commits landed in the hour before the second run.\n\nAt ten commits a minute a thirty-minute walk crosses roughly three hundred commits. HEAD was independently observed moving twice inside one seat's three-addon measurement, `050e1d5499` to `8949f56573`. So even a run that completed would name a tree that no longer stood.\n\nThe cost is not the waiting. It is that a killed run and a clean run are told apart only by remembering to look at the exit code: exit 143 with an empty file reads, to anyone reporting from notes, exactly like nothing was refused. This was nearly published as a clean audit twice.",
} as const satisfies Finding
