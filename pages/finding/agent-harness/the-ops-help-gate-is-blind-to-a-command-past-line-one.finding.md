---
id: 01a0201c-288b-7000-9761-6c31d9788ad2
page-type-slug: finding
title: "The ops help gate is blind to a command past line one"
domain-slug: domain/agent-harness
---

# Claim

`parseOpsCalls` splits a Bash command only on `[|;&]+` and reads the first word of each segment, so an `ops` call standing on line two or later of a multi-line script is invisible to both help hooks. An irreversible command run that way is neither gated nor recorded. Closing it would newly refuse the hand-back route for seats that overwhelmingly hold no help record, so it is filed rather than fixed.

# Evidence

Measured 2026-08-20 against `instructions:tools/lib/ops-command.ts:21-36`, after `42fa94bce` taught the same parser to see past the `export ACTING_AGENT_ID=…` prefix that `tools/hooks/name-subagent.ts:22` prepends to every subagent command.

Population: 10,814 transcript files under `~/.claude/projects`, 0 unreadable, 4,457,025 records, 242,511 Bash tool calls. Horizon 2026-07-03 to 2026-08-20. Three commands declare `irreversible`: `ali fold`, `ask-alan`, `seat send`.

Invocations a newline split would newly refuse: `ask-alan` 40, `seat send` 24 — against 190 and 115 already visible on line one, so about one call in six takes the invisible form. It would also newly record three help reads.

The `seat send` set is the hand-back route. Specimens: `--content-file /var/tmp/19422/handback.md`, `--project 19417 --role definer --content-file …/handback.md`, `--to nimue --content-file …`. Dated 2026-08-18 17:38 to 2026-08-19 23:42.

Across 9,182 read buckets only 15 hold a digest-valid `seat send` help record — 12 seat-level, 3 subagent-level — and exactly one holds a valid `ask-alan` record, which is synthetic, its agent id being literally `y`.

NOT ASSESSED: 63 of the 64 bypassing invocations carry no `agentId` in their transcript record, and a seat's bucket is named from its `AGENT_ID` environment variable, which no transcript field states. Whether those seats held the help is therefore unmeasured, and the count above is a bound rather than a reading.

Separately: 26 buckets hold an `ask-alan` help key under the superseded root `/var/home/walton/instructions/…`, a path the gate never consults.
