---
id: 5d25b3cc-9039-51ba-a4a2-2de07314c9c7
page-type-slug: finding
title: "Work complete comment outlived its window"
domain-slug: domain/instrument
---

# Claim

The comment above `work-complete` in `hook-reasons-mirror.ts` opens "The reader does not carry this one yet", and the reader carries it — `"work-complete"` is a quoted literal at `hook-decision-core.ts:88` — so six lines of standing instruction hang on a false premise.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/halt-reason-undeclared.md` dispatched from `review-documents`. The reading found it and declined to repair it; both ends were read here.

`tools/checks/hook-reasons-mirror.ts:95-103` reads: "The reader does not carry this one yet, and that is a window rather than a drift: the guard's arm for it landed here first on purpose, because the verdict `case` is fail-closed… Do not resolve a `halt-reason-unread` refusal here by deleting this line; that puts the undeclared-writer defect back and leaves the reader wrong as well."

`/var/home/walton/code/packages/agents/shared/hook-decision-core.ts:88` carries `"work-complete",` as a quoted literal, with entries at lines 167 and 227 keyed on it too.

So the window it describes has closed, and the instruction it ends on cannot arise: a `halt-reason-unread` refusal for this word cannot be raised while the reader carries it.

What still holds is the rest of the reasoning — `ops seat held-wake` lists no `work-complete` verdict, so nothing emits it and no record is being discarded. A second reading, of `refusals/halt-reason-unread.md`, confirmed that half firsthand at `headless-halt-wake.sh:158` and warns against discharging the comment whole: its opening sentence is false and its argument is true. That reading's own repair cites the surviving lines as evidence, so deleting the comment would strand a landed change.

Whether it now warns about something else or is discharged is settled by no instrument.

Not measured: whether the deploy that shipped the decider closed the window, or how many other comments in this file describe a state that has since moved.
