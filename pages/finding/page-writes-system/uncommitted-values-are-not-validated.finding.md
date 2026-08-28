---
id: e282164d-996c-45ef-bf0d-8d9762a434f6
slug: uncommitted-values-are-not-validated
page-type-slug: finding
title: "Uncommitted values are not validated"
domain-slug: domain/page-writes-system
---

# Claim

No gate judges an uncommitted page property value against the property definition that declares it.

# Evidence

`tools/lib/uncommitted-file.ts` — `patchUncommitted` and `patchUncommittedUnder` write through `writeUncommitted`, which is a `writeFileSync` to a scratch name and a `renameSync` onto the target. No gate stands anywhere in that route, so an uncommitted value never passes through `tools/write.ts`, which is where every other body is judged.

No file under `tools/gates/` imports `readUncommitted` or `uncommittedPathFor`, and no command is named for the sidecar. `tools/lib/page-uncommitted-keys.ts` resolves which keys a page type may hold there and renders no verdict on their values.

`tools/gates/page-holds-properties.ts` judges the frontmatter keys of the body being written and the rows of a `jsonl` sidecar, parsing each row as JSON. It never opens `<page>.uncommitted.yaml`. Its detail line states the number of keys it checked, and that number is what it checked.

Observed 2026-08-24. `pages/page-property-definition/agent-readings.md` declares `type: map(reading)`, and the record type declares `content-hash` and `spans` as required, plus `seen-at` and `mechanical-hash`. Sixteen standing agents carry 2,184 readings written by this route. A reading missing a required field, or carrying one the record does not declare, would land and be read back with nothing saying so.

The record type was asked for in place of `type: json` so the values could be validated. It buys one spelling for the four field names across code and data; it does not buy the judging.

A second thing rests on the same gap. `defined-on-slug: reading` names two documents — `pages/page-property-type/page-property-type-reading.md`, the record type, and `pages/page-type/reading.md`, a page type under `narrative-world`. `domain-dictionary` allows one spelling under two domains. Which of them the four `reading-*` properties bind to cannot be observed, because nothing judges an uncommitted value and the page type states `files: none`, so it has no pages that could fail.
