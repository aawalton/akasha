---
id: f64e2941-730e-54db-bdf3-44fbe9d658e5
page-type-slug: finding
title: "Definition visual but children are not"
domain-slug: domain/design
---

# Claim

`design` is defined as what is meant to be looked at, and three of the domains beneath it are not looked at.

# Evidence

`domains/design.md` reads "Design — the choices in anything meant to be looked at that decide what is seen, and in what order", and its glossary is contrast, repetition, alignment and proximity, which are the principles of visual design.

`domains/design-patterns.md` beneath it now holds `day`, which is which day something falls in, and `rule-system`, which is a set of rules consulted in order. Neither is looked at. `game-design` sits directly under `design` and is about progression rather than about what is seen.

So the definition and what stands beneath it disagree, and a reader deciding where to put a pattern gets no answer from either. Two ways out: widen the definition to cover design in the sense of how a thing is built, which makes `design-principles` and its four visual children read as a subset rather than as the whole; or leave `design` visual and move the patterns that are not looked at to a parent that does not claim they are.

Found while factoring the email rules system into `rule-system` under `design-patterns`, which added the third case rather than discovering the first.
