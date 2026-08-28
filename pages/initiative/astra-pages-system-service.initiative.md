---
id: 01a045eb-de54-7000-ad40-b14b04a693fb
page-type-slug: initiative
slug: astra-pages-system-service
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- Every read and every write originating off the workstation goes through the pages system service.

# Notes

Opened 2026-08-27 as a placeholder, on Alan's ruling: off-workstation reads and writes go through a pages system service, which is not the page query service but its successor. Nothing is being built here yet. Intents past the first are settled with him one at a time.

**The page query service is gone, not down.** `pages/workstation-service/page-query-service.workstation-service.md` was deleted at `620c77034` and `7411bbd8c`. That page carried `port: 8787`, which `pageQueryOrigin()` in `tools/lib/page-query-client.ts:35-42` resolves through `clusterReachOf`, so every caller now throws unless `PAGE_QUERY_ORIGIN` is set. `ops tracking status` exits 70 with "no service document is named `page-query-service`". Thirteen files across `tools/` and `services/` reach it and are broken rather than slow.

**The old service was a hop, not an implementation.** `services/page-query-service.ts:9-23` imports `tools/lib/page-query.ts`, `page-query-answer.ts` and `page-query-landing.ts` — the same modules a command calls directly. Whatever the successor is, it is not a port of logic that lives only there.

**The successor's own reach is the open question**, and it is the reason this is a placeholder rather than a plan: `pages-system/` is pure and does no I/O, `pages-system/store/` reads and does not write, and the row writers with the type gate and the locking solved are still `tools/lib/page-rows-write.ts`.
