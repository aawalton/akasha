---
id: 93d1a998-3024-54e4-9408-f96f4b91b4fd
page-type-slug: finding
title: "Dev server port window unreconciled"
domain-slug: repo/akasha-repo
---

# Claim

The dev-server port window is stated on four surfaces in the code repo, three of them disagree with the one that ships, and nothing compares any of them.

# Evidence

Read at `~/code` on 2026-08-07.

What ships: `packages/infra/auth-proxy/k8s/synth.ts:271` sets `CORS_ALLOWED_ORIGIN_PATTERNS` to `^http://localhost:3[0-6][0-9]{2}$` — 3000 to 3699. The auth-proxy terminates CORS for `/auth/v1` against it, so an origin outside it has its GoTrue fetch rejected and sign-in times out with nothing naming CORS.

The registry it mirrors is `APP_REGISTRY` in `packages/agents/dev-server/cli/src/lib/dev-server-ops.ts`: alanwalton 3000, audhdalan 3100, temper 3300, archive-of-worlds 3500, atlas 3600, with `computePort` deriving `basePort + (seq % 100)`.

Three other statements, none agreeing:

1. The comment directly above the shipped regex in `synth.ts` enumerates seven apps, including `idle` at 3200 and `tower` at 3400. Neither is in `APP_REGISTRY`.

2. `packages/infra/auth-proxy/src/cors.unit.test.ts:5` fixes `[/^http:\/\/localhost:3[0-4][0-9]{2}$/]` and line 27 asserts `http://localhost:3500` is refused. The fixture is the test's own, so the assertion is right about the function — but 3500 is archive-of-worlds's base and 3600 is atlas's, both allowed in production.

3. `packages/agents/shared/verification-review.ts:22-30` states base ports as "3000-3599" and the regex as `^http://localhost:3[0-5][0-9]{2}$` — a third value — and sets `DEV_SERVER_PORT_HI = 3599`.

Item 3's reach is narrow, stated so nobody over-reads this: `isLocalhostOrDevServerUrl` (line 129) tests `LOCALHOST_HOSTS` before the port window and returns `true` for hostname `localhost`, so an atlas dev server at `http://localhost:3612` is classified correctly anyway. A wrong constant and comment rather than a live misclassification — on the surface a reader consults to learn the window.

Nothing reconciles any of it: `git grep CORS_ALLOWED_ORIGIN_PATTERNS -- packages/infra/checks` returns nothing. `APP_REGISTRY`'s header says to keep it in lockstep with the auth-proxy CORS regex — an instruction to a person with no instrument behind it.
