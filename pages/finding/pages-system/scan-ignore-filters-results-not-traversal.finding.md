---
id: 634e4c8e-b855-551c-80d6-43ec99b078ed
page-type-slug: finding
slug: scan-ignore-filters-results-not-traversal
title: "A page scan ignore filters results rather than traversal"
domain-slug: domain/pages-system
---

# Claim

The ignore rules that would exclude `node_modules` from a page scan are applied to the paths the walk returned rather than to the directories it descends.

# Evidence

Measured 2026-08-28 at `8c1650a7`.

`page/page-types.ts:129` ends the scan with:

    return [...notIgnored(root, [...new Set(found)])].sort()

`repo/ignored/ignored.ts:29` is `notIgnored(root: string, paths: readonly string[])` — it takes a list of paths and returns a shorter list. It cannot decline to descend a directory, because by the time it is called the descent has already happened and `found` already holds every path the walk produced. The rule that would have excluded `node_modules` is present, correct, and downstream of the cost it would have avoided.

What that costs when the walk follows a symlink cycle stands as `scan-walks-symlink-cycles`.
