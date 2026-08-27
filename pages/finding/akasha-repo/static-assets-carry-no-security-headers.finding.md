---
id: 179b84a8-991c-5e1c-acad-9506f3761c38
page-type-slug: finding
title: "Static assets carry no security headers"
domain-slug: repo/code-repo
---

# Claim

Every `/assets/*` bundle the six React Router web apps serve ships with no security headers at all — no `X-Content-Type-Options: nosniff`, no `Strict-Transport-Security`, no `Referrer-Policy`, no `X-Frame-Options`, no `Permissions-Policy`. `server.ts` calls the five static headers unconditional, and they are, within HTML: the branch attaching them is reached only by `text/html` responses, and the static branch returns above it.

# Evidence

In all six `server.ts` the static branch runs first and returns:

    const staticRes = await serveClientStatic(pathname, CLIENT_DIR)
    if (staticRes) return staticRes

`generateNonce()` and the `buildSecurityHeaders` merge both sit below that, inside `if (contentType.startsWith("text/html"))`.

`serveFile` in `packages/shared/web-static-assets/src/serve-static.ts` sets one header and no others:

    return new Response(file, {
      headers: { "Cache-Control": cacheControl },
    })

So a bundle under `/assets/` returns with `Cache-Control: public, max-age=31536000, immutable` and nothing else. Its `Content-Type` is synthesized by Bun from the file extension, which is the case `nosniff` exists to make binding.

Nothing upstream supplies them. `X-Content-Type-Options`, `nosniff` and `Strict-Transport-Security` have zero matches across `packages/infra` in `.ts`, `.yaml` and `.yml`, so no ingress, proxy or k8s manifest adds what the app omits.

`packages/alanwalton/web/server.ts:150` states the scope accurately and reads as coverage: "Security headers (CSP + the five static headers) are applied to EVERY text/html response here", closing "the security headers are unconditional — an HTML response must never ship without them." A reader auditing whether the estate sets `nosniff` finds `STATIC_HEADERS` in `packages/shared/web-security-headers/src/build.ts`, sees five headers named for being static rather than per-request, and gets a true answer to the wrong question.

`Strict-Transport-Security` reaches past the response carrying it — a browser receiving it on HTML alone still has the origin pinned — so the exposure concentrates in `nosniff` on script and style bundles.

Found while ingesting `dirty/knowledge/web-security-headers.md`, which records that responses outside the branch carry none of the six but does not check whether anything upstream makes up for it. That source has been removed.
