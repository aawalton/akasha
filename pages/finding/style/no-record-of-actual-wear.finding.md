---
id: 08541827-f6fc-5be6-a0de-e6f8847fd5ad
page-type-slug: finding
title: "No record of actual wear"
domain-slug: domain/style
---

# Claim

Nothing in the estate records what Alan actually wore. Of 275 live page types the only one touching dress is `appearance-experiment`, whose subject is a deliberate trial rather than a day's clothes, so the style domain meters its own interventions and never their outcome. The absence is Alan's own ruling rather than a gap: he was asked and deferred it.

# Evidence

Measured 2026-08-07 against the live database, while emptying `dirty/skills/style/findings.md`, whose section "Nothing anywhere records what he actually wore" says the same and is queued for removal.

The enumeration. `ops page-type list --limit 500` returns 275 rows. Filtered case-insensitively on `wear|outfit|garment|wardrobe|appearance|groom|laundry|dress|cloth`, exactly one matches: `appearance-experiment`. Its own properties are `whatTried`, `feltRead`, `eyeRead`, `verdict`, `persona` and `date` — a row says an experiment was run and how it landed, never what was on him. The faucet meters the same: `ops persona level shaestrel` returns level 1, `greenDayTotal 1`.

Nothing elsewhere fills the gap. `rg -uuu -l -i 'wear log|what he wore|outfit log'` over `~/books/all-about-alan` returns nothing, and the three `~/memory/findings/` files matching `wardrobe|outfit` are about persona portrait imagery.

Why the observation matters: the domain's headline reading is behavioural — that he buys multiples of a decision once settled and never re-wears one that is not — and it was counted by hand off a closet inventory. No standing instrument could confirm or refute it.

THE ABSENCE IS DELIBERATE, so this must not be read as a gap to close. Found after this was filed, while emptying the sibling `dirty/skills/style/rulings.md`: "Asked directly, Alan said to leave the gap **for now**. So **do not build a wear record and do not propose one**… it is deferral rather than a permanent no — if the domain later has a reason he has not heard, that is worth one question, not a build." The reasoning recorded with it: a wear observation is the one instrument that would tell the lead her own mission was succeeding without her, and noticing sits one step from nudging. That ruling is live nowhere — kept at `dirty/maybe-keep/skills/style/rulings.md`, with candidate wording for a Rule on `domains/style.md`, which is a lead's to land.
