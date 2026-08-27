---
id: 294e4b56-3544-5cb2-9810-59278ab9693e
slug: rule-sited-narrower-than-claim
page-type-slug: finding
title: "Rule sited narrower than claim"
domain-slug: domain/design-system
---

# Claim

The Layout Ownership rule is sited far narrower than the claim it makes. The check enforcing it runs over every workspace the root package.json declares, repo-wide, but the instruction stating it is read only by seats whose domain is `packages/shared/design/**`. That area holds 162 `.tsx` files against 725 outside it, so most component code in the repo is written by seats that never read the rule at boot.

# Evidence

Raised by a review-instructions seat on `pages/domain/design-system.domain.md`, which did not move the rule: siting it on `code-repo` would put a JSX rule in front of every backend seat at boot, and the alternative — a new domain over `**/*.tsx` — is define-domain-structure work rather than a line-level repair.

I measured the counts myself in the code repo with `git ls-files`. Outside the area: 725 `.tsx` files, matching the reviewer exactly. Inside `shared/design*/`: I count 162 where the reviewer reported 168, a difference I did not chase down and which does not move the ratio.

The reviewer verified in the live code, rather than from the note in `dirty/`, that `check-component-layout.ts` exists and is registered as `component-layout` in `check-configs-component.ts`. I did not re-run that.

Not measured: whether any layout-ownership defect has actually been written outside the area, which the check would have caught rather than the instruction. The claim here is about who reads the rule, not about what escaped.
