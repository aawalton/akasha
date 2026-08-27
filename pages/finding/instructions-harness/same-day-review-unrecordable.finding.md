---
id: c8540055-1adb-530f-92dc-043fa1047671
page-type-slug: finding
title: "Same day review unrecordable"
domain-slug: domain/global
---

# Claim

`tools/stale-reviews.ts` measures churn from the commit that wrote a document's `reviewed-at:`, so a review landing on the day that key already names cannot discharge it: rewriting the same date produces no diff and so no commit, and the subject stays listed as owed a reading it has just been given.

# Evidence

Measured 2026-08-04 while reviewing `tasks/lead/review-initiative.md` under `tasks/archivist/review-instructions.md`.

`bun ~/instructions/tools/stale-reviews.ts --help` states what is measured: "the characters that have moved in a document since the commit that wrote its `reviewed-at:`, summed over every commit after that one". The threshold is 1000 characters.

`tasks/lead/review-initiative.md` carries `reviewed-at: 2026-08-04`, written by commit `89018bb9` at 09:56 -0600 that morning. `date` in the repo's own timezone returns Tue Aug 4 22:23 MDT 2026, so the day of this reading and the day the key names are the same day. The document was over the threshold before the pass began, from `4e08a443`; four further commits landed during it (`f9dcc41e`, `a6318c7c`, `cdb09c9c`, `b7647e94`). `bun tools/stale-reviews.ts` still names it, in a run reporting "177 perimeter document(s), 48 owed a reading".

The value is already the one the key asks for — the day the document was last read whole and judged, per `tools/document/schemas/domain.ts:130-137` — and an edit rewriting `2026-08-04` as `2026-08-04` produces no diff, so no commit writes the key and the measurement keeps running from `89018bb9`.

`tasks/archivist/review-perimeter.md` stage 1 runs this tool and states "Nothing else names them". So a subject read tonight is still owed tomorrow, and a seat is spawned against a document nothing has touched since its last reading.

`89018bb9` stamped the whole perimeter with one date, so every review running on 2026-08-04 meets this. This tool is the only consumer of the key, and this failure turns on the commit that wrote it rather than on the date it holds.

Not measured: how many of the 48 listed were read on the day their record names, whether any other instrument reads `reviewed-at:`, and whether a same-day re-review was meant to be recordable.
