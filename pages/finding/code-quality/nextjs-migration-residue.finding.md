---
id: 476fa249-93a3-5dce-9e07-836629725b2a
page-type-slug: finding
title: "Nextjs migration residue"
domain-slug: domain/code-quality
---

# Claim

Four pieces of dead or stale residue from #10097's 2026-05-16 Next.js-to-Vite/React-Router migration remain unswept: a 168-line Dockerfile generator backing an empty registry cohort, two dead tunnel-route shell functions inside a live file that target nonexistent k8s manifests, roughly 14 stale doc references naming deleted paths or packages, and one unverified possible latent bug in a Dockerfile referencing a stale watcher path.

# Evidence

From project #16430 (domain `code-quality`, `someday_maybe`). Enumerated by worker-16406 while sweeping for orphaned secret-checksum machinery during #16406, out of scope there; filed together as one migration's (#10097, 2026-05-16) residue — split if fixes diverge. Never carried an objective — this is its capture.

1. Dead Dockerfile generator: `packages/infra/scripts/src/generate-dockerfiles-nextjs.ts` (168 lines). `nextjs` is live in `SERVICE_TYPES` (`generate-dockerfiles-types.ts:7`), reached via exhaustive switch (`generate-dockerfiles.ts:71-72`), but the 17-entry registry has zero `type: 'nextjs'` entries. Left out of #16406: removal touches the type union, extension-schema doc, and `check-service-dockerfiles-gitignored.unit.test.ts:17-22`, whose comment reserves the empty cohort "until a new nextjs entry is added" — the decision to revisit.

2. Two dead tunnel-route functions in `packages/infra/lib/deploy-functions.sh`: `add_tunnel_route` (:658-660), `remove_tunnel_route` (:716-718), targeting `.../cloudflared/configmap.yaml`/`deployment.yaml` — neither exists (verified via ls); both die on their guard (:639/696). The shell file is live (`cloudflared/foundation.workflow.ts:160,188`). Confirm tunnel-route management didn't move before deleting.

3. ~14 stale doc references naming a deleted path/package: `.gitignore:50`; `k8s/cli/CLAUDE.md:67`; `network-policy-model.md:93-94`; `network-architecture.md:77`; `network-policy-model-policy-tables.md:29`; `dockerfile-generation.md:13`; `temper/watcher-tray/CLAUDE.md:77,86,90`; `shared/design/system/CLAUDE.md:43,50,52`; `shared/auth/CLAUDE.md:30`; `distribution-model.md:34`; `temper/game/trading/pricing/client/CLAUDE.md:9`.

4. Unverified latent bug: `packages/infra/k8s/temper-watcher/build/Dockerfile:81` references `/app/repo/packages/temper/next/watcher/` — only the comment was read; check the command below it before treating as doc-sweep.

Excluded: CLAUDE.md files naming `@temper/next` as historical, and adapter comments in `packages/temper/web` — historical prose or a separate refactor.
