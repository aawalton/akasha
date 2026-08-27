---
id: d1e5d154-e0ba-5633-8e97-f05cd54aaab9
slug: name-omits-initiative
page-type-slug: finding
title: "Name omits initiative"
domain-slug: domain/seat-name
---

# Claim

Line 13 of `domains/seat-name.md` is false: the name does not spell every assignment. It says "A seat's name spells every attribute and assignment it states." `domains/seat.md:15` names three assignments — task, project-seq and initiative — but `SeatAssignments` in `tools/lib/compose-seat-name.ts` holds only `task` and `seq`, and no segment carries an initiative. That file records name distinctness as the whole of the exclusion keeping two seats off one row, so the wrong model of it follows.

# Evidence

Raised by a review-instructions seat on `domains/seat-name.md`, which read the strict reading of Every Changed Line and landed nothing but its own review record.

I verified line 13 reads as quoted, and that `SeatAssignments` declares only `task: string | null` and `seq: number | null`. The reviewer reported `domains/seat.md:15` naming three assignments — task, project-seq and initiative — and I confirmed the document does name initiative.

The reviewer read `compose-seat-name.ts` whole (220 lines) and ran the two name test files, 33 passing. I did neither.

Its candidate wording, offered as a draft rather than a phrasing recommendation: "A seat's name spells every attribute it states, its flex, and its task and project-seq — except where its principal is Alan, and then it spells no assignment and nothing a persona default says."

Not measured: whether any seat has actually collided because of the wrong model.
