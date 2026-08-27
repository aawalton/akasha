---
id: e4c9231a-c2f4-5db7-b769-297f91ec10a7
page-type-slug: finding
title: "A message to a dormant seat never wakes it"
domain-slug: domain/agent-harness
---

# Claim

Every revive spawned from a message run fails at once, because it runs `bun ops` from the instructions repository, which declares no scripts at all. The message row is written and the seat is never woken, so a message to a dormant seat sits unread until something else happens to start that seat.

# Evidence

Hit twice on 2026-08-19 sending to Astra's dormant seat `01a01b22-ffc4-7fa9-85bd-f94c5b980a75`. Both times `ops seat send` printed `the message stands and reviving <id> to read it exited 1: error: Script not found "ops"` and both rows stand unread.

`tools/lib/message-to-start.ts:127` spawns `["bun", "ops", "seat", "revive", agentId, "--verify", "--json"]`, and `run()` at `:24-30` sets `cwd: REPO_ROOT`. `package.json` in that repository has no `scripts` key, so `bun ops` looks for a script named `ops`, finds none, and exits 1 before any argument is read. Reproduced directly: `cd ~/repos/instructions && bun ops seat revive --help` prints `error: Script not found "ops"` and exits 1.

The name that works is the one on PATH. `/var/home/walton/.local/bin/ops` is a bash wrapper that runs `${INSTRUCTIONS_ROOT:-$HOME/repos/instructions}/tools/ops/cli.ts`, and its own comment says it exists so `ops` resolves into the instructions tree rather than into a `node_modules/.bin` link. Nothing makes `bun ops` reach it.

Three more call sites carry the same spelling and have the same fault: `tools/lib/recipient-resolver-revive.ts:14`, and `services/temper-watcher-liveness.ts:234` and `:242`, the last two spawning `ops seat record` to raise an alert.

Not measured: how many rows are standing unread behind this, or whether a seat started for a domain that has never had one takes the same path — `message-to-start.ts` runs its start through the same `run()`.
