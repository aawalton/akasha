---
id: 096a6177-170e-5f7d-8e65-a51e645dd68d
page-type-slug: finding
title: "Csp nonce error render comments wrong"
domain-slug: repo/code-repo
---

# Claim

A render whose root loader threw ships every script un-nonced under the full production CSP. Two of the six web apps say this is harmless for a reason that is false: `alanwalton/web/app/root.tsx` calls the un-nonced path "non-prod", and `audhdalan/web/app/root.tsx` calls it "inert because dev/error paths carry no CSP". Error paths do carry it. `temper/web/app/root.tsx` corrected the same comment, naming it "the case the prior comment missed" — the correction landed in one app, not the other two.

# Evidence

Every app's `Layout` reads the nonce as root loader data:

    const nonce = useRouteLoaderData<typeof loader>("root")?.nonce

`?.` yields `undefined` where the root loader threw. `<Scripts nonce={undefined}>` emits no attribute, and `'strict-dynamic'` makes `script-src` ignore the `'self'` host-source, so the parser-inserted scripts are refused.

The CSP is attached on content type alone, with no status test. All six `server.ts` guard the merge only by:

    const contentType = resp.headers.get("content-type") ?? ""
    if (contentType.startsWith("text/html")) {

An HTML error response takes that branch and gets the full policy, so audhdalan's premise is false against its own `server.ts`.

The three comments:

- `alanwalton/web/app/root.tsx:210` — "the sidebar-boot script then ships un-nonced, which only degrades anti-flicker on those non-prod paths". A production root-loader throw is not a non-prod path.
- `audhdalan/web/app/root.tsx:46` — "scripts then ship un-nonced, which is inert because dev/error paths carry no CSP".
- `temper/web/app/root.tsx:202` — "in dev, AND (the case the prior comment missed) on a prod render where the root loader itself THREW. A plain 404 keeps its nonce (the root loader still ran); only a loader throw drops it."

Temper reaches an accepted trade-off: its ErrorBoundary is near-static and its "Go to Home" is a plain `<a>` working without JS. That judgment is what the other two have not made — they record a reason, and the reason does not hold. `smilingjenny/web/app/root.tsx:33` carries the same code with no comment.

Nothing surfaces it either way, and I ran both halves: every app's `dev` script is `react-router dev` and `getLoadContext` has zero matches repo-wide, so development serves no CSP; and `report-uri`, `report-to` and `Report-Only` have zero matches in `packages/shared/web-security-headers`, so a production violation reaches the browser console and no telemetry.

Found while ingesting `dirty/knowledge/web-security-headers.md`, which states the behaviour but not the contradiction. That source has been removed.
