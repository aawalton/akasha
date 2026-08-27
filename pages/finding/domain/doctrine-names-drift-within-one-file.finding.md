---
id: ee360006-a14b-5cd7-b774-72304b2a4c88
page-type-slug: finding
title: "Doctrine names drift within one file"
domain-slug: page-type/domain
---

# Claim

Two more doctrine names sit in the unstated-and-unrefused position the class finding
enumerates, and one of them drifts inside a single file: `Boot Digest` carries 49 citing
files and `Aggregate Derivation` 48, both stated in no live document, and neither is among
the eight names that finding lists. `Aggregate Derivation` is glossed four different ways
by one file's own citations of it, which is the drift the class claim predicts, observed
without leaving `boot-digest.ts`.

# Evidence

Measured 2026-08-08 first-hand while emptying `dirty/code/packages-alanwalton-daily-tracking-docs-surfaces.md`, whose `pillar-freshness.ts` entry cited both names parenthetically without stating either.

Citing files counted with `rg -uuu -i -l` over `git ls-files 'packages/**'` in `~/code`, so untracked build output could not inflate them. Live statements sought with `rg -uuu -i -l` over `domains/`, `tools/`, `notices/` and `settings/` in `~/instructions`; both exited 1.

- Boot Digest — 49 citing files, 0 live statements
- Aggregate Derivation — 48 citing files, 0 live statements

Both would rank fifth and sixth in `domain/doctrine-names-govern-without-text.md`, above `Pages Access Boundary` at 40 and below `Rule of Three` at 60, and neither is among its eight. Nothing here disputes that finding.

It offers "the C+D contract" as its sharpest case of a name drifting, glossed three ways across three files. `Aggregate Derivation` is glossed four ways inside ONE file, `packages/alanwalton/personas/core/src/boot-digest.ts`:

- `:107` "so a count and its heading cannot disagree (Aggregate Derivation)"
- `:219` "a count that cannot be misread (Aggregate Derivation: absent is not false)"
- `:249` "derived from the SAME members it explains so the two cannot disagree (Aggregate Derivation)"
- `:289` "the count IS the partition's output rather than a second reading that happens to agree (Aggregate Derivation)"

The first, third and fourth restate one claim. The second, "absent is not false", is a different claim about zero-elision that the others do not carry. There is no text to check any of them against.

Not established: whether these are one doctrine or two — `boot-digest.ts` cites both, and `Boot Digest` may name the surface rather than a rule. I found no mechanism refusing either, so both fail the `Functional Type` test that finding uses to separate harmless unstated names from governing ones.
