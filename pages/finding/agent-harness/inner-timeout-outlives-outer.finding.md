---
id: 85a6024b-2442-5e3f-9a5f-bc173aa58c1f
page-type-slug: finding
title: "Inner timeout outlives outer"
domain-slug: domain/agent-harness
---

# Claim

Timeout stacks here repeatedly set the inner bound at or above the outer one, so the inner abort can never fire and the outer bound is what the caller waits out.

Three stand: a 10,000ms credential probe inside a 5,000ms bound; four nested bounds at turn end all equal at 15,000ms; and `ops` subprocesses allowed 3,000ms whose store call inside allows 20,000ms.

The rule against it is already written, in one tool's help text, where it binds only readers of that tool.

# Evidence

Every constant below was read on the tree at the time of filing.

Close path: `PROBE_TIMEOUT_MS = 10_000` at `tools/lib/oauth-identity-probe.ts:6`, reached from the push bounded by `CREDENTIAL_PUSH_TIMEOUT_MS = 5_000` at `tools/lib/supervisor-agent-cleanup.ts:46`. The inner is twice the outer.

Turn end: the `Stop` hook registration in `settings/agents.json` carries `"timeout": 15`; `tools/lib/turn-end-decide-call.sh:11` wraps the call in `timeout 15`; `tools/turn-end-decide.ts:70` sets `JUDGE_PATIENCE_MS = 15_000`; `tools/lib/turn-end-reading.ts:16` sets `DEFAULT_TIMEOUT_MS = 15_000`. Four layers, all equal, so no inner one can win a race against its own caller.

Wake reads: `tools/lib/turn-end-read.ts:6` sets `PATIENCE_MS = 3_000` as the `spawnSync` timeout on `ops` at lines 13 and 27, while `tools/lib/db-agents.ts:5` allows the store `PATIENCE_MS = 20_000` inside that subprocess.

The statement of the rule stands at `tools/turn-end-reading.ts:55`, in the `--timeout-ms` help: "A caller's own timeout must sit OUTSIDE this one, or it fires first and the abort keeping the answer bounded never runs."

What was not measured: no survey of every timeout pair in the repo was made, so three is the number found rather than the number standing. Only the close-path stack was observed firing in production, at a flat 5,000ms; the turn-end stack was observed reaching its ceiling once, at 15.01s; the wake-read pair was read from code and never observed firing at all. Nothing here measures what each inversion costs, and in a stack whose layers are equal the outer bound may be the intended behaviour rather than an oversight.
