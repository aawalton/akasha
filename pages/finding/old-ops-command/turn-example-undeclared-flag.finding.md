---
id: e518be25-b563-570a-9782-66a3a4928d7f
page-type-slug: finding
title: "Turn example undeclared flag"
domain-slug: page-type/old-ops-command
---

# Claim

`ops tower turn`'s help declares a flag `--action-label` and then gives an example invoking `--action-label-file`, which no verb in the set declares. Anyone typing the second example gets a parse refusal for an unrecognised flag.

# Evidence

The help block at `tools/commands/tower/turn.ts:12` names `--action`, `--turn`, `--action-label` and `--json`. Its second example, at `tools/commands/tower/turn.ts:39`, reads `cat action.json | ops tower turn --turn 57 --action - --action-label-file ./action-label.txt --json`. `--action-label-file` is spelled in no declaration anywhere in the tree.

The text was carried verbatim into akasha with the body, and stands unchanged at `tools/commands/tower/turn.ts`.

Nothing enforces that an example parses against the flags declared beside it, which is why this stood.
