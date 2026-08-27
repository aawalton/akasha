---
id: 6bfb6500-cf4e-5403-b504-24f1e79f1d2f
slug: story-chapter-subscriptions-inert-before-retirement
page-type-slug: finding
title: "The twelve story-chapter subscription rows were inert before any retirement rather than because of one"
domain-slug: domain/global
---

# Claim

The twelve `event_subscriptions` rows naming the `story-chapter` page type are inert before
any retirement rather than because of one. Their chapters became files, a file raises no
page event, and so the writes these four subscribers watched for stopped happening at the
cutover. Deleting the rows takes away nothing that is still arriving; keeping them restores
nothing either. What the subscribers computed is owed a caller, not a repointed row.

# Evidence

Measured 2026-08-20 against the live cluster with `psql`, not read.

33 subscription rows stand, 25 keyed on a `page_type_id`. Twelve name
`019db5f4-063c-710f-a432-4c822d31915a`: `aria-story-points`, `story-length`,
`iris-tower-points` and `zadi-points-chapters`, each on `created`, `updated` and `deleted`
over `pages`. Nothing names `story-chapter-image` or `collection-template`.

Six further rows already point at a page type that is gone, and arrived independently of
these twelve: `alanwalton-daily-tracking`, `alanwalton-daily-tracking-hourly-confirm`,
`erin-chess-points-games` on three events, and `iris-tower-points` on a second type.

The chapters are on file and readable: `story-chapter-wandering-inn` answers 828,
`story-chapter-written` 11, `story-chapter-royal-road` 17,709, all through the query
service. `story-chapter` itself holds zero rows and carries `files: none`, so it is
refused outright -- `story-chapter names no page type whose pages are files`.

`collectPages` over `story-chapter` returns 0 rows and no error today, so the subscribers
are not the only readers already answering a confident zero.

`story-length` derived a chapter's length and summed it onto its story; the other three
scored Alan's reading. `worker-supervisor` is scaled to 0/0, so none has run recently.
