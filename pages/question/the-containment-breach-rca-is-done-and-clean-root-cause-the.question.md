---
page-type-slug: question
id: 019f9ac5-e2f2-7abe-a15c-675b093a09a1
title: "The containment-breach RCA is done and clean. Root cause: the orchestrator reaps a pipeline-worker on the SAME edge that creates the worker's cascade work — 'pipeline row is terminal' means both 'there is cascade work to do' and 'this worker is no longer wanted'. 25909's worker was SIGTERMed 1.3s into its sweep and never respawned. Verified at source.\n\nThere are two fix paths and the choice is a risk-appetite call during a careful restart, so it is yours.\n\n**A — two smalls now, file the large.** (1) One predicate change: desiredSeqs becomes 'any non-terminal node in the subtree' instead of 'the root row is non-terminal'. Makes the reap honest, respawns a worker that dies mid-cascade, and auto-heals the existing 7-pipeline / 374-step residue on the next reconcile. (2) Give the pod dispatcher an ancestor gate — I verified it has NO status field of any kind, so it structurally cannot see that its pipeline is dead; enrich already loads both parent pages, so the fields are free. Together: breach closed, race closed, residue healed, both small.\n\n**B — go large now.** Cascade terminal status atomically at the plpgsql write boundary and declare a coherenceRule making 'non-terminal child under terminal parent' unrepresentable, then delete the worker's cascade arms as dead code. This is the Existence-Check answer — it removes the deferred second writer entirely rather than keeping it alive. But it is large, on the hot page-write path, needs FizzBee coverage and a one-off repair, while we are bringing the fleet back up.\n\nMy read: A. Not because B is wrong — B is the principled endpoint and I would file it immediately as its own row — but because a plpgsql change on the page write boundary is the least appealing thing to land during a restart, and A closes the actual breach tonight at small cost."
slug: the-containment-breach-rca-is-done-and-clean-root-cause-the
status: answered
source-context: "019f93a6-67c0-7174-a75d-40ae007e92e4"
asked-by: 019eb8d9-abdd-7890-b2cb-ec3e9dbd8b19
options:
  - "A — two smalls now, file the large as its own row"
  - "B — go large now, do it properly"
  - "A now, and I want B started in parallel"
  - "Just the dispatcher gate tonight, hold the rest"
answered-at: 2026-07-25T19:41:38.478Z
---
A — two smalls now, file the large as its own row
