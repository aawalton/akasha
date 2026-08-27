---
id: bf6f6d24-9fdd-5dc6-b4af-f116c2b287ef
page-type-slug: finding
title: "Row watch poll or subscribe unstated"
domain-slug: domain/agent-harness
---

# Claim

No document states whether a new row-watcher in the harness should poll or subscribe.

# Evidence

A review of `domains/agent-harness.md` on 2026-08-15 removed the Design line "A row change reaches the harness by a poll on the existing heartbeat, never by a realtime subscription" as false: the `messages` MCP server every seat launches subscribes on `postgres_changes` through `packages/agents/shared/supabase-realtime.ts`, and the heartbeat is that subscription's backstop. A grep of `domains/` and `page-types/` for realtime, subscription and heartbeat afterwards returns only alert, command and drop-detector documents, none of which says which a new watcher should use. Whether the corpus wants such a line, and whether it would be an Intent or a Rule rather than a Design entry, was not judged. The reviewer's reading of the code was not re-run here.
