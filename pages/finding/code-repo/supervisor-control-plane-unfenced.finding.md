---
id: 14f8408a-fa2b-5a48-ae7e-6306b3f6fc3e
page-type-slug: finding
title: "Supervisor control plane unfenced"
domain-slug: repo/code-repo
---

# Claim

The worker-supervisor HTTP control plane, which spawns, kills and restarts every worker in the pod, accepts any request from anywhere in the cluster with no authentication, and the NetworkPolicy that a live source comment says fences it does not exist anywhere in the tree.

# Evidence

Read at `~/code` HEAD `13135651993c19af09ce41b6295264191071d3c1` on main.

The comment asserting the boundary is in live source, not in a removed head document.
`packages/infra/ci/cli/src/lib/worker-supervisor-client.ts:12-14` reads: "The supervisor's
HTTP server has no auth header — the NetworkPolicy gates ingress to `pipeline-engine@ci`
step pods and to the tailnet-reachable workstation."

No such NetworkPolicy exists. `git grep -n 'kind: *"\?NetworkPolicy'` across
`packages/infra` returns hits in three files only: `k8s/headscale/synth.ts` (six),
`k8s/tailnet-egress/synth.ts` (four) and `k8s-types/src/cdk8s-synth.unit.test.ts` (two,
fixtures). None names the `workers` namespace.

The absent-authentication half is true. `packages/shared/worker-supervisor/src/http-server.ts`
reads no token, authorization, header or caller identity anywhere in the request path —
grepping it for `token|authorization|auth|header` returns one line, `:73`, setting
`content-type` on an outgoing response. `handleRequest` at `:213` dispatches on method and
pathname alone.

What that surface does: `POST /workers` (`:245`) spawns, `DELETE /workers/<name>` (`:250`)
kills, `POST /workers/<name>/restart` (`:251`) restarts, `POST /repo/sync` (`:244`) syncs
the repo, `GET /workers` (`:234`) and `GET /repo` (`:226`) read.

It is reachable cluster-wide rather than pod-locally. The same client file at `:18`
addresses it as `http://worker-supervisor.workers.svc.cluster.local:8080`, so any pod in
the cluster resolves it, and the listener takes no `hostname`:
`packages/shared/worker-supervisor/src/supervisor.ts:188-191` calls `Bun.serve({ port:
opts.httpPort, fetch: … })`, binding all interfaces, with `main.ts:5` recording port 8080.
