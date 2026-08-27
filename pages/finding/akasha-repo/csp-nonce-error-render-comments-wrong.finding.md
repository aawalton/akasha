---
id: 096a6177-170e-5f7d-8e65-a51e645dd68d
page-type-slug: finding
title: "Csp nonce error render comments wrong"
domain-slug: repo/akasha-repo
---

# Claim

Every web app passes `<Scripts>` a nonce read out of root loader data, and that data is absent on an error render, so a render whose root loader threw ships every script un-nonced under the full production CSP. Nothing in the code says so.

# Evidence

Each app's `Layout` reads the nonce as root loader data and hands it to `<Scripts>`:

    const nonce = useRouteLoaderData<typeof loader>("root")?.nonce

`alanwalton/web/app/root.tsx:99` and `:137`; `archive-of-worlds/web/app/root.tsx:43` and `:75`; `audhdalan/web/app/root.tsx:38` and `:53`; `smilingjenny/web/app/root.tsx:29` and `:44`; `temper/web/app/root.tsx:109` and `:146`. No other web app is in the tree.

Every app pins `react-router` at `7.15.1`, and that is what is installed. The chain is readable in the installed library, `node_modules/react-router/dist/development/chunk-4N6VE7H7.mjs`:

- `:6375` — `useRouteLoaderData` returns `state.loaderData[routeId]` and nothing else.
- `:5295`-`:5312` — where a route's loader result is an error, that route's `loaderData` entry is never assigned; the error is placed on the nearest boundary instead. On the client the entry is set to `ResetLoaderDataSymbol`, which `:5375` filters back out of the merged data.
- `:8945` — the root route's `errorElement` is the root module's own `Layout` wrapping the ErrorBoundary. So `Layout`, and the `<Scripts>` inside it, renders on the error path with root loader data gone.
- `:9958` — `Scripts` spreads its props onto each `<script>` it emits, so `nonce={undefined}` emits no attribute.

The policy that then applies is the full one. `shared/web-security-headers/src/build.ts:31` builds `script-src` as `'self'`, `'nonce-<n>'`, `'strict-dynamic'`; `'strict-dynamic'` makes the `'self'` host-source inert for parser-inserted scripts, so an un-nonced script is refused rather than falling back on the host match.

The headers are attached on content type alone, with no status test. Each app's `server.ts` guards the merge only by `if (contentType.startsWith("text/html"))` — `alanwalton/web/server.ts:68`, `archive-of-worlds/web/server.ts:53`, `audhdalan/web/server.ts:53`, `smilingjenny/web/server.ts:53`, `temper/web/server.ts:54`. An HTML error response takes that branch and gets the whole policy.

No comment records any of this. The comments that once described it were stripped; `alanwalton/web/app/root.tsx` still carries the bare `{}` left where two of them stood.

Nothing surfaces a violation either. `report-uri`, `report-to` and `Report-Only` match nowhere under `shared/web-security-headers`, so a refusal reaches the browser console and no telemetry. Development is not a route to noticing it: every app's `dev` script is `react-router dev`, and `getLoadContext` matches nowhere outside this findings store, so the nonce-supplying `server.ts` is not in the dev path and dev serves no CSP.

Unmeasured. The mechanism above is read out of the library's source, not observed: no app was booted and no browser was pointed at an error route, so nothing here is a sighting of a blocked render. Whether a root-loader throw is reachable in production, and how often, is not measured. Each app has an ErrorBoundary in its root — `alanwalton:147`, `archive-of-worlds:85`, `audhdalan:63`, `smilingjenny:59`, `temper:156` — and whether each degrades acceptably with no JS is not assessed here.
