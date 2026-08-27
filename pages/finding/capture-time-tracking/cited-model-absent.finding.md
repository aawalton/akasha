---
id: 62743b48-bff5-501e-873e-566c9ac22ab1
page-type-slug: finding
title: "Cited model absent"
domain-slug: task/capture-time-tracking
---

# Claim

Four files in the tracking code cite a document that does not exist. One of them describes it as the place the hourly-confirmation model "and the invariant both halves read, are written down once", so the loop's own account of itself points at nothing, and a reader sent there learns that the model is meant to be written down and that it is not.

# Evidence

Read firsthand in `/home/walton/code` on 2026-08-10.

The cited path is `packages/alanwalton/daily-tracking-cli/docs/hourly-confirm.md`. A sibling citation names `docs/hourly-confirm-stall.md`. Neither file exists anywhere in the repository.

The four citing sites:

    packages/alanwalton/daily-tracking-cli/src/hourly-confirm.ts:45
    packages/alanwalton/daily-tracking-cli/src/hourly-confirm-pending.ts
    packages/alanwalton/daily-tracking-cli/src/lib/hourly-confirm.ts
    packages/alanwalton/daily-tracking-worker/src/hourly-confirm-subscriber.ts:8-9

The last is the one that makes the gap load-bearing rather than cosmetic: it names the missing file as the single place where the model "and the invariant both halves read, are written down once". Two halves of one loop are told to read one document for the invariant they must agree on, and that document is absent, so each half's account of the invariant is whatever its own comment says.

What the comments do carry, in place of the missing document: `src/hourly-confirm.ts:37-39` — "The stream is self-limiting by design — an unanswered question blocks the next, so the opt-out is doing nothing, and nothing here ever re-prompts." And `src/lib/hourly-confirm.ts:10-13` — "IT DECIDES ON THE LEDGER'S STATE AND NOTHING ELSE. Every silence is a fact about the tracking stream ... and never a fact about the second the timer happened to fire in."

Not measured: whether the file ever existed and was removed, or was cited before it was written. Not measured: whether the two halves currently agree on the invariant, which is the thing the missing document would settle.

Noticed during the third sweep of the implementation for objective one of `amy/defined-foundations`, which was auditing for undefined abstractions rather than for citations.
