---
id: 8a8e3e8e-4482-5e2e-9fc3-6f799f0c5aab
page-type-slug: finding
title: "Context doc names nothing live"
domain-slug: role/handler
---

# Claim

Every `contextDoc` value on the Ki and Jenny dispatch types names a document that has left the code repo, and nothing reads the field. All three survive only under `dirty/` — two as sources awaiting their own emptying, one as a landed keep. The field is a compile-enforced string literal on every dispatch arm, so the compiler pins the spelling of a name whose referent nothing checks — it reads as a wired capability pointer and is a dead one.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying `dirty/code/packages-alanwalton-feature-requests-claude.md`.

The field. `packages/alanwalton/sms/core/src/ki-handler-routing.ts` declares `readonly contextDoc: "book-logging"` at line 43, `"anime-logging"` at 48 and `"feature-request-capture"` at 53, returned at 66, 72 and 78. `jenny-handler-routing.ts` declares `"feature-request-capture"` at 48, returned at 63. Each is a literal type, so the compiler pins the exact spelling.

No reader. `rg -n "contextDoc"` over `packages/` returns twelve lines, every one inside those two modules or their unit tests. I checked the module's other exports rather than one name — `KiIntent`, `KiDispatch`, `decideKiDispatch` — and none reaches a consumer either.

No referent. `git ls-files` in `~/code` matching `book-logging`, `anime-logging` or `feature-request-capture` returns nothing. `rg -uuu -il "book-logging|anime-logging"` over `domains/`, `tools/`, `notices/`, `settings/` exits 1. What survives sits under `dirty/code/` as the book-logging and anime-logging sources, both queued for their own emptying.

The third is kept, not gone: its source was removed at `786272de8`, but a 56-line keep stands at `dirty/maybe-keep/code/packages-alanwalton-feature-requests-docs-feature-request-capture.md`. An earlier revision said it resolved nowhere, having searched `dirty/code/` alone. The keep binds nobody, so the field still names nothing live — but the content is not lost.

A fifth site names it by path rather than slug: `feature-requests/src/cli/registry.ts:6` cites `packages/alanwalton/feature-requests/docs/feature-request-capture.md`, a path holding no tracked file.

`pages/finding/handler/boundary-deferred-to-a-quarantined-document.finding.md` records the same shape at a different site. No referent in this set is fully gone; all three are under quarantine, which is why a search must cover `dirty/maybe-keep/` as well as `dirty/code/`.

Not established: whether these documents were meant to move into `~/instructions` or to be reconstructed.
