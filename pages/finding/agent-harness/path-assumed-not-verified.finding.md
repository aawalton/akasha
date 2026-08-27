---
id: 2cca6735-517e-542b-ab47-14fe28a2a6c0
page-type-slug: finding
title: "Path assumed not verified"
domain-slug: domain/agent-harness
---

# Claim

Agents name a file path from memory and the tool call is the first thing that tests it. Seventeen observation categories carry this, including three consecutive Read attempts by one subagent against paths that did not exist. A path generated only in CI is the case where the assumption is right about the repository and wrong about the workstation.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 17 rows (seq 5066, 5104, 5109, 5131, 5135, 5137, 5170, 5191, 5213, 5220, 5256, 5278, 5279, 5282, 5287, 5288, 5291) carrying 24 sightings, all at `accumulating`.

Recorded instances: a path assumed after a rename that had already moved it (`packages/workers/pipeline-orchestrator` to `packages/infra/ci/orchestrator`); a doc link authored to `code/docs/long-running-worker-shape.md` where the file is at `.claude/docs/`; a grep into `/packages/agents/shared/src`, absent from the tree; an `ls` of `packages/automation/` before that tree existed; a `git show` against a path absent at the revision named; an `ops project commit --path` naming an already-renamed `devops/SKILL.md`; and a module reference to `@infra/local-executor/flap-retry` that does not resolve. The CI-only path is `packages/infra/ci/orchestrator/k8s/generated/`, which does not exist on the workstation.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
