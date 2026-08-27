---
id: 2381e8a2-cbe5-521f-8c68-7e48816a76fe
page-type-slug: finding
title: "Render gate needs a story-chapter row and none exists"
domain-slug: domain/global
---

# Claim

The deploy render gate resolves its targets by requiring one `story-chapter` page row and throws when the query returns nothing. No such row exists, so every project deploy fails at `deploy_render_gate_failed` — and it fails AFTER the merge queue has landed the branch, leaving the change live on `main` under a failed deploy verdict.

# Evidence

Measured 2026-08-18 deploying #19282. `ops project deploy --seq 19282` returned
exit 3: `the-branch-content-on-main` PASS, `the-deployed-main-pipeline` FAIL —
`deploy_render_gate_failed: render gate found no story-chapter control to
verify — cannot distinguish a game-specific blank from a broad deploy failure
(inability to observe)`. `origin/main` moved `a83ff9e2cd` → `dbaa82eb42`, so the
land is real and the change is live under a failed verdict. #19395 failed the
same way on 2026-08-17 at `5905e65e90d5`. Two runs, not one inferred.

`resolveTargets()` in `move-to-deploy-render-gate.ts` needs two targets: an
owner-owned Awen `game`, which resolves, and one `story-chapter` ordered by
`seq` limit 1, which does not. Each throws on `.rows.at(0) === undefined`. The
game query clears, so the gate reaches the database; only the control is absent.

WHY THE CONTROL IS ABSENT, measured 2026-08-18 and not previously investigated:

The gate has asked for a `story-chapter` since `674f45e9bf`, 2026-07-05, "post-deploy
hydrating render gate". But `page-types/story-chapter.md` was CREATED in the
instructions repository on 2026-08-17 12:53 at `196f9319d`, alongside
`chapter.md` and `book-chapter.md`, with its id added at `de18087c1`. So the slug
the gate queries could not have resolved before 2026-08-17, and the type has held
0 rows since it began to.

The type declares `files: none`, so nothing file-backed populates it. Its
siblings — `chapter`, `book-chapter`, `story-chapter-read`,
`story-chapter-royal-road`, `story-chapter-written`, `story-chapter-played`,
`story-chapter-wandering-inn` — each answer `page type not found` in the store,
so the family is declared in instructions and largely unregistered.

The control is narrative content and the corpus has never held a row. This is
not a restoration.

NOT MEASURED: whether any deploy succeeded between 2026-07-05 and 2026-08-17,
which would say whether the gate was passing some other way or failing unnoticed
for six weeks.
