---
id: 8a8e3e8e-4482-5e2e-9fc3-6f799f0c5aab
slug: context-doc-names-nothing-live
page-type-slug: finding
title: "Context doc names nothing live"
domain-slug: role/handler
---

# Claim

Every `contextDoc` value on the Ki and Jenny dispatch types names a document that no longer stands anywhere in the tree, and nothing reads the field. The field is a compile-enforced string literal on every dispatch arm, so the compiler pins the spelling of a name whose referent nothing checks — it reads as a wired capability pointer and is a dead one.

# Evidence

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha`.

The field. `alanwalton/sms-core/src/ki-handler-routing.ts` declares `readonly contextDoc: "book-logging"` at line 9, `"anime-logging"` at 14 and `"feature-request-capture"` at 19, returned at 30, 36 and 42. `alanwalton/sms-core/src/jenny-handler-routing.ts` declares `"feature-request-capture"` at 10, returned at 23. Each is a literal type, so the compiler pins the exact spelling.

No reader. `rg -n contextDoc` over the tree returns 16 lines across four files — those two modules and their unit tests, `ki-handler-routing.unit.test.ts` and `jenny-handler-routing.unit.test.ts` — and nothing else outside the findings store. I checked the module's other exports rather than one name — `KiIntent`, `KiDispatch`, `decideKiDispatch` — and none reaches a consumer either.

No referent, anywhere now. `git ls-files | rg -i 'book-logging|anime-logging|feature-request-capture'` returns nothing. The quarantined survivals this finding first recorded — two sources under `dirty/code/` and a 56-line keep under `dirty/maybe-keep/` — went with the tree that held them, so the three names resolve to no file at all. The fifth site, which named `feature-request-capture` by path from a feature-requests CLI registry, is gone with it.

`pages/finding/handler/boundary-deferred-to-a-quarantined-document.finding.md` records the same shape at a different site.

Not established: whether these documents were meant to be carried across or to be reconstructed.
