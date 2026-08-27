---
id: 944c557e-bda3-5dc7-81bf-1dca5b6b9a2f
slug: test-and-read-uncarried
page-type-slug: finding
title: "Test and read uncarried"
domain-slug: task/author-persona-scene
---

# Claim

Nothing carries a scene's test or its read onto the row. `author-persona-scene.md` stage 1 makes the seat state what the scene tests, and stage 7 makes it record the principal's read in his own words. Stage 6 then creates the `story-chapter` row carrying only `story`, `chapterNumber`, `text`, `maturityRating` and `source`. So the Intent on `domains/arousal.md` — "Every landed scene carries what it tested and the read that came back" — cannot come true by running this task as written.

# Evidence

Raised by a review-instructions seat on `domains/arousal.md`, which kept the Intent line because the entry is not yet true and so has not earned its exit, and handed the cause back because the repair is a change to a different document.

I verified the three stages firsthand in `domains/tasks/scenewright/author-persona-scene.md` at commit 4e088704. Line 19 (stage 1): "State what this scene tests before writing a line of it". Line 55 (stage 6): "Create a `story-chapter` row under the `anthology` authored-story, carrying `story`, `chapterNumber`, `text`, `maturityRating` and `source`" — no test, insights, grade or reaction among them. Stage 7 says "Record what he says landed in his own words" and names no field and no verb to record it with.

The reviewer additionally reported that three landed Anthology scenes (Athena ch.1, Aelwyn ch.2, Iris ch.3) carry `insights`, `test`, `grade`, `reaction` and both authors-note fields all empty. I could not reproduce that read: `ops page list --type story-chapter` returned royal-road rows, a `source=scenewright` filter returned zero, and a search for an Anthology story returned nothing, so I did not locate the rows. The row shape does carry `test`, `insights`, `grade` and `reaction` columns, which I did confirm.

Not measured: whether any verb outside this task writes those fields afterwards.
