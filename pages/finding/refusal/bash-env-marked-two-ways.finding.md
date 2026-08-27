---
id: 835107ba-537e-530c-9d92-32ae0f81e790
page-type-slug: finding
title: "Bash env marked two ways"
domain-slug: page-type/refusal
---

# Claim

`BASH_ENV` is written two ways within one refusal family: backticked in `bash-env-outside-repo` and `bash-env-unresolved`, bare in the other three, so a reader meeting two of the five sees the same name marked as code once and as prose once.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/bash-env-unresolved.md` dispatched from `review-documents`. The reading observed it and left it; the split was counted here and is three bare against two backticked rather than the two and two it reported.

Backticked: `refusals/bash-env-outside-repo.md`, `refusals/bash-env-unresolved.md`. Bare: `refusals/bash-env-settings-absent.md`, `refusals/bash-env-settings-unreadable.md`, `refusals/bash-env-undeclared.md`.

`domains/global.md` carries Ubiquitous Naming — "Use the same name for a concept in code, data, interface and prose alike" — which binds the name rather than its marking, so nothing in the corpus settles this one way. The refusal schema admits marks in a body.

These bodies are printed to a blocked agent through `tools/lib/refusal.ts`, so the marking is what a reader actually sees rather than a source-only detail.

Not measured: how other refusal families mark a variable or a command name, or whether either form is the corpus's habit.
