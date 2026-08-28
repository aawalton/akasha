---
id: c72b4231-a580-5bfc-bbd6-547393cc70ce
slug: property-declares-a-key-no-file-can-hold
page-type-slug: finding
title: "The write seam drops a declared key in silence instead of refusing it"
domain-slug: domain/pages-system
---

# Claim

`fileValuesOf` drops every key in `SETTLED_ELSEWHERE` without saying so, at `file-write-values.ts:79`. The half of this about a key the page type declares is false as of `f4fa7f14c0`: `refuseSettledDeclared` at `:194` now refuses that one by name, and `valuesToWrite` at `:224` runs it ahead of the drop on all three write paths. A key nothing declares is still dropped in silence, and that half stands. Re-checked 2026-08-28; the set holds `pageTypeSlug`, `pageTypeId` and `userId`.

# Evidence

Measured 2026-08-27 at HEAD.

The original claim, that the key can never be written to a file page nor read back, is false. It was measured against the frontmatter seams — `fileValuesOf` out, `buildRawPageRows` back — on `temper-net-worth-snapshot`, which has no `.md` files: its pages are rows in a `data: jsonl` sidecar, `pages/temper-net-worth-day/2026-04-29.temper-net-worth-day.snapshots.jsonl` and siblings, written by `writeRow` and read by `rowsPagesIn`, passing through neither seam. The first row carries the keys `id, slug, userId, dataTimestamp, totalValue`, with `userId` reading `9ba554f7-cb18-48bb-a709-ec935a895ca7` — camel, exactly as `temper-net-worth-snapshot-user-id` declares it. Read through the pages system it answers `n=3394` with `userId` and `totalValue` both stated, `absent: []`, `unfound: []`. `readParsed` applies no settled-key filter.

The silence is at `shared/pages-access/src/file-write-values.ts`. The set is spelled camel, so `userId` is dropped there and `user-id` is kept. That distinction is load-bearing: `device-secret` and `device-token` declare `key: user-id`, their writers pass it in kebab, all twelve of their files carry it, and `device-secrets.server.ts:34` returns null without it. A change collapsing the two spellings, `camelizeKey(rawKey)`, was reverted within the hour: it stripped `user-id` from every device write. `file-write.unit.test.ts` now pins both spellings. The drop is the only step in that file that discards a value rather than refusing.

Six property documents declare a key spelled the way the row settles one: `user-id` on `device-secret`, `device-token` and `idle-save`, `page-type-id` and `page-type-slug` on `page`, and `userId` on `temper-net-worth-snapshot`. Five are `required: true`. Only the last collides with the camel set, and it belongs to a page type that does not go through this seam, so the guard is an accident of routing.

`SETTLED_BY_ROW` holds four keys, not the seven the original evidence read: `userId`, `pageTypeId`, `pageTypeSlug`, `seq`; `createdAt`, `updatedAt` and `deletedAt` reach `attributes` now.
