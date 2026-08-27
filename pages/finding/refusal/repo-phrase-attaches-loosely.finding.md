---
id: 26d61214-973f-581c-91f0-2ea977b6092e
slug: repo-phrase-attaches-loosely
page-type-slug: finding
title: "Repo phrase attaches loosely"
domain-slug: page-type/refusal
---

# Claim

Two refusal documents place a repo phrase where it can attach to the wrong noun. `refusals/claimed-by-another-repo.md` — today `pages/refusal/claimed-by-another-repo.refusal.md`, its sentence unchanged — reads "claimed by the `{type}` page type on the {claimed} repo", and `refusals/governed-by-another-repo.md` carries the same construction for a schema. That sibling is gone, so what stands is one document rather than two. The phrase is meant to attach to the claiming, and can attach to the page type, which only the instructions repo holds. The gate's own passing verdict uses the word order that forces the right reading.

# Evidence

Raised by the reviewer seat `claude-refusal-archivist-flex-3-review-instructions`, reading `refusals/claimed-by-another-repo.md` line by line on 2026-08-14. Its report is at `~/agents/claude-refusal-archivist-flex-3-review-instructions/review-claimed-by-another-repo.md`.

That seat drove the document's claims through its one printer in both directions the gate can take, rather than reading the code: two dry runs, one per repo. It reports `page-types/page-type.md` declares `files: instructions:page-types/*.md`, which is what makes the wrong attachment impossible in fact and therefore only a matter of reading. That document is `pages/page-type/page-type.page-type.md` and its glob is now `akasha:**/*.page-type.md`, so the fact holding the wrong reading off is the same one under a new spelling.

It did not land a repair, and its reason is the useful part: both readings send the reader to the same remedy, so this is house style rather than an ambiguity asking for different things; and the sibling was read on 2026-08-10 and kept with the identical construction, so rewriting one alone puts the pair out of step. It offered to land the two-document change in one run.

I did not run either dry run or open the sibling.

Not measured: whether any other refusal places a repo phrase the same way, which would make the change wider than two documents.
