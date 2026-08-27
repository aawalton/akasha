---
id: 6cdcfbbe-f6a6-5b55-92fc-924731dc799c
page-type-slug: finding
title: "Session object compressed unwritten"
domain-slug: page-type/agent
---

# Claim

The agent row carries `sessionObjectCompressed`, and nothing in the code repo ever sets it: the flag is read at two decompression call sites, defaults to false, and no compressor exists, so the cold-session zstd path it gates cannot fire.

# Evidence

Measured on 2026-08-07 in `~/code`, while ingesting the quarantined head document `dirty/code/packages-agents-shared-docs-session-transcript-streaming.md`, which states the field is "set by the nightly compactor when a cold session has been rewritten as zstd".

`rg -uuu -n "session_object_compressed|sessionObjectCompressed"` over the whole repo, excluding `**/dist/**` and `**/*.log`, returns five lines and no more. All five are reads: the field's type at `packages/agents/shared/db-agents.ts:234`, its row mapper at `:246-247` defaulting to `false` when the row value is not a boolean, and two consumers passing it into `readSessionObject` — `packages/agents/cli/src/agent/logs.ts:183` and `transcript-materialize.ts:175`.

No writer, and no compressor to be one. `rg -uuu -n "zstdCompress|compressSession|nightly.*compact"` over the same repo returns only `node_modules` type declarations and Bun's own docs; the sole zstd code in tracked source is decompression, `Bun.zstdDecompressSync` at `packages/agents/shared/object-store.ts:232-235`. `ops seat --help` lists `agent compact`, which is Claude's `/compact` slash command over a session's context, not an object-store compactor.

The flag is reachable from outside the repo — it is an agent-page property, so a row could carry `true` — but nothing in the estate writes one, and a reader who sets it by hand would be handing `readSessionObject` a promise no writer keeps.
