---
id: 837aec0b-748f-5c8e-afea-efd3c6b39d65
page-type-slug: finding
title: "Retired verb still called"
domain-slug: domain/ops-cli
---

# Claim

Retiring an `ops` verb leaves its callers standing. `ops voice restart` was retired at `45a18d080` and is recorded in `tools/commands-retired.txt`, and the deploy path still calls it and still tells whoever reads the output to run it by hand.

# Evidence

Seen during the deploy of project #19347 on 2026-08-17, which touched nothing to do with voice. `ops project deploy` printed `ops: unknown command` and then `[voice] WARNING: restart failed (exit 1); run 'bun ops voice restart' manually to reload the deployed code`. The deploy passed both its claims either way, so nothing failed and nothing was retried.

Read back here rather than taken from that report:

- `ops voice` declares six verbs — `exp4-drive`, `exp4-score`, `logs`, `run`, `speak`, `status`. There is no `restart`, and `tools/commands/voice/` holds no `restart.ts`.
- `tools/commands-retired.txt` line 27 records the retirement: "voice restart — the same unit; restarting it is `systemctl --user restart voice-listener`. Removed at 45a18d080, unrecorded until 2026-08-14." Its siblings `voice start` and `voice stop` went the same way.
- The only thing in the code repository still describing the verb is `packages/alanwalton/voice/cli/dist/src/voice/restart.d.ts`, a stale build artifact with no source behind it.
- The daemon-restart step that emits the warning stands in `packages/alanwalton/projects/cli/src/lib/move-to-local-daemons.ts` and its four siblings, which name `{ ns: "voice", packageName: "@alanwalton/voice-cli" }` among the daemons a deploy reloads.

Two things fail rather than one. The call is dead, so a deployed voice change is not reloaded and the deploy says so only in a line it does not fail on. And the remedy the warning names is the retired verb itself, so an operator who follows it gets `ops: unknown command` a second time. The retirement note says the real remedy is `systemctl --user restart voice-listener`.

`refusals/command-retired-while-live.md` stands, so the retirement register is enforced somewhere; whatever it reaches, it did not reach a caller in the code repository.
