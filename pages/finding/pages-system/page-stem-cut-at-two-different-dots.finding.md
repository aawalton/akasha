---
id: 01a045b3-918c-7b76-bc11-0eb06fac6e33
page-type-slug: finding
title: "A page stem is cut at the first dot in one place and the last in another"
slug: page-stem-cut-at-two-different-dots
domain-slug: domain/pages-system
---

# Claim

Two functions in one file disagree about where a page's stem ends. `pageNameOf` cuts at the last dot before `.md`; `stemOf` cuts at the first dot. They agree on every name holding no dot and differ on every name holding one. Nothing holds one today only because the stemmer folds a dot away, so the disagreement is invisible for as long as the fold stands and goes live the moment it stops.

# Evidence

`page/name/name.ts:15` — `pageNameOf` takes `const dot = rest.lastIndexOf(DOT)`. `page/name/name.ts:22` — `stemOf` takes `const dot = base.indexOf(DOT)`. `page/name/naming/naming.ts:39` derives an unstated slug through `stemOf`, so a page whose stem holds a dot gets a slug cut short at that dot while its page type is read from the other end.

Measured over 59,006 pages: no page stem on disk holds a dot. Drop the fold and 60 names acquire one — 57 `temper-completion-category` pages whose `key` is spelt `account.account-achievements`, and 3 `audhdalan-subscriber` pages named by an email address. For `account.account-achievements.temper-completion-category.md`, `pageNameOf` answers the stem `account.account-achievements` while `stemOf` answers `account`.

This is why folding must be done to the data rather than dropped outright, and why a name a file cannot hold wants a refusal rather than a silent rewrite.
