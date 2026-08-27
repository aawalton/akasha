---
id: c4635150-22d8-552c-8438-20a35a3093d8
page-type-slug: finding
title: "Exemption set vacuous pass"
domain-slug: domain/instrument
---

# Claim

An exemption set (allowlist, ratchet, or "permitted to violate" list) with no population control can be empty and still print a passing green, because the exempting arm of a check cannot distinguish a rule correctly withheld from an input set with nothing in it to withhold the rule from.

# Evidence

Project #17246 (status someday_maybe, live-on deploy, domain `instrument`); notes captured 2026-08-15, no objective written.

Exploration (2026-07-29): done means every exemption set in the repo — every allowlist, "permitted to violate" list, and ratchet — is attached to a control establishing its population before anything iterates it, and a new one couldn't be added without one. Needed because an exempting test is the estate's purest violation of "absence of a result is structurally distinguishable from a passing one": it asserts a zero with two causes (rule correctly withheld, or nothing to withhold it from) indistinguishable in the run. One instance was measured vacuous — iterating an empty allowlist and printing green.

Not the sweep it looks like: the population is unknowable by search, since an uncontrolled set produces no symptom, so "find them all" fails as a first step. The deliverable makes the uncontrolled shape unrepresentable, with a declared-population ratchet carrying the existing stock, not a count.

Status at writing: the control exists — `packages/infra/checks/src/lib/exemption-control.ts`, landed by #17188, registered as `exemption-set-controls`, demonstrated at the `type` rung. Coverage didn't land: `CONTROLLED_EXEMPTION_SETS` declared only two members (re-measured on main 2026-07-29). Cause unchanged; shape moved from "build the remedy" to "make the remedy unavoidable" — cheaper than originally ranked, still rank 1.

Convergence noted with ranking item 13 (declared-population + ratchet extraction, Rule of Three met twice, routed from two other projects); this is a third instance and the natural first consumer, though whether extraction happens here or is consumed from here is undecided.

Problem note (2026-07-29): measured on main, the control exists and names two sets; the prior enumeration put the population near 86, with 81 unguarded and one confirmed vacuous — a floor, not a total, since the class produces nothing to look at.
