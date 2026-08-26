---
id: ffb577fd-0ed4-56cb-b4b9-f7716e889890
page-type-slug: domain
title: "Completion ring"
slug: completion-ring
domain-parent-slug: domain/ring
---

# Definition

- **Completion ring** — how near done a body of work is.

# Design

The arc is full less the backlog measured against a recent period's intake, so it has no floor and anything past empty draws empty.

The color comes from how many items are left, measured against thresholds the feed sends.

A feed that sends no thresholds colors by the fraction instead: full draws blue, then green at three quarters, yellow at a half, red at a quarter, and black below that.

A backlog of nothing draws an emoji in place of the ring, with the words for nothing left beneath or none.
