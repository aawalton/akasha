---
id: 086114cc-540a-56ff-b5f1-d246cd2c4cae
slug: type-and-runner-still-say-check
page-type-slug: finding
title: "The library type and the runner still say check for what the corpus now calls audits"
domain-slug: domain/old-check
---

# Claim

The library type and the runner still say check for things the corpus now calls audits: `tools/lib/check.ts` exports `Check`, `AsyncCheck`, `CheckOutcome`, `CHECK_BAND` and `CHECKS_CEILING_MS`, and `tools/run-checks.ts` is `ops instructions run-checks`.

# Evidence

Alan settled the vocabulary on 2026-08-18: audits are audits, and they live in `tools/audits`. The 48 files moved there in `4f94351ac` and `domains/instructions-audit.md` now declares `instructions-path: tools/audits/*.ts`, so `ops instructions governs` and the directory finally agree. That closes the two-opposed-definitions finding raised on 2026-08-06, which is deleted.

Two of the three layers that finding named are still unmoved, and I left them deliberately rather than by oversight.

`tools/lib/check.ts` is imported by 77 files — 48 audits, 23 tests, the runner, and a handful of others including one gate. Renaming `Check` is not a single exact-string replacement: `Check` is a substring of `CheckOutcome`, `AsyncCheck` and `CHECK_BAND`, and the bare word appears in unrelated senses across the tree, so the rename needs ordering and per-usage care rather than one pass.

`tools/run-checks.ts` is worse to move right now, and that is a timing judgement rather than a difficulty one. It is the command six live seats call, its name is written into their contexts and into 23 files, and this was measured during an Anthropic API outage in which those seats could barely complete a turn. Renaming a command out from under them would have cost more than the misnaming does.

What the misnaming still costs is small and worth stating: nobody scopes a project off a TypeScript type. The dispatch that #19407 lost was scoped off the DIRECTORY name, and that is the layer now fixed.
