---
id: de5293ed-4df2-59dc-85d4-88ffed74a0ed
page-type-slug: finding
title: "Constraint catalog display only"
domain-slug: domain/fitness
---

# Claim

Coaching-constraint pages are display-only — read only by `cli/constraint-list.ts` and `tracking/digest.ts`, never by `src/selection/` — so the 2026-07-25 legs plan carried three live violations the catalog already recorded and none of them were caught before the session, including one (`ef-accommodation`, pre-decide one set at a time) that had already been captured as a constraint before Alan asked for it that same week.

# Evidence

Source: #16067 (domain: `fitness`), `someday_maybe`. No objective — captured, never defined; retired 2026-08-15. Same class as the equipment-kit slug bug from an earlier slice. Coaching-constraint pages are read by exactly two call sites (`cli/constraint-list.ts`, `tracking/digest.ts`); nothing under `src/selection/` reads them.

**Three live violations in the 2026-07-25 legs plan:**
1. Slot 5 `Push Up to Side Plank` (novel, wrist-loaded) violates the standing `programming-cue` "pushups historically on fists" — the side-plank transition shifts weight onto one wrist, worse than a plain pushup.
2. Slot 6 `Trail Running/Walking` violates the `medical-gate` "Air quality is a hard medical gate" with no check at all — called safety-adjacent rather than merely suboptimal.
3. "Pre-decide the workout — one set at a time" was already recorded as an `ef-accommodation` constraint before Alan asked for it this week (now #16047) — the strongest evidence the constraint catalog is unheeded instruction, not decoration.

**Wanted:** constraints become an input to selection, not just display: `medical-gate` = hard gate (needs live environmental input); `injury-watch` = conditional (per-session flare signal, backs off on flare days); `programming-cue` = soft signal (demotes/surfaces in rationale); `ef-accommodation` = shapes delivery, not content (check what else silently depends on it).

**Verification, both directions:** wrist-loaded novel movement demoted/cue-surfaced when the cue is active, selectable when removed; outdoor conditioning excluded when the air-quality gate is tripped, trail running available when clean.

**Sequencing note:** not urgent enough to have blocked that day's session (the coach was the backstop), but that absence of urgency is itself the defect.

**Addendum 2026-07-25T10:46:38Z:** self-correction — the air-quality gate's real input already exists and is live (capture cut at a paragraph boundary, same as other captures in this batch).
