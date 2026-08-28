---
id: 24eda8d0-ebdd-5c44-b312-b805cd2a6f8c
page-type-slug: finding
title: "The types exempt from the length ceiling are the ones the read refusal says to split"
domain-slug: domain/file-length
---

# Claim

`file-length` waives its 15,000-byte ceiling for any page whose type declares `unsplittable: true`. The read ceiling refuses those same files and names splitting as the remedy — "an authored file is split before it is changed". 3,331 of the 3,353 files past the read ceiling are exempt by that one clause. The system declares these files unsplittable and then instructs whoever meets one to split it, and there is no `ops split`.

# Evidence

Measured 2026-08-28 at `6f86fc1b`, identical re-run at `b4e345ba`, over 89,565 tracked files, using the repo's own `isGeneratedFile` and `costOf`.

3,353 files would have their whole body printed by `ops read` and are past the ceiling. Running the exemption ladder of `checks-system/check/file-length/file-length.check.code.attachment.ts:22-31` over exactly those: 3,331 exempt by `typeUnsplittable`, 10 by a `dirty/` segment, 8 by `data/`, 4 by `kindUnsplittable`. None is refused. The six types declaring `unsplittable: true` are `book-chapter`, `story-turn`, `story-chapter-written`, `story-chapter-royal-road`, `story-chapter-wandering-inn`, `story-chapter-played`.

The two ceilings are independent: `pages/workflow-template/workflow-preparation.workflow-template.declaration.attachment.ts`, 20,005 bytes, is the one tracked file `file-length` does cover that stands over it, and it reads fine.

The read ceiling is applied to the rendered emission, not the body. `agent/read-one.ts:16` prefixes every line with `String(at + 1).padStart(6)` and a tab — 7 bytes a line — and `agent/read-answer.ts:6-9` sums UTF-8 bytes. So 3,008 files pass 28,000 raw bytes but 3,353 pass the real cost, and those 345 are invisible to the byte count anyone reaches for first. `ANSWER_CEILING = 28_000` while every message calls the unit characters.

This corrects `finding/read/a-page-too-big-to-read-cannot-be-repaired` line 39, which reads the gap as bytes against characters. On its own example, `self-improvement.book-chapter.md` is 28,001 bytes and 27,809 characters — fewer, not more — and 29,442 to the gate. The 1,441 is 7 x 183 lines plus the headline, not encoding.

Of the 3,353, about 92 are bodies anyone hand-edits. 3,261 are serial fiction landed by `services/royal-road-sync.ts` and `tools/lib/wandering-inn/chapter.ts`, which `isGeneratedFile` does not catch though nothing edits them by hand.
