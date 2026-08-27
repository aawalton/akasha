---
id: a9b2f3b0-5271-51f7-8e55-ec1f9b670df5
slug: unscoped-slug-read-cross-tenant-write
page-type-slug: finding
title: "Unscoped slug read cross tenant write"
domain-slug: page-type/persona
---

# Claim

Every persona-anchored session-points faucet in `packages/alanwalton/daily-tracking/src/session-points-totals.ts` resolves its persona by slug alone through an unscoped service-role read with no `userId` predicate, defaulting to the lowest-`seq` row for that slug regardless of tenant, so a duplicated slug (confirmed live for `selah`, the only duplicate among 42 personas) lets one tenant's session-points writes silently land on another tenant's persona row.

# Evidence

Project #16233, domain `persona`, `someday_maybe`. Captured, never defined; text moved off `notes` 2026-08-15.

Problem: every persona-anchored session faucet in `session-points-totals.ts` resolves its persona by slug alone through an unscoped service-role read (`getPages` by `slug`, `limit:1`, no `userId` predicate, RLS bypassed), then writes by the returned id. Slugs aren't globally unique across tenants, so the read can return another user's persona row and the write silently patches it — the documented Page Tenant Scoping defect class under a write path. Sites: `writeSessionPointsTotalForPersona`, `writeSessionPointsDailyForPersona`, same shape in `backfill-session-points-daily.script.ts`.

Why dormant: `getPages` defaults `DEFAULT_ORDER=[{by:"seq",dir:"asc"}]`, so `limit:1` returns the lowest-seq row with that slug globally — first creator of a slug owns every unscoped lookup.

Confirmed live: two rows share slug `selah` (only dup among 42) — seq 26 (Alan) vs seq 119 (other user, active). Alan wins only because 26<119; reversed, his totals write onto a stranger's persona and his own Selah silently stops accumulating. Write side doesn't catch it either: `patchPageById` writes by id, no tenant predicate — silent corruption, not a rejection.

Blast radius: `SESSION_SPECS_BY_SLUG` (amy, zeli, selah, ruby) plus the backfill script; #16161 added `ruby` via this path, widening exposure per the filer's own note.

Not a dup-row cleanup: the second `selah` row is another user's live persona — must not be deleted. Read-side defect only.

Proposed, undesigned: match one of page-tenant-scoping.md's four legitimate shapes; `userId` must arrive explicitly. One scoped helper preferred over three patched sites.

Acceptance criterion: a regression test proving a lower-seq same-slug row of another userId is not selected.

Provenance: found while checking whether a flagged "duplicate empty Selah row" needed Alan's judgment — it needed one look at userId.
