---
id: bc250141-0b1c-5774-8834-5414ad0bfaf3
slug: infra-wedge-worked-around
page-type-slug: finding
title: "Infra wedge worked around"
domain-slug: domain/global
---

# Claim

A wedged control plane is worked around by the agent rather than escalated, and Alan clears it by hand. He unwedged the ci-pod-dispatcher himself after an agent had stalled on a `check-build-graph stuck dispatching` pipeline; a deploy failed on a pre-existing merge-queue subscriber wedge and the agent retried instead of escalating.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 8 rows (seq 5078, 5079, 5080, 5084, 5118, 5126, 5248, 5249) carrying 9 sightings, all at `accumulating`.

A `ci-storage` prune exited non-zero at session tail and was retried rather than root-caused. A deploy failure against the retired `k8s.alanwalton.com:6443` hostname was infrastructure rather than a code regression. `trigger_pipeline` contract drift wedged every project workstation-side at the first database call. One recovery was manual: an agent kubectl exec'd into a pod to POST /workers for all ten canonical workers by hand. Two further rows record a halt-on-friction protocol invoked for a transient registry connection refusal, and pod state refetched mid-investigation during a live rolling update.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
