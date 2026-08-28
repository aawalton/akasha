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

`pages/finding/database/no-touch-signal-has-no-writer.finding.md` carries `title` and `domain-slug` and nothing else — no `id`, no `slug`. Its page type declares no name rule, so it falls to the default `{slug} ?? {id}`, both of which are absent, and it cannot be named at all. Folding its title gives `the-no-touch-signal-the-updated-at-trigger-reads-is-set-by-nothing`, which is not the name on disk either.

Five pages stand this way as of commit 098d0feb9: four findings and one `temper-account`. A further 65 findings, 6 messages and 1 story chapter carry no slug and are named by their uuid instead of the readable name their file holds.

An unstated id is derived from the file's own address, so for a page carrying neither key the default is circular: the id is computed from the name, and the name falls back to the id.
