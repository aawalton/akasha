---
id: bd4cc109-0003-5ec9-ad03-365f49d4f901
page-type-slug: finding
title: "Verify render help names a retired app"
domain-slug: repo/code-repo
---

# Claim

`ops browser-test verify-render`'s own `--help` names awen as its example of an app that takes `--no-sign-in`, and awen no longer is one: the standalone player was retired into `packages/alanwalton/web`, which runs `authGuard`. Following the example produces a hard FAIL on a sign-in wall.

# Evidence

`packages/shared/browser-test-harness/cli/src/verify-render-help.ts:17-19` reads "Apps that serve owner-owned data via server-side service-role reads and have no /sign-in form (e.g. awen) take --no-sign-in: the verb runs an anonymous read-only session (no credentials) and the same fail-loud guard."

There is no awen web app. `packages/alanwalton/web/app/routes.ts:141-142` says "Inline awen-game resource routes (relocated from the retired @alanwalton/awen-web app). The Awen player mounts inline in page-detail for a `gameEngine: \"awen\"` row." The player therefore renders at `packages/alanwalton/web`'s `:pageTypeSlug/:pageHrefParam` route.

That app carries a sign-in form and a root guard. `packages/alanwalton/web/app/root.tsx:6` imports and runs `authGuard`, its `AUTH_CONFIG` declares `signInPath: "/sign-in"`, and the bypass list admits only `/api/*` patterns plus the `/sms` and `/privacy` content pages — the dynamic page-detail route is not among them.

So `--no-sign-in` against an awen game page opens an anonymous session, is redirected to `/sign-in`, and `packages/shared/browser-test-harness/src/deployed-render-check.ts:277-279` hard-FAILs it with "redirected to /sign-in — the verify session is not authenticated for this origin". Nobody gets a false pass; what is lost is a run and the time spent trusting the example over the guard's own message.

Found while ingesting `dirty/knowledge/browser-check-identity.md`, which asserted the same retirement and was verified against it.
