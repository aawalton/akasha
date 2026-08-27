---
id: 0bf78129-d9a9-5707-82ee-eb5ea5da88bf
slug: stop-hook-count-unchecked
page-type-slug: finding
title: "Stop hook count unchecked"
domain-slug: domain/agent-harness
---

# Claim

The `ops seat hook-decisions` help states a Stop-hook count that is false of the registration it describes, and nothing compares the two.

# Evidence

The help for `ops seat hook-decisions` glosses its `independent` role as covering a continuation the halt hook did not cause, "(all four Stop hooks share the flag, so another one blocking sets it too)". The same sentence stood in the quarantined head document at `dirty/code/packages-agents-cli-claude.md`, which is where I met it.

Three Stop hooks are registered, not four. I enumerated every settings file in `~/instructions/settings/*.json`, `~/.claude/settings*.json` and `~/.claude/accounts/*/settings*.json`. Exactly one carries a `Stop` key — `settings/agents.json` — and it registers `local-agent-attention-hook.sh`, `forward-turn-to-recorder.sh` and `block-headless-halt.sh`. Its own event tally reads `Stop: 3`. The only other settings file present is `~/.claude/settings.local.json`, 45 bytes, with no `Stop` key. `ops enforcement list` reports 27 hooks across `settings/agents.json` and names the same three among them.

What the count is cited for still holds at three: another Stop hook blocking does set `stop_hook_active`, so the `independent` role is not wrong, only its arithmetic.

The reason this is worth recording is the direction the drift runs. The count is a claim made in the code repository about a registration held in the instructions repository, and nothing checks it. That is the shape `tools/checks/hook-reasons-mirror.ts` was built for — its own header records the halt guard splitting `interactive` into two reasons on 2026-07-31 without telling its reader, discarding 1,292 records against 254 accepted over one 24-hour window, noticed months later only by two unrelated tests failing during a migration. That check pins the guard's reason vocabulary across the same repo boundary in the same direction. It does not cover this sentence, and no other instrument I found does.

Not established: when the count went stale, or whether a fourth Stop hook was ever registered. I read the current registration only, not its history.
