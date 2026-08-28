---
id: 5a877cca-60b5-568c-aa6b-2e215720417f
slug: claude-md-citations-all-dead
page-type-slug: finding
title: "Claude MD citations all dead"
domain-slug: domain/global
---

# Claim

Every `CLAUDE.md` path cited from infra source is dead, so a comment pointing at a service's documentation is a pointer to nothing rather than a pointer that has gone stale in one place.

# Evidence

First measured over the code repository's `packages/infra`, where collecting every `packages/**/CLAUDE.md` path named in a `.ts` file, ignoring `dist/`, gave 44 distinct cited paths and none of them a file that existed.

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha`, where infra stands at `infra/` and there is no `packages/` directory. The population is far smaller and the verdict is unchanged. `git ls-files | rg 'CLAUDE\.md'` returns exactly one tracked file, `infra/eso-rig/CLAUDE.md`. Two comments under `infra/` cite a `CLAUDE.md` as documentation and neither resolves:

- `infra/loki-service/synth-configs.ts:80` — "See ../CLAUDE.md for the measurement and rationale", which from `infra/loki-service/k8s/` names `infra/loki-service/CLAUDE.md`; no such file.
- `infra/k8s/src/buildkit/synth.ts:57` — "see the Deployment resources block and the buildkit CLAUDE.md memory-sizing rationale"; neither `infra/k8s/CLAUDE.md` nor `infra/k8s/src/buildkit/CLAUDE.md` exists.

The remaining `CLAUDE.md` strings under `infra/` are fixture paths inside `infra/workspace-cli/src/lib/package-move/docs-rewrites.unit.test.ts` and the `endsWith("/CLAUDE.md")` predicate at `infra/workspace-cli/src/lib/package-move/docs-rewrites.ts:16`, which are the mover's own subject rather than citations.

Two findings already stand on single instances of this, `check-docblocks-cite-quarantine` and `tailnet-egress-synth-points-at-a-service-doc-that-does-not-exist`. What is new here is that the population is total rather than partial, which is what separates a citation that rotted from a convention that was removed underneath its references.

Not measured: whether these documents ever existed or were moved somewhere the citation could have followed; citations of any other file name; and file types other than `.ts`. Nothing was checked about whether any check in either repository could read a path out of prose, so whether this is reachable by an instrument is open.
