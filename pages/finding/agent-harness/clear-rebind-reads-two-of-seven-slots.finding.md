---
id: 20b0d04a-4ef0-5f94-859c-632d07f2572a
page-type-slug: finding
title: "Clear rebind reads two of seven slots"
domain-slug: domain/agent-harness
---

# Claim

The `/clear` rebind's `readPredecessor` asks the predecessor's row for six fields, of which two are seat attributes. `pickCarriedAgentName`, which it feeds, declares seven slots it will carry. The four it is never given — `domain`, `task`, `mode` and `projectSeq` — are dropped on every rebind, and the successor is a fresh row that never held them.

# Evidence

Read on this workstation on 2026-08-17, in `tools/lib/supervisor-rebind-deps.ts` and `tools/lib/supervisor-rebind-carry.ts`.

`readPredecessor` returns `name`, `title`, `launch`, `parent`, `role` and `persona`. Its declared type in `ClearRebindDeps` is wider — it names `domain`, `task`, `mode` and `projectSeq` as well — so the live implementation satisfies its type by returning fewer optional fields than the contract advertises, and nothing reports the difference.

`pickCarriedAgentName` reads `role`, `domain`, `persona`, `task`, `mode`, `principal` and `projectSeq` off whatever it is handed, and builds the slots it passes to `setAgentName`. Given what `readPredecessor` supplies, four of those seven are always `undefined`, and `setAgentName` writes only the slots that are defined. The successor id comes from `createAgent`, which creates a new row, so an unwritten slot is absent rather than stale.

`principal` was an eighth case of the same shape and is now closed: it is read and carried as of commit `2398b09f5e`, because a persona carried onto a row with no principal breaches `page-types/persona.md`. The four remaining have no such invariant standing against them, which is why they were left.

The visible cost is on the name. A seat spelling its domain and role — `agent-harness-worker-19371` — recomposes from `role` alone after a rebind, and `ops instructions seat` re-states the rest only when the agent next runs the verb. Between the rebind and that call, the row understates what the seat is, and anything routing on `domain` or counting on `projectSeq` reads the understatement.

Not measured: how many live seats currently show it. The rebind fires on `/clear`, so the population is every seat compacted since the row was last re-stated, and nothing records when that was.
