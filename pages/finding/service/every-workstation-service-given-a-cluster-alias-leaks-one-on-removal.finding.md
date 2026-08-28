---
id: 01a04c58-3b91-7000-8d27-6e4419af02c3
page-type-slug: finding
title: "Every workstation service given a cluster alias leaks one on removal"
domain-slug: domain/service
---

# Claim

`ops service install` takes away a service's systemd units when its document goes, and never takes away the cluster objects it applied for that document. Two removed services still stand in the cluster as a namespace, a selector-less ClusterIP and an EndpointSlice, each advertising `ready: true` at a workstation port nothing listens on. A caller is refused the connection rather than told there is no endpoint, so a failure wears the shape of a live service.

# Evidence

Read on 2026-08-27 at 23:30 MDT against `main`, and run against the live cluster.

`tools/lib/service-cluster-reach.ts:33-79` composes a namespace, a selector-less ClusterIP and an EndpointSlice for any service document stating `port:` and `namespace:`. The address comes from `workstationAddress()` at `:88-94`, which reads `ip route get 1.1.1.1`. `conditions: ready: true` at `:71-72` is a literal, so the slice says ready whatever the service is doing. `applyToCluster` at `:100-106` runs `kubectl apply -f -`, which prunes nothing.

`ops service install` removes what no document accounts for over the units it owns — `pages/old-ops-command/ops-service-install.old-ops-command.md:43-53` — and names no cluster object anywhere. A deleted document takes the unit and leaves the alias.

Two stand today, both addressing `192.168.68.50`, which is this workstation:

    graph-service/graph-service            8788  ready=true  ops-service-install  2026-08-21
    page-query-service/page-query-service  8787  ready=true  ops-service-install  2026-08-18

`ss -ltn` shows nothing on either port. Both documents are gone — `page-query-service.workstation-service.md` at `7411bbd8c`, `graph-service.workstation-service.md` at `d5591ae74` — and `rg '^port:' pages/**/*.md` now answers nothing, so the mechanism has no document left anywhere and both of its artifacts remain. `graph-service.service` reads `not-found` in systemd and `failed` at the same time.

`45877e79c` saw one half of this and wrote it down — "nothing is left to apply the namespace, ClusterIP and EndpointSlice to". Applying is not the half that bites.

This is Answer Or Refuse in infrastructure. What the cluster answers about whether a service is up is a constant written at install, so the one reading that could report the outage is the one that cannot change.

Not measured: whether either address has been reassigned since its slice was written, which would aim the alias at a different machine.
