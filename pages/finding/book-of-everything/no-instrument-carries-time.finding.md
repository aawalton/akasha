---
id: 9a7bdcc3-0c25-535e-8b9b-3395c57b21d6
page-type-slug: finding
title: "No instrument carries time"
domain-slug: domain/book-of-everything
---

# Claim

No Book of Everything instrument carries time, so a resting thread and an abandoned practice read identically. The last session landed 2026-07-08 and `ops ali coverage` today reports the same 21 / 177 sections it would have reported the next morning. The three `ali` verbs — `coverage`, `pending`, `next-unscored` — none of them take or report an age, and `ali pending` prints "nothing staged" on a rest day and on the thirtieth dark day alike. Nothing wakes the seat either, so no scheduled read closes the gap.

# Evidence

Measured 2026-08-07. `git log --format=%ad --date=short -- 'book-of-everything/**/profile.md'` in `~/books` returns 2026-07-08 as its most recent write, and `ROTATION.md`'s last content commit is the same day — "rotation: land waves resting re-cue + china-755 warm-reentry bite + foundations-programs scored note". The only later commit touching `book-of-everything/` is 2026-08-03, "quarantine the packages/books instruction surfaces", which moved documents rather than scoring anything. Thirty days.

`ops ali coverage` run today prints "21 / 177 sections opened = 11.86%" and "33 / 271 nodes opened = 12.18%", a per-Part and per-Division table, and no date, age or last-session field anywhere in its output. `ops ali pending` prints "Pending: 0 points not yet landed (Learn). Today's Learn stoplight from pending: nothing staged." — the same two lines a rest day produces.

The verb set is closed and small: `packages/alanwalton/ali/cli/src/ali/` holds `coverage.ts`, `pending.ts` and `next-unscored.ts` and nothing else, and `ops --help` lists exactly those three under `ali`. No `ops audit` arm covers the book either; the four drift audits are over page-type and property-definition rows.

Nothing wakes the seat. `packages/agents/routing-core/src/wake-armed-seats.ts` assembles the armed specs and there is no `ali` spec in it — iris, aria and the SMS entry points are what it holds — so there is no scheduled read that would notice a stall.

What this observation does not settle: whether a detector is wanted. `dirty/skills/knowledge/rulings.md:60-63` records that as an open question in Alan's own terms — "the doctrine forbids the obvious one — a clock, which is a deadline wearing a different name … he has not been asked it." That ruling is queued for removal with its document, which is why the measurement is filed here rather than left to it.
