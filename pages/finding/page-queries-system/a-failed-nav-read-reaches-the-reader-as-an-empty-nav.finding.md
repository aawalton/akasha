---
page-type-slug: finding
slug: a-failed-nav-read-reaches-the-reader-as-an-empty-nav
title: "The app layout swallows a failed page read into the same null it uses for a true empty, and shows a signed-in reader an empty navigation"
domain-slug: domain/page-queries-system
---

# Claim

`alanwalton/web/app/routes/_app-layout.tsx:25-27` catches a failed nav read, writes a line to the pod's stderr, and hands the route `navItems: null` — the same value it hands back for a reader who genuinely has no navigation — so a signed-in reader is shown an app with an empty navigation and told nothing went wrong.

# Evidence

Read and run on 2026-08-28 against `bccf33790` on `main`; cluster readings from object state and pod logs, with no production endpoint called.

`_app-layout.tsx:12-31` makes an `askComposed` over `page-type: "nav"` inside `if (user)` at `:17`. `:25-27` catches, calls `console.error("[alanwalton/web/_app-layout] nav SSR fetch failed:", err)`, and falls through to `:31`, returning `data({ user: userEnvelope, navItems })` with `navItems` still at its `:16` initial value of `null`. `navItems` is declared `ReadonlyArray<Record<string, unknown>> | null = null` at `:16`, is assigned only from `asked.answer.rows` at `:24`, and is passed to `AppShell` as `ssrNavItems`, so a failed read and a true empty arrive at the component as one value.

The other module making the same read throws instead: `alanwalton/web/app/lib/home-dni.server.ts:19-25` calls `askComposed` with no fetcher and `:26-28` throws, reached from the `loader` at `alanwalton/web/app/routes/home.tsx:13-19`, line `:17`.

The silent path is the wide one. `alanwalton/web/app/routes.ts:4-10` puts five routes under the layout — `home`, `principles`, `design`, `:pageTypeSlug/:pageHrefParam`, `:pageTypeSlug` — and `home-dni.server.ts` is reached from one of them. Every `api/*` route, and the landing, sign-in and readout routes, sit outside the layout.

It has fired three times. `kubectl -n alanwalton logs web-874d9684f-jcxg6 -c web --tail=100000 --timestamps` gives 49,822 lines from `2026-08-26T00:36:48.540Z` to `2026-08-28T07:50:03.093Z`, carrying 3 `nav SSR fetch failed` lines — at `2026-08-27T17:56:49.129Z`, `17:56:57.851Z` and `23:54:00.524Z` — and 155 naming `page-query-service`. The same pod at `--tail=4000` spans `2026-08-28T02:53:42.209Z` to `07:50:03.093Z` and carries 31 `device-secrets lookup failed`, 258 `The render was aborted by the server without a reason`, and 0 `nav SSR fetch failed`.

Not measured: the app logs no requests, so how many arrived cannot be counted.
