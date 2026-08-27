---
id: 8fa15519-4b3f-5a19-8be3-6451e020274a
slug: main-pipeline-wedge-unreported
page-type-slug: finding
title: "Main pipeline wedge unreported"
domain-slug: domain/global
---

# Claim

The `devops-monitor` wedge named `landed-no-main-pipeline` reports `state=clear` while the fleet stands in exactly the state it names. On 2026-08-11 two trees landed on `main` with no main verification pipeline over either and two deploys blocked, and the monitor logged `state=clear` on every tick beside the creator logging `drift_detected no_main_pipeline_at_mainSha`. An operator reading the orchestrator's logs recovered it; the detector built for the condition never fired.

# Evidence

Observed in `kubectl logs -n workers deploy/worker-supervisor` over roughly forty minutes on 2026-08-11, while project #18484's tree and project #18718's tree were both landed on `main` with no main pipeline over either.

Interleaved in the same log stream:

- `[devops-monitor] silence wedge=landed-no-main-pipeline state=clear`
- `main-pipeline-creator: drift_detected no_main_pipeline_at_mainSha mainSha=e37ce1e2cae8e23d1e032ca560c9e87901651d3b`

`ops pipeline status` reported `pipelines.non_terminal=0` throughout, so nothing was in flight that a grace period would legitimately be waiting on.

NOT MEASURED — the wedge's own definition and threshold were not read, so whether `state=clear` reflects a grace window not yet elapsed, a predicate that cannot see this shape, or a detector keyed on something else is unestablished. `subscriber-grace.ts` carries a comment that a `main_pipeline.requested` event can legitimately sit unprocessed for a period, which may be the intended grace; whether forty minutes is inside it was not checked. No history was taken, so how often this has been silent before is unknown.
