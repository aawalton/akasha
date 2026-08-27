---
id: 4e891615-8a13-52c4-a39d-9a1d8a378949
slug: two-read-shape-unenforced
page-type-slug: finding
title: "Two read shape unenforced"
domain-slug: domain/style
---

# Claim

The live `appearance-experiment` page type carries no `coherenceRules` at all, so its two-read shape — Alan's `feltRead` beside Shaestrel's `eyeRead` — is a convention nothing enforces. A row carrying one read and not the other writes cleanly, and no instrument tells it from a complete one: neither read is required, no coherence rule refuses the row, and no `ops audit` verb reports a page type holding no rule set.

# Evidence

Measured 2026-08-07 against the live database, while emptying `dirty/skills/style/findings.md`, whose section "The experiment row's two-read shape is a convention, not a constraint" says the same and is queued for removal.

The page type is live: `ops page-type list` returns `019f9608-ba8f-7ad3-8e44-3b1e8972117b  appearance-experiment`.

The rule set is absent rather than thin. `ops page-type show --id 019f9608-ba8f-7ad3-8e44-3b1e8972117b --json | jq '.coherenceRules'` returns `null`, and `jq 'keys'` does not list `coherenceRules` among the fifteen keys the row carries. The key DOES appear in the row's `propertyDefinitions` blob, as the `json` meta-property every page-type row inherits — reading that listing alone suggests rules are present, which is why the row's own value is the thing to read.

Neither read is required. `whatTried`, `feltRead` and `eyeRead` are all `markdown` with `isRequired: null`; `verdict` is a `select` carrying exactly `keep`, `tweak`, `drop`.

Nothing downstream reports it. `ops --help` declares seven audit verbs — `color-rule-coverage`, `doctrine-path-citations`, `grade-scale-drift`, `rating-scale-drift`, `recovery-multiplier-drift`, `retired-status-rows`, `skill-morph-groups` — and none scans for a page type carrying no coherence rules. The nearest, `color-rule-coverage`, is outside this case by construction: its description says "a rule-less definition is exempt".

The faucet counting these rows is live, which gives the gap a consequence: `ops persona level shaestrel` returns level 1, `greenDayTotal 1`, `balance 2`.

What this adds: `alanwalton-app/faucet-coherence-drift-denied.md` and `alanwalton-app/narrative-outside-the-coherence-rules.md` both concern the `persona` page type, and each records a rule set that EXISTS drifting from a copy or leaving a key uncovered. Neither names a page type carrying no rule set, or `appearance-experiment`.

Not established: whether any row has been written half-complete.
