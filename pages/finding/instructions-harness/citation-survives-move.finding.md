---
id: 797a11fb-ca89-53e1-be8b-dd7df6069147
page-type-slug: finding
title: "Citation survives move"
domain-slug: domain/global
---

# Claim

A citation naming a principle is checked for its path and never for its target, so moving a principle between domains leaves every link to it resolving, pointing at a document that no longer holds it, while `links-resolve` reports the estate clean.

# Evidence

Found 2026-08-02 while writing a task that needed the same citation.

Five domains reparented under `agent-harness` that morning, and its whole `principles:` manifest and `# Principles` body moved to `domains/instructions-harness.md`, unit slugs unchanged. `domains/agent-harness.md` now declares zero principles.

`tasks/ask-five-whys.md` cited Structure and Entrenched Rule there — both naming units the target had stopped holding. `links-resolve` stayed green, 0 broken on the perimeter, because the file at the end of the path still exists. The check answers whether a path resolves; a link naming a part asserts something further about what the target contains, and nothing compares the two. Repointed in `ac115605` onto a file declaring no principles, so it resolved nothing; `tasks/classify-findings.md` went untouched. Both citations cut 2026-08-03, the units retired in `e28f55f5`.

Measured across the perimeter afterwards: 10 links carry anchor text naming one of the 64 declared principle units. Two were left stale by that one morning's move — the pair above, and `domains/knowledge.md:14` citing Reproduced Count at `agent-harness`, repointed in `bc2317a9`. Four of the ten are sound and two are quotations rather than citations, so a single relocation broke two of the six live ones.

A remedy has to separate a citation from a quotation. Two findings quote a broken link verbatim as their evidence, so an instrument reading anchor text alone would flag the record of a defect as a defect.

The class is wider than principles. Any link whose text names a part — a unit, a glossary term, a section — makes a claim about the target's contents that a rename inside that file breaks without touching the path.

`pages/finding/instructions-harness/tsdoc-links-unscanned.finding.md` records the neighbouring case: links no instrument scans at all. This is the other side of it, a link an instrument does scan while answering a narrower question than the link asks.
