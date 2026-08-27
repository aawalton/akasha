---
id: 358d737b-76e9-51fd-b0cd-eae16f8d4f74
slug: in-flight-gauge-reads-zero
page-type-slug: finding
title: "In flight gauge reads zero"
domain-slug: domain/agent-harness
---

# Claim

`ops seat in-flight` reports zero dispatch workers for a parent that has a live one, so the concurrency bound its own help describes admits every spawn. A lead reading it before dispatching is told it holds nothing whatever it holds, and the failure runs in the direction that spawns rather than the one that stalls — nothing stalls, nothing errors, and no instrument reports a bound that never bound anything.

# Evidence

On 2026-08-10 at 20:09Z, from the seat `aranya` (agent id 019fce02-bed0-7d4b-9cb3-96e79cc2faec), I spawned `claude-infra-developer-build-singleton-deploy-18490` with `ops seat start`, which returned `{"agent_id":"019fed48-c0e2-7350-b507-ebcea2363310","pid":1718872,"status":"spawned"}`.

Two minutes later, three readings taken in one shell:

`ps -o pid,etime,cmd -p 1718872` showed the process running, elapsed 00:33, its command line carrying `supervisor.ts --headless --agent-id 019fed48-c0e2-7350-b507-ebcea2363310 -a aawalton --profile worker`.

`ops seat alive claude-infra-developer-build-singleton-deploy-18490` returned `live agent row supervisorPid alive and present in the env-keyed /proc set for this agent` — the shared proven-dead oracle that `project list --dispatchable` itself consults.

`ops seat in-flight --parent 019fce02-bed0-7d4b-9cb3-96e79cc2faec --json` returned `{"parent":"019fce02-bed0-7d4b-9cb3-96e79cc2faec","in_flight":0,"workers":[]}`, and the same call without `--json` printed `0`.

So two commands in one CLI disagree about the same worker at the same moment, and the one a lead paces its dispatch by is the one reading zero.

NOT MEASURED. Why the gauge misses the worker was not established — the matcher was not read in source, so whether it keys on name shape, on a row attribute, or on something else is open, and nothing here says the defect is in the matcher rather than in what it reads. Whether every parent answers zero was not surveyed; this is one parent, one worker, one moment. Whether any caller other than a lead's own dispatch pace consumes the gauge was not surveyed. When the two diverged was not established.
