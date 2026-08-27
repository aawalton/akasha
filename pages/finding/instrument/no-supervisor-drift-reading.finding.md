---
id: 9bf94602-de24-5880-84e1-b40611a0456c
slug: no-supervisor-drift-reading
page-type-slug: finding
title: "No supervisor drift reading"
domain-slug: domain/instrument
---

# Claim

No agent-facing verb reports supervisor-code drift. `ops model-gateway status` is the only drift reading there is and it tracks a different closure, `local-oauth-proxy` — so an agent asking whether its supervisor change reached the running processes reaches the one instrument there is and gets a wrong answer in the vocabulary it wanted, `current` / `lagging`. The verb is not defective; what is missing is a reading for the closure agents ask about.

# Evidence

Measured 2026-08-07.

`ops seat --help` lists 51 verbs. Only `proxy-status` and `proxy-swap` carry a drift reading and both name the OAuth proxy. There is no `ops supervisor` group — `ops --help` lists 90 top-level groups and none is one.

`ops model-gateway status --help`, its own words: "For each live seat it compares the RUNNING proxy version (on-disk state file) against the LATEST deployed version (the `local-oauth-proxy` App page `liveVersion`): `current` when they match, `lagging` when a newer proxy has been published the seat has not swapped to." And: "a running proxy stays on its spawned version until a deliberate `bun ops model-gateway swap` refreshes it." So `lagging` reports *nobody has hand-swapped this seat's proxy*, true of nearly the whole fleet nearly always. `packages/agents/cli/src/agent/proxy-drift.ts:5` carries that same sentence. The trap is the vocabulary: the verb answers in the asker's words rather than refusing.

REPORTED, NOT VERIFIED HERE, from the quarantined source this was found in and which has since been removed: that a deploy bumps `local-supervisor` and `local-oauth-proxy` at the same recorded second, so the proxy hash moving after a supervisor deploy corroborates the wrong reading with correct timing; that counting by process start time is also wrong, `execvpe` being address-space replacement so pid and `/proc/<pid>` starttime survive a re-exec; and that a seat reads `current` by fresh spawn as well as by re-exec. What it reported as working, also unverified: `~/.cache/agent-terminal-name/<pid>.json` mtime dates each boot including a re-exec, corroborated by `_SUPERVISOR_INHERIT_*` in `/proc/<pid>/environ`. That directory exists and holds per-pid JSON.

NOT MEASURED: how often an agent has read `proxy-status` as supervisor drift. One instance is on record and nothing counts the class.
