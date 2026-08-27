---
id: 6c6f5f17-8323-5945-b7c2-09dbfdd24dc4
slug: handoff-recipient-hardcoded
page-type-slug: finding
title: "Handoff recipient hardcoded"
domain-slug: domain/alanwalton-app
---

# Claim

`ops feature-request submit --help` and the `submitFeatureRequest` docblock both name `astra` as the handoff recipient unconditionally, while the live dispatch types carry two different evaluators — `astra` on `KiDispatch` and `atlas` on `JennyDispatch` — so an Atlas feature request forwarded the way the `--help` says reaches the wrong evaluator.

# Evidence

Read on 2026-08-08 against `~/code` at main, while emptying `dirty/code/packages-alanwalton-feature-requests-docs-feature-request-capture.md`.

Two live dispatch types name an evaluator, each on its `feature-request` arm, as a compile-enforced string literal:

- `packages/alanwalton/sms/core/src/ki-handler-routing.ts:55` — `readonly evaluator: "astra"`, returned at line 80.
- `packages/alanwalton/sms/core/src/jenny-handler-routing.ts:50` — `readonly evaluator: "atlas"`, returned at line 65.

Both arms carry `contextDoc: "feature-request-capture"`, so both route through the same capture capability. The docblock at `ki-handler-routing.ts:36-39` states the design: "The evaluator lives on each sender's dispatch rather than inside the capture because who evaluates a request is the sender's domain knowledge; the capture holds only the capability."

The capture surface contradicts it in two places, both unconditional:

- `ops feature-request submit --help`, run: "The emitted `envelope` is the `feature-proposal` payload to forward to `astra` via `bun ops seat send astra --content-file -`." Its source is the `help.description` string at `packages/alanwalton/feature-requests/src/cli/submit.ts:21`.
- The docblock at `packages/alanwalton/feature-requests/src/proposal/submit-feature-request.ts:51-54`: "the skill forwards the envelope via `bun ops seat send astra --content-file -`".

The two agree with each other and disagree with the types. A seat capturing a Jenny-sourced Atlas feature request and following the `--help` sends it to Astra.

Not measured: `decideKiDispatch` and `decideJennyDispatch` are exported from `packages/alanwalton/sms/core/src/index.ts` but `rg -n "decideKiDispatch|decideJennyDispatch"` over `~/code` outside test files returns only their definitions and that barrel re-export, and `handle-inbound.ts` does not mention them. Whether anything reads the `evaluator` field at runtime is unestablished; the type-level divergence stands either way.
