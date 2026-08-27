---
id: 2cc59527-bdc0-5c25-ba3b-2f52ea9a2aa6
slug: natalie-register-blocks-food-lead
page-type-slug: finding
title: "Natalie register blocks food lead"
domain-slug: page-type/persona
---

# Claim

Alan ruled that food should be a lead's domain (food capture, diet analysis, cooking coaching), but the persona `natalie.register.ts` fragment still states she never claims, worktrees, dispatches, edits repo files, runs checks, or deploys, and a committed register fragment wins over the page row's `conduct` — so editing the row alone would not take effect.

# Evidence

From project #16713 (status `someday_maybe`, `live-on: deploy`, domain `persona`), captured and never defined.

Alan's ruling: food is a lead's domain run like the other activities — food capture, plus diet analysis and cooking coaching. "Delicious nutrition."

The blocker is one sentence in `packages/alanwalton/personas/core/src/register-specs/natalie.register.ts`: "I never claim, worktree, dispatch, edit repo files, run checks, or deploy — the settled + stamped row waits for Alan or a domain lead to dispatch a headless /p worker". Per the register storage tiers, a committed `<slug>.register.ts` fragment wins over the page row's `conduct`, so editing the row would not take effect. This is a code change and needs a worktree.

Scope beyond the one sentence, to be settled at definition rather than assumed here:
- The surrounding paragraph frames her whole capability surface as "deliberately small today — a scaffold", with capture-only as the mechanism. Removing the bar without revisiting the framing leaves a register that describes a scaffold and licenses a lead.
- The domain now has three legs, and the register was written for one. Diet analysis and cooking coaching are not mentioned in it.
- `leadDoctrine` is NOT the marker of lead status and should not be set reflexively: measured 2026-07-27, 4 of 24 activity personas carry it, and aelwyn — plainly a lead, owning 15 project rows — does not.

The domain vision at `~/instructions/skills/food/` already carries the ruling: the SKILL states the three legs and that this is a lead's domain, and `active.md` names this gap as the reason the ruling is not yet true in practice.
