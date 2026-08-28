---
id: daa29fad-1729-5e84-b596-7df214e514e5
page-type-slug: finding
title: "A seat starting again clears every delegate's read record at once"
domain-slug: domain/read-record
---

# Claim

A seat starting again removes every subagent page standing under it, whether or not that delegate is still running, and the read record goes with the page. One coordinator resume therefore clears the record of every delegate it has out, at the same instant, mid-task. This is a third way a delegate loses its record, alongside its own return and a mechanical landing, and it is the only one where the agent that pays never acted at all.

# Evidence

Measured 2026-08-28. `tools/hooks/agent-hook-state-subagent.agent-hook.code.attachment.ts:32-35`: on `SessionStart`, unless `source` is `compact` — the whole of `PROCESS_SURVIVES` at `:13` — the hook calls `removeSubagentPagesOf(seat, "started again")`. So `resume`, `startup` and `clear` all sweep.

`tools/lib/subagent-page.ts:115-133` takes every standing page of that seat and runs `rm.ts` over all of them in one commit. Nothing there asks whether a delegate is still running.

Removing a page takes its sidecars, and the record is `<page>.readings.uncommitted.attachment.json`. `.gitignore:3` is `*.uncommitted.attachment.*`, so the record is untracked and does not come back when the page is remade.

It fired four times since 2026-08-27 20:00:

    5440b08b23 08-28 02:47:31 astra started again, so the 5 subagent page(s) standing under it go
    4e8171c054 08-28 00:15:14 thea  started again, so the 3 subagent page(s) standing under it go
    7031e265a8 08-27 20:33:32 nimue started again, so the 5 subagent page(s) standing under it go
    0f7158d54a 08-27 20:29:08 vera  started again, so the 4 subagent page(s) standing under it go

Seventeen delegate records in one night, five at a stroke.

Not measured: whether any of those seventeen delegates was mid-task when its record went.
