---
id: d06dc27b-9bc1-5f89-a250-89ad6c75e9b4
page-type-slug: finding
title: "Stamp advanced without a reading"
domain-slug: page-type/domain
---

# Claim

A `reviewed-at:` record can be advanced by a write that is not a reading, and one was. On `domains/tasks/scenewright/author-persona-scene.md`, commit `d64c27a09` — titled `instructions: edit …` — introduced `reviewed-at: 2026-08-13` at 07:06 on 2026-08-13, and three further edits that half-hour rewrote the document around it. The last line-by-line reading had been 2026-08-07. For seventeen hours the record claimed a reading of text that no longer existed.

# Evidence

Raised by the reviewer seat `claude-author-persona-scene-archivist-review-instructions` on 2026-08-14, and verified here rather than taken from it.

Measured: `git log -S"reviewed-at: 2026-08-13" -- domains/tasks/scenewright/author-persona-scene.md` names `d64c27a09` at 2026-08-13 07:06, whose subject is `instructions: edit domains/tasks/scenewright/author-persona-scene.md`. Three more commits on that document follow at 07:09, 07:11 and 07:31, all with the same generic subject. The reviewer reports those four dropped the three-phase weighting stage and its ask vocabulary, added the random draw and the two-pass heat stage, and re-cut stage 3; I did not diff them.

`tools/stale-reviews.ts` did name the document as owed, so the churn measure caught it — what it could not do is say the record was false rather than merely old.

Not measured: how many other documents carry a record introduced by a commit that was not a reading. This is one instance found by one reading, not a survey.
