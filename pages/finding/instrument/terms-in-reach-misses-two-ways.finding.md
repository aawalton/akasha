---
id: 840a0bc6-d32e-54b8-98d7-b06d79cf76b9
slug: terms-in-reach-misses-two-ways
page-type-slug: finding
title: "Terms in reach misses two ways"
domain-slug: domain/instrument
---

# Claim

`checks/terms-in-reach.ts` cannot see a term used in lowercase prose, and cannot see one no `required-reading-slugs:` manifest names at all — so `instrument`, used 37 times across the corpus from documents whose closure does not reach it, is invisible to the check twice over.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/archivist/review-documents.md` dispatched from `review-documents`. The reading named the lowercase blindness; the source was read here and the second mechanism found in it.

The check reports "76 term(s) against 426 domain(s) — 6 use(s) out of reach among the live documents, 0 under quarantine". The reading found all six capitalised: `Health`, `Reference`, `Agent`, `Love`, `Link`.

First mechanism, case. `occurs()` builds `new RegExp(..., "u")` with no `i` flag, and the string it matches is `stated.term` — the bolded head of the source document's `# Definition` bullet, which is capitalised. So a term written in ordinary lowercase prose never fires.

Second mechanism, and the one that reaches `instrument`. Lines 62-75 build the term set from `requiredReadingManifestOf(...)` over every document: "Every slug some manifest names, which is what a term IS." No document names `instrument` under `required-reading-slugs:` — a grep for the entry returns nothing — so it is not in the set and the check never asks about it, whatever case it is written in.

`domains/instrument.md` stands under `code`. Its 37 uses across `domains/*.md` and `domains/tasks/` sit in documents whose closures run through `agent-harness` and never reach `code`.

The file states its own limits at length and calls itself dominated by false positives by construction, so what stands is the two silent misses rather than the advisory verdict.

Not measured: how many of the 76 terms are only ever written in lowercase, how many slugs are declared but named by no manifest, or whether either miss has cost a reader.
