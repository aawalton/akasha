---
id: a3760fb2-f401-5f65-8cab-7ba232c3b0fb
slug: flap-diagnostics-capture-retired-cidr
page-type-slug: finding
title: "Flap diagnostics capture retired cidr"
domain-slug: domain/global
---

# Claim

The workstation flap diagnostics capture the retired k3s service CIDR, so the two captures that would show whether cluster routing survived a flap come back empty on every Talos cluster and an empty capture is indistinguishable from a clean one.

# Evidence

Measured 2026-08-07 at `~/code` `ecf5f9518f`, while emptying `dirty/code/docs-workstation-context.md`.

`captureFlapDiagnostics` in `packages/infra/local-executor/src/flap-retry.ts` writes a snapshot when `retryStepOnFlap` sees a transient cluster flap. Two captures name a CIDR: `["ip", "route", "show", "10.43.0.0/16"]` at line 117 and `["ss", "-tn", "dst", "10.43.0.0/16"]` at line 120. The comment at 111-113 says what they are for — the first "confirms the cluster-IP next-hop is still installed", the second "shows active ClusterIP-bound TCP sockets".

`10.43.0.0/16` is the retired k3s service CIDR. The live cluster is Talos. On this workstation `kubernetes.default.svc.cluster.local` resolves to `10.96.0.1`, `buildkit.buildkit` to `10.100.180.155`, `registry.registry` to `10.106.127.82` and `git-transport.git` to `10.111.8.21` — all in `10.96.0.0/12`. `tailscale dns status` lists split-DNS for `cluster.local` and `svc.cluster.local` at `10.96.0.10`, not `10.43.0.10`. `packages/infra/k8s/headscale/synth-constants.ts:24` records the router that advertised `10.43.0.0/16` as replaced.

Both captures therefore match nothing. `ip route show` on an absent CIDR prints nothing and exits 0; `ss` prints only its header. The snapshot is written, the operator log names the directory, and the two files meant to answer whether cluster routing survived are empty — which is also what they would look like if routing had collapsed. The diagnostic cannot distinguish its own staleness from the failure it records, and it is read only after a flap, when nobody is auditing the CIDR.

Three live sites carry the retired numbers as description rather than as an executed argument: `cluster-access.ts:14-15`, `packages/shared/dotfiles/provision-macbook.sh:136`, and `packages/infra/k8s/supabase-realtime/scripts/bootstrap-tenant.ts:22`.
