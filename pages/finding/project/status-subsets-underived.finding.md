---
id: 89ec2be3-9bc4-519c-8824-177a14cd4230
page-type-slug: finding
title: "Status subsets underived"
domain-slug: barred-meaning/project
---

# Claim

The subsets composed from the project status vocabulary are still spelled as their own lists in both repositories, so one can go stale by omission without any instrument reporting it.

# Evidence

#18506 moved the vocabulary itself to a single declaration at `tools/lib/project-statuses.ts` in the instructions repository, with `checks/status-vocabulary.ts` and `ops project status-options` holding the two projections against it. The SUBSETS were deliberately left alone: `ENDED` in `tools/lib/seat-sweep.ts`, and `TERMINAL_PROJECT_STATUSES`, `HOLDER_PARK_STATUSES`, `ENTRY_STATUS_VALUES` and `EXIT_STATUSES` in `packages/alanwalton/projects/core/src/lib/project-transitions.ts`.

They answer different questions over overlapping members and cannot be read off one another: `seat-sweep.ts` records that `someday_maybe` ends the holding seat's work while still blocking a dependent, and that reading one off the other "would be wrong in whichever direction it was copied". `TERMINAL_PROJECT_STATUSES` holds three values where `EXIT_STATUSES` holds those three plus `someday_maybe`, which is that distinction standing in code.

What is unguarded is omission rather than a bad value. A status added to the declaration that belongs in one of these sets is caught by nothing: every instrument built here compares MEMBERSHIP against the declaration, so a set carrying a retired status would report, but a set missing a new one reads exactly like a set that is complete. `seat-sweep.ts` already names this failure direction in its own docblock, which is why it matches the `awaiting_` prefix rather than listing the six spellings — the same reasoning applied to `ENDED` would make it derived.

Deriving them was out of scope because it reaches the halt composition and the lifecycle gates, which #18506's fifth criterion existed to hold unchanged.
