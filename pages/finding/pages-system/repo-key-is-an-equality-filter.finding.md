---
id: 5d4ff430-8ccc-556f-bee1-8b662e2e074e
slug: repo-key-is-an-equality-filter
page-type-slug: finding
title: "A page's repo key filters rather than locates, so a file that changes repository is severed from its page in silence"
domain-slug: domain/pages-system
---

# Claim

`repo:` is an equality filter rather than a locator. A file that lands in a second repository while its page still names the first is severed from that page and from the required-reading chain below it, with nothing raised, because the `null` reads exactly like a file that never had a page.

# Evidence

Read 2026-08 against akasha and instructions at head.

`akasha/page/required-reading/required-reading.ts:109` returns a page only where `repo:` equals the repository the file was found in. `instructions/tools/required-reading.ts:186` implements the same rule a second time, so both implementations have to change together or a file is severed under one and not the other.

230 package pages carry `repo: code`. Under the akasha consolidation every one of those files moves while the key still names `code`.

Not measured: which other readers key on `repo:` the same way, and what a severed page does to the write gates that consult required reading — the severance was traced through the lookup, not through a gate refusing or failing to refuse.
