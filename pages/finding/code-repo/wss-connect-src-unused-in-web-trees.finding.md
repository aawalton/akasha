---
id: 8b2a695b-a981-5096-ac33-e55f40e9af1a
page-type-slug: finding
title: "Wss connect src unused in web trees"
domain-slug: repo/code-repo
---

# Claim

Five web apps allow `wss://supabase.alanwalton.com` under `connect-src`, and nothing in any of their web trees opens a supabase realtime channel. `.channel(` appears nowhere under `packages/*/web/app/`, and the browser live-sync layer is Electric shape streams over HTTP. A quarantined document called the entry load-bearing; that document is removed, so the reason for keeping an allowance nothing exercises stands nowhere, and the next reader who greps for a use will read it as trimmable.

# Evidence

Measured at `~/code` `ecf5f9518f769757f3c2d53227a449b79203a887` on 2026-08-07, emptying `dirty/questions/knowledge-document-population-claims.md`. Its third entry made the same measurement at `77685cfbf5` to argue a `code-path:` question; that question died with `dirty/knowledge/web-security-headers.md` and this half outlived it.

Carriers, searched multiline for `wss://supabase` — `connectSrc` in five `server.ts`:

    packages/alanwalton/web/server.ts:69
    packages/alanwalton/atlas/web/server.ts:78
    packages/archive-of-worlds/web/server.ts:68
    packages/audhdalan/web/server.ts:70
    packages/temper/web/server.ts:70

and inline at `packages/alanwalton/web/app-capacitor/root.tsx:112`. `packages/shared/web-security-headers/src/build.ts:10` names it as the example extra in its own doc comment.

The absence: `rg --multiline '\.channel\('` over `packages/*/web/app/` returns nothing. Repo-wide it returns nine files and none is reachable from a browser bundle. `packages/shared/pages/drop-detector/src/subscribe.ts` takes a `SupabaseServiceRoleClient` and is imported only by `packages/shared/cli`. The `packages/agents/shared/supabase-realtime-*.ts` set, a temper watcher script and two k8s smoke tests sit outside the web trees.

Checked for indirect use before calling it unused. `@shared/pages-ui-store` is the browser sync layer, imported from `web/app/root.tsx` in at least two apps; its `src/realtime/` holds `electric-stream.ts`, `electric-translator.ts`, `shape-meta.ts` and `snapshot-fold.ts` and no supabase channel. The drop-detector's header says it "shares no code path with the live browser sync layer".

Searched `findings/` multiline for `connect-src`, `wss`, `web-security-headers` and `CSP`. Two hits, neither this: one is about headers absent from `/assets/*`, the other about un-nonced scripts on the error path.

Not measured: whether supabase-js opens a websocket on client construction without `.channel()`, and whether any Capacitor or native path uses realtime. Either would make the entry load-bearing.
