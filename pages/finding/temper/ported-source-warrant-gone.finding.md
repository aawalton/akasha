---
id: 36958848-ea76-5d28-9773-763c980d7a83
slug: ported-source-warrant-gone
page-type-slug: finding
title: "Ported source warrant gone"
domain-slug: domain/temper
---

# Claim

The two `correctness` suppressions (`noUnusedVariables`, `noUnusedImports`) in `packages/temper/shared/addon-libraries/biome.json` lost their warrant when Alan's ruling on #16111 dissolved the "ported source" justification they existed for, since all 28 addon libraries under the override are already 100% TypeScript with zero `.lua` files.

# Evidence

Project #16174, domain `temper`, status `someday_maybe`, no formal objective; captured 2026-07-25, moved off the row's retired `notes` attribute 2026-08-15.

Dalla ruled (2026-07-25, holds the suppression gate): remove `correctness/noUnusedVariables` and `correctness/noUnusedImports` from `packages/temper/shared/addon-libraries/biome.json` (`overrides[0].includes = ["*/src/**"]`); do not narrow the glob. Keep `nursery/useSortedClasses` but give it its own justification (Tailwind sorter, no Tailwind in ESO addon code).

Measured: 28 libraries, 697 TS files, zero .lua files. 97 diagnostics hidden across 596 files in 83ms (59 noUnusedVariables, 38 auto-fixable noUnusedImports). 18/28 libraries have zero violations (incl. lib-table-functions, #16116's pilot); remaining 10 range 1-19 files touched.

Why gone: override existed for "ported source" fidelity to upstream; Alan's ruling on #16111 deletes the drop-in identity requirement, dismantling that fidelity. Filer's read was the warrant expires partway through the rename programme; Dalla corrected: it expired when Alan ruled.

Why remove not narrow: 28 override entries decay into 28 permanent exceptions; removal is one edit. Removal is a discovery tool (Dalla): unused upstream symbols are fidelity apparatus, so re-enabling the rule produces the deletion worklist the programme needs anyway.

Structural finding (Dalla's): biome.json carries no comment naming the "ported source" warrant — it lives in prose elsewhere, so it can't be re-evaluated when it expires. Generalized: every suppression should carry its expiry condition inline, not just its reason. Filed separately as #16176.

Sequencing: lands before the bulk renames, into a clean baseline. Gate is asymmetric: fires on adding/modifying a suppression, not on removing one.
