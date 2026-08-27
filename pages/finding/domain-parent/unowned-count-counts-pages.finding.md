---
page-type-slug: finding
id: 3e8f828a-9eb9-5bbb-b9a1-2925339feb3b
slug: unowned-count-counts-pages
title: "domain-edges counts every slugged page as a domain"
domain-slug: domain/domain-parent
---

# Claim

`domain-edges` counts every document carrying `slug:` as a domain, so 1,164 data pages
that are not domains are reported as domains reaching no owner, and the audit has been
failing on them.

# Evidence

`slugsIn()` in `tools/lib/domain.ts` collects every document whose frontmatter states
`slug:`, whatever its page type. `domainEdges` then walks that whole set through
`ownerOf` and files `domain-unowned` for each one the descent does not carry to a
`persona-champion-slug:`.

The 1,164 it reports break down as 884 `exercise`, 122 `set-log`, 72 `view`, 35 `nav`,
16 `workout-session`, 14 `schedule-day`, 13 `automation`, 6 `option-list` and 2
`workout-schedule`. Every one of those nine page types declares `extends-slug: page`,
not `extends-slug: domain`, so none of them is a domain and none carries a parent edge
by design. They state `slug:` as their own identifier.

The count is exact: 5,776 documents state a slug, 4,612 state a parent, and the audit
reports 1,164 reaching no owner — the same 1,164.

Slug uniqueness genuinely does span every page, so `slugsIn` is right for
`domain-slug-unique` and wrong only where `domain-edges` reads it as the domain set.
