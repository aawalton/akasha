---
id: a2d425d7-9642-50e3-8cfd-f4284f397534
page-type-slug: finding
title: "Internal API paths name dead routes"
domain-slug: domain/alanwalton-app
---

# Claim

Four of the `/api/*` entries in the alanwalton app's `AUTH_CONFIG.internalApiPaths` name no registered route: three no handler has ever answered (`/api/zero/`, `/api/cron/`, `/api/mcp`) and one whose route `359379e00a` deleted (`/^\/api\/tracking\/active-energy$/`). The residue census already on record for that commit reaches one file short of it, and the standing question of which entries are safe to remove has a measured answer for these four — nothing stands behind them.

# Evidence

Measured 2026-08-08 in `~/code` while emptying `dirty/code/packages-alanwalton-web-docs-routes.md`, whose route table documents the active-energy route as live.

The registered set is `packages/alanwalton/web/app/routes.ts`, declaring 55 routes. Differencing its `route(…)`/`index(…)` calls against the 32 paths that table documents returns one documented-but-unregistered path, `/api/tracking/active-energy`, and 24 registered-but-undocumented ones.

`359379e00a` (#18149) deleted `routes/api.tracking.active-energy.ts`. `routes.ts` now names the path only in a comment at line 191 recording the retirement. `root.tsx:148` still carries `/^\/api\/tracking\/active-energy$/` under a comment at 142-147 explaining the `X-Device-Secret` gate it was added for.

The other three resolve to nothing tracked. `rg -uuu -n "api/zero|api/cron|/api/mcp"` over `~/code` returns six lines: `root.tsx:52-54`, and the same three strings in `packages/alanwalton/web/build/server/index.js` — `root.tsx` compiled. That path is gitignored (`packages/alanwalton/web/.gitignore:4`) and `git ls-files` returns empty for it, so it is the app's own output, not a second carrier. No route, ingress, proxy or k8s manifest names them.

WHAT THIS ADDS TO TWO STANDING FINDINGS, both read in full first. `alanwalton-app/active-energy-intent-residue-outlives-its-seam.md` scopes this commit's residue to one file, stating it "left two references behind", both in `apply-ios-seam.sh`; `root.tsx` is a third site in a second file. `alanwalton-app/internal-api-paths-inert.md` establishes every `/api/*` entry is inert, and closes on what it could not settle: "whether to remove the entries or correct the comments. Removing them costs nothing if the mechanism holds and a permanently-failed widget on Alan's home screen if it does not." For these four there is no route behind them to fail.

Not probed: whether the remaining `/api/*` entries each match a live route.
