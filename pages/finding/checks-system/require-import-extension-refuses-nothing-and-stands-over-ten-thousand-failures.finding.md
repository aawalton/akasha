---
id: ad300014-8e0b-5c6b-9003-81209658248e
page-type-slug: finding
title: "Require import extension refuses nothing and stands over ten thousand failures"
slug: require-import-extension-refuses-nothing-and-stands-over-ten-thousand-failures
domain-slug: domain/checks-system
---

# Claim

`require-import-extension` carries `check-on-patch: false` and `check-on-worktree: false`, so it refuses nothing on any route, and an audit run of it reports 10,020 failures. It was never part of the 2026-08-26 stand-down at `ad5e04f09` and appears nowhere in the thirteen that commit names, so nothing about restoring those gates reaches it. Its sibling `import-resolves`, long counted beside it, now refuses on patch.

# Evidence

Measured 2026-08-28.

`checks-system/check/require-import-extension/require-import-extension.check.md:8-9` carries `check-on-patch: false` and `check-on-worktree: false`.

`ops checks audit require-import-extension` reports **10020** failures. An earlier reading of the same check gave 10,019.

It is not among the thirteen named in `ad5e04f09` (2026-08-26), which were `category-rule-acts`, `export-declared-here`, `file-length`, `import-reach`, `inbound-import-resolves`, `links-resolve`, `page-holds-to-its-type`, `page-name-unique`, `page-named-as-stated`, `read-before-write`, `read-what-is-required`, `relation-resolves` and `typecheck`. So it is its own question rather than the unfinished half of that stand-down.

The pairing it was usually counted in has come apart. `checks-system/check/import-resolves/import-resolves.check.md:8-9` now carries `check-on-patch: true`, restored at `3dcb73d333` after being turned off at `a9f7a5f121`. Of the two checks that refused nothing, one now refuses.

Not measured: how many of the 10,020 are one repair and how many are separate.
