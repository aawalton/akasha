---
id: 84222634-3028-559f-b8c6-87fe805ff583
page-type-slug: finding
title: "Shared bucket mixed retention"
domain-slug: domain/global
---

# Claim

The `agent-sessions` bucket holds two classes of data under one backup policy: a `sessions/` prefix that self-expires on a 30-day pruner, for which deletion-mirroring backup semantics are correct, and roughly 9.4 GiB of generated media that nothing expires, for which the same semantics put the only off-node copy a day behind any erroneous deletion.

# Evidence

Measured 2026-08-04 against the live SeaweedFS store, listing through the backup job's own credentials.

`agent-sessions` top-level prefixes, objects and size: `sessions/` 3,239 / 6.055 GiB; `images/` 3,836 / 4.193 GiB; `audio/` 1,407 / 3.926 GiB; `media-renders/` 1,189 / 926.489 MiB; `persona-images/` 150 / 313.125 MiB; `persona-voices/` 48 / 17.237 MiB; `story-audio/` 3 / 2.223 MiB. Two empty probe prefixes also remain.

`seaweedfs-prune-sessions` runs `rclone delete "src:agent-sessions/sessions" --min-age 30d` daily at 05:24, prefix-scoped to `sessions/`. It succeeded 2026-08-04T05:24:03Z.

`seaweedfs-backup-bulk` runs `rclone sync "src:$b" "/backup/$b"` over `loki-chunks`, `agent-sessions` and `headscale-db`, so deletions propagate to the node-06 copy. `sync` was the verb in the introducing commit and has never been changed to `copy`.

The estate's backup-chain and seaweedfs documents state the mirror intent as durability rather than depth, and justify the copy-only long-tail tier on exactly this reasoning: a delete on the bucket reaches the node-06 copy, so the mirror inherits the bucket's retention. Every such sentence names the Postgres sync job; none names the bulk job, and no document states an accepted consequence for the non-expiring prefixes above.

Not measured: whether these media objects are reproducible from another source or are the only copy; whether anything else replicates them off-node; and what wrote the two empty probe prefixes.
