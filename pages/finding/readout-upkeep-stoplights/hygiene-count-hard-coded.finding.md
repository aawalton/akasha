---
id: f6bcf248-18f4-5f69-a26f-77e04b1f1b74
slug: hygiene-count-hard-coded
page-type-slug: finding
title: "Hygiene count hard coded"
domain-slug: domain/global
---

# Claim

The Hygiene line on `domains/readout-upkeep-stoplights.md` hard-codes a count the code does not. It says the figure is a mean over `six` circles, and the code divides by however many circles arrive from `INBOX_ORDER`. The two agree today. A seventh inbox makes the line false without anything reporting it, since no test pins the count and the code keeps working.

# Evidence

Raised by the reviewer seat `claude-readout-upkeep-stoplights-archivist-review-instructions`, reading the document line by line on 2026-08-13. Its report is at `~/agents/claude-readout-upkeep-stoplights-archivist-review-instructions/review-readout-upkeep-stoplights.md`.

That seat ran `bun test packages/shared/status-bar-access/src/upkeep-stoplights.unit.test.ts` (88 pass, 0 fail), which pins four of the five Design entries by name, and reports that the weighted mean behind Hygiene is among them — but the divisor's coupling to `INBOX_ORDER` is what it identified as unpinned.

It did not land the repair, which it describes as one phrase, because `domains/domain.md#every-changed-line` reserves a domain's Design to Alan and nothing in its dispatch released it.

I did not re-run the suite or read `INBOX_ORDER`.

Not measured: whether a seventh inbox is expected, which is what decides whether this is worth a phrase or is already fine.
