---
id: d1f935d1-4688-5fdd-b33c-42c8f2c5c00b
slug: same-day-review-cannot-restamp
page-type-slug: finding
title: "Same day review cannot restamp"
domain-slug: task/review-instructions
---

# Claim

A document read twice in one day with nothing landed the second time cannot re-point its review record, and stays in `stale-reviews.ts` output.

# Evidence

Reported by the review of `domains/message-to.md` on 2026-08-15: `reviewed-at:` already read that day from commit 8447d845a, so the stamp the task's stage 3 calls for had nothing to change and the write refused — "edit 1 declares an identical old_string and new_string, so it asks for no change." `stale-reviews.ts` counts moved characters from the commit that wrote the record onward, so the churn of 13e640012 still stands against the document although this pass has now read it line by line. Whether the task, the tool or neither should answer for this was not judged, and the tool was not re-run here.
