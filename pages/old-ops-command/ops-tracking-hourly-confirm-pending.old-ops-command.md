---
id: 92a7ae22-2b6c-59de-8a85-aa5a50812d8e
page-type-slug: old-ops-command
title: "Ops tracking hourly-confirm-pending"
slug: ops-tracking-hourly-confirm-pending
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tracking/hourly-confirm-pending.ts
path: tracking hourly-confirm-pending
---

# Definition

- **Ops tracking hourly-confirm-pending** — the answer Alan has given that nobody has written into the ledger yet.

# Help

Show the custom answer waiting to be applied to the tracking ledger: what Alan was asked, what he typed, when, the block currently open, and the command that closes the loop once you have applied it.

It renders the SAME text the reactor delivers when he answers in his own words, from the same assembler. That is the point of it: whichever of the two reaches you first, you are never left reconstructing his state from `tracking status`, and there is no ordering in which reading one rather than the other costs you anything.

Normally there is at most one, because the emitter will not open a question while an unapplied answer is outstanding — so this command's singular reading is a consequence of that gate rather than an independent guarantee. If the gate ever changes, this changes with it, and until then a second outstanding answer means something is wrong: it is reported rather than picked between. See docs/hourly-confirm.md.
