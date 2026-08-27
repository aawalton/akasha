---
id: acde14c0-cf20-56af-81b4-6d2be9af8c82
page-type-slug: finding
title: "Retry policy adaptive unconsumed"
domain-slug: domain/code-quality
---

# Claim

`RetryPolicy` in `packages/shared/worker-runtime/src/types.ts` declares an `adaptive` member with required `minBatchSize` and `maxBackoffMs` fields and documents it as a "caller-tuned min-batch-size + max-backoff envelope". No code reads it. A subscriber entry declaring `adaptive` typechecks, is asked for two tuning numbers, and silently gets `legacy` behaviour instead — nothing warns, logs or refuses.

# Evidence

`RetryPolicy` is a three-member discriminated union: `{ kind: "legacy" }`, `{ kind: "adaptive"; minBatchSize: number; maxBackoffMs: number }` and `{ kind: "auto-recover-with-backoff"; baseDelayMs: number; maxDelayMs: number }`. The comment block above it describes all three as live modes and closes "Discriminated union so future modes (`fixed`, `none`) layer in additively", which reads the three present ones as implemented.

Searching the whole of `packages/` for the literal `"adaptive"` returns two hits: the declaration itself, and the generated `packages/shared/worker-runtime/dist/src/types.d.ts` copy of it. No source file outside the type reads the member.

The loop's only branch on the policy is in `packages/shared/worker-runtime/src/events-subscriber.ts`: `if (entry.retryPolicy?.kind === "auto-recover-with-backoff")`, guarding the unpark-after-backoff path. Everything not matching that condition — `adaptive` included — takes the `legacy` path, which parks at `status='error'` until an operator runs `bun ops worker-subscriber reset`.

What makes this worth a record rather than dead code to sweep is the direction of the failure. The two required fields are the tell: a caller who writes `adaptive` has been asked to choose a minimum batch size and a maximum backoff, which is a decision, and the type accepting it is the whole of the confirmation they receive. `retry_policy` is stored as opaque jsonb on `event_subscribers`, so the database does not check it either. A subscriber configured this way parks permanently on a transient failure that its author believed they had configured it to ride out.

Two repairs are visible and this record judges neither: implement the member, or remove it and let `tsc` name every site that set it. The search above says that population is zero.

Read at `~/code` on 2026-08-07 while ingesting `dirty/knowledge/events-cursor-subscriber.md`, which recorded this and was removed in the same run, so the observation would have gone with it.
