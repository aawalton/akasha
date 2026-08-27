---
id: 82742afa-8bdd-5725-bb2f-faa1e283a2f2
page-type-slug: finding
title: "The generated-file test is case-sensitive where the Design line it enforces is not"
domain-slug: domain/code-comment
---

# Claim

The generated-file test is case-sensitive, which the Design line it enforces is not. The gate allowed a file headed `// GENERATED …` and denied the same file headed `// generated …`. `domains/code-comment.md` says a file is generated where it carries "a header saying so", and the lowercase header says so.

# Evidence

Found during the review-instructions reading of `domains/code-comment.md` on 2026-08-19, by running the gate over two probe payloads differing only in the case of that word.

Measured: those two probes. Not measured: how many generated files in either repository carry a lowercase header and are therefore held to the rule, and whether any generator writes one.
