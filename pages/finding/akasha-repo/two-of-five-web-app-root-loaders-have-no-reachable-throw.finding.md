---
id: 9a855093-1336-58f1-9ba0-411b0cafb480
page-type-slug: finding
slug: two-of-five-web-app-root-loaders-have-no-reachable-throw
title: "Two of five web app root loaders have no reachable throw"
domain-slug: repo/akasha-repo
---

# Claim

Only a ROOT loader throw strips the nonce, and two of the five web apps' root loaders have no reachable throw path at all.

# Evidence

A child route loader's throw leaves root's `loaderData` entry assigned, so `useRouteLoaderData("root")?.nonce` still returns the nonce and `<Scripts>` still emits the attribute. That is the clause most easily dropped in retelling.

Of the five root loaders, two have no reachable throw path at all: `audhdalan/web/app/root.tsx:33-35` and `smilingjenny/web/app/root.tsx:24-26` are each `return { nonce: context.nonce }`, a single expression over a context the server populates unconditionally — `smilingjenny/web/server.ts:50-51` generates the nonce and passes it into `handler` on every request.

The other three open with `await authGuard(request, AUTH_CONFIG)`: `authGuard` at `shared/supabase-rr/src/auth/proxy.ts` contains no `throw` and returns a `Response` for every refusal it models, so a rejection there would have to come from `refreshSession` beneath it. Whether that rejects in production is not measured here.

Each app has an ErrorBoundary in its root — `alanwalton:147`, `archive-of-worlds:85`, `audhdalan:63`, `smilingjenny:59`, `temper:156` — and whether each degrades acceptably with no JS is not assessed here.
