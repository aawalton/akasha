---
id: 6fce3f5e-2179-52dd-8ba0-f65a0f445364
slug: code-slot-order-stated-twice
page-type-slug: finding
title: "One package states the seat-name slot order two different ways"
domain-slug: domain/seat-name
---

# Claim

`SEAT_NAME_SLOTS` in the code repository declares the seat-name slot order with the seq last, while `read-seat-name.ts` in the same package declares it with the seq second, so one package states the order two ways.

# Evidence

Measured 2026-08-18 against `~/code` at `e2467b2985`.

`packages/agents/shared/seat-name-vocabularies.ts` line 11:

    export const SEAT_NAME_SLOTS = ["persona", "domain", "role", "flex", "task", "seq"] as const

`packages/agents/shared/read-seat-name.ts` line 3, moved by `e2467b2985`:

    export const SLOTS = ["persona", "seq", "domain", "role", "flex", "task"] as const

The instructions repository agrees with the second: `tools/lib/read-seat-name.ts` carries the same order after `a511c390`.

Nothing is broken by this today. `SEAT_NAME_SLOTS` exists only to build `SeatNameSlot` and through it the `SeatNameReading` mapped type, where tuple order carries no meaning. Grepped: the only references to it in the tree are its own two lines, and its consumers — `packages/alanwalton/projects/cli/src/owner/read-owner-seat-name.ts` and two unit tests — import the derived types rather than the tuple.

So the cost is that a reader meeting both finds two orders in one package with nothing saying which is the grammar's. `SEAT_NAME_SLOTS` sits in the module that asks the instructions repository for seat-name answers, which is the one place a reader would expect the harness's order to be reflected.

Bears on the port that takes name-shape declaration out of the code repository: whoever does that will rewrite this module, and this is either a line to correct or a line to delete along with the rest.

Not measured: whether any consumer outside `packages/` reads the tuple.
