---
id: 7e73b341-5fbe-5720-b737-e80f121d9682
slug: internal-api-paths-inert
page-type-slug: finding
title: "Internal API paths inert"
domain-slug: domain/alanwalton-app
---

# Claim

Every `/api/*` entry in the alanwalton app's `AUTH_CONFIG.internalApiPaths` is inert — only the root loader consults the list and a resource route never runs it — and a dozen comments across two files assert a `/sign-in` redirect those entries prevent.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded the mechanism on 2026-07-28 from a dev-server observation. That document is queued for removal, so the observation is filed here to outlive it. The mechanism was re-traced; the HTTP observation was not re-taken.

One consumer. `grep -rn internalApiPaths packages/shared/supabase/rr/src/` returns four lines: the type at `auth/proxy.ts:13`, a doc line at `:115`, the single read at `:141` (`matchesInternal(pathname, config.internalApiPaths)` inside `authGuard`), and an empty fixture in the unit test.

One caller. `rg -n 'authGuard' packages/alanwalton/web/app/` returns exactly one import-and-run, at `root.tsx:6`; every other hit is a comment in `routes.ts`. React Router does not run parent loaders for a route with no default export, so a resource route never reaches the root loader and never consults the list.

The false assertion has spread since it was first recorded. `root.tsx:49` opens the list, and its `/api/values-stoplights`, `/api/claude-usage` and `/api/inbox-stoplights` entries each carry a comment saying the route "must bypass the cookie-only authGuard, which would otherwise 302 the widget's request to /sign-in". `routes.ts` now repeats the claim eight more times, in the form "bypasses authGuard via AUTH_CONFIG.internalApiPaths in root.tsx", at lines 32, 47, 65, 68, 71, 74, 77, 82 and 88.

One entry was written correctly and shows what the others should say. The habit-stoplights comment at `root.tsx:78` gives the reason as "this list is the app's one route-protection contract" rather than as a redirect it prevents.

The list's page-route entries are doing real work; only the `/api/*` ones are inert.

Not established: whether to remove the entries or correct the comments. Removing them costs nothing if the mechanism holds and a permanently-failed widget on Alan's home screen if it does not, which is why the seat that found this added its own entry anyway.
