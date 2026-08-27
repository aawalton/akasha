---
id: ab92251c-de1e-5f11-bb38-67c7ca9d6d96
page-type-slug: finding
title: "Dev server restart has no surface"
domain-slug: domain/ops-cli
---

# Claim

The code repository declares seven `dev-server` verbs and the instructions repository carries six. `restart` has a handler and a registry entry over there and no surface file here, so it is the one verb in the namespace an agent reading `tools/commands/dev-server/` cannot see.

# Evidence

Found 2026-08-13 by the seat moving the `dev-server` verb bodies into the instructions repository.

`packages/agents/dev-server/cli/src/dev-server/registry.ts` lists seven paths: `bootstrap`, `list`, `logs`, `restart`, `start`, `status` and `stop`. `tools/commands/dev-server/` holds six files, one per verb except `restart`. The handler it names, `packages/agents/dev-server/cli/src/dev-server/restart.ts`, stands and is 88 lines.

Two other places in this repository now refer to a verb that has no document. The help block on `dev-server start` tells a reader who hits an already-running server to "use `restart` instead", and the operational refusal the body raises says "use 'ops dev-server restart' to replace it". Both are reachable today and both point at a verb the namespace here does not describe.

Whether the verb still dispatches was not tested, so this records the gap in the surface rather than a claim that the verb is broken.

What this means for the body-move task: `domains/tasks/ops/move-command-bodies.md` scopes the set to verbs whose file here calls `runCodeVerb`, and says one with no file here "has not had its surface moved and is not yours". `restart` is exactly that case, so it was left alone. It is a surface move that has not happened rather than a body move that was skipped.
