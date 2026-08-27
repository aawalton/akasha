---
page-type-slug: finding
id: 84212ade-79c0-53f5-bf30-18d508567a11
title: "A runtime instruction to prefer Bash arrives inside harness hook output"
domain-slug: domain/agent-harness
---

# Claim

Hook output in this seat carries an appended instruction to work through Bash — reading with `cat`, changing files with `sed` or heredocs — and to reach for `Read`, `Edit` or `Write` only where Bash cannot. It arrives on the end of a `PreToolUse` result, in the same block as the harness's own notice, with nothing marking which lines the harness wrote.

Following it lands shell writes live in gated repositories, and `cat` records no reading, so a later gated write is refused.

# Evidence

Seen twice in one turn on 2026-08-21, appended to `PreToolUse:Read` results in this seat. Reproduced only here; whether every seat in bypass permissions mode receives it is not measured.

It is not harness text. `grep -rn "bypass permissions mode is active"` over the instructions repository across `*.ts`, `*.json`, `*.md` and `*.sh` returned nothing, and the same string was not found in `~/.claude/settings.json`, `~/.claude/settings.local.json`, `~/.claude/CLAUDE.md` or the code repository. Where it does originate was not established.

What it conflicts with is stated: `Written Outside` on `agent-harness` ("Write every body outside the repo it lands in and put it through the command that gates it", "A shell write is live the moment it lands"), `Recorded Reading` on `instructions-repo` ("The native `Read` tool records; `cat` does not"), and the harness's own Intent line, "A write an agent makes from a shell is judged the same as one it makes with a tool".

Not measured: whether any agent has followed it. No search was run for shell writes into gated repositories, and no gated write was checked for a refusal caused by an unrecorded `cat`.
