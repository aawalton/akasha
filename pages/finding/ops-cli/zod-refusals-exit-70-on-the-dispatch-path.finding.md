---
id: 86cd9785-cf9a-50fc-87b7-01d7e6256fbe
slug: zod-refusals-exit-70-on-the-dispatch-path
page-type-slug: finding
title: "Zod refusals exit 70 on the dispatch path"
domain-slug: domain/ops-cli
---

# Claim

A verb that validates a flag with zod reports a user's typo as an unhandled defect. `ops exercise today --date garbage` exits 70 and dumps a raw Zod JSON array, where a refusal should exit 1 and say what was wrong.

# Evidence

Raised 2026-08-13 by the seat moving the `exercise` bodies, and reproduced independently: `ops exercise today --date garbage` exits 70. `ops exercise ranks --bogus` exits 1, so the two refusal routes in one namespace disagree on their exit code for the same kind of user error.

`exitCodeForThrowable` in `shared/errors-core/src/exit.ts` classifies through `isCliError`, which is four `instanceof` arms. `ZodError` is not one of them, so it falls through to the unhandled-defect code. `ops exercise session-start` has the same route.

This is the same shape as the hand-rolled `InputError` finding filed beside it, one layer further out — and unlike that one it has no remedy on this side of the boundary. `isCliError` now stands in akasha at `shared/errors-core/src/exit.ts`, and the classifier the live dispatch path reads is `exitCodeOf` at `tools/lib/exit.ts:43`, whose `CARRIES_A_CODE` name set omits `ZodError` too.

It predates the migration and was preserved byte-for-byte rather than repaired in passing, because a change made while moving a body cannot be told from the move afterwards. The reach is wider than `exercise`: every moved verb that validates with zod refuses this way, and `ops exercise today` is only where it was first seen.
