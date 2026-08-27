---
id: e4f64a07-cbc9-54a7-bb23-e802f2944a2d
slug: retired-verb-still-spawned-by-deploy
page-type-slug: finding
title: "Retired verb still spawned by deploy"
domain-slug: domain/ops-cli
---

# Claim

Retiring an `ops` verb does not reach the callers that spawn it from the code repository, and nothing measures the gap. `ops voice restart` was removed at `45a18d080`, but `move-to-local-daemons.ts` still spawns it on every deploy touching `@alanwalton/voice-cli`'s closure. The dispatcher exits 1, the deploy warns and carries on, and the voice listener keeps running the code from before the deploy.

# Evidence

Seen on #19202's deploy, which passed both verdicts. The deploy log carried the dispatcher's full command list, `ops: unknown command`, and then `[voice] WARNING: restart failed (exit 1); run 'bun ops voice restart' manually to reload the deployed code`.

The advice in that warning cannot be followed: the verb it names is the one that no longer exists. `ops voice --help` lists `exp4-drive`, `exp4-score`, `logs`, `run`, `speak` and `status`, and no `restart`.

`tools/commands-retired.txt` line 27 records the retirement and states the replacement: "voice restart — the same unit; restarting it is `systemctl --user restart voice-listener`. Removed at 45a18d080, unrecorded until 2026-08-14."

The caller is `LOCAL_DAEMONS` in `packages/alanwalton/projects/cli/src/lib/move-to-local-daemons.ts`, which holds `{ ns: "voice", packageName: "@alanwalton/voice-cli" }` and restarts by spawning `["bun", "ops", daemon.ns, "restart"]`. Its siblings in the same directory do not go through `ops` at all: `move-to-filler-drain.ts`, `move-to-memory-reaper.ts` and `move-to-wake-watcher.ts` each call `systemctl --user restart <unit>` directly, which is what the retirement note says voice should now do.

Two things kept it alive. The remedy is COMPOSED rather than stated — `bun ops ${daemon.ns} restart` is well formed for every namespace, so it spells a plausible verb whether or not one exists, and no literal stands in the source for a search to find. And the siblings that state their remedy as a literal string are the same siblings that name a real command.

The failure is silent in the sense that matters: the deploy's own verdicts pass, so nothing gates on it, and the warning is one line in a long log. Every deploy touching that closure has been leaving the listener stale.

The general case is that a verb's retirement is recorded in the instructions repo while its callers stand in the code repo, and no check reads one against the other. `voice restart` is the instance that surfaced; whether it is the only one is unmeasured.
