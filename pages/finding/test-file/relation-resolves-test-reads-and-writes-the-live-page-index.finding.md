---
id: 1c7f0a34-5b12-57ec-a1d6-c9218e82de16
page-type-slug: finding
slug: relation-resolves-test-reads-and-writes-the-live-page-index
title: "Relation resolves test reads and writes the live page index"
domain-slug: domain/test-file
---

# Claim

`checks-system/check/relation-resolves/relation-resolves.on-checks.test.ts` writes into Alan's live relation index with raw `mkdirSync`/`writeFileSync` at `:110-111`, and reads that same index for all 25 of its cases. It cannot be pointed at a fixture root without seeding a page registry there, so the live write is the design rather than a stray line. Each run leaves two empty key directories behind. Nothing runs the file automatically, which bounds the exposure to whoever names it.

# Evidence

Measured 2026-08-28 at `e62e864edc`.

THE WRITE. `RELATIONS` at `:71-76` is `akashaRoot()` through `git rev-parse --absolute-git-dir`, never overridden, resolving here to `.git/pages/index/relation`. `put` at `:110-111` is `mkdirSync(dirname(at), { recursive: true })` then `writeFileSync`. `:123` sends `sidecarFor(one)` through it, while `:122` above writes the fixture world under the `mkdtempSync` root from `:120`. The `finally` at `:141` removes the three files and not the directories `:110` made.

CONTROL. I removed the two empty key directories and confirmed the index then held none. Running the file unchanged:

    25 pass  0 fail
    EMPTY KEY DIR CREATED: creator-name
    EMPTY KEY DIR CREATED: principal-seat-name
    FAIL: the live index gained 2 empty key directories from a test run

Nothing else leaves these: `pruneUpTo` at `page/index/store/store.ts:63` removes empty key directories.

WHY A FIXTURE ROOT DOES NOT FIX IT. With `AKASHA_ROOT` set to an empty git repo, all 25 cases fail — not just the 8 naming ones — at `page/index/scan/scan.ts:52`, reached from `registryOf` at `relation-resolves.check.code.attachment.ts:264`. The check reads its page-type registry off the live index, so read and write share one root.

GUARDS. It takes no `underIndexLock`, though `store.ts:109-117` says every caller stands inside one, and never reaches `refuseALiveTestWriteIn` at `tools/lib/live-store-write-guard.ts:58`. `anchorIndex` at `tools/tests/index-anchor.ts:31` is the sanctioned anchor; its docblock records a live index cut from 59,619 pages to 13 by this class of write.

REFUTED. It does not run on every change. `SUITE_GLOB` is `tools/**/*.test.ts` at `tools/audits/suite-runs.ts:17` and this file is under `checks-system/`; nothing reads the `.on-checks` suffix.

BOUND. The three sidecars are keyed on slugs no page carries, so `sourcesAt` answers them for nobody.

Not measured: whether a concurrent landing has deleted a sidecar mid-run and flipped a case.
