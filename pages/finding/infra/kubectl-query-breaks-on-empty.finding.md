---
id: b7c58e21-b94b-573d-ba4b-f34ec5bdf844
slug: kubectl-query-breaks-on-empty
page-type-slug: finding
title: "Kubectl query breaks on empty"
domain-slug: domain/global
---

# Claim

kubectl jsonpath templates written against `.items[0]` panic with `array index out of bounds` when the selector matches nothing, and a rollout is exactly when it matches nothing. Two sightings are during a rolling restart and one is a race against a terminating pod with no readiness wait ahead of the query.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 5 rows (seq 5121, 5122, 5139, 5270, 5286) carrying 5 sightings, all at `accumulating`.

The selectors recorded are `-l app=worker-supervisor` and `-l app=web`. Container and hostname assumptions fail the same way: `kubectl exec -c worker-supervisor` and then `-c supervisor` were both wrong before `worker-supervisor-main` was found, and a pipeline lookup took a Cloudflare 504 because the target is reachable only on the cluster-local tailscale hostname.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
