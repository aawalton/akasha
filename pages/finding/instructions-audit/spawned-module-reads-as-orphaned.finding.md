---
id: 45ba9676-2ab6-5d08-bd6b-a1c7f606da13
slug: spawned-module-reads-as-orphaned
page-type-slug: finding
title: "A module bash spawns reads as orphaned"
domain-slug: domain/global
---

# Claim

Nothing tells an agent that a TypeScript file under `tools/` is spawned by name from a shell script, so a file with no importer reads as orphaned and is removed while a caller still runs it. The audits hold no orphan check at all, and the judgment is made by hand against the import graph.

# Evidence

`tools/lib/agent-children-live.ts` was removed at `a5a057148` with the message "orphaned and unreferenced — nothing has imported it", which was true of every import and false of `tools/statusline.sh`, which spawned it by path. That call swallows its own failure with `2>/dev/null || echo 0`, so every seat rendered its child count as `[0]` from 16:49 until an unrelated suite run surfaced it at 23:10.

What made the loss silent is that the caller was written to fail open. A status line that cannot answer prints the bare form rather than an error, which is right for a transient failure and indistinguishable from a permanent one. The only instrument that saw it was a test, and it saw it as a wrong number rather than as a missing file.

The check that would have caught it is a grep for the file's own name across both repos before removing it — the same motion `tools/unreached.ts` makes for quarantined documents and nothing makes for code. This is the second finding on the same seam: `code-paths-blind-to-shell-spelling` records a path spelled for a shell that an import-shaped check could not see, and closes by asking what else is spelled that way. This is what else.

Found by the whole suite going red on `statusline.test.ts` during unrelated work, three hours after the removal.
