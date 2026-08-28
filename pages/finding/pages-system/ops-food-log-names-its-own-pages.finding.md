---
id: 782b037c-a2b2-5376-a424-08fe5ba28777
page-type-slug: finding
title: "Ops food log names its own pages"
slug: ops-food-log-names-its-own-pages
domain-slug: domain/pages-system
---

# Claim

`ops food log` decides what its pages are called rather than leaving it to the naming path. `stemFor` at `tools/commands/food/log.ts:123-130` is its own stemmer and `freeStemFor` at `:132-147` its own collision suffixer, appending a number at `:146`. It reaches pages through `tools/lib/page-query-client.ts`, imported at `:10`, and nothing under `page/name/`. So a `food-entry` name is settled by this one file and by nothing its page type declares.

# Evidence

Read 2026-08-28 at `d029b287f0`.

`stemFor` at `tools/commands/food/log.ts:123-130` lowercases the title, replaces every run of non-alphanumeric characters with a hyphen, trims leading and trailing hyphens, joins the day string in front, and truncates to `STEM_CEILING`, trimming a trailing hyphen again.

`freeStemFor` at `:132-147` asks for every standing `food-entry` slug through `askComposed` at `:134-138`, counts those equal to the stem or beginning with the stem and a hyphen at `:142-145`, and returns the bare stem where that count is zero, or the stem with the next number appended at `:146`.

Its imports at `:10` are `askComposed`, `pageLanding` and `patchPage` from `tools/lib/page-query-client.ts`. Nothing from `page/name/` appears in the file.

So two things the pages system is meant to own are settled here instead: what a page is called, and what happens when two pages want one name. The collision rule is its own, not the suffixer applied elsewhere in `file-name.ts`.

The count it asks for is bounded by `MAX_FOOD_ENTRIES`, so the collision check runs over a truncated population rather than the whole one.

`pages/finding/pages-system/the-new-default-name-formula-is-wired-to-nothing.finding.md` is the general case of a naming rule reaching nothing; this is a caller that went around the naming path entirely.

Not measured: how many `food-entry` pages carry a suffixed stem.
