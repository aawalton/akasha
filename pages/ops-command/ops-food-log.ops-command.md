---
id: b68357c6-1495-554d-bf75-ffe7cb84de35
page-type-slug: ops-command
title: "Ops food log"
slug: ops-food-log
domain-parent-slug: domain/ops-food
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/food/log.ts
path: food log
---

# Definition

- **Ops food log** — one food entry written, then any cover published and the day's nutrition re-rolled if each can be.

# Design

A step after the entry never turns a written entry into a failed run.

A run says which steps after the entry did not land.

# Help

Log one food entry — the single canonical food log. With a photo (--image) it publishes the image as the entry's cover (served via /api/image/<foodId>); without one it is a quick weigh-and-enter row (e.g. measured plant grams, or an awareness food with no plant content). `plantGrams` is the ONE source of Natalie's nutritionPoints Health pillar — the day's total rolls up at 1 pt/gram, refreshed live after each entry. The entry records the instant it happened at, and which day it counts to is worked out from that instant against when Alan woke. --date and --time state that instant as a New York wall clock; --date alone is read as noon. Every non-zero exit means no entry was written. Publishing the cover and re-rolling the day both happen after the entry and are best-effort: either one missing is said on stderr and named in `notLanded`, and the run still exits 0, because re-running would write a second entry.
