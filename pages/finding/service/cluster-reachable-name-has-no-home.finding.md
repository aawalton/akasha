---
id: 01653c45-b31e-5392-bc6e-0fe5fdf1d529
slug: cluster-reachable-name-has-no-home
page-type-slug: finding
title: "A cluster-reachable name has no home in the service family"
domain-slug: domain/service
---

# Claim

A service the workstation runs can be reachable inside the cluster by a DNS name, and no domain in the service family is the place that fact belongs to.

# Evidence

`page-query-service` runs on the workstation under systemd and is being given the name `page-query-service.page-query-service.svc.cluster.local:8787` by project #19357. The cluster reaches it through a `Service` object carrying no selector, whose `Endpoints` name the workstation's LAN address `192.168.68.50` by hand.

Neither domain covers that. `cluster-service` reads "a service the cluster runs as a workload", and the cluster does not run this one. `workstation-service` reads "a service the workstation runs", which says nothing about reachability and would be false for nearly every other unit if a cluster name were asserted of it.

Twelve service files stand in the instructions repository, and this is the only one carrying a cluster name, so the shape has one instance and no second to measure it against.

The property is therefore not yet worth defining. What this records is that when a second such service appears, the question to settle first is which domain the name hangs on, not what the property is called.
