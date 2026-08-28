---
id: 475badcb-770c-550f-b443-7303f4f92f92
slug: docblock-says-authed-reads-skip-the-browser
page-type-slug: finding
title: "Docblock says authed reads skip the browser"
domain-slug: domain/collections
---

# Claim

`browser-login.ts` in the Royal Road sync tells its reader that authenticated reads still use plain fetch and only the login needs a browser. No plain fetch exists anywhere in the package, both readers fetch through Chromium, and two sibling docblocks in the same package state the opposite.

# Evidence

Found on 2026-08-08 while emptying `dirty/code/packages-collections-royal-road-docs-browser-readers.md`. The quarantined document stated the true position and this live comment stated the false one, so a seat cross-checking that document against this file alone would read a true claim as falsified.

`packages/collections/royal-road/src/browser-login.ts:13-14` closes its docblock: "Authenticated reads still use plain fetch; only this unauthenticated login needs the browser."

No plain fetch exists in the package. `rg -n "fetch\(" packages/collections/royal-road/src/` exits 1. A positive control in the same scope exits 0 — `rg -n -F "session-store" packages/collections/royal-road/` returns `readers.ts:9` and `readers.unit.test.ts:49` — so the empty result is an absence rather than a broken pattern or a wrong path.

Both readers go through a real browser. `readers.ts:95` (`createAuthedReader`) and `readers.ts:115` (`createAnonReader`) each call `createBrowserContext()`, and both bind `fetchHtml` to `fetchHtmlOnContext`, whose body at `packages/shared/utils/sync/src/playwright-utils.ts:102-113` opens `context.newPage()` and navigates it.

Two sibling docblocks in the same package say the opposite. `http.ts:2-5`: "Every actual page fetch now goes through a browser reader (`src/readers.ts`) — Cloudflare 403s the entire plain-fetch surface". `readers.ts:12-13`: "Cloudflare 403s every plain-fetch GET, so all reads run through a real headless Chromium."

No wired mechanism compares a docblock against the code beneath it. This is not the dangling-citation class `check-repo-paths.ts:16-42` argues is nobody's gate: it is a positive claim about control flow, contradicted by the file's own siblings rather than a dead link.

Not established: whether anyone relied on the sentence. The code is correct; only its description is wrong.
