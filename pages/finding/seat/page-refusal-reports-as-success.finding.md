---
id: 0156fd98-071b-56e8-abbb-45ecf1503806
slug: page-refusal-reports-as-success
page-type-slug: finding
title: "Seat page refusal reports as success"
domain-slug: page-type/seat
---

# Claim

`ops seat start` exits 0 when the seat's page was refused and never written. The refusal is turned into a `note:` line in the command's own output and nothing else, so a seat comes up addressable by tmux while its page stands at whatever it last held — or, on a first statement, does not stand at all.

This is the seam that made a real defect invisible for most of a day. It does not report a failure as a failure, so whoever ran the command has no reason to look.

# Evidence

Measured 2026-08-20.

`tools/seat.ts:230-248` composes the statement, calls `writeSeatPage`, and on refusal does only this:

```
if (page.kind === "refused") {
  notes.push(`note:   seats/${seatName}.md was not written, so it stands at what it last held until the next heartbeat — …`)
}
```

The function continues, the notes are printed alongside the ordinary output, and the process exits 0. `tools/lib/state-spawned-seat.ts` reads that exit code as success.

The case that surfaced it: `ops seat start … --flex flex-99` could never write a page at all. `tools/gates/seat-name-stem.ts:42` resolved a seat's flex by reading the page off disk — the page that write is what creates — so on a first statement it read null, re-spelled the name without the flex, and refused for a mismatch it had manufactured. A second fault of the same shape sat at `tools/seat.ts:179`, where `refuseFlex` was handed `launchOf`, which also reads the page off disk.

Both are now fixed, at `c73d4e4d3` and `8fdcc70bb`. The seam that hid them is not.

What makes it worth recording separately from the bug: after the first of those two commits, the flex start stopped printing a refusal and started printing nothing, while still writing no page. The failure got quieter as it got closer to fixed. It was found only by running the underlying statement by hand.

Not measured: whether the headless path at `tools/lib/spawn-seat.ts:197-207` prints its notes anywhere a human or a supervisor reads, or whether the next heartbeat does in fact restate a page that was refused. The comment asserts the latter; nothing here tested it.
