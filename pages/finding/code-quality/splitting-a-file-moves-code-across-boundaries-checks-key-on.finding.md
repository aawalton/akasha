---
id: d020a57e-cd16-5fdd-98b9-d597079a2c02
slug: splitting-a-file-moves-code-across-boundaries-checks-key-on
page-type-slug: finding
title: "Splitting a file moves code across boundaries checks key on"
domain-slug: domain/code-quality
---

# Claim

Splitting a file changes what is visible about the code inside it, and every check keying on visibility changes its verdict though no logic moved. What was module-private becomes an export. What sat in a `*.test.ts` file lands in a non-test sibling, leaving the guarantees that keyed on it being a test. The split reads as pure relocation, each part passes alone, and the developer who made it cannot see the change from inside its own share. Nothing in `code-quality` says so.

# Evidence

Tree #19315 on 2026-08-17, splitting 77 files to bring them under a 15,000 character ceiling. Branch CI failed at `4f0615550f` on five checks. All seven children had passed their own verification first; none of the five was reachable from inside one share.

One cause under all five. `check-ast-grep`: a `mock.module` call left a `*.test.ts` file for a non-test sibling, where `check-mock-module-surface` cannot see it, which the rule's own text says *deletes* the factory-shape guarantee rather than relocating it. `check-color-literals`: a `#fff` literal left a test file for `test-helpers.ts`, which the check reads. `check-syntax-bundle`: private functions became exported, so their return and property types now sit in escape positions, and raw SQL moved out of its sanctioned module. `check-liveness-census`: a new helper is a new sampling site, unregistered. `check-ast-unused`: new barrel `index.ts` files re-export more than anything consumes.

Measured rather than assumed — the same whole-tree scan against `origin/main` reports zero of the two syntax-bundle findings and exits 0, and no scanner was changed on the branch. These are new content.

Four of seven developers made it independently, and each verified its own share and read clean. The manager caught it only at the tree, which is what a parent exists for. The cost was one bounce cycle per share, and it will recur on every split made after this one.

The ceiling itself was met and is not in question: 103 files stand over 15,000 characters across 16,294 tracked, all in an approved category, zero violations.
