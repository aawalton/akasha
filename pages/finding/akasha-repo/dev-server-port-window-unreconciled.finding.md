---
id: 93d1a998-3024-54e4-9408-f96f4b91b4fd
slug: dev-server-port-window-unreconciled
page-type-slug: finding
title: "Dev server port window unreconciled"
domain-slug: repo/akasha-repo
---

# Claim

The dev-server port window is stated on several surfaces, they disagree with the one that ships, and nothing compares any of them.

# Evidence

What ships: `infra/auth-proxy/auth-proxy-deployment.cluster-service.code.attachment.ts:196` sets `CORS_ALLOWED_ORIGIN_PATTERNS` to `^http://localhost:3[0-6][0-9]{2}$` — 3000 to 3699. The auth-proxy terminates CORS for `/auth/v1` against it, so an origin outside it has its GoTrue fetch rejected and sign-in times out with nothing naming CORS.

The registry it mirrors is `APP_REGISTRY` in `tools/lib/dev-server-ops.ts`: alanwalton 3000, audhdalan 3100, temper 3300, archive-of-worlds 3500, atlas 3600, with `computePort` at `:88` deriving `basePort + (seq % 100)`.

Against both, `infra/auth-proxy/src/cors.unit.test.ts:5` fixes `[/^http:\/\/localhost:3[0-4][0-9]{2}$/]` — 3000 to 3499 — and `:27` asserts `http://localhost:3500` is refused. The fixture is the test's own, so the assertion is right about the function; but 3500 is archive-of-worlds's base and 3600 is atlas's, both allowed in production and both outside the window the test states as the shape of the thing. A reader learning the window from the test learns a narrower one than ships.

Nothing reconciles any of it. No check under `infra/cluster-checks/` names `CORS_ALLOWED_ORIGIN_PATTERNS`, and neither regex is derived from the registry bases: the shipped one is a literal string in the synth, the test's a literal in the test.
