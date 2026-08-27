---
id: d3040f23-ad4c-555e-8070-6a73bff9b22c
page-type-slug: finding
title: "Dispatcher doc names wrong loader"
domain-slug: page-type/pipeline
---

# Claim

packages/infra/ci/orchestrator/src/ci-pod-dispatcher/dispatcher-tick.ts documents the dispatcher's level-scan query with two stale claims out of three, naming a function and an index kind the live code no longer uses.

# Evidence

Found 2026-07-25 by dalla while measuring the dispatcher's hot query for astra's Existence Check on #15895.

The doc's three claims, at dispatcher-tick.ts: line 6 `attributes->>'status' = 'dispatching'` — correct. Line 19 "via getPagesByPageTypeSlugPg" — wrong, live path calls loadDispatchingStepsPg. Line 20 "composite (page_type_slug, attributes) GIN partial index serves the scan in one indexed pass" — wrong, live path uses the partial btree index pages_step_dispatching_created_at_idx.

Live path: dispatcher-tick-helpers.ts:62 -> loadDispatchingStepsPg (the #15585 dedicated sargable loader).

Cost of the drift: the filer followed the stale line-19 pointer to getPagesByPageTypeSlugPg, read its genuine SQL (`attributes @> $n::jsonb`), and EXPLAINed a query the dispatcher does not run, producing 1,053 buffers instead of the actual 36. The doc's correct half (line 6) would have led to the right query; the filer followed the function name instead of the predicate. The doc had drifted two ways at once (function name and index kind).

Proposed fix, not made: correct lines 19 and 20 to name loadDispatchingStepsPg and pages_step_dispatching_created_at_idx (two lines), and check whether any sibling doc inherited the same GIN claim. Project #16098, status someday_maybe, live-on: deploy, domain pipeline.
