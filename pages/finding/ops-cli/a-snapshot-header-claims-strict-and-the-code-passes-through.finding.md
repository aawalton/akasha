---
id: b80645ac-018a-59bb-86f6-97c6b875c1c6
page-type-slug: finding
title: "A snapshot header claims strict and the code passes through"
domain-slug: domain/ops-cli
---

# Claim

`packages/temper/player/inventory-management/cli/src/temper/inventory/snapshot.ts` carries a header explaining at length why unknown keys are rejected on chunk rows. Both schemas it describes are `.passthrough()`. A reader trusting the header believes the verb refuses a widened chunk row; it strips one silently.

# Evidence

Found 2026-08-13 by the seat re-examining the verbs deferred during the `ops-in-instructions` migration, while establishing whether `SNAPSHOT_HEADER_SCHEMA` and `CHUNK_ROW_SCHEMA` could be rebuilt on this repository's `tools/lib/shape.ts`.

They can — both are plain `object().passthrough()` over strings and numbers, well inside what `shape.ts` carries. Establishing that is what surfaced the disagreement: the header says `.strict()` on both, and the code says `.passthrough()`.

The two behave oppositely on the case the header is about. `.strict()` refuses an undeclared key; `.passthrough()` keeps it. Neither refuses quietly, but only one refuses at all.

This is the shape a comment fault takes rather than a code fault: nothing is broken today, and the cost is carried by the next reader who needs to know whether a widened row is caught here or downstream. `domains/code-comment.md` bars this class of comment outright, and its warrant is exactly this — no schema bounds a comment and no review reaches it, so it drifts from what it describes with nothing reporting the gap.
