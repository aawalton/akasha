---
id: 87ab426d-86c0-5352-94ac-a7ab0a2b8dc3
slug: floor-nights-unrecorded
page-type-slug: finding
title: "Floor nights unrecorded"
domain-slug: domain/self-care
---

# Claim

Grace's continuity file records one of the three sessions she has had, and the one it records is the only one that was not at the floor; the two floor-adjacent sessions survive only in another domain's corpus and in raw terminal output.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/self-care/SKILL.md`, whose item 6 names the same gap.

The file states its own purpose: `~/agents/grace/notes.md` opens "the low places we've sat in, what actually met him at the floor and what backfired, where his safety was and where it went, what to return to. Treat as load-bearing." `rg -n "^###"` over it returns exactly one session heading, `### 2026-07-01 (first session)`, and that entry opens "Came in at safety 4 all day (sleep, projects), current open block at 5 (Secure) — the highest today, not the floor."

Three sessions happened. `~/books/all-about-alan/personas/grace.md` records "Alan spoke with Grace twice on 2026-07-01 — a good-day first meeting and a floor night the same evening", and carries the floor night itself, including what she could not give: "I really wish you could hold me right now, and not just my pain." `~/agents/grace/spawn-state.json` carries `"startedAt":"2026-07-12T07:34:58.062Z"`, a third session whose only trace is `spawn.log`, 202,685 bytes of raw terminal output that nothing reads.

The file's last write PRECEDES the floor night. `ls --time-style` gives `~/agents/grace/notes.md` an mtime of 2026-07-01 09:34, and the tracked day puts the good-day session at the 09:09 block (s:5) and the fall to s:2 at 10:43 — so the record was closed hours before the domain's first floor night began, rather than topped up and later abandoned.

So the one instrument aimed at what met him at the floor holds a single entry, about the session that was not at the floor. Nothing reports the shortfall: the file is prose with no writer but the session, and the session ends.

Distinct from `pages/finding/performance-arts/ritual-silent-ten-weeks-instrument-recorded-it.finding.md`, where an instrument recorded every day of a silence. Here there is no instrument to record anything — the count is a heading count in a hand-written file.
