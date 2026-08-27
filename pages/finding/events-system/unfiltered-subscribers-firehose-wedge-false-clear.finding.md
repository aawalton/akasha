---
id: f72c7fdf-bfce-57f4-905a-307af072e617
slug: unfiltered-subscribers-firehose-wedge-false-clear
page-type-slug: finding
title: "Unfiltered subscribers firehose wedge false clear"
domain-slug: domain/global
---

# Claim

pages-fs-projector and page-versions-projector subscribe with no pageTypeId filter, so any single domain's write firehose (287,436 temper-mined-item events in one hour) parks them in lag-purgatory; and the subscriber-lag wedge's recovering/cleared states derive from cursorDelta>0 rather than seqLag decreasing, so a consumer losing ground to its own firehose reports as healthy — pages-fs-projector's wedge cleared at 3.2x the seqLag it fired at (82,672 vs 25,719).

# Evidence

Project #16153, domain events-system, no objective; capture off retired `notes` attribute 2026-08-15. Measured live 07-25 12:40-12:49Z.

Detection query (`packages/shared/worker-runtime/CLAUDE.md`) returns 8 rows/4 subscribers; 2 are documented exceptions. The other 2 are not: pages-fs-projector and page-versions-projector (3 rows each, page_type_id NULL) — no pageTypeId filter means they match every page-type's mutations. Firehose measured: 287,436 temper-mined-item events in the 07-24 12:00 window, 217,000 in the 07-25 09:00 window; both ate all of them.

Not hypothetical — pages-fs-projector wedged live while this was written: 12:41:01 wedged seqLag 25,719; 12:49:06 recovering seqLag 97,523; 12:50:11 cleared seqLag 82,672. Processed 16,703 events in ~8min and fell 71,804 further behind — cleared at 3.2x the lag it fired at.

Mechanism (subscriber-lag.ts): the wedge's cursor-velocity gate requires the cursor FROZEN to fire; a laggy-but-advancing cursor is treated as "backlog drain" and suppressed — sound against a bounded catch-up, unsound here since advancing is not draining. Between wedged and recovering the cursor advanced 16,703 while seqLag grew 71,804 (arrivals ~4x drain rate); falling behind at 4x satisfies the gate and reports recovering, then cleared.

Second confirmed instance of the wedge-clears-on-wrong-condition class, independent of #16151's dispatcher-liveness wedge (staleCount=2 in its own cleared payload) — #16151 closed into this row 14:20Z, making item (b) a measured defect, not a suspicion. Also status='idle' at seqLag 25,719 (consistent with #16150 — status carries no lag info). Both routed to owner_handle=null.

Scope: (a) narrow both subscriptions to the page types they actually project, or document as exceptions with reason; (b) every wedge's clear condition must require its own evidence (seqLag) decreasing/empty, checked in the same pass that produces it — a property of how wedge state is derived, not one detector's bug.
