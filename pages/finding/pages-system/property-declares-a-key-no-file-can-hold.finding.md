---
id: c72b4231-a580-5bfc-bbd6-547393cc70ce
slug: property-declares-a-key-no-file-can-hold
page-type-slug: finding
title: "The write seam drops a declared key in silence instead of refusing it"
domain-slug: domain/pages-system
---

# Claim

`fileValuesOf` drops every key in `SETTLED_ELSEWHERE` without saying so, including one a page type declares `required: true`. A caller hands `userId` to a file-backed write, the write reports done, and the value is gone. Nothing is bleeding today only because the one declaration that collides belongs to a page type that does not go through this seam — so the guard against writing it is an accident of routing rather than anything stated.

The original claim on this page, that the key can never be written to a file page nor read back from one, is false. It is written and read back. The measurement below was taken against the frontmatter seams on a page type that has no frontmatter pages.

# Evidence

Measured 2026-08-27 at HEAD.

`temper-net-worth-snapshot` has zero `.md` files. Its pages are rows in a `data: jsonl` sidecar, `pages/temper-net-worth-day/2026-04-29.temper-net-worth-day.snapshots.jsonl` and its siblings, written by `writeRow` and read by `rowsPagesIn`. The seams the original evidence measured — `fileValuesOf` on the way out, `buildRawPageRows` on the way back — are the seams for frontmatter pages. This page type passes through neither.

The value is present. The first row of that sidecar carries the keys `id, slug, userId, dataTimestamp, totalValue`, with `userId` reading `9ba554f7-cb18-48bb-a709-ec935a895ca7` — camel, exactly as `temper-net-worth-snapshot-user-id` declares it. Read through the pages system, the page type answers `n=3394` with `userId` and `totalValue` both stated, and `absent: []`, `unfound: []`. `readParsed` applies no settled-key filter at all: every key on the JSON object reaches the page's values.

So the declaration is satisfied and the required key is held. Six of that page type's other seven properties are camel too — `currencyGoldValue`, `dataTimestamp`, `goldAmount`, `itemValue`, `totalValue`, `excludedGuildBankValue` — so `userId` is its house spelling rather than an oddity.

What remains is the silence at `shared/pages-access/src/file-write-values.ts`. The set is spelled camel because camel is what the row store calls its own columns, so `userId` is dropped there and `user-id` is kept. That distinction is real and load-bearing: `device-secret` and `device-token` declare `key: user-id`, their writers pass it in kebab, all twelve of their files carry it, and `device-secrets.server.ts:34` returns null without it. But it is a distinction the seam makes without stating, and the drop is the only step in that file that discards a value rather than refusing it — `fileValue` throws a paragraph for a value no frontmatter line can carry, and `refuseUnresolvedRelations` throws for a relation it cannot resolve.

Six property documents declare a key spelled the way the row settles one: `user-id` on `device-secret`, `device-token` and `idle-save`, `page-type-id` and `page-type-slug` on `page`, and `userId` on `temper-net-worth-snapshot`. Five are `required: true`. Only the last collides with the camel set, and only that one would be dropped.

# Re-check

The paragraph in the original evidence about the two sets disagreeing on spelling described a real thing and has since been proved load-bearing rather than accidental. A change collapsing the two spellings — asking `camelizeKey(rawKey)` on the reasoning that one key should not behave two ways — was landed and reverted within the hour: it stripped `user-id` from every device write, which fails as an authentication that quietly stops recognising anyone. `file-write.unit.test.ts` now pins both spellings; before, it pinned camel alone, which is why the suite stayed green through it.

`SETTLED_BY_ROW` holds four keys, not the seven the original evidence read: `userId`, `pageTypeId`, `pageTypeSlug`, `seq`. `createdAt`, `updatedAt` and `deletedAt` reach `attributes` now.

The slug on this page still reads `property-declares-a-key-no-file-can-hold`, which the claim above no longer says. Renaming it re-keys the finding, so it is left as it stands.
