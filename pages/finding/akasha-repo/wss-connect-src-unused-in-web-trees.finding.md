---
id: 8b2a695b-a981-5096-ac33-e55f40e9af1a
page-type-slug: finding
title: "Wss connect src unused in web trees"
domain-slug: repo/akasha-repo
---

# Claim

Every web app allows `wss://supabase.alanwalton.com` under `connect-src`, and nothing in any of their web trees opens a supabase realtime channel. A quarantined document called the entry load-bearing; that document is removed, so the reason for keeping an allowance nothing exercises stands nowhere, and the next reader who greps for a use will read it as trimmable.

# Evidence

Read in the akasha working tree, 2026-08-27.

Carriers — `connectSrc` in each web app's `server.ts`:

    alanwalton/web/server.ts:28
    alanwalton/atlas-web/server.ts:32
    archive-of-worlds/web/server.ts:28
    audhdalan/web/server.ts:28
    temper/web/server.ts:28

and inline in the Capacitor shell's own `connect-src` string at `alanwalton/web/app-capacitor/root.tsx:53`. `shared/web-security-headers/src/build.ts` passes `config.connectSrc` straight into the `connect-src` directive at `:35` and names no origin of its own, so every carrier above is the whole population.

The absence: `rg --multiline '\.channel\('` over the web app trees returns nothing. Repo-wide it returns a single unit test, `infra/cluster-checks/src/lib/ts-client-page-access.unit.test.ts`, which is not reachable from a browser bundle.

Checked for indirect use before calling it unused. `@shared/pages-ui-store` is the browser sync layer, imported from `web/app/root.tsx` in more than one app; its `src/realtime/` holds JWT expiry and subject helpers, a payload translator, shape metadata and snapshot folding, and no supabase channel.

Not measured: whether supabase-js opens a websocket on client construction without `.channel()`, and whether any Capacitor or native path uses realtime. Either would make the entry load-bearing.
