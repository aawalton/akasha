---
id: 245f9217-6ac7-5125-b449-03c3e906e3fa
slug: health-samples-comments-cite-a-retired-sibling
page-type-slug: finding
title: "Health samples comments cite a retired sibling"
domain-slug: domain/alanwalton-app
---

# Claim

Two live comments in `packages/alanwalton/web` explain the health-samples ingest by contrasting it with "the single-entity active-energy route beside this one", in the present tense — and that route was retired at #18149, leaving the reader looking for a sibling route and a `checkIngestDate` gate that no longer exist anywhere in the repo.

# Evidence

Measured 2026-08-08 in `/var/home/walton/code`, tracked files only (`git grep`).

`app/routes.ts:190-192` records the retirement in the route table itself: "It is now the ONLY health ingest — #18149 retired the active-energy route that used to stand above it, which took one summed scalar per day and could not be re-asked." One health route is listed below it.

Two comments still describe that route as standing:

- `app/routes/api.tracking.health-samples.ts:6-7` — "both authenticate with a per-device secret in `X-Device-Secret`, exactly as the single-entity active-energy route beside this one does."
- `app/tracking/lib/health-samples-body.ts:14-16` — "THERE IS NO AGE GATE HERE, AND THAT IS THE POINT. The single-entity route beside this one applies `checkIngestDate`, which refuses any date more than `MAX_INGEST_AGE_DAYS` (30) old."

The second names a gate with no definition. `git grep "checkIngestDate\|MAX_INGEST_AGE_DAYS"` returns four lines across three files and every one is inside a comment; a search for an `export` of either returns nothing. `git grep "active-energy-gate"` exits 1, and `git ls-files 'packages/alanwalton/web/app/routes/*active-energy*'` returns nothing.

The cost is a broken argument rather than a broken link. Both comments justify a design choice — service-role stamping in one, the absent age gate in the other — by contrast with what the sibling does. With the sibling gone, a reader is told a 30-day horizon is enforced somewhere in this app when it is enforced nowhere.

Not established: whether the retirement meant these to be rewritten as history or missed them. Project #18149 records the route removal as checked with a manager PASS and says nothing about the comments.

Distinct from two standing findings I opened before filing: `pages/finding/akasha-repo/quarantined-doc-references-dangle.finding.md` covers `See docs/…` pointers left by the 2026-08-03 quarantine move, and `pages/finding/alanwalton-app/cardio-rate-stated-twice.finding.md` covers the cardio points rate.
