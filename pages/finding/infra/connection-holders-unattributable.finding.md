---
id: 06efdb7c-31e8-5473-859e-7efa1bedabe4
page-type-slug: finding
title: "Connection holders unattributable"
domain-slug: domain/global
---

# Claim

The `service_role` connections that fill Postgres are held by exactly two clients: the `workers/worker-supervisor` pod, and the `headscale/talos-subnet-router` pod, which SNATs off-cluster traffic so everything behind it arrives as one address and cannot be attributed further from the server. At a 134-connection reading they split 63 and 71. Neither sets `application_name`, so the server records nothing about who holds them.

# Evidence

Measured 2026-08-15 14:50Z, read-only. This closes the question `pages/finding/infra/postgres-connections-capped.finding.md` leaves open — which caller opens under `service_role`.

IT CANNOT BE READ AS `service_role`. Grouping `pg_stat_activity` over that role through `ops db psql` returns 137 rows with `client_addr`, `state` and `application_name` all null: Postgres hides other users' backend detail from an unprivileged role. The count is visible and the attribution is not, which is why a reading taken this way looks like an answer and is not one.

READ AS SUPERUSER, via `kubectl exec -n postgres postgres-cnpg-3 -c postgres -- psql -U postgres`:

    (unset)  10.244.3.59   idle                  71
    (unset)  10.244.2.138  idle                  56
    (unset)  10.244.2.138  idle in transaction    7

MAPPED AGAINST THE PODS. `10.244.3.59` is `headscale/talos-subnet-router-6597f65774-cmnzq` on node-05. `10.244.2.138` is `workers/worker-supervisor-6d5f95b8bd-xc86w` on node-06.

WHAT THAT MEANS FOR EACH HALF. The worker supervisor half is the events subscriber population, and is attributable. The subnet-router half is not: it is the address every off-cluster client is translated to, so 71 connections there are some unknown number of callers reached through headscale, and no reading taken on the server can separate them.

SCALE. This is a 134-connection reading. The `service_role` / `idle` bucket peaked at 447 the same morning, with the server refusing connections at 11:04Z, so both halves are roughly a third of what they were at the breach and neither can be ruled out as the one that grew.

APPLICATION_NAME IS UNSET ON EVERY ONE. Postgres offers the field, the exporter labels its series with it, and other clients here do set it — PostgREST, `supabase_mt_realtime` and `realtime_subscription_manager_pub` all appear by name. These do not.

NOT ESTABLISHED. Which off-cluster callers sit behind the subnet router. Whether either half pools or opens per call. Why 7 connections sit `idle in transaction`.
