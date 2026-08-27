---
id: 9c75134b-910d-5f9b-b97f-c4e757a3261e
slug: run-it-claim-bound-four-times
page-type-slug: finding
title: "Run it claim bound four times"
domain-slug: domain/agent-harness
---

# Claim

One claim — answer a question about the machinery by running it rather than by reading its source — stands separately on three task surfaces in near-identical prose, and on no domain. Two of the three share a sentence word for word. No surface is the original, so a reader meeting two of them has nothing that says which drifted, and a seat whose task is none of the three holds the claim from nowhere.

# Evidence

Measured 2026-08-04 in `~/instructions`, firsthand, by `grep -rn "rather than reading the source\|rather than reading the account\|reading the source for it" tasks/ domains/ roles/`.

Four hits, all `# Sequence` bullets, none on a domain:

`tasks/archivist/review-instructions.md:19` — "**Run** whatever the slice claims of the machinery rather than reading the source for it — the verb's `--help`, the gate, the check. A layer read alone gives a confident wrong answer that reads exactly like a checked one."

`tasks/alan-harness/guided-close-read.md:24` — same first clause, then "and bring what it returned", then that second sentence again word for word.

`tasks/archivist/ingest-instructions.md:20` — same first clause, then "that the path exists, that the verb takes that flag, that the gate refuses what it says. A pointer at something deleted reads exactly like a live one."

`tasks/lead/verify-handback.md:21` — "**Run** each criterion's named instrument yourself rather than reading the account of it. The account is the seat's own report on its own work."

Re-measured 2026-08-27 in akasha, where the four task documents moved to `pages/task/`. Three of the four surfaces stand: `pages/task/review-instructions.task.md:21` and `pages/task/guided-close-read.task.md:25` carry the first clause as "**Run** whatever the line claims about the machinery rather than reading the code for it" and then the same second sentence word for word — "A piece of the machinery you have only read, never run, gives a confident wrong answer that reads exactly like a checked one." — and `pages/task/verify-handback.task.md:22` carries "**Settle** the intent by an instrument you run yourself rather than by the account of one. The account is the seat's own report on its own work." The `ingest-instructions` task is gone, and no domain carries the claim.

`pages/domain/agent-harness.domain.md:53-61` states what this stands against — Single Authority, "Bind each claim from exactly one document. Where two documents bind one claim, their disagreement is a contradiction nothing can settle."

Two failures the claim would have reached were logged against seats holding none of the four tasks: rows #17766 and #17772, both cut by the agent-harness lead on a define pass, each concluding from a source search that a crossing was absent.

NOT MEASURED: whether a fifth spelling exists under a phrasing none of the three query shapes would match; the retired corpus at `dirty/` was swept for the claim's substance but not for these three shapes; and whether any of the four bullets has drifted in meaning rather than only in wording.
