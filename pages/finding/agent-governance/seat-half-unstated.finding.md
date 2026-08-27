---
id: 0c4b97af-6aea-553b-a733-093c869ed4cc
slug: seat-half-unstated
page-type-slug: finding
title: "Seat half unstated"
domain-slug: domain/global
---

# Claim

The Design of `domains/agent-governance.md` states the path half of its Definition and leaves the seat half nearly unstated. Five of its six entries are about paths; the one reaching seats says only how a refusal surfaces. `tools/gates/hold-seat.ts` holds that a seat stating nothing passes, so the guarantee is total over named seats only, which a reader of this domain would not take it to be.

# Evidence

Observed by the dispatched reviewer of `domains/agent-governance.md` on 2026-08-06, reading the document line by line, and relayed here unjudged.

It read the gate source for the quoted sentence and ran `ops instructions governs`, `ops instructions write --help` and `ops instructions replace --help` over the path half. It did not measure how often a seat states nothing, nor whether any live seat has passed `hold-seat` that way, so the size of the gap is unmeasured. Whether the departure is worth the boot cost of a seventh Design entry was the reviewer's stated reason for not landing it.
