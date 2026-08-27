---
id: f988029b-b0f2-5138-81e9-178c00b60d11
slug: deploy-calls-retired-voice-restart
page-type-slug: finding
title: "Deploy calls retired voice restart"
domain-slug: domain/global
---

# Claim

The deploy pipeline calls `ops voice restart`, a verb that was retired at `45a18d080` and answers nothing, so every deploy prints a warning telling the operator to run by hand a command that does not exist.

# Evidence

Seen on the deploy of project #19126 on 2026-08-14, which landed `e345d3a3279837c255a16b5933aa49a41d6d38b0`. The deploy printed `ops: unknown command` followed by `[voice] WARNING: restart failed (exit 1); run 'bun ops voice restart' manually to reload the deployed code`, and the deploy went on to pass.

Running `ops voice restart` by hand afterwards exits 1 with `ops: unknown command`. `ops voice --help` declares `exp4-drive`, `exp4-score`, `logs`, `run`, `speak` and `status`, and no `restart`. `tools/commands-retired.txt:27` records it: "voice restart — the same unit; restarting it is `systemctl --user restart voice-listener`. Removed at 45a18d080, unrecorded until 2026-08-14."

So the retirement recorded the replacement and the deploy path was never moved onto it. The warning names the retired verb rather than the `systemctl` line that would work, so an operator following it fails a second time.

Nothing about this touches the enricher-to-deriver rename #19126 carried; it was simply visible from that deploy.
