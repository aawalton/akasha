---
id: e2181ce0-562a-5b94-8cbd-def112da43b9
page-type-slug: finding
title: "Supervisor control plane unauthenticated"
domain-slug: repo/code-repo
---

# Claim

The worker supervisor's HTTP control plane authenticates nothing. No route handler reads a token, a header or any caller identity, so whatever can reach the port can spawn a child, kill one, restart one, or move the repo under all of them. Nothing stands in front of it either — no NetworkPolicy is synthesized for the namespace, and the Service is `ClusterIP` with no Ingress — so the only thing bounding reach is where the Service sits rather than any control something asserts.

# Evidence

Read on 2026-08-07 against the live code repo, while ingesting `dirty/knowledge/supervised-child-lifecycle.md`. The quarantined document records the same observation; it is queued for removal, which is why this is filed rather than left there.

**No authentication.** `http-server.ts` `handleRequest` (lines 213-255) dispatches on `req.method` and `url.pathname` alone. A search of that file for `auth`, `Authorization`, `Bearer` and `token` returns no matches at all. The routes reached this way include `POST /workers` (spawn), `DELETE /workers/:name` (kill), `POST /workers/:name/restart` and the repo-sync mutation.

**No NetworkPolicy.** None is synthesized for this namespace. The Service is `type: "ClusterIP"` (`synth.ts:148`) with no Ingress defined.

**Reach is real, not theoretical.** Children are spawned with the pod's own environment (`child-lifecycle.ts:117`, `env: { ...process.env, WORKER_DEPLOYED_SHA: currentSha }`), so a caller who can reach the port can start a process holding the supervisor pod's secrets.

**Not a gap in an unfinished surface.** The rest of the plane is carefully built — mutations serialize on a per-supervisor mutex, the worker listing takes that mutex specifically so a scrape cannot catch the window between a restart's kill and its spawn, and 21 unit-test files pin the package's behaviour. The absence of any caller check sits inside a component that is otherwise closely reasoned, which is what makes it worth filing rather than assuming it was noticed.

What this finding does not settle: whether cluster-internal reach is judged sufficient here. That is a decision someone may already have taken and not written down. The observation is that nothing in the code or the manifests asserts it.
