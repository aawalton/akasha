---
id: e8c6d842-a970-5fc6-9dc2-b1758846ae1c
page-type-slug: finding
title: "Closing a tracking session is one word from reading it, and nothing reopens what it closed"
domain-slug: domain/alan-harness-tracking
---

# Claim

Closing a tracking session is one word from reading its status, and there is no inverse. `ops tracking status` and `ops tracking close` differ by a single argument, `close` takes none and asks nothing, and no command reopens what it closed. A block ended by mistake cannot be restored: `edit` reaches a standing block, never a closed one. The only route back is starting a second block, which leaves the day reading as two blocks where one was worked.

# Evidence

Established by doing it. On 2026-08-22 a seat ran `ops tracking close` against Alan's live session to exercise a migrated error path, two lines after `ops tracking status` had printed it open. The block ended at 09:28. `edit` would not reopen it, so a second block was started at 09:30 rather than deleting data to reconstruct the first. His day now reads two blocks where he worked one.

Not measured: whether any other command in the set ends state with no inverse, and whether a confirmation would have stopped this particular run, which read the status and acted anyway.
