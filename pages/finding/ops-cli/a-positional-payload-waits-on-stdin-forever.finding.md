---
id: 4409450d-f4e4-5323-afe8-b4e25ad424b6
slug: a-positional-payload-waits-on-stdin-forever
page-type-slug: finding
title: "A payload passed as a positional argument waits on stdin forever"
domain-slug: domain/ops-cli
---

# Claim

`ops instructions write` and `ops instructions edit` take their payload from `--input-file`, which defaults to `-`, meaning stdin. A caller who passes the JSON payload as a positional argument instead is not refused: the positional is ignored, stdin is a terminal nobody is going to close, and the command blocks with no output at all until something kills it.

# Evidence

Observed by aine on 2026-08-17. Three calls of the form `ops instructions write "$(cat <<'JSON' ... JSON)"` each hung. One ran 36 minutes before being killed; a fourth, reduced to a single small file and run under `timeout 180`, also hung and was killed at the ceiling. None of the four printed a single character — no outcome line, no usage, no refusal. The same payload through `ops instructions write --input-file /var/tmp/aine/panels.json` landed in under a second.

What makes it expensive is that the failure is silent and looks like slowness rather than like a mistake. A gated write is genuinely slow enough — typecheck alone runs a couple of seconds over 2616 files — that a caller's first reading of no output is that the gates are running. The second reading is that another seat holds a lock, which is plausible here and sends the caller looking at other seats' commits rather than at their own invocation.

`tools/write.ts` reads `flag("--input-file") ?? "-"` and passes it to `readPayload`; nothing between the argument parse and that read looks at the positional arguments at all.

Refusing a positional argument that was not asked for turns 36 minutes into one line. The narrower repair is to refuse stdin where it is a terminal, mirroring `tools/read.ts`, which already refuses to print into a pipe for the same reason: a caller who cannot be answered should be told so rather than left waiting.
