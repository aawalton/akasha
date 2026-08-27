---
id: 179b84a8-991c-5e1c-acad-9506f3761c38
slug: static-assets-carry-no-security-headers
page-type-slug: finding
title: "Static assets carry no security headers"
domain-slug: repo/akasha-repo
---

# Claim

Every `/assets/*` bundle the React Router web apps serve ships with no security headers at all — no `X-Content-Type-Options: nosniff`, no `Strict-Transport-Security`, no `Referrer-Policy`, no `X-Frame-Options`, no `Permissions-Policy`. The constant carrying them is named `STATIC_HEADERS`, for headers that are the same on every response, and they are — within HTML: the branch attaching them is reached only by `text/html` responses, and the static branch returns above it.

# Evidence

Read in the akasha working tree, 2026-08-27.

In every web app's `server.ts` the static branch runs first and returns — `alanwalton/web/server.ts:62`, `alanwalton/atlas-web/server.ts:88`, `archive-of-worlds/web/server.ts:47`, `audhdalan/web/server.ts:47`, `temper/web/server.ts:48`:

    const staticRes = await serveClientStatic(pathname, CLIENT_DIR)
    if (staticRes) return staticRes

`generateNonce()` and the `buildSecurityHeaders` merge both sit below that, inside `if (contentType.startsWith("text/html"))` — `alanwalton/web/server.ts:65-72`.

`serveFile` in `shared/web-static-assets/src/serve-static.ts:12-18` sets one header and no others:

    return new Response(file, {
      headers: { "Cache-Control": cacheControl },
    })

So a bundle under `/assets/` returns with `Cache-Control: public, max-age=31536000, immutable` and nothing else. Its `Content-Type` is synthesized by Bun from the file extension, which is the case `nosniff` exists to make binding.

Nothing upstream supplies them. `X-Content-Type-Options`, `nosniff` and `Strict-Transport-Security` return no match anywhere under `infra/` in `.ts`, `.yaml` or `.yml`, so no ingress, proxy or k8s manifest adds what the app omits.

A reader auditing whether the estate sets `nosniff` finds `STATIC_HEADERS` in `shared/web-security-headers/src/build.ts:8-14`, sees headers named for being static rather than per-request, and gets a true answer to the wrong question. Nothing at either site records that the set never reaches a non-HTML response.

`Strict-Transport-Security` reaches past the response carrying it — a browser receiving it on HTML alone still has the origin pinned — so the exposure concentrates in `nosniff` on script and style bundles.

Found while ingesting a quarantined knowledge document on web security headers, which recorded that responses outside the branch carry none of these but did not check whether anything upstream makes up for it. That source has been removed.
