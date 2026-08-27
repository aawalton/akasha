---
id: ac6513a4-8371-5fda-970e-28926a85d2db
slug: divergence-list-cannot-see-a-positive
page-type-slug: finding
title: "Divergence list cannot see a positive"
domain-slug: domain/global
---

# Claim

An exemption predicate suppressing a lint/scanner class over "fork-divergence" tstl files carried a justification that the fork's own structural-divergence list could never have refuted — the list records structural divergences only, so it returns "not listed" whether a file is pristine or carries local edits — and the false justification has since been withdrawn entirely, with no suppression added in its place.

# Evidence

Filed as project #16165, domain `code-harness`, status `someday_maybe`. Taken as the filer's own row on #16015's owner's advice — #16015 landed 9c9e4e43e2325701 and its worker self-retired, so folding this in would've been a fresh claim on a finished row.

**Finding is stronger than when raised.** Filer's condition (1) was that the copied justification is false. #16015's worker went further and withdrew the carve-out entirely before landing: `git log --follow` showed both candidate-exempt tstl files carry the project's own edits (`isReferenceType` added whole by #9061; the `Number*` predicates by #8982). No suppression was added — the Dalla-gate item resolved without needing the gate.

**Why the false premise survived**, in the worker's framing: "the fork's documented divergence list records structural divergences only, so it returns 'not listed' whether a file is pristine or carries our work. An instrument that cannot see a positive cannot be read as a negative." Three scanners carry the claim; nothing they run could refute it.

Same defect class as the 2026-07-25 estate investigation's most-instanced finding, arrived at independently: a negative is evidence only if the tool could have returned the positive for this subject. The divergence list's population is structural divergences; the subject was "does this file carry our edits." Different populations.

**Scope proposed (not built):** extract the exemption predicate to one place, delete the false justification rather than relocate it, give it a two-sided test (exempts the fork AND still fires outside it).

**Related:** #16081 (`check-strict-truthiness` over-flags via `ts.TypeFlags.StringLike` vs. the sibling rule's `isStringLiteral() && value === ''`), accepted as a real rule defect.

**Provenance caution**, volunteered by #16015's owner: sourced at least four wrong exemplar citations that night, one corrected into a second wrong one — verify every exemplar above at file:line before building on it.
