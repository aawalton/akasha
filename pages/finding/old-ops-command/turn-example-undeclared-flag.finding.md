---
id: e518be25-b563-570a-9782-66a3a4928d7f
slug: turn-example-undeclared-flag
page-type-slug: finding
title: "Turn example undeclared flag"
domain-slug: page-type/old-ops-command
---

# Claim

`ops tower turn`'s help declares a flag `--action-label` and then gives an example invoking `--action-label-file`, which no verb in the set declares. Anyone typing the second example gets a parse refusal for an unrecognised flag.

# Evidence

The help block's `flags` list names `--action`, `--turn`, `--slug`, `--action-label` and `--json`. Its second example reads `cat action.json | ops tower turn --turn 57 --action - --action-label-file ./action-label.txt --json`.

The text arrived unchanged from the code repository's `packages/alanwalton/tower/src/tower/turn.ts`, where it stood the same way, and was carried across verbatim when the body moved here — a help block is compared against the code repository's when it arrives, so a change made during a move cannot be told from the move.

Nothing enforces that an example parses against the flags declared beside it, which is why this stood.
