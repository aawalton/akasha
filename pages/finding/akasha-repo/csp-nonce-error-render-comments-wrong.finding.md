---
id: 096a6177-170e-5f7d-8e65-a51e645dd68d
slug: csp-nonce-error-render-comments-wrong
page-type-slug: finding
title: "Csp nonce error render comments wrong"
domain-slug: repo/akasha-repo
---

# Claim

Every web app passes `<Scripts>` a nonce read out of root loader data, and that data is absent on an error render, so a render whose root loader threw ships every script un-nonced under the full production CSP. Nothing in the code says so.

# Evidence

Each app's `Layout` reads the nonce as root loader data and hands it to `<Scripts>`:

    const nonce = useRouteLoaderData<typeof loader>("root")?.nonce

`alanwalton/web/app/root.tsx:100` and `:138`; `archive-of-worlds/web/app/root.tsx:44` and `:76`; `audhdalan/web/app/root.tsx:38` and `:53`; `smilingjenny/web/app/root.tsx:29` and `:44`; `temper/web/app/root.tsx:112` and `:149`, re-verified 2026-08-28 at `5ad07e0705`. No other web app is in the tree.

Every app pins `react-router` at `7.15.1`, and that is what is installed. The chain is readable in `node_modules/react-router/dist/development/chunk-4N6VE7H7.mjs`:

- `:6375` — `useRouteLoaderData` returns `state.loaderData[routeId]` and nothing else.
- `:5295`-`:5312` — where a route's loader result is an error, that route's `loaderData` entry is never assigned; the error is placed on the nearest boundary instead. On the client the entry is set to `ResetLoaderDataSymbol`, which `:5375` filters back out.
- `:8945` — the root route's `errorElement` is the root module's own `Layout` wrapping the ErrorBoundary, so `Layout` and the `<Scripts>` inside it render on the error path with root loader data gone.
- `:9958` — `Scripts` spreads its props onto each `<script>` it emits, so `nonce={undefined}` emits no attribute.

`shared/web-security-headers/src/build.ts:31` builds `script-src` as `'self'`, `'nonce-<n>'`, `'strict-dynamic'`; `'strict-dynamic'` makes `'self'` inert for parser-inserted scripts, so an un-nonced script is refused. An HTML error response gets it: the header merge is guarded on content type alone, with no status test.

No comment records any of this. `alanwalton/web/app/root.tsx` still carries the bare `{}` left where two of them stood, at `:121` and `:124`.

Unmeasured: this is read out of the library's source, not observed — no app was booted and no browser pointed at an error route. Whether a root-loader throw is reachable in production, and how often, is not measured.
