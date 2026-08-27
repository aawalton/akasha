---
id: b35c61d9-1171-5ea3-adda-3c457a7761b0
slug: in-flight-counts-nothing
page-type-slug: finding
title: "In flight counts nothing"
domain-slug: domain/global
---

# Claim

`ops seat in-flight` counts no dispatch worker for any lead in the fleet, so the concurrency bound its own help says is read as `< 10` admits every spawn. It matches a worker by the name shape `<dispatch-role>-<seq>`, while `ops seat start` composes `{persona}-{domain}-{role}-{task}-{seq}` — the task segment sits between the role and the seq, so no live worker matches and every parent reads zero. It fails silent in the direction that spawns rather than the one that stalls.

# Evidence

On 2026-08-10, with `claude-code-check-developer-build-singleton-deploy-18347` running and confirmed live by `ops seat list --parent-agent-id 019fece7-b56f-7ae0-aad6-f5d1b0d26b70 --json` (one page, `live: "live"`, `live_reason: "row supervisorPid alive and present in the env-keyed /proc set for this agent"`), `ops seat in-flight --parent 019fece7-b56f-7ae0-aad6-f5d1b0d26b70 --json` returned `{"in_flight":0,"workers":[]}`.

Two other leads carrying visibly live dispatch workers in `ops seat list` answered the same: `amy-code-editor-lead`, whose children include `claude-code-editor-developer-build-singleton-deploy-18407`, `-18382`, `-18375` and `-18438`, returned `in_flight: 0`; `aine-lead`, whose children include `claude-workstation-developer-build-singleton-deploy-18385`, returned `in_flight: 0`.

The name shape is quoted from `ops seat in-flight --help` and the composed shape from `ops seat start --help` and from `ops instructions seat --name --persona claude --domain code-check --role developer --task build-singleton-deploy --project 18347`, which printed `claude-code-check-developer-build-singleton-deploy-18347`.

NOT MEASURED. The matcher was not read in source, so whether it is a regex on the whole name, a suffix test or a segment split is not established here — only that no live worker satisfies it. Whether any caller other than a lead's own dispatch pace consumes the gauge was not surveyed, and neither was when the two shapes diverged. Whether some other spawn path still produces a name the matcher accepts was not tested: the three parents sampled all spawned through `ops seat start` with `--task`.
