---
id: d268c7b7-d7c0-5afb-a7e1-d33fcc37b2e5
slug: padding-named-for-gap
page-type-slug: finding
title: "Padding named for gap"
domain-slug: domain/design-system
---

# Claim

The Layout Ownership description names the wrong mechanism pair for the case its act covers. It contrasts padding with margin, which is the container-edge case, while the act names neighbours — and for sibling separation the parent-side mechanism is gap rather than padding. The sentence is loose rather than false, since a parent-side and a child-side property do render the same pixels.

# Evidence

Raised by a review-instructions seat on `domains/folders/design-system.md`, which recorded it rather than repairing it: naming a different mechanism pair rests on its judgment rather than on anything an instrument settles, so it went back to the principal under the Add step of `review-instructions`.

I did not read the rule's description myself and did not verify the CSS claim. Nothing here measures whether the looseness has misled anyone; the reviewer reported `ops instructions run-gates` passing 11 with 1 not-applicable and `run-checks` naming this document nowhere.

A later review-instructions seat on the same document, 2026-08-07, settled the mechanism pair against an instrument rather than judgment. The header of `packages/infra/checks/src/checks/check-component-layout.ts` splits the ground into two rules: Rule 1 governs padding on a component's outermost element against its container, and Rule 2 governs margin between siblings, naming the parent-side mechanism outright — "Sibling spacing is the parent's job — `gap-*` on flex/grid parents, `space-y-*`/`space-x-*` on block parents." So in the machinery standing behind this rule, padding and margin are two component-side mistakes rather than the two halves of one pair, and the parent-side answer for neighbours is `gap`. That seat did not repair the line either, on a different ground: `Every Changed Line` on `domains/domain.md` requires Alan be shown each line changed in a domain's Rules.
