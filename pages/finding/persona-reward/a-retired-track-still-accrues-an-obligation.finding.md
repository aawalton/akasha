---
id: d6ab8fec-e75e-5072-b23b-981e7adbe810
page-type-slug: finding
title: "A retired track still accrues an obligation"
domain-slug: domain/global
---

# Claim

`ops persona reward-gaps` reports 390 unrecorded rewards, still accruing. It is a daily obligation nothing discharges, and the code that computes it calls its own track retired.

# Evidence

Measured 2026-08-15. `ops persona reward-gaps` reports 390 unrecorded rewards: 4 in May, 98 in June, 214 in July, 74 in August through today. The count rises every day. `aine` has 196 concepts queued against 6 ever delivered.

`packages/alanwalton/personas/cli/src/persona/reward-crossing-effect.ts:12` calls it "the contract the **retired image track** arrived at (#12996)".

Ten verbs implement that track: `daily-standing`, `reward-prompt`, `render-reward`, `record-reward`, `reward-gaps`, and the five `reward-queue-*`. Nothing invokes or schedules any of them. Eight cite a `/persona-reward` or `/persona-wallpaper` skill in their help; neither exists, and there is no `~/.claude/skills` directory on this machine at all.

The corpus says the track should not exist. `domains/persona-reward.md:17` — "The daily reward is words; an image belongs to the milestone track alone."

So two different things are called `reward` and share nothing else. The words track keys on `persona-reward-crossing` rows across red, yellow, green and blue, and is live — `reward-crossings` and `reward-send` are invoked by the `persona-reward-watcher` worker and by `domains/tasks/persona-reward/send-daily-reward.md`. The image track keys on `persona-image(kind=reward)` rows across green and blue only, and nothing runs it. Nothing in the corpus distinguishes the two.

Not measured: whether any persona is owed a words reward that also went undelivered. `reward-gaps` counts only the image track.
