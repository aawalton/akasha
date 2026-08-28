---
id: 01a045b3-918c-78e5-afba-544b82b2108e
page-type-slug: finding
title: "A page's file name is reproducible by no rule"
slug: page-name-on-disk-reproducible-by-no-rule
domain-slug: domain/pages-system
---

# Claim

A page can sit on disk under a perfectly good name that no rule can produce again. The name is then held only by the filename, and any process that recomputes a page's name from its properties either renames the page or refuses it.

# Evidence

Mechanism corrected 2026-08-28; what stood here was false and is struck. This paragraph read that the default name rule is `{slug} ?? {id}`, that `pages/finding/database/no-touch-signal-has-no-writer.finding.md` carried neither and so could not be named at all, and that five pages stood that way at `098d0feb9`.

The chain is not `{slug} ?? {id}`. `nameOf` at `page/name/naming/naming.ts:83-96` falls `named-for` to `slug` to `title` to `id`, and `title` folds through `pageStem`. It already read that way at `098d0feb9`, the commit this page pins — `git show 098d0feb9:page/name/naming/naming.ts` gives the same four arms — so the mechanism was wrong when written rather than overtaken. A page carrying a title is therefore always nameable, and the fault is a name that does not match the file rather than a page with no name at all.

The cited example no longer holds either: that file now carries `slug: no-touch-signal-has-no-writer`, which is the name on disk.

What is measurable today: 73 of 3,083 findings carry no `slug:`, and 73 carry no `id:`. Each is named by folding its title, so each holds its name only in its filename and in a fold nothing re-derives on write. `pages-named-as-stated` covers 23,442 of 59,000 pages — only those whose page type declares a convention — and reports 23,439 carrying the name their file does, the three exceptions being `idle-persona-card` pages sharing one filled address rather than pages named by no rule. The earlier count of five, and a later count of nineteen taken by a different instrument, are both left unreproduced here; the 73 is what this page now stands on.

An unstated id is derived from the file's own address, so for a page carrying neither key the default is circular: the id is computed from the name, and the name falls back to the id.
