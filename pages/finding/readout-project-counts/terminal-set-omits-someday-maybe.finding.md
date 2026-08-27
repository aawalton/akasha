---
id: 359fb517-4c1c-5df1-a228-dab4b649f346
slug: terminal-set-omits-someday-maybe
page-type-slug: finding
title: "Terminal set omits someday maybe"
domain-slug: domain/global
---

# Claim

The status-bar snapshot treats three statuses as terminal where Alan counts four: `someday_maybe` is missing. So a parked project is counted as unfinished work in his project counts, and any project depending on a parked one reads as blocked and is dropped from the actionable set. Nothing could have caught it, because the terminal set is declared in no instructions document despite a code comment naming that repository as its source of truth.

# Evidence

Verified 2026-08-11. Alan stated the fourth value the same day, on being read the three.

**The two sites, both in `packages/shared/supabase/database/schema/public/functions/get_status_bar_snapshot.sql`.**

Line 194, the counted population:

    AND (p.status IS NULL OR p.status NOT IN ('done', 'not_doing', 'duplicate'))

Line 80, the dependency test behind `is_actionable`:

    bool_or(d.id IS NULL OR d.status IS NULL OR d.status NOT IN ('done', 'not_doing', 'duplicate')) AS blocked

A dependency at `someday_maybe` satisfies `NOT IN`, so `blocked` goes true and its dependent leaves the actionable set.

**The four-value set is the one the harness already uses.** `tools/document/schemas/project.ts:89-93` measures over the live table and names them: "every one of them is at a terminal status — done, not_doing, duplicate or someday_maybe."

**Why nothing caught it.** `grep -rln "not_doing" domains/` in the instructions repository returns nothing, and `someday_maybe` appears in one document only — `domains/tasks/lead/define-project.md`, which mentions parking a project rather than declaring the vocabulary. So the SQL's three-value list is not a stale projection of a four-value source; there is no source. The comment at `tools/document/schemas/project.ts:34-38` states that Alan settled the vocabulary as declared in the instructions repository with the code union and the row's options list as projections. That is an unmet intent described as a standing fact.

**What it is not.** An audit reported line 194 as an engineered exception carved out to prevent double-counting with the done-today partition. That reading is right about the carve-out and silent about the missing value, which is the part that changes a reading.
