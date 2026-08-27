---
id: d0921897-6748-557b-b2aa-3f38e14ded09
page-type-slug: finding
title: "Retry policy adaptive unread"
domain-slug: repo/code-repo
---

# Claim

The `adaptive` member of `RetryPolicy` in the worker-runtime is declared, documented and persisted but read by nothing, so a subscriber entry choosing it type-checks, is stored, and then behaves exactly as `legacy` with its two tuning fields inert.

# Evidence

Read at `~/code` HEAD `13135651993c19af09ce41b6295264191071d3c1` on main.

`packages/shared/worker-runtime/src/types.ts:65-69` declares `RetryPolicy` as a
discriminated union of three members: `{ kind: "legacy" }`,
`{ kind: "adaptive"; minBatchSize: number; maxBackoffMs: number }` and
`{ kind: "auto-recover-with-backoff"; baseDelayMs: number; maxDelayMs: number }`. The
comment above it at `:45` gives `adaptive` a contract — "caller-tuned min-batch-size +
max-backoff envelope" — and the block closes on "Discriminated union so future modes
(`fixed`, `none`) layer in additively", which reads as though the three present members
are all live.

Nothing branches on it. The only reads of `entry.retryPolicy` in the package are
`packages/shared/worker-runtime/src/events-subscriber.ts:159` and `:262`, and both test
`?.kind === "auto-recover-with-backoff"`. There is no `switch` over the union and no
`legacy` or `adaptive` arm anywhere, so every kind that is not `auto-recover-with-backoff`
falls through the same path.

The two tuning fields have no consumer at all: `git grep -n 'minBatchSize\|maxBackoffMs'`
across the whole tree returns exactly one line, the declaration itself at `types.ts:67`.
`git grep -n 'adaptive'` across `packages/shared` returns only `types.ts:45` and `:67` in
this package, the rest being fizz-compiler fixtures and a generated Supabase symbol.

The value is nonetheless accepted and stored.
`packages/shared/worker-runtime/src/register-events-subscriber.ts:116` writes
`JSON.stringify(entry.retryPolicy ?? DEFAULT_RETRY_POLICY)` into the row, and
`types.ts:93` sets `DEFAULT_RETRY_POLICY = { kind: "legacy" }`. So an entry declaring
`adaptive` type-checks, persists to `event_subscribers.retry_policy` verbatim, and then
behaves as `legacy` at run time with nothing raised.

The only other record of this is `dirty/questions/code-repo-head-documents-workers.md`,
which is queued for removal.
