---
id: 114df4c4-9a37-5b62-ade3-c4003ea74cf0
slug: theme-step-holds-products-back-on-a-false-claim
page-type-slug: finding
title: "The theme's first sequence step holds every product back on two claims that are now both false"
domain-slug: domain/global
---

# Claim

The `adopt-file-backed-pages` theme's first sequence step says nothing off the workstation reads a file-backed page, and holds every product back until that changes. Both halves are now false: the page query service answers from the cluster, and a product in production reads projects through it.

# Evidence

The step reads: "The page query service answers where the products run — Nothing off the workstation reads a file-backed page today: every reader opens the files, and the repos are on the workstation alone. No product moves onto files before this, whatever its page type's backing says."

The route exists and carries no pod. `packages/infra/k8s/page-query-service/synth.ts` declares a ClusterIP Service with a hand-written EndpointSlice whose one address is the workstation LAN IP, so the cluster reaches `services/page-query-service.ts` on the workstation directly and the memory repo is current by construction rather than by a sync.

A product already reads it. `packages/alanwalton/web/app/routes/api.project-counts.ts` fetches through `packages/shared/status-bar-access/src/project-query-service.ts`, which names `http://page-query-service.page-query-service.svc.cluster.local:8787`. Exercised from inside the running web pod on 2026-08-19, answering `/q/projects-with-lineage` and `/finished?since=`.

The theme quotes "A product off the workstation reads a file-backed page" from `domains/page-type-backing-file.md` as one of its intents, and that line is met by the same evidence.

Not measured: whether any other product still opens the files directly rather than naming a page query, and whether the step's blocking clause held anything back that is now free to move.
