---
id: bc8b1851-c39e-5242-bb6c-fcce688b7417
page-type-slug: finding
title: "The fixture Design line is wider than the classifier enforcing it, which sets aside __fixtures__ alone"
domain-slug: domain/code-comment
---

# Claim

The Design line "A fixture a test reads is outside this domain." is wider than the classifier that enforces it. `tools/code-comment/tree.ts` sets aside `__fixtures__` only, and the gate denied a probe file under `packages/infra/spec/cli/test/fixtures/` — one of four such directories in the code repository. A fixture in any of them is inside the domain by the classifier and outside it by the line.

# Evidence

Found during the review-instructions reading of `domains/code-comment.md` on 2026-08-19, by running the gate over a probe payload placed under `packages/infra/spec/cli/test/fixtures/` and reading `tools/code-comment/tree.ts`.

Measured: that the classifier honours `__fixtures__` alone, that the gate denies a probe under a `fixtures/` directory, and that four such directories exist in the code repository. Not measured: how many files stand in them, or whether narrowing the line or widening the classifier is the cheaper repair.
