---
id: 3c9d2ac7-e47d-5912-9987-3447196fcceb
slug: idle-redirect-is-permanent
page-type-slug: finding
title: "Idle redirect is permanent"
domain-slug: web-app/alanwalton-web
---

# Claim

`/idle` answers with a 301, which browsers cache indefinitely, so a browser that saw the old one still resolves it to `/game/idle-3ffb32b7` — a URL that now 404s. The redirect itself is correct and re-resolves for anyone whose cache is cold; what a 301 cannot do is take back an answer it has already given. A 302 says the same thing today and leaves the next move free, which matters because this target has now moved once.

# Evidence

Measured 2026-08-16, verifying the hand-back on project #19263 rather than reading its account.

`ops browser-test verify-render --url https://alanwalton.com --path /game/idle-3ffb32b7 --page-type game --expect-text Idle` returns `VERDICT: FAIL — page 404'd / not found`, at http 404. So the destination a cached 301 still points at is genuinely gone, not merely moved.

`/idle` itself is correct: the same command at `--path /idle --page-type idle-game` returns `VERDICT: PASS`, http 200, over a discriminating assertion. Both readings come from the deployed system as Alan's own identity.

The cost lands on one person and it is small: a browser holding the cached redirect goes to a dead page until that cache clears, and nothing clears it on a schedule anybody controls. New links self-heal, being built by `buildPageHref`.

What makes it worth recording rather than shrugging at is the direction of the guarantee. A 301 is a promise that the mapping is permanent, and this mapping was not — it moved when the idle rows moved off the `game` page type, and the page type split it came from is the first of several the narrative engine has queued. A redirect whose target is expected to move again is asserting the one thing it cannot honour.

The change is one word in the redirect's status code. It was found by the seat that built the split, which named it and deliberately did not build it, being past what the project's criteria asked.
