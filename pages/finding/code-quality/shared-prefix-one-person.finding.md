---
id: 8ba8bea2-69ac-5606-8605-960c615cdf3b
page-type-slug: finding
title: "Shared prefix one person"
domain-slug: domain/code-quality
---

# Claim

`@shared/status-bar-access` is one person's package under a prefix that reads as everyone's. Its six habit circles, their order, and their thresholds are Alan's — 160 plant grams calibrated to his measured breakfast, 400 active calories he named outright, ladders carrying the date he confirmed them. Three of its eleven runtime deps are `@alanwalton/*`. The prefix records who curates a package rather than a layer, and nothing checks it, so an edge out of it reads as a defect rather than its shape.

# Evidence

Read in the worktree `/var/home/walton/worktrees/18146` at commit `ebb4c23225`, in `packages/shared/status-bar-access`.

`package.json` declares `"functionalType": "access"` and eleven runtime dependencies, of which `@alanwalton/health-samples-day`, `@alanwalton/personas-core` and `@alanwalton/projects-core` sit outside `@shared/`.

In `src/habit-stoplights.ts` (516 lines): `HABIT_ORDER` at line 49 is plants, activity, sleep, hygiene, capacity, safety, documented as Alan's own memorized model so he can glance without re-sorting. `PLANT_GRAMS_PER_GREEN_DAY = 160` at lines 103-111, the docblock recording that it is calibrated to his measured breakfast rather than to the nutrition faucet's bar, which he ruled was not the same number. `ACTIVE_CALORIES_PER_GREEN_DAY = 400` at lines 113-116, a figure he named outright. The no-data-renders-black rule at lines 61-69. The capacity pre-check at lines 173-176, so negative capacity cannot report that he is fine on exactly the day he is not. The hygiene meta-circle at lines 178-190, resting on his framing that inbox zero is his life hygiene. In `src/inbox-stoplights.ts`, the live-count ladder at lines 113-126 marked Alan-confirmed 2026-07-24.

That the prefix is not an enforced boundary was checked by walking every `package.json` under `packages/shared/`, outside `node_modules`, for workspace deps beyond `@shared/`. `@shared/project-status` depends on `@alanwalton/projects-core`; `@shared/cli` on some sixty workspaces across nine scopes. No check under `packages/infra/checks/src/checks/` keys on the namespace prefix; `check-layer-monotonicity` compares ranks only.

Not measured. I did not read the other `@shared/` packages' sources, so I sampled dependency direction only and cannot say how many are person-specific in content. I found no document stating what `@shared/` means; that it records curation is inferred from what the tree does. I ran no check and built nothing, three seats being live on that branch. I did not weigh the cost of renaming: four workspaces depend on this package.
