---
id: b39c7969-3eae-5ef8-a61c-5a00c919aa22
page-type-slug: finding
title: "Row charter contradicts live domains"
domain-slug: domain/performance-arts
---

# Claim

Eppie's persona row carries a charter in its `conduct` prose that the live estate contradicts, and the row is the surface a fresh seat loads. It says "Performance Arts is my own domain under Faith — music today, with theatre and visual-art rails to grow into." Live: `domains/performance-arts.md` carries `domain-parents: fun`, her row's own `value` link says Learn, and visual art is `domains/visual-arts.md`, owned by zeli. Nothing checks prose on a row against the domain documents.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/performance-arts/findings.md`.

The prose is live on the row, not in either repo. `ops page show
019ee19d-d6e5-7ed5-b1ad-27ffe6f34987 --properties conduct` returns the sentence
verbatim. `rg -uuu` for it over the instructions repo matches only the
quarantined source, and over the code repo exits 1. A repo search alone reads
this as a dead claim.

Placement, three surfaces. `domains/performance-arts.md`:
`domain-parents: fun`, `persona-champion-slug: eppie`. The row's `value` relation:
`019eb7d1-0072-7909-a9a7-6fa76806f067`, title `Learn`. The row's conduct prose:
"under Faith". I read the `personas` array of all six value rows and tested
each for her id — Faith false, Learn true, Health false, Wealth false, Fun
false, Love false.

Scope, two surfaces. `domains/performance-arts.md` is "the craft in music,
theatre, film, and dance". `domains/visual-arts.md` is "making by hand in any
visual medium", `persona-champion-slug: zeli`. The two live definitions are disjoint,
so the estate has drawn this boundary; only the row still crosses it.

`domains/personas/eppie.md` is live and carries none of this — its `# Conduct`
is a voice sample. So the charter exists on the row alone, and the live
persona document a reader would check does not contradict it, because it says
nothing about scope at all.

WHAT THIS ADDS OVER `pages/finding/chess/value-axis-says-fun-and-learn.finding.md`, which is
the standing finding on the same mechanism: that one is about Erin and names
two surfaces, `domain-parents:` against the value link, and explains why
neither instrument reports the pair. Eppie's case carries a THIRD surface those
instruments do not touch — free prose inside the row's own `conduct`, asserting
a value ("under Faith") that neither of the other two says, and asserting scope
over a sibling domain as well. Prose in a row is checked by nothing at all.
