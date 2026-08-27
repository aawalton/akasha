---
id: ea7ca08a-bfed-5919-b516-7068796f077e
slug: layout-rule-already-checked-green
page-type-slug: finding
title: "Layout rule already checked green"
domain-slug: domain/design-system
---

# Claim

Layout Ownership on `pages/domain/design-system.domain.md` is a rule a green check already enforces. `check-component-layout` finds 0 violations over every source file in the code repo, so no reader has to be told the act for the corpus to hold it. What keeps it from failing Cut The Obvious outright is that the Design line foreclosing this — anything a gate could refuse is not written as an instruction — sits on `domains/instructions-harness.md`, which governs `tools/**` and says gate, not check.

# Evidence

Raised by the dispatched reviewer of `domains/folders/design-system.md` on 2026-08-07, which kept the rule and named this as the one thing it wanted ruled on. Relayed unjudged.

I re-ran the check myself: `bun infra/cluster-checks/src/checks/check-component-layout.ts` reports "0 violation(s) found [over 10307 of 10307 source files]". The reviewer reported 0 over 196 of 196, which is the same check scoped to this domain's own area under `packages/shared/design/`. Both readings are green.

Its other three reasons for keeping, which I did not test: a gate refuses the write where a check refuses afterwards, and `check-component-layout` stands unsettled in `domains/lists/unresolved-checks.md`, so nothing has established what the check misses. That last is the live one — a check whose coverage is unsettled is not yet evidence that the rule is redundant.

The same run reports `instructions`, `books` and `memory` as UNMEASURED, so the green covers the code repo alone.

Not measured: whether the check would stay green with the rule gone, which is the counterfactual the Cut The Obvious test actually asks and which nothing here reaches.
