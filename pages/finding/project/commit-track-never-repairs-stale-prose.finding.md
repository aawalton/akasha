---
id: c45048f2-5c6b-5dad-96ea-700f2b466230
slug: commit-track-never-repairs-stale-prose
page-type-slug: finding
title: "Commit track never repairs stale prose"
domain-slug: barred-meaning/project
---

# Claim

Nothing tells a commit-track seat to repair the prose its change made stale. This repo's own `tools/` are code and land on the commit, and a change to a schema there can make prose false in the documents that govern it — `ops instructions governs` on one schema names eight. None of run-checks' nineteen checks reads prose for staleness. The two deploy-track documents carry a documentation stage with exactly that bullet; none of the three commit-track documents has one.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-singleton-commit.md` on 2026-08-07 as the largest thing only a whole-document reading found. Not landed: it is an Add resting on judgment and would have to reach all three commit-track documents at once.

Verified myself: `grep -ln "documentation" domains/tasks/projects/*.md` returns build-parent-deploy.md and build-singleton-deploy.md and nothing else. So the stage exists on the deploy track alone.

The reviewer reports `change-instructions.md:14` establishing that this repo's `tools/` are code and land on the commit, and `ops instructions governs --file-path tools/document/schemas/task.ts` naming eight governing documents. I did not run either.

No line on the commit-track documents is false. The act is absent.
