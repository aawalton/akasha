---
id: 01a046dc-b622-7000-9736-116a88b8ab3e
slug: a-failed-read-mints-a-new-identity-while-the-write-holds-it-back
page-type-slug: finding
title: "A failed read mints a new identity, while the write holds it back"
domain-slug: domain/pages-system
---

# Claim

Three sites mint a fresh uuid for a page that already has one, because a read that could not be performed is read as a page that is not there. No page has lost its identity to this: the writes that carry the minted uuid go through the same unreachable page query service as the reads, so every one of them refuses and nothing lands. The defect is armed, not fired, and what disarms it is the failure of the write rather than anything about the read. It fires the moment a write path recovers ahead of a read path — which is what standing a successor service up in front of these callers would do.

# Evidence

Measured 2026-08-27 in akasha at `4bffaf7a5`.

**Damage: zero pages.** Three ways over the full git history of the three page types the temper watcher writes — `temper-inventory-snapshot`, `temper-inventory-chunk`, `temper-net-worth-day`. 709 page files stand, carrying 709 distinct `id:` values. History holds 709 `+id:` lines, one per page at creation, and **zero `-id:` lines**: no page's identity has ever been replaced. A per-file walk of every diff touching those directories, pairing each removed `id:` against the added one, reports 0 files with an id change.

**Why it is zero.** `patchPage` is `writtenBy("patch", …)` (`shared/pages-query/src/index.ts:273`), which posts to `pageQueryOrigin()` — the same origin `askPage` reads from (`shared/pages-query/src/ask.ts:132`). The minted uuid is assembled into a request body that never reaches anything. `temper-watcher.service` is running and has been restarting normally, and its log at `~/.local/state/temper-watcher/watcher.log` records the refusal on every run: `` `the file-backed page types` went unasked: http://page-query-service.page-query-service.svc.cluster.local:8787/page-types gave no answer within 5000ms``, then `Inventory sync failed`.

**The three sites**, all of the form `...(standing.ok ? {} : { id: Bun.randomUUIDv7() })`, where `standing.ok` is false both when the page is absent and when the read was refused:

- `temper/scripts/src/watcher/import-inventory.ts:25, 90, 112` — the day page, the inventory snapshot, and each inventory chunk. Runs in the always-on watcher and in the shipped `temper-watcher.exe`.
- `shared/person-access/src/grant.ts:38` — `if (!asked.ok) return undefined`, and the caller reads `undefined` as "no grant exists" and writes a duplicate.
- `shared/person-authority/src/grant.ts:37` — the same, for authority grants.

**The conflation is in the type, not the call sites.** `askPage` returns `{ok: false}` for a genuine 404 absence and for an unreachable service alike; only the optional `status` separates them, and no caller is obliged to look. Every caller of `askPage` inherits this. Patching the three sites above would leave the trap armed for the rest, so the fix worth making is to give `askPage` the shape `nameOfPageId` already has at `shared/pages-access/src/file-page-name.ts:134-150`, where the refusal is a variant of the return type — `outcome: "unasked"` distinct from `outcome: "absent"` — and cannot be flattened by accident. That is a shape change across a shared package and a shipped binary, and it is not made here.

**One consequence of that conflation cannot be tested until the type is split.** The check that matters for any fix in this area — that a genuine absence still reads as absent — cannot be run against `askPage` as it stands, because a genuine absence and a dead service are currently the same value.

**Two flattenings stand in `shared/pages-access/src/file-relation.ts`, and they are separate faults.** Line 110 took the seven-way outcome `nameOfPageId` returns and collapsed all of it to `null`, so a refused lookup reached the write refusal as the value a read corpus produces, and the refusal advised the writer to rename a value nothing had looked up. That one is fixed: the flattener is gone rather than repaired, and `file-write-values.ts` now switches on the outcome, licensing the rename advice only on `absent` and `malformed` — the two that mean the corpus was read. Line 101, `return asked.ok && asked.answer.rows.length > 0`, still reads a refused query as "the target page does not exist" in relation validation; it is left standing because it reads through `askPage` and shares the problem above.

**Controls on the part that is fixed**, at `shared/pages-access/src/file-write-refused-read.unit.test.ts`: an ask answered empty is `absent` and an ask refused is `unasked`; a genuine absence still advises naming the file; a refused lookup refuses the write and advises no rename. Reinstating the flattening at runtime — `nameOfPageId` stubbed to answer `absent` whatever happened, with a counter proving the stub was on the path — brings the rename advice back on a refused read, so the assertion has teeth.

**`ops tests run pages-system` does not reach this code.** It runs 17 files under `pages-system/`, a different tree; 1,084 pass, 0 fail, before and after. The tests that cover `shared/pages-access` are run by naming them: 407 tests across 32 files, 401 pass and 6 fail. The 6 are all in `file-view-relation.unit.test.ts`, all connection failures to the same deleted in-cluster service, and none on the changed path — the change to `file-relation.ts` is deletions only, leaving `standsUnder` and `getFilePagesByRelation` byte-identical.
