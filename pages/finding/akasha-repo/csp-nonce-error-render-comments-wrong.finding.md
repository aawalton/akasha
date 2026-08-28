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

RE-VERIFIED 2026-08-28 at `5ad07e0705` BY A SECOND SEAT, AND WHAT WAS VERIFIED IS THE CITATIONS, NOT THE MECHANISM. Every path above resolves and every quoted line still reads as quoted. This is not a sighting and does not upgrade one: no app was booted, no browser was pointed at an error route, no root-loader throw was observed, and the library chain at `:6375`, `:5295`-`:5312`, `:8945` and `:9958` was not re-read. The Unmeasured paragraph above stands whole — whether a root-loader throw is reachable in production, and how often, is still not measured, and nothing in this paragraph or the next bears on it.

Standing as written: `shared/web-security-headers/src/build.ts:31` builds `script-src` as `'self'`, `'nonce-<n>'`, `'strict-dynamic'`; all five apps pin `react-router` at `7.15.1`; `report-uri`, `report-to` and `Report-Only` match nowhere under `shared/web-security-headers`; the five `server.ts` guards are at the exact lines given; and the bare `{}` is at `alanwalton/web/app/root.tsx:121` and `:124`. The `root.tsx` numbers have drifted and are otherwise exact — `audhdalan` (:38, :53) and `smilingjenny` (:29, :44) unmoved, `alanwalton` :100 and :138 for :99 and :137, `archive-of-worlds` :44 and :76 for :43 and :75, `temper` :112 and :149 for :109 and :146; the ErrorBoundary line numbers drift the same way.

THE TRIGGER IS NARROWER THAN A HURRIED READING OF THIS PAGE, AND FOR TWO APPS NARROWER THAN ITS OWN BOUND. Only a ROOT loader throw strips the nonce. A child route loader's throw leaves root's `loaderData` entry assigned, so `useRouteLoaderData("root")?.nonce` still returns the nonce and `<Scripts>` still emits the attribute — which is what `:5295`-`:5312` above already says, and is the clause most easily dropped in retelling. Of the five root loaders, two have no reachable throw path at all: `audhdalan/web/app/root.tsx:33-35` and `smilingjenny/web/app/root.tsx:24-26` are each `return { nonce: context.nonce }`, a single expression over a context the server populates unconditionally — `smilingjenny/web/server.ts:50-51` generates the nonce and passes it into `handler` on every request. The other three open with `await authGuard(request, AUTH_CONFIG)`: `authGuard` at `shared/supabase-rr/src/auth/proxy.ts` contains no `throw` and returns a `Response` for every refusal it models, so a rejection there would have to come from `refreshSession` beneath it. Whether that rejects in production is not measured here.
