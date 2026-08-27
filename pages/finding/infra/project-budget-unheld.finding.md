---
id: 66136ee4-09b3-5574-a343-b9cfc04a0e7e
page-type-slug: finding
title: "Project budget unheld"
domain-slug: domain/global
---

# Claim

A standing budget of five active parent projects, scoped to execution and explicitly not to definition, stands only in a quarantined document queued for removal, so the sweep that empties `dirty/` takes it. Nothing live carries a project budget and no mechanism refuses past one, so a lead has no source for how many trees may run at once. The clause most at risk is the second: a full budget reads as a reason to stop defining, and the line forbids that.

# Evidence

The line stood at `dirty/skills/infra/rulings.md` line 14 and reads in full: "**Five active parent projects is the budget, and it governs execution — never definition.**" I removed it at commit `da837a9e3` while ingesting that source and carried it verbatim to `dirty/maybe-keep/skills/infra/rulings.md` at commit `13484d880`, with a composed `## Execution Budget` rule for `domains/infra.md` beside it. Both paths are quarantined.

Nothing live carries it. `rg -uuu -in "budget|work in progress|\bWIP\b|concurren|in flight|active parent" domains/` returns four hits, all other subjects: a money budget on `domains/monarch-category.md`, "work in progress" inside `domains/role.md`'s Foreign State, a line in `domains/lists/unresolved-checks.md`, and a cost line in `domains/tasks/code-harness/review-check.md`. `domains/infra.md` is eleven lines — front matter and one Definition bullet.

No mechanism refuses. `ops enforcement list --grep project` returns 0 mechanisms across 4 sources, and none of the twenty-nine `ops project` verbs bounds a count.

The machinery it scopes against is live: `domains/tasks/lead/define-project.md` ends "This run ends where the dispatch begins, and moves no status", and `dispatch-project.md` moves a parent to `awaiting_manager_claim`. The current position is consistent with the budget: `ops project list --owner aranya` exits 0 and returns six rows, every one at `awaiting_lead_definition` — six in definition, none in execution.

No standing finding covers it. `rg -uuu -il "budget|parent project|work in progress|\bWIP\b" findings/` returns ten files, all other subjects.

Not established: who set the number, or when. The line carries no attribution, and the same source says everything in it except its vision and Local Principles is a bootstrap that "none is owed deference" — which is not a claim that it is wrong. Also not established: which of the nineteen project statuses count as "active".
