---
id: b55b2c28-65d6-589a-ae4d-6724dcfcc5b8
slug: client-boundary-directive-escape
page-type-slug: finding
title: "Client boundary directive escape"
domain-slug: domain/global
---

# Claim

`check-client-page-access-boundary` decides which files are browser code by the `"use client"` directive and by nothing else, so a module that executes in the browser without carrying the directive is outside the scan. The code repository holds a mounted, deliberate use of that gap, and a comment beside it calls it an escape, while the check reports `ENFORCING — 452 use-client file(s) under packages/ scanned, 0 browser-side page-access site(s) outside the client-state boundary` and exits 0.

# Evidence

Measured on `~/code` at main on 2026-08-07.

The scope signal is the directive twice over, and there is no second. `infra/cluster-checks/src/lib/ts-client-page-access.ts:123` opens `scanClientPageAccess` with `if (!isUseClientModule(sf)) return []`. The runner gates discovery on `shouldScanFile`, whose last line at `infra/cluster-checks/src/checks/check-client-page-access-boundary.ts:51` is `return hasLeadingUseClientDirective(source)`; everything before it is path scope. A browser module without it yields zero findings by construction.

The live use of the gap runs `alanwalton/web/app/components/offline-text-sync.tsx` → `@collections/litrpg` → `collections/litrpg/src/nova/offline-sync.ts`. The component carries `"use client"` on line 1 and is mounted: `alanwalton/web/app/components/auth-provider.tsx` imports `OfflineTextSync` on line 16 and renders it on line 169. It awaits `loadChapterForOffline` and `writeChapterCompletion`, imported on lines 28-36. The module they resolve to carries no directive; its line 11 imports `collectPages`, `getPages` and `patchPageById` from `@shared/pages-access`, and it holds seven unwrapped calls, the first three at lines 38, 54 and 60.

The tree names it: `badge-sync.tsx` line 17 calls this "the via-a-non-`use client`-module escape OfflineTextSync uses". Moving a call one import away from the directive is both the documented remedy for this check and the way out of it.

I reproduced this. The check unmodified exits 0 on `ENFORCING — 452 use-client file(s) under packages/ scanned, 0 ... outside the client-state boundary [over 14149 of 14149 files]`.

MEASURED 2026-08-10 in #18447 — the reachability walk this finding said it had not run. Following runtime imports from those 452 entries, 2,090 modules are client-reachable, 1,638 of them carrying no directive. Scanned with the gate off: 23 findings in 6 files. Eleven are inside `@shared/pages-access` itself, which belongs among the boundary prefixes. Twelve are real — `litrpg`'s `offline-sync.ts` 7 and `catalog.ts` 4, `shared/open-questions` 1. None has a compliant shape, every sanctioned remedy being a React hook and every caller here imperative, so #18447 held the widening.
