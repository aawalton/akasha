---
id: 58487bd5-a0d6-5b45-a307-b8f2361e6ec2
slug: only-page-type-and-property-definition-left
page-type-slug: finding
title: "Two page types still hold a live row, and that remainder is structural rather than a backlog"
domain-slug: domain/global
---

# Claim

"Every page type is backed by files" is not yet true, but the remainder is now two page types and is structural rather than a backlog. `page-type` and `property-definition` are the only slugs still holding a live row, and each is held by the mechanism: `readShape` branches on a live `page-type` row, so that one goes last, and `property-definition` has no page type file at all. The other entry here, on a product reaching a page the same way whatever its backing, I did not measure.

# Evidence

Measured 2026-08-20T14:58:45Z, RUN with psql. This figure moved fast while I swept and should be re-run rather than quoted: live page types read 11 at 14:41Z, 6 at 14:45Z and 2 at 14:58Z.

Live `page-type` rows: `page-type` and `property-definition`, and nothing else. The whole `pages` table holds 41 live rows — property-definition 39 and page-type 2. Every other page type in the corpus now holds zero live rows.

For scale against that: `page-types/*.md` holds 367 page type files, 367 of which declare a `files:` key, and 57 of those declare `files: none`, which is how a type whose pages stand in a parent's `data: jsonl` sidecar is spelled rather than an absence of backing.

I sampled the read side rather than trusting the row count alone. Asked through the page query service, types that formerly held rows answer from files: relationship 676, question 435, daily-tracking 121, view 72, monarch-month 62, persona 41, monarch-account 31, music-day 11, person 7, value 6, seat 3, monarch-transaction 10,946, gmail-processed-message 1,031, calendar-event 1,034, persona-reward-concept 3,860.

On why the last two are not ordinary remainders. `readShape` at `code:packages/shared/pages/access/src/file-shape.ts:117-127` branches on whether a live `page-type` row exists for a slug: row present gives the materialized `propertyDefinitions` blob, row absent gives the property files. So retiring a page type's row is itself the flip for its property definitions, and `page-type` is the root of that chain — severing it early blanks the universal property core on every descendant. `property-definition` is definition-tier in the stored procedures and no file in the repo declares `slug: property-definition`, so it has no file successor to be backed by.

I did not measure "A product reaches a page the same way whatever its backing" and take no position on it.
