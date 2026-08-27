---
id: c3cd4fa2-5431-5660-99db-ba87d21f5deb
page-type-slug: finding
title: "Form repaired claim left false"
domain-slug: task/review-instructions
---

# Claim

A reading can correct the form of a claim and leave it false: the 2026-08-10 reading of `refusals/hook-unprobed.md` repaired `lib/hook-probe.ts` to `tools/lib/hook-probe.ts` and stamped the document, and that file holds no probes and says so in its own header.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/hook-probe-failed.md` dispatched from `review-documents`, which found and repaired it as an adjacent repair at `5aba2348`. The history was read here.

Commit `83be76027`, Mon Aug 10, carries two changes and nothing else: `+reviewed-at: 2026-08-10`, and the body's path from `lib/hook-probe.ts` to `tools/lib/hook-probe.ts`. So the reading touched that sentence, made its path root-relative as the refusal schema requires, and recorded a whole reading of the document.

`tools/lib/hook-probe.ts:35` says: "THE PROBES THEMSELVES ARE NOT HERE. This file is what a probe IS and how one is run; `hook-probes-typescript.ts`, `hook-probes-shell.ts` and `hook-probes-artifact.ts` hold the three sets."

So a reader told to "add a probe in `tools/lib/hook-probe.ts`" is sent to the one file in the set that holds none, and the reading made the wrong path more correctly spelled.

This is the failure `domains/tasks/archivist/review-instructions.md` names: "Trimming and rewriting both take the content as true, so a line that is wrong survives them intact." The repair was a spelling repair, and the Run step — which asks a reading to run what the line claims about the machinery rather than read the code for it — would have opened the file and met the header.

What it costs elsewhere: a `reviewed-at:` record is what `tools/stale-reviews.ts` treats as a reading done, so this document would not have been named again until 1000 characters moved under it.

Not measured: how many other stamped documents carry a claim their reading corrected the form of, or whether that reading ran anything at all.
