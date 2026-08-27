---
id: bd4cc109-0003-5ec9-ad03-365f49d4f901
slug: verify-render-help-names-a-retired-app
page-type-slug: finding
title: "Verify render help names a retired app"
domain-slug: repo/akasha-repo
---

# Claim

`ops browser-test verify-render`'s own `--help` names awen as its example of an app that takes `--no-sign-in`, and awen no longer is one: the standalone player was retired into `alanwalton/web`, which runs `authGuard`. Following the example produces a hard FAIL on a sign-in wall.

# Evidence

Read in the akasha working tree, 2026-08-27.

`tools/lib/verify-render-help.ts:152-156` describes `--no-sign-in`, with the example at `:155`, as "Skip the sign-in form entirely and verify with an anonymous read-only session. For no-auth apps that serve owner-owned data via server-side service-role reads and have no /sign-in route (e.g. awen)."

There is no awen web app. The awen resource routes are inline in `alanwalton/web/app/routes.ts:58,60` — `api/awen-game/:externalId` and `api/awen/read/:externalId` — and the player is reached as a page display, `selectPageDisplayKind` at `alanwalton/web/app/lib/page-display-kind.ts:20` routing a `gameEngine: "awen"` row through `selectGameRenderMode`. Nothing outside `alanwalton/web` serves it: the only `awen` directory in the tree is the `alanwalton/awen-core` library.

That app carries a sign-in form and a root guard. `alanwalton/web/app/root.tsx:8` imports `authGuard` and `:93` runs it; `AUTH_CONFIG` at `:28-29` declares `signInPath: "/sign-in"`; the bypass list holds `/api/*` paths and a few static content paths, and the dynamic page-detail route is not among them. `/api/awen/read/` is bypassed, but that is the resource route, not the page the player renders on.

So `--no-sign-in` against an awen game page opens an anonymous session, is redirected to `/sign-in`, and `shared/browser-test-harness/src/deployed-render-check.ts:145` hard-FAILs it with "redirected to /sign-in — the verify session is not authenticated for this origin, so the owner-owned read could not be performed". Nobody gets a false pass; what is lost is a run and the time spent trusting the example over the guard's own message.

Found while ingesting a quarantined browser-check identity document, which asserted the same retirement and was verified against it.
