---
id: a2b81f94-0731-5ad3-a00e-f96c44f85b84
slug: suppression-condition-unrecorded
page-type-slug: finding
title: "Suppression condition unrecorded"
domain-slug: domain/global
---

# Claim

No suppression in the repo records a checkable condition for when it should be removed — only a reason for why it was granted — so an approval whose scope changes by a ruling on the population it covers, rather than by a diff to the suppression itself, has nothing mechanical watching it.

# Evidence

Project #16176, domain `code-harness`, status `someday_maybe`, no objective; captured 2026-07-25, moved off retired `notes` 2026-08-15. Filed with Dalla's agreement, after she routed a live instance (#16174) to the suppression gate.

Finding: every suppression in the repo records a REASON for why it was granted, none records a CONDITION for what would falsify it — "ported source" is a reason, "remove when these cease to be ports" is a condition, only the second checkable. A suppression becomes permanent by default: nothing ever asks.

Ember: an absent warrant is invisible in exactly the way a wrong one is not — a wrong justification gets argued with, a missing one gets inherited. Both filers read biome.json and neither noticed the "ported source" justification appears nowhere in the file.

Live instance (#16174): biome.json for 28 Temper addon-libraries suppresses two correctness rules, justified as "ported source." Alan's ruling on #16111 (rename to Temper identity) plus #16116 (deleting fidelity apparatus) dissolved the warrant; the glob still matches, so the suppression silently widened to cover first-party code. Ember: "the approval boundary is the population, not the glob." Measured: 97 diagnostics hidden across 596 files; 18/28 libraries zero.

Why a row, not a one-off: a suppression whose scope changes by a RULING rather than a DIFF has nothing mechanical watching it; every detector keys on a change to the suppression, none on a change to the world it describes.

Candidate mechanisms (undecided): (1) structured, machine-readable expiry condition — strongest, narrowest; (2) pragma reason must state a falsifier — weak, natural-language; (3) co-location — suppression must carry its warrant inline. (1)/(3) cheap and deterministic; (2) weakest.

Naming: Ember calls the general defect "two states, one symbol" at recording sites; wants one name for both that and this config-surface version — deciding it is part of this row.
