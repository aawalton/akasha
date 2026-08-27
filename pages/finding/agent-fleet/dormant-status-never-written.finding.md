---
id: edc0e4fe-fecb-5680-b276-584ef74e358a
page-type-slug: finding
title: "Dormant status never written"
domain-slug: domain/agent-fleet
---

# Claim

Nothing in the code repository writes the `dormant` agent row status, while the machinery that reads it treats dormant rows as an ordinary live state and two numbered incidents turn on rows that hold it.

# Evidence

Read at `~/code` on 2026-08-07 at `383bf60d`, while emptying a quarantined question document that raised a wider version of it. That document is queued for removal and its own evidence has gone stale; this half has not.

Searched `packages/**` and `supabase/**` for any assignment of the value. Filtering out systemd's unrelated `dormant` enablement state and the `temper` addon catalogue leaves two hits: the constant `DORMANT_STATUS = "dormant"` at `agents/shared/db-agent-list.ts:49`, and a read comparison at `agents/shared/db-agent-status-patch.ts:225`. Every other occurrence across the tree is a read, a predicate, a query filter or prose. `stop` writes `stopped` and `retire` writes `retired`.

What reads it is not sketch machinery. `agents/shared/agent-dormancy.ts` (#14017) folds a dormant seat's absent process into a healthy `dormant` verdict rather than `dead`, naming three consumers it exists to stop misfiring: `agent alive`, the send dead-recipient guard, and project-dispatch reconcile. `dead-agent-oracle.ts:215-216` queries rows by that status. `agent-name-bind.ts:147` folds on it. The wake-watcher revives only a row holding it, which `ops seat stop --help` states to a user.

Two incidents assume such rows exist. `db-agent-status-patch.ts:181-193` reverses an earlier exemption because "a genuinely-dormant agent's process was TORN DOWN before the `dormant` status was written", citing #14431 — "a live seat wrongly stamped `dormant`" whose beat sustained the lying row into a duplicate ghost. `wake-watcher-tick.ts:365` and `decide-wake-match.ts:26` guard against that same seat.

So the tree holds a reader, a healer, a reviver, a query and two post-mortems for a status it never sets. Either a writer stands outside the paths searched, in which case the fleet's own code cannot see what produces one of its states; or dormant rows arise only by accident, in which case the descriptor's `dormancyPolicy` field describes an entry nothing performs.
