---
id: 7de1d0f6-53fb-5332-b4d3-302b5f41b2b7
page-type-slug: finding
title: "One seat states an initiative with no document, so a sweep counts it as holding nothing"
domain-slug: page-type/seat
---

# Claim

Sophia's live seat states the initiative `persona-only-for-alan`, and no document under `initiatives/` carries that name. A stated initiative whose document is gone reads as finished, so `sweep-seats` counts that seat as holding nothing and names it as a live seat with no unfinished assignment.

# Evidence

Seat record `019fcc5d-c5ec-7e5f-ad43-85b29a81a0e3.json` under `~/.instruction-seats` states `"initiative":{"value":"persona-only-for-alan"}`, and `sophia` is a live tmux session. Listing `initiatives/` in the memory repository shows thirteen documents, none of them named `persona-only-for-alan`.

`tools/sweep-seats.ts` states that an initiative stated alone "is finished where its document quotes no unresolved intent, or where the document has been deleted", and `initiativeFinishedIn` in `tools/lib/seat-sweep.ts` returns true when no path matches the stated slug.

This was found while flattening `initiatives/` and predates that change: the other six live seats stating an initiative were restated to the new spellings, and this one matched nothing before or after.
