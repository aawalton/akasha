---
id: ac387280-7ae7-56f7-a84c-5a1cd78e1052
page-type-slug: finding
title: "Liveness zombie fixture flakes"
domain-slug: domain/global
---

# Claim

`agent-liveness-for-rows.cli.test.ts`'s zombie fixture fails intermittently, throwing "fixture could not manufacture a zombie" from `_liveness-fixture-test-helpers.ts` rather than asserting anything about the code under test.

# Evidence

Seen once during #18946's checks, in a run of `packages/agents/shared` and `packages/agents/routing-core` together: the case "the verdict CHANGES when the state changes > T2 zombie → repointed at a live wrapper → live" failed at 5181ms with `error: fixture could not manufacture a zombie`, raised at `_liveness-fixture-test-helpers.ts:342`. The helper spawns a process, polls up to a deadline for `isPidZombie(pid)`, and throws when the deadline passes.

It is a flake rather than a standing red, and both directions were measured. On the same worktree the file alone passed 21/21 twice immediately afterwards, and an earlier run of the whole `packages/agents/shared` package in that same worktree had passed with 0 fail. On an untouched `origin/main` checkout at e43ae8c621b52916e8a756e9c4552742d9cf1c3a it passed 3/3.

Nothing in #18946 reaches it: that project removed the gmail email watcher, its two `messages.source` tags and their pairings, and touched no liveness, process or spawn code.

The suite is `cli`, so CI's `{unit, property, component}` set never runs it and the workstation slow-suite gate does. A green CI therefore says nothing about this case either way.
