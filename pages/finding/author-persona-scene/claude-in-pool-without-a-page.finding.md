---
id: 3f8fb8b4-d664-5d39-a727-7b8f2a2380d1
slug: claude-in-pool-without-a-page
page-type-slug: finding
title: "Claude in pool without a page"
domain-slug: task/author-persona-scene
---

# Claim

`claude` sits in the draw pool of `domains/tasks/scenewright/author-persona-scene.md` with a persona file and no persona page, and no redraw condition covers that case. The branch that redraws on a child body is live rather than decorative — one persona file trips all three of its tests at once — so the pool is exercised, and this case falls through it.

# Evidence

Raised by the reviewer seat `claude-author-persona-scene-archivist-review-instructions` on 2026-08-14; its report is at `~/agents/claude-author-persona-scene-archivist-review-instructions/review-author-persona-scene.md`.

That seat ran the machinery rather than reading it: `ops page create --help` and `ops page list --help`, `load-page-where.ts` for what `--if-not-exists` parses through, and direct reads of the anthology rows and the four persona-page properties. It reports `domains/personas/ali.md` trips all three child-body tests, which is what establishes the redraw branch is reached.

I did not run any of it, and did not check whether a `claude` persona page exists.

Not measured: what the draw should do when it lands on a persona with no page — skip, redraw, or create one — and whether any other persona in the pool is in the same state.
