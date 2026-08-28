---
id: 1ce70d40-4436-5be5-bced-bb94040cd166
page-type-slug: finding
title: "Four names in the page index surface have no production reader"
slug: four-names-in-the-page-index-surface-have-no-production-reader
domain-slug: domain/unused-code
---

# Claim

`staleIn` and `IDENTITY_WORDS` have no caller anywhere, and `indexRoot` and `keepPages` have no caller outside `page/index/` except test infrastructure. A survey of what has to be replaced before the index can go should not count these four. `standingHere`, long counted beside them, is the opposite case: it has seven callers and a second implementation.

# Evidence

Measured 2026-08-28 at `375daccb9e`.

No reader anywhere:

- `staleIn` — declared `page/index/store/store.d.ts:50`, implemented `page/index/store/store.ts:245`. Its only other appearances are two orphaned `dist` re-declarations.
- `IDENTITY_WORDS` — `page/index/identity/identity.ts:33`, declared `identity.d.ts:16`.

No production reader outside `page/index/`:

- `indexRoot` — `page/index/place/place.ts:62`. Outside the index only `tools/tests/index-anchor.ts:4,42` and `tools/tests/rules-fixture.ts:1,13`.
- `keepPages` — `page/index/store/store.ts:392`. Outside the index only `tools/tests/index-anchor.ts:5,52`. In-index callers are `build.ts:207` and `:369`.

The counter-case, which the same survey had wrong the other way: `standingHere` is defined at `page/required-reading/warrant/warrant.ts:41` and called at `ops-cli/global/read/seat.ts:22`, `ops-cli/global/read/required.ts:28`, `ops-cli/global/read/conditional.ts:43`, `checks-system/check/read-what-is-required/read-what-is-required.check.code.attachment.ts:99` and `checks-system/check/read-before-write/read-before-write.check.code.attachment.ts:120`, with a test stub at `read-what-is-required.on-checks.test.ts:85`. A second implementation of the name stands at `page/index/build.ts:219`.

`marksOver` and `emptyIndex` are not part of this: `page/index/store/store.d.ts` is 73 lines and declares neither. They survive only in `shared/status-bar-access/dist/page/index/store/store.d.ts:33` and `:55`, which `pages/finding/unused-code/orphaned-dist-declares-a-deleted-api.finding.md` already states.

Not measured: whether `staleIn` or `IDENTITY_WORDS` ever had a caller.
