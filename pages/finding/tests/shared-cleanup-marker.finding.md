---
id: 03b2d04f-9430-52ee-9e0b-31b0fb8ee1d9
page-type-slug: finding
title: "Shared cleanup marker"
domain-slug: domain/global
---

# Claim

The supervisor integration suite hard-deletes every agent row carrying one shared marker, so two runs of it against the same Supabase destroy each other's rows mid-test — and the tree that ships it now dispatches fifty-five seats into one worktree.

# Evidence

`cleanupIntegrationRows` in `packages/agents/supervisor/src/_supervisor-integration-test-helpers.ts` selects on `account = "integration-test"` plus every agent targeted by the module-level `SCRIPTED_PROMPT`, and hard-deletes the messages, the exit events and the rows. It carries no per-run discriminator, and it runs in the `beforeAll` and `afterAll` of each of the three suites in `supervisor.integration.test.ts`.

Observed on 2026-08-10 in worktree 18484, a tree of 55 children. `reset_self stops the original agent, mints a successor, delivers the prompt` failed twice at `expect(readAgent(originalId)).not.toBeNull()` — the original row gone after the supervisor had already exited 0 — and then passed on three consecutive full-suite runs with nothing changed between them. A deleted row is what that assertion reads as null, and the deleting statement is keyed on a value every concurrent run shares.

What this does NOT establish is that concurrency caused those two failures. Nothing was instrumented to say which process issued the delete, and the suite writes no record of its own cleanups. What is established is the mechanism: one run's cleanup is in scope of every other run's rows, by a marker with no run in it.

The suite is skipped without live infrastructure (`describe.skipIf(!haveLiveInfra)`), so on a machine with credentials it is a live shared-database test and on one without it is three skips — the two readings are not distinguishable from a green summary.
