---
id: 9b805193-40ce-5864-a1d4-f1d6ef5fdf1e
slug: same-day-review-cannot-stamp
page-type-slug: finding
title: "Same day review cannot stamp"
domain-slug: task/review-instructions
---

# Claim

A review landing on the same day as the last one has nowhere to put its stamp: `reviewed-at:` already holds that day, so no commit writes the record, and `stale-reviews.ts` measures the run's own edits from the earlier reading's commit.

# Evidence

Measured 2026-08-11, raised by a `review-instructions` seat about the task it was running rather than about its subject, during a `review-documents` pass.

`domains/tasks/archivist/review-instructions.md`, stage 3: "**Stamp** `reviewed-at:` with the day you finish, in the last commit you land. A document carrying no record is owed a reading however carefully it was just read, and `stale-reviews.ts` counts churn from the commit that wrote the record — so anything landed after the stamp already counts against it."

`tools/stale-reviews.ts` finds the record's commit with a pickaxe on the literal value — `git log --follow -1 -S"reviewed-at: <recorded>"` — so where the value does not change, no commit introduces it and the pickaxe returns the earlier one. Everything since is counted as churn against a reading already done.

The tool's own docblock names the measurement half: "WHAT IT CANNOT SEE is a second review landing on the day of an earlier one: the record is a day, so the pickaxe finds the earlier of the two and counts the churn between them again. It over-reports there, which costs a reading somebody has already done."

What the docblock does not carry is the task-side half: the stamp bullet cannot be satisfied at all on such a run, so a reading that happened leaves no record that it did. The day turned mid-run for the seat that raised it, so its stamp had somewhere to go and nothing was mismeasured.

Not measured: how often two readings land on one day, or whether any document has been re-read and left unstamped for this reason.
