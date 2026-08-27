---
id: b3e191d6-4f9f-5502-9b53-e411646834e3
page-type-slug: finding
title: "Cluster mutation hook unregistered"
domain-slug: page-type/agent-hook
---

# Claim

`block-cluster-mutations.sh` is documented in two places as a live hook blocking mutating cluster verbs, yet it is registered in none of the three settings files that would make it fire.

# Evidence

Found during a close read for #16286; verified by the filer before filing.

THE GAP. `packages/infra/scripts/block-cluster-mutations.sh` exists, executable, 5,302 bytes, but is registered in NO settings file — not `.claude/settings.json`, `~/.claude/settings.local.json`, or `~/.claude/settings.json`.

Eleven sibling hooks ARE registered in `.claude/settings.json`: block-addon-direct-install, block-claude-plugin-config, block-destructive-git, block-direct-main-writes, block-memory-writes, block-oversized-memory-core, block-pages-mirror-edit, block-playwright-stray-filename, block-root-filesystem-scan, block-symlink-into-main, block-user-settings-write. This one is absent.

WHY IT MATTERS. Two docs assert it live: `packages/infra/scripts/CLAUDE.md:47`, `packages/infra/ci/workflows/docs/ci-quality-hook-system.md:18,57`, describing it as an active PreToolUse hook blocking mutating `kubectl`/`helm` verbs. Every agent reading them believes mutating cluster verbs are mechanically blocked when they are not — a believed-but-absent guardrail licenses less care than a known-absent one.

CANDIDATE RESOLUTIONS, not decided: (1) hook should be active, silently unwired or never wired — register it, add a check failing loud on documented-but-unregistered hooks; (2) deliberately unwired, e.g. blocked legitimate devops work — delete the script, correct both docs. Which is right turns on devops intent the filer does not hold.

STRUCTURAL ITEM. Either resolution shares one failure class: a doc asserts a protection nothing verifies. Recommend a check cross-referencing every `block-*.sh` against the registered hook list, failing either way (registered-but-undocumented, documented-but-unregistered).

STATUS. Homed to dalla, devops seat. Not dispatched — fleet capacity gate closed (verified 4 in deployment/verification, 14 in active-earlier).

DOMAIN. Front matter named domain `agent-hook`, not a declared domain; filed under the nearest fitting declared domain.

Was #16289.
