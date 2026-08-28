---
id: 7b16221e-a7b7-56c2-afe4-99d2645b7ef6
slug: csp-blocks-inline-woff2-font
page-type-slug: finding
title: "Csp blocks inline woff2 font"
domain-slug: domain/temper
---

# Claim

The tempereso.com app ships an inline data:font/woff2 font that its own Content-Security-Policy's `font-src 'self'` directive blocks on every route and every page load, so the 1149-character inline payload is paid for and never rendered, and this violation is invisible to every existing error-reporting mechanism because it only surfaces on the browser's console.error channel.

# Evidence

From project #16191 (domain: temper). Found by the #16055 route sweep against tempereso.com. Confirmed 3/3 samples (/home x2, /catalog), present on all 17 swept routes every round.

BROWSER'S VERDICT, verbatim: "Loading the font 'data:font/woff2;base64,...[1149 chars]...' violates the CSP directive: 'font-src self'. The action has been blocked."

WHAT IT MEANS: the app embeds a woff2 font as a `data:` URI; its CSP sets `font-src 'self'`, which does not permit `data:`. The font is blocked on every load for every user; text renders in a fallback face permanently. Two things wrong at once: a font costing 1149 chars of inline payload is never used, and the app violates its own security header on every request, drowning the one CSP signal a reader might act on.

WHY NOTHING ELSE CAUGHT IT: a CSP violation emits no `/api/errors` report, no >=400 response, no uncaught exception, no DOM emptiness — only `console.error`, which the sweep reports but does not fail on (React logs warnings there too). The sweep printed `console 1` on all 17 routes for several rounds; the uniform number was the tell.

SOURCE CONFIRMATION: (1) `packages/shared/web-security-headers/src/build.ts:47` sets `directive("font-src", ["'self'"])`, no `data:`. (2) A unit test pins it (`build.unit.test.ts:66`), so nothing flags it as drift. (3) The live header at tempereso.com/sign-in already permits `'data:'` for `img-src`, not `font-src` — the asymmetry plus the unused payload suggests an oversight, not a posture.

WHERE TO LOOK: `.claude/docs/web-security-headers.md` and `@shared/web-security-headers`, the `font-src` directive. Whether to permit the inline font or stop shipping it as `data:` is a posture judgement, not decided here.

NOT FIXED HERE — #16055's product is finding, not repair. A follow-on instrument landed in #16055: the route sweep gained a CSP-violation count that fails, so `bun ops browser-test sweep` now fails deterministically on this rather than needing a hand-read console.
