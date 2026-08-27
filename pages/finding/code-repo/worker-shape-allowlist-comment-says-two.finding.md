---
id: d97a6c31-5146-59ef-b75e-1c7314380b67
page-type-slug: finding
title: "Worker shape allowlist comment says two"
domain-slug: repo/code-repo
---

# Claim

`ALLOWLISTED_BASENAMES` in `check-worker-shape-detect.ts` holds one basename. The JSDoc directly above it says two, twice — it opens "Two `*.worker.ts` basenames" and closes "the allowlist is intentionally closed to that pair". A reader trusting the comment believes a second variant is already sanctioned and looks for which one.

# Evidence

`packages/infra/checks/src/checks/check-worker-shape-detect.ts:22`:

    /**
     * Two `*.worker.ts` basenames that satisfy the principle via a shape-
     * equivalent variant rather than `runLongRunningWorker`. Each variant
     * has exactly one canonical example documented in the principle doc;
     * the allowlist is intentionally closed to that pair. New workers that
     * "almost" fit a variant should pay the small cost of an explicit
     * `runLongRunningWorker` invocation rather than expand this list.
     */
    const ALLOWLISTED_BASENAMES: ReadonlySet<string> = new Set([
      // see docs/long-running-worker-shape.md — pure-polling-loop variant
      "ci-pod-reaper-loop.worker.ts",
    ])

One member. The comment names two variants and a "pair", and the per-entry comment names only the pure-polling-loop one, so the second variant has no entry and no name here.

Which direction the drift went is not recoverable from this file. Either an entry was removed and the comment was not updated, or the comment was written ahead of a second entry that never landed. The comment is the only record of a second variant either way, and it also says the list is closed — so the next author reads a closed pair, finds one member, and has no way to tell whether they are looking at a bug or at a variant they have not identified.

The reference that would settle it does not resolve: "documented in the principle doc" points at `docs/long-running-worker-shape.md`, and `~/instructions/docs/` no longer exists.

Found while ingesting `dirty/knowledge/worker-shape-enforcement.md`, which recorded the discrepancy in one sentence. That source has been removed, so this record is the only one.
