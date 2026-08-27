---
id: c5c60102-f9b6-5fff-b941-704a6aae31e2
slug: crossings-compose-paths-not-verbs
page-type-slug: finding
title: "Crossings compose paths not verbs"
domain-slug: domain/agent-harness
---

# Claim

The code repository reaches the instructions tree by composing paths into its layout rather than by naming its verbs, at fifteen sites against one clean crossing.

# Evidence

Measured 2026-08-05, against the target Alan set the same day: two independently deployable services interact through a verb, not a file. The caller names a command and one locator; where a file must cross, the callee renders it and hands back the location.

One crossing meets it. `packages/infra/checks/src/lib/instructions-owner.ts:98` spawns `ops instructions champions --json`, passes the root only as `INSTRUCTIONS_ROOT` in the environment, and parses stdout. Its header states it: it names no path inside that tree.

Six more spawn a verb but compose the path to it — `<root>/tools/<x>.ts` — in `tool-door.ts:28` behind all seventeen `ops instructions` verbs, `supervisor-boot-prompt.ts:49`, `supervisor-pin-defaults.ts:64`, `resolve-stated-identity.ts:59`, `pin-identity.ts:256`, and twice into generated bash at `aw/init/bash.ts:278`.

Fifteen dereference a composed path. `settings/agents.json` at `supervisor-spawn-settings.ts:59` and `settings/subagents.json` at `supervisor-spawn-agents.ts:52`. Four corpus walks in `@agents/shared` — `personas/`, `roles/`, `tasks/`, and a whole-tree walk in `domain-corpus.ts` that re-implements the quarantine rule and a frontmatter parser. Five tree walks under `packages/infra/checks`, two of them byte-identical copies of the same file-set helper. The launch cwd at `supervisor-interactive.ts:76`.

The four corpus walks have an answer already inside the tree: `tools/lib/identity-vocabulary.ts:47` computes exactly those four sets by exactly those rules, and no verb exposes it. The package cycle each walk cites as its reason is an argument against importing, which a spawned verb does not do.

Three cannot become verbs and each is argued rather than asserted: the `BASH_ENV` forwarder, which bash reads before any process exists; `estate-trees.ts:86`, which composes a prefix for string comparison hundreds of thousands of times per run and never opens a file; and the `claude` child's cwd, which a third party demands as a real directory.

Carried out of the agent-harness initiative when Alan deleted it.
