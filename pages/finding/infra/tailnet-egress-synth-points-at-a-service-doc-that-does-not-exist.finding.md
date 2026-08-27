---
id: 8fcfbb3e-ab6c-5114-83ae-0f227f5d26d2
slug: tailnet-egress-synth-points-at-a-service-doc-that-does-not-exist
page-type-slug: finding
title: "Tailnet egress synth points at a service doc that does not exist"
domain-slug: domain/global
---

# Claim

`packages/infra/k8s/tailnet-egress/synth.ts` sends a reader to a service document that does not exist, and no check catches a code comment pointing at a missing file.

# Evidence

The file-level docblock states: "Service description and ops are documented at `packages/infra/k8s/tailnet-egress/CLAUDE.md`." Read on 2026-08-09 at landed main `1bf27a38ca`, that path holds no file, and `git ls-files packages/infra/k8s/tailnet-egress/` lists exactly four tracked files — `foundation.workflow.ts`, `k8s/tailnet-egress-auth.sops.yaml`, `rbac.ts`, `synth.ts`. No `CLAUDE.md`.

Found while doing #18227, which touched the constant a few lines below and its comment. It is not a consequence of that change: the reference is older than the version pin it sits beside, and the bump neither created it nor made it false.

Not fixed, because the repair is a real fork rather than a typo. Dropping the line and writing the missing document are both coherent, they cost very different amounts, and nothing on record says which the service wants — where `links-resolve` in the instructions repo would have refused the equivalent line, no check in the code repo reads prose references inside a comment, so this stood unreported for as long as it has existed.
