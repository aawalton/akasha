---
id: fc7ae1f6-be77-593c-8bb0-75b36cddd916
slug: seven-rules-cannot-fire
page-type-slug: finding
title: "Seven rules cannot fire"
domain-slug: domain/global
---

# Claim

Seven of the 73 alerting rules cannot fire: a metric-position selector in each has had no sample in the 46 days of history Prometheus holds. `DeploymentReplicasMismatch` names `kube_deployment_status_available_replicas`, which has never existed — kube-state-metrics publishes `kube_deployment_status_replicas_available`. Five K3s rules read apiserver and etcd metrics nothing scrapes, and `MainPipelineContiguityGap` reads one nothing emits.

# Evidence

Measured 2026-08-17, read-only, sweeping all 73 rules for whether anybody could act on the condition.

THE SEVEN, each `count(count_over_time(<metric>[46d]))` returning no series:

    DeploymentReplicasMismatch                 kube_deployment_status_available_replicas
    K3sApiserverStorageConsistencyCheckFailed  apiserver_storage_consistency_checks_total
    K3sApiserverWatchCacheReinitializing       apiserver_watch_cache_initializations_total
    K3sApiserverTerminatedWatchers             apiserver_terminated_watchers_total
    K3sApiserverListRequestErrors              apiserver_request_total
    K3sKineRangeLatencyHigh                    etcd_request_duration_seconds_bucket
    MainPipelineContiguityGap                  ci_main_pipeline_contiguity_gap_age_seconds

None has fired once in those 46 days. `ALERTS` reaches back only to 2026-07-03 though retention is 90d, so 46 days bounds this claim.

THE CONTROLS MATTER, absent-right-now not being absent. `pg_query_drift_ratio` reads absent on an instant query, being published only while a fingerprint drifts, yet the same 46-day count returns 77. The method separates sparse from never.

THREE CAUSES, taking three different repairs.

A TRANSPOSED NAME. `DeploymentReplicasMismatch` is `kube_deployment_spec_replicas != kube_deployment_status_available_replicas`. The left side has 45 series, the right has never had one, and kube-state-metrics publishes `kube_deployment_status_replicas_available` — the same words reordered. A vector comparison with an empty right side yields nothing rather than erroring, so the rule matches nothing. This is a live availability guard that has been silently off.

NO SCRAPE TARGET. 23 `apiserver_*` metrics exist, all audit, delegated-auth and client-certificate series from other components, none of the four these rules name. `etcd_*` returns zero.

NO PRODUCER. `ci_main_pipeline_*` returns zero metrics.

NOT ESTABLISHED. Whether the apiserver metrics were once scraped, or the contiguity metric ever emitted.
