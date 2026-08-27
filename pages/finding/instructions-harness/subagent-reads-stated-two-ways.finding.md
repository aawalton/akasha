---
id: a5c317d7-3217-5c75-82b2-4a6cdc8dc331
slug: subagent-reads-stated-two-ways
page-type-slug: finding
title: "Subagent reads stated two ways"
domain-slug: domain/global
---

# Claim

Two capitalised statements about subagent reads sit one directory apart and read as contradicting each other. A reviewer took the first for the general case, wrote it into a standing instruction, and landed a second commit to undo it.

# Evidence

`tools/hooks/record-read.ts:18`: "A SUBAGENT'S READ IS RECORDED NOWHERE. Hooks fire inside a subagent too, and a…"

`tools/lib/read-log.ts:54`: "NO SUBAGENT IS VISIBLE HERE, AND NONE NEEDS TO BE. A subagent's door call is spelled…"

Both are true and they are about different mechanisms. The first governs the native `Read` TOOL. The second governs the DOOR — `tools/read.ts` — which derives its agent from the environment, so a subagent's door reads land in its seat's bucket.

Nothing beside either sentence says which mechanism it scopes to, and each is written as a flat capitalised absolute.

The cost, measured: the `review-instructions` reading of `domains/tasks/lead/define-definition.md` on 2026-08-06 read the first, concluded a subagent builds no read record at all, and wrote that into line 67 of a standing instruction and into its reasoning at line 42. It caught the error at slice 51 and landed a correction — `5e5bc96d` then `1bf5b5e7` — and reported the sequence rather than quietly fixing it.

What is true at the door: `tools/hooks/hold-seat.ts` states "a delegate is refused exactly what its seat is refused, which is nothing".

Raised by that reading, and verified independently by the archivist filing this.
