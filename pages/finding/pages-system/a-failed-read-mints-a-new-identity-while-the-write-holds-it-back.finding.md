---
id: 01a046dc-b622-7000-9736-116a88b8ab3e
slug: a-failed-read-mints-a-new-identity-while-the-write-holds-it-back
page-type-slug: finding
title: "A failed read mints a new identity, while the write holds it back"
domain-slug: domain/pages-system
---

# Claim

Three sites mint a fresh uuid for a page that already has one, because a read that could not be performed is read as a page that is not there.

# Evidence

Measured 2026-08-27 in akasha at `4bffaf7a5`.

Damage: zero pages, checked three ways over the full git history of the three page types the watcher writes — `temper-inventory-snapshot`, `temper-inventory-chunk`, `temper-net-worth-day`. 709 page files stand, carrying 709 distinct `id:` values. History holds 709 `+id:` lines and zero `-id:` lines. A per-file walk of every diff touching those directories reports 0 files with an id change.

Why it is zero: `patchPage` is `writtenBy("patch", …)` (`shared/pages-query/src/index.ts:273`), which posts to `pageQueryOrigin()` — the same origin `askPage` reads from (`shared/pages-query/src/ask.ts:132`), so the minted uuid never reaches anything. `temper-watcher.service` is running, and its log at `~/.local/state/temper-watcher/watcher.log` records the refusal on every run: `` `the file-backed page types` went unasked: http://page-query-service.page-query-service.svc.cluster.local:8787/page-types gave no answer within 5000ms``, then `Inventory sync failed`. The defect is armed, not fired; it fires the moment a write path recovers ahead of a read path.

The three sites, all of the form `...(standing.ok ? {} : { id: Bun.randomUUIDv7() })`:

- `temper/scripts/src/watcher/import-inventory.ts:25, 90, 112` — the day page, the inventory snapshot, and each inventory chunk. Runs in the always-on watcher and in the shipped `temper-watcher.exe`.
- `shared/person-access/src/grant.ts:38` — `if (!asked.ok) return undefined`, and the caller reads `undefined` as "no grant exists" and writes a duplicate.
- `shared/person-authority/src/grant.ts:37` — the same, for authority grants.

The conflation is in the type: `askPage` returns `{ok: false}` for a genuine 404 absence and for an unreachable service alike, only the optional `status` separates them, and no caller is obliged to look. `nameOfPageId` at `shared/pages-access/src/file-page-name.ts:134-150` has the shape that does not flatten — `outcome: "unasked"` distinct from `outcome: "absent"`.
