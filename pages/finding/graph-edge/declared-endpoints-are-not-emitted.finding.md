---
id: 5e7c0c96-039f-5752-b474-b3c92b268e62
page-type-slug: finding
title: "Declared endpoints are not emitted"
domain-slug: page-type/graph-edge
---

# Claim

Three edge types are registered with endpoints that are not the endpoints they emit. `pkg-depends-external` runs `package` to `installed-package` and `pkg-contains-file` runs `package` to a file node, both registered as `package` self-loops with a comment admitting it. `lockfile-resolves` runs workspace `package` to `lockfile-package` and is registered as a `lockfile-package` self-loop, with nothing saying so. Three is a floor: only six registrations were read against their producers.

# Evidence

Registrations at `packages/shared/graph/producers/src/package/register.ts`, with the admitting comments at lines 58-72 and 74-87, and at `packages/shared/graph/producers/src/lockfile-package/register.ts`. Emission sites at `packages/shared/graph/producers/src/package/package.edge.producer.ts:132-143`, `packages/shared/graph/producers/src/package/package-contains-file.edge.producer.ts:158-163`, and `packages/shared/graph/producers/src/lockfile-package/lockfile-package.edge.producer.ts:56-66`.

Found while defining the edge domains on 2026-08-14. The first two are documented in the code and the third is not, so a reader who trusts the comments as the whole set still gets `lockfile-resolves` wrong. A definition written from the registration alone would have been wrong for that one.
