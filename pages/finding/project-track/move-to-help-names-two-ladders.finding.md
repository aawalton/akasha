---
id: 111b389f-20a7-52a5-a31e-a87326a09bc0
page-type-slug: finding
title: "Move to help names two ladders"
domain-slug: domain/global
---

# Claim

`ops project move-to --help` states its adjacency rule as two ladders — "a row with a parent is judged against the child ladder, one without against the parent ladder". The code declares six: CHILD_DEPLOY, CHILD_COMMIT, PARENT_DEPLOY, PARENT_COMMIT, SINGLETON_DEPLOY and SINGLETON_COMMIT. Read literally, that help says `dispatch-project`'s first sentence would be refused when it would not. The document is right and the help is stale, and it lives in the code repo.

# Evidence

Raised by the review-instructions reading of `domains/tasks/lead/dispatch-project.md` on 2026-08-07 as the one thing it found that was not landable from its subject. It reported three ladders, confirmed by running `packages/shared/project-status`'s own tests, 10 passing.

Verified myself and found more than was reported: `grep -n "export const.*LADDER"` over `packages/alanwalton/projects/core/src/lib/project-ladders.ts` returns six ladder constants — three shapes crossed with the two `live-on` values — plus OPTIONAL_LADDER_STATUSES, MANDATORY_LADDER_STATUSES and OFF_LADDER_EXIT_STATUSES. I also read the two-ladder sentence in the live `ops project move-to --help` output.

So the help understates the shapes by one and the ladders by four. I did not run the tests.

The repair is a code-repo change to a help string, which no reading of an instruction document can land.
