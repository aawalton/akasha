---
id: 18811d35-6ba1-5bb7-90f3-d8967b1e2242
slug: daemon-restart-phase-calls-retired-commands
page-type-slug: finding
title: "The deploy's daemon-restart phase calls two commands that were both retired"
domain-slug: domain/deploy
---

# Claim

The deploy phase that reloads local daemons spawns `bun ops <ns> restart` for each entry in its table, and both entries — `voice` and `inbox-tracking` — had their `restart` command retired in the same commit. Neither can succeed. It reports a WARNING rather than failing, so the deploy passes while the daemon keeps running the code it ran before.

# Evidence

Seen during the #19315 deploy on 2026-08-18. The run printed:

```
[voice] restarting daemon (91 closure file(s) changed) in /var/home/walton/code
ops: unknown command
error: "ops" exited with code 1
[voice] WARNING: restart failed (exit 1); run 'bun ops voice restart' manually to reload the deployed code
```

`packages/alanwalton/projects/cli/src/lib/move-to-local-daemons.ts` holds the table at lines 11-12 — `{ ns: "inbox-tracking" }` and `{ ns: "voice" }` — and spawns `["bun", "ops", daemon.ns, "restart"]`. On a non-zero exit it writes the WARNING above and returns; nothing fails.

`tools/commands-retired.txt` in the instructions repository records both:

- line 27: "voice restart — the same unit; restarting it is `systemctl --user restart voice-listener`. Removed at 45a18d080, unrecorded until 2026-08-14."
- line 30: "inbox-tracking restart — the same timer; restarting it is `systemctl --user restart inbox-tracking-poll.timer`. Removed at 45a18d080, unrecorded until 2026-08-14."

`ops voice` now carries exp4-drive, exp4-score, logs, run, speak and status, and `ops inbox-tracking` carries no restart either. So the phase's whole population is retired commands, and the retirement list already names what replaces each.

`inbox-tracking` did not raise it tonight only because the same run reported "daemon is not running — nothing to restart", which returns before the spawn. The voice arm is the one that fires whenever a deploy touches its closure.

NOT MEASURED. How long this has stood, beyond the retirement being at 45a18d080 and recorded on 2026-08-14. Whether the voice daemon has in fact been serving stale code since then, which needs its running image compared against the deployed one rather than inferred from this. Whether any other caller of a retired command sits behind a warning like this one.
