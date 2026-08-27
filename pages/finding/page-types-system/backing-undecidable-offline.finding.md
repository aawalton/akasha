---
id: b145e207-4d99-5fbb-83e2-c3ad60265a7f
page-type-slug: finding
title: "The browser cannot decide a page type's backing while the roster is down"
domain-slug: domain/page-types-system
---

# Claim

Taking `files:` off every page type left the browser store unable to decide a page type's backing while the roster is unreachable. `readPageTypeBacking` decides it by reading `attributes.files`, which no page type carries any more, so it answers null for all 338 types. The roster is authoritative wherever it answers, so this shows only while it is down — and then every file-backed page type provisionally reads as database-backed, with nothing left in the row that could correct it.

# Evidence

`packages/shared/pages/ui-store/src/collection/file-backing.ts` reads `attributes.files` off the page-type row and answers `"file"` where it is a non-empty string other than `none`, null otherwise. Commit `63dc70063` in the instructions repo took that key off all page types, so the string is never there and the function now answers null for every slug.

`store.ts:133` is the only caller. It prefers the roster and falls back to this reading only where `roster === null || roster instanceof RosterUnreachable`. At `store.ts:230` a null answer attaches Electric provisionally and subscribes, waiting for a later read to decide it; with the key gone that later read answers null too, so the decision arrives only if the roster returns.

The distinction it was deciding is still real. The live roster at `127.0.0.1:8787/page-types` answers 338 page types, of which 42 carry no glob — rows-only types whose rows are held by another page's key, `completed-task` held by `daily-tracking.completed-tasks` among them. So the fallback cannot simply answer `"file"` for everything; a browser needs some other signal for those 42, and the page-type row no longer carries one.

Two error messages also give advice that can no longer be followed, both naming a key no page type may now carry:

- `packages/shared/pages/access/src/get.ts:27` — "Give the `<slug>` page type a `files:` glob, or ask for a page type that has one."
- `packages/shared/pages/access/src/guards.ts:35` — "Give the `<slug>` page type a `files:` glob, or a `data: jsonl` property on the page type that holds its rows."

None of this was landed here: `code-repo` states Read-Only Main, so a worktree and the queue are the only route onto that tree.
