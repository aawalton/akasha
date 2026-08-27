---
id: 7a80a6e5-a3b9-5b6a-8b74-1258400ab87e
slug: review-record-day-unstated
page-type-slug: finding
title: "Review record day unstated"
domain-slug: page-type/domain
---

# Claim

Nothing declares which day a `reviewed-at:` record carries, and two readings landed today read it two ways. The schema validates the shape of a `YYYY-MM-DD` day and no more; no document says whether that day is the workstation's local one or UTC. On 2026-08-13 MDT / 2026-08-14 UTC one reviewer left a stamp at `2026-08-13`, holding that moving it would be false, and another wrote `2026-08-14`, holding that the instruments run on UTC.

# Evidence

Raised by two reviewer seats dispatched in one `review-documents` pass: `claude-alert-archivist-review-instructions` on `domains/alert.md`, and `claude-category-rule-archivist-review-instructions` on `domains/category-rule.md`. Their reports stand at `~/agents/<seat>/review-<subject>.md`.

Measured here: `tools/document/value.ts` validates a `date` value for calendar shape alone, through `DAY` and a `Date.UTC` round-trip, and settles no timezone. A search of `domains/**/*.md` for prose about `reviewed-at:` returns only the frontmatter occurrences, so no document states which clock the day comes from. The workstation clock read `Thu Aug 13 22:32 MDT 2026` / `Fri Aug 14 04:32 UTC 2026` while this was checked.

Measured afterwards, against practice rather than any statement: every `reviewed-at:` value added under `domains/` in the last four days, compared to its own commit's local day and UTC day, on the commits where those two differ. 405 records carry the local day; 13 carry the UTC day, and 3 of those 13 were landed tonight by seats in this pass. The decisive group is 376 records stamped `2026-08-13` by commits made when UTC already read `2026-08-14` — the same window and the same night. So the corpus records the local day in practice, by a wide margin, while stating it nowhere. Reproduced by walking `git log --format=%at -p -- domains` and comparing each added value to `strftime` of that timestamp in both zones.

Not measured: whether any consumer other than `tools/stale-reviews.ts` reads the value. `stale-reviews.ts` measures characters moved since the commit that wrote the record rather than elapsed time, so a stamp ahead of the local day costs nothing there. Practice is also not a statement — the margin says what seats have done, not what the corpus intends.
