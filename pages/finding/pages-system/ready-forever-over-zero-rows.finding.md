---
id: 647bbc03-edbe-5c8d-891c-fda3da4e0d2f
page-type-slug: finding
title: "A page type can be marked ready forever over zero rows"
domain-slug: domain/pages-system
---

# Claim

While the roster is unread, the collection store attaches a page type to Electric provisionally. An empty shape still returns `up-to-date`, which marks the shape ready, and `markShapeReady` is monotonic — so the later swap onto the file path never un-marks it. The type reads as ready, with zero rows, permanently. This is not confined to the definition tier: an ordinary, correctly file-backed type does it too.

# Evidence

Measured 2026-08-20 by driving the real `createPagesStore`, `acquireSlug`, `attachStream`, the real `@electric-sql/client` `ShapeStream` and the real `applyShapeBatch` against a local server replaying Electric's byte-exact responses. Live Electric at `10.106.146.151:3000` answers an empty shape with a 92-byte `snapshot-end`, then `up-to-date` carrying `electric-has-data: true`.

With the roster answering after 1500ms, `page-type`, `property-definition` and `automation` all came back `whenSlugReady=RESOLVED`, `isSlugReady=true`, `rowsInCollection=0`. At 0ms roster delay `automation` correctly stayed not ready, so the race is the cause rather than the file route being absent.

Two controls fired. Withholding `up-to-date` turned every case into `TIMED-OUT`, so readiness comes from that message and not from something else. A one-row mode gave `rowsInCollection=1`, so the zero is a measured zero rather than a broken parse. A third control on the live probe returned 492,845 bytes for the `page-type` shape, so the probe was not blind.

`markShapeReady` stands at `packages/shared/pages/ui-store/src/collection/acquire.ts:75-82`. The remedy lives in the readiness semantics there rather than at any one call site, and it changes how every page type boots.

A diagnostic now fires for the definition-tier case at `store.ts` `markLive`, routed to the same error-capture surface the apps already install. It reports; it does not resolve the race, and it fires nowhere until the web bundles are rebuilt.

One more thing settling this needs, which is why it is filed rather than fixed. Nothing in the domains states what readiness means over an empty answer, and `domains/test.md` Assert The Invariant asks for the line a test holds to. A candidate, for Alan rather than from him: a page type whose pages are all gone reads as an empty answer, never as an unready one.
