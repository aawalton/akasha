---
id: be89e4c2-c0af-564f-89d2-c260d2031f18
slug: fun-points-header-names-the-replaced-subscription
page-type-slug: finding
title: "Fun points header names the replaced subscription"
domain-slug: domain/alanwalton-app
---

# Claim

The fun-points reconcile pass documents itself as reading the account row and waking on a `temper-account` subscription. It does neither: it reads the sidecar and wakes on `temper-completion` events. The header is the first thing a reader of that file meets, and it describes the wiring that was replaced.

# Evidence

`packages/alanwalton/fun-points/src/actions/reconcile-fun-points.ts:1-4` opens "The single reconcile pass shared by boot, heartbeat, and the `temper-account` subscriber. Reads the live overall completion score `S` (materialized on the account row by the completion indexer …)". Its own `readOverallCompletionScore` at :77-91 contradicts both halves in the same file: it fetches the `temper-account` row only to obtain `row.id`, then returns `(await getCompletionIndexPg(client, row.id))?.overallCompletionScore` from the `temper_completion_index` sidecar. The second docblock at :74-80 says so plainly, so the two headers in one file disagree.

The subscription is settled by wiring rather than by either comment. `packages/alanwalton/fun-points/src/manifest.ts` executes `subscriptions: [{ eventCategory: COMPLETION_INDEX_EVENT_CATEGORY }]`, and `packages/temper/player/completion/index-store/src/constants.ts:10-11` declares `COMPLETION_INDEX_EVENT_CATEGORY = "temper-completion"` and `COMPLETION_INDEX_UPDATED_EVENT_NAME = "temper-completion.index.updated"`.

That constants file also states why the old subscription cannot work, at :1-9: "since the index values no longer live on `pages.attributes`, a sidecar write fires no `page`-category event, so this dedicated event is the wake signal", naming the fun-points worker as one of the subscribers.

Found 2026-08-08 while emptying `dirty/code/packages-alanwalton-fun-points-claude.md`, whose quarantined prose was correct on this point where the live comment is not — the reason it is filed here rather than kept there.

Duplicate check, run as its own call before filing: `rg -il 'temper-account subscriber|reconcile-fun-points|fun-points|temper-completion'` over `findings/` returned six files; I opened the two nearest, `alanwalton-app/snapshot-diff-books-a-set-change.md` and `alanwalton-app/persona-worker-binding-is-a-filename.md`, and neither is about this.
