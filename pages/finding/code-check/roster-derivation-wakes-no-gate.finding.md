---
id: 4647edd4-7bd8-5e13-944b-35eefca9b7c7
page-type-slug: finding
title: "Roster derivation wakes no gate"
domain-slug: domain/global
---

# Claim

An edit to `addons-resolve`, which derives the addon roster that `check-addon-dependency-cycle` and `check-addon-dependency-floor` audit, no longer wakes either gate. A change to how the roster is derived can add or drop an addon from the audited set with no `addon.json` moving, and neither gate runs on that commit. Twenty-three of the twenty-seven sibling addon gates still wake on it, so these two are now the outliers rather than the pattern.

# Evidence

Observed by the seat verifying #18371, whose watch-set narrowing produced it. Both gate registrations dropped `{ kind: "ts-file", under: "packages/temper" }` and kept a scoped `json-file` population plus two `watchNodes` seeds each. That TypeScript population was the only thing reaching `addons-resolve`, so it went with the narrowing.

The narrowing itself is right and is not what this finding disputes. Running two manifest gates on every TypeScript commit in `packages/temper` is a gate woken by files it never opens, which is the defect #18371 was cut to remove. The verifier measured the new reach directly rather than reading it: `closureIntersectsChangedFiles` over the real graph, each config read from the assembled `ADDON_CHECKS` that `checks.workflow.ts` dispatches, 16 of 16 expectations met, and restoring the old population reds 8 of the 16 — so the probe can see a difference. The seat disclosed `addon-roster-guard.ts` as residue of the same kind and did not disclose this one.

What keeps it narrow, and why it was not charged against #18371: the criterion is about manifest edges, and an `addons-resolve` edit moves the roster rather than an edge. A newly shipped addon still arrives as an `addon.json` and still wakes both gates. The uncovered case is a change to the derivation logic — a filter, a path rule, an ordering that decides membership — which changes the audited population while every manifest stands untouched. The gates then certify a set they were not re-run over, and their populations report the count they last measured.

Not established: whether `addons-resolve` has ever been edited in a way that moved the roster without a manifest moving with it. Nobody ran that history. The 23-of-27 figure is the verifier's reading of the sibling registrations, taken over a worktree carrying siblings' uncommitted work.
