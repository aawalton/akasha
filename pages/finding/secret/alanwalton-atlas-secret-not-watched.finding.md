---
id: 3e77889d-0d78-5711-b396-0ad4745678c3
slug: alanwalton-atlas-secret-not-watched
page-type-slug: finding
title: "Alanwalton atlas secret not watched"
domain-slug: domain/secret
---

# Claim

In the `alanwalton` namespace, editing the sops-encrypted secret at `packages/alanwalton/web/deploy/secrets.sops.yaml` dispatches the `alanwalton` and `alanwalton-web` deployments but not `alanwalton-atlas`, so the atlas pod keeps serving pre-rotation credentials in memory until an unrelated atlas-package change happens to roll it.

# Evidence

From project #16427 (domain `secret`, status `someday_maybe`). Found by worker-16406 while sweeping for orphaned secret-checksum machinery during #16406 — a live sibling defect, verified via `workflowWatchMatches` against the built graph, not by reading names. Never carried an objective — this is its capture.

Defect: alanwalton's Secret, authored at `packages/alanwalton/web/deploy/secrets.sops.yaml`, applied by `packages/alanwalton/web/foundation.workflow.ts:36-40`, is consumed via `envFrom: secretRef` (resolved only at pod creation) by two Deployments: web (`packages/alanwalton/web/deploy/k8s/synth.ts:128`) and atlas (`packages/alanwalton/atlas/web/deploy/k8s/synth.ts:149`).

A commit to that sops file dispatches `alanwalton` and `alanwalton-web` (restart via `source-sync-build.ts:308`) but not `alanwalton-atlas`, whose watch seed `package:@alanwalton/atlas-web` (`apps.workflow.ts:27`) never reaches a file owned by `package:@alanwalton/web`.

Observed: `workflowWatchMatches` on `changedPaths=[the sops file]` gives `alanwalton`=true, `alanwalton-web`=true, `alanwalton-atlas`=false, `alanwalton-atlas-foundation`=false.

Consequence: atlas serves pre-rotation `GIT_ACCESS_TOKEN` / `SUPABASE_SERVICE_ROLE_KEY` from memory until an unrelated atlas-package change rolls it — same class as seaweedfs incident #16399, no signal at rotation.

Fix: add `yaml-file:packages/alanwalton/web/deploy/secrets.sops.yaml` to `alanwalton-atlas`'s watchNodes; its deploy already ends in an unconditional rollout restart. Not a checksum annotation — every service emitting one has zero rollout-restarts, atlas has one.

Not in scope: calendar-sync and finances (other co-tenants) are CronJobs that self-heal each run.

Related, same trace: coverage rests on the pkg-contains-file containment edge, so a relocated sops file drops out silently; restart triggers on commit SHA, not secret content, so an out-of-band rotation rolls nothing (`checksum-annotation-substitution.md:52`).
