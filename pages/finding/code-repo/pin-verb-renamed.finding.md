---
id: e395fed1-7c4c-5646-b470-5c0a1afeb04c
page-type-slug: finding
title: "Pin verb renamed"
domain-slug: repo/code-repo
---

# Claim

A doc comment on the `agent project-identity` verb still names `tools/pin.ts`, a verb the #17924 rename removed. The comment describes how the `task` vocabulary is resolved, in the present tense, so a reader following it runs a command that no longer exists.

# Evidence

`packages/agents/cli/src/agent/project-identity.ts:27` reads:

    *   - `task` — the slug `tools/pin.ts --resolve --task` answers to, which is the file

`bun ~/instructions/tools/pin.ts --help` exits 1 with `error: Module not found "tools/pin.ts"`. The verb is now `tools/seat.ts`, which takes `--resolve --task`.

Two other sites in the code repository name the old spelling and are correct as they stand, both being notes about the rename itself rather than instructions to run it: `packages/shared/cli/src/aw/init/state-seat.ts:57` and `packages/shared/cli/src/aw/init/bash.unit.test.ts:328`.

Found from outside the code repository, by a seat whose own launch prompt carried the dead spelling. Not repaired here: the archivist seat holds the instructions perimeter, and landing in the code repository means opening its own door and gates.
