---
id: 3e85c71c-edbd-5f78-8490-cfe1176c90ae
page-type-slug: finding
title: "Detail repeats the refusal opener"
domain-slug: domain/instrument
---

# Claim

A reader of the `hook-reasons-mirror` report meets "{script} could not be read" twice in a row: the check's judge detail carries those six words and the refusal body it prints opens with them, and `render()` puts the detail on the line directly above the message.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/halt-writer-unreadable.md` dispatched from `review-documents`. The reading stated the fork and left it; both sites were read here.

`tools/checks/hook-reasons-mirror.ts:164` passes `` `${script} could not be read` `` as the judge detail, with the refusal beside it. `refusals/halt-writer-unreadable.md` opens "{script} could not be read, and this check stops there…". `tools/lib/outcome.ts` `render()` prints the detail on the line above the message.

Neither is false, and neither can be cut without a cost. Shortening the refusal's opener would make the body depend on a line printed by a different file, and `tools/lib/refusal.ts` renders these bodies for callers other than this report. Changing the check's detail instead is a judgment about what a detail should carry when nothing was measured.

The path has never fired: `hook-reasons-mirror` passes over 18 reasons today, and the reading had to force the arm with a probe whose read throws.

The same reading rewrote the rest of that body, having found the loop returns inside its catch — so one unreadable script stops the whole check, and its probe returned exactly one message and a measured population of 0 against 18 on a live run.

Not measured: whether any other check repeats its refusal's opening words in its detail, or what the repetition would cost a reader if the arm did fire.
