---
id: 9dbd6d53-4f9d-527d-b3de-c33a3eb4bd4d
page-type-slug: finding
title: "Design definition narrowed and its edges stand"
domain-slug: domain/design
---

# Claim

`pages/domain/design.md` reads `**Design** — how things should look.`, and two domains beneath it are not looked at: `rules-engine`, what every rule set runs on, and `day`, which day something falls in. Both sit under `design-patterns`, which sits under `design`. Either the definition is narrower than the domain it names or those two parent edges are wrong. The definition has been rewritten since this contradiction was first filed and the contradiction survived the rewrite.

# Evidence

`ops instructions dag --domain design` on 2026-08-22 puts `day` and `rules-engine` under `design-patterns`, and `design-patterns` under `design`. `pages/domain/day.md` reads `**Day** — which day something falls in.` and `pages/domain/rules-engine.md` reads `**Rules engine** — what every rule set runs on.` `pages/domain/design.md` reads `**Design** — how things should look.` I read all four.

The same contradiction stands filed against this domain under the name `definition-visual-but-children-are-not`, against an earlier wording of the definition — "the choices in anything meant to be looked at that decide what is seen, and in what order" — and against `rule-system` rather than `rules-engine`. That wording is gone and the definition is now shorter, so the rewrite is the event this records: it narrowed the line and left the two edges where they were.

Raised by the review-instructions reading of `pages/domain/design.md`, finished 2026-08-22, at its line 7. It kept the line rather than widening it, because `pages/task/definer/define-definition.md` stage 6 reports a child whose `domain-parent-slug:` a reading exposes as wrong rather than repairing it, and because widening the definition instead is a judgment.

A second edge under the same parent points the other way. `pages/domain/craft-system.md`, the parent of `design`, carries the Intent `Every domain under this one says how to do something well; where that is applied stands outside it.` `pages/domain/ring.md` sits under `design-patterns` and carries `code-path:` naming `packages/shared/ring/ios-widget/Ring.swift` and `packages/alanwalton/native-shell/ios-widget/PersonaStoplightsWidget.swift`, which is where a ring is applied rather than how to draw one well.

Not measured: whether any other domain beneath `design` is in the same position as `day` and `rules-engine`, and which of the two repairs — widening the definition or moving the edges — costs less.
