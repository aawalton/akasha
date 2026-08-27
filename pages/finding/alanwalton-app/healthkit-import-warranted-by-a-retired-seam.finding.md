---
id: a05c857b-aee5-57cf-bc67-1d81f8597d96
slug: healthkit-import-warranted-by-a-retired-seam
page-type-slug: finding
title: "Healthkit import warranted by a retired seam"
domain-slug: domain/alanwalton-app
---

# Claim

`apply-ios-seam.sh:365-369` justifies an unconditional `insert_import_after_capacitor HealthKit` by naming the sync-active-energy App Intent seam, which `359379e00a` retired. The import is live; its stated reason is not. Anyone weighing whether HealthKit still belongs in the always-present group is sent to a seam that is gone. Three further references stand at 150, 1500 and 1895. This is a live act with a dead warrant rather than dead machinery, so the repair is a rewritten reason.

# Evidence

Read first-hand from `/var/home/walton/code` on 2026-08-08.

`grep -n '§2b-viii-a' packages/alanwalton/native-shell/scripts/apply-ios-seam.sh` returns four lines — 150, 365, 1500, 1895 — and exits 0. Line 365 is the load-bearing one, and the four lines under it are the warrant:

    # Sync-active-energy App Intent seam (§2b-viii-a): HealthKit for the Active Energy read. Another
    # always-present system framework, so it joins the unconditional group above. Importing it does
    # NOT claim any capability — the entitlement (§5) and NSHealthShareUsageDescription (§1d) are what
    # grant access, and both are read-only.
    insert_import_after_capacitor HealthKit

The import runs on every build, outside any `if`. What it cites as the thing needing HealthKit was removed by `359379e00a` (#18149), whose own message says every writer of the old daily scalar is retired.

`pages/finding/alanwalton-app/active-energy-intent-residue-outlives-its-seam.finding.md` stands against the same commit and is a different claim: it covers `ACTIVE_ENERGY_INTENT_MARKER` at 400 and its use at 407, which are dead machinery whose repair is deletion. I opened it in full before filing. Its evidence says `grep -n "ACTIVE_ENERGY"` "returns exactly two lines", which is true as run — the uppercase constant and the section-numbered prose are two spellings of one subject, and neither grep sees the other's sites.

That split is why this went unmeasured, and it is the fourth instance tonight of a count scoped to one spelling and reported as the count of the thing: `Consume-on-Demand` filed at 12 against 59, `Functional Purity Patterns` at 4 against 97 by phrase and 206 by label, the two TypeScript-only pointer sweeps that miss 34 non-TypeScript citers, and this. Every one understates.
