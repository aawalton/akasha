---
id: 5a877cca-60b5-568c-aa6b-2e215720417f
page-type-slug: finding
title: "Claude MD citations all dead"
domain-slug: domain/global
---

# Claim

Every `CLAUDE.md` path cited from infra source is dead, so a docblock pointing at a service's documentation is a pointer to nothing rather than a pointer that has gone stale in one place.

# Evidence

Collecting every `packages/**/CLAUDE.md` path named in a `.ts` file under `packages/infra`, ignoring `dist/`, gives 44 distinct cited paths and none of them is a file that exists. The citations are ordinary docblock prose — `synth.ts` for the cloudflared tunnel says service description and ops are documented at `packages/infra/k8s/cloudflared/CLAUDE.md`, and `git ls-files` on that directory lists sixteen tracked files with no `CLAUDE.md` among them.

Two findings already stand on single instances of this, `check-docblocks-cite-quarantine` and `tailnet-egress-synth-points-at-a-service-doc-that-does-not-exist`. What is new here is that the population is total rather than partial, which is what separates a citation that rotted from a convention that was removed underneath its references.

Not measured: whether these documents ever existed or were moved somewhere the citation could have followed; citations of any other file name; repositories other than the code repository; and file types other than `.ts`. Nothing was checked about whether any check in either repository could read a path out of prose, so whether this is reachable by an instrument is open.
