---
id: c3205ead-3f09-5a59-b99a-4e5a599efc2a
slug: admin-url-visibility-mismatch
page-type-slug: finding
title: "Admin URL visibility mismatch"
domain-slug: domain/database
---

# Claim

`DATABASE_ADMIN_URL` routes investigation reads through the postgres superuser role (a member of `pg_read_all_stats`), while the application runs as `service_role`, which is not a superuser and not a member of `pg_read_all_stats` (though it does have `BYPASSRLS`) — so an admin-connection measurement of an application-visibility question can fail toward a plausible wrong answer rather than an error, and the automated test harness carries the same role split, defeating the one rung meant to catch it.

# Evidence

Project #16178, domain `database`, status `someday_maybe`, no objective; moved off retired `notes` 2026-08-15. Identified by athena during #16150; scope expanded 2026-07-25T15:09.

The repo-root instruction routes investigation reads through `DATABASE_ADMIN_URL` (postgres superuser, in `pg_read_all_stats`); the app runs as `service_role` (not superuser, not in `pg_read_all_stats`, but HAS BYPASSRLS). One connection string, two populations, nothing at the call site says which question it answers.

Measured (astra): as service_role, `pg_stat_activity` is not row-blind (195 rows) but column-masked: `xact_start` NULL for another role's backend while `backend_xid`/`backend_xmin` show real values, and `query` returns the literal string `insufficient-privilege` (non-null, so `IS NOT NULL` silently passes). Confirmed: same pid/instant, xact_start readable as admin, NULL as service_role.

Why it matters: nearly shipped a #16150 watermark fix whose `LEAST(now()-1s, min(xact_start))` collapses to bare `now()` in production, no NULL, no exception, green admin-connection tests.

Precedent: the browser path's seeded Playwright session is RLS-blind, so a clean-empty render is illusory; fixed with `ops browser-test verify-render`, connecting as the real identity, failing loud. SQL has no sibling yet.

Rule to encode: "does this datum exist?" -> admin sound (strict superset). "can the app see/do it?" -> admin unsound, fails toward a plausible wrong answer.

Second, worse instance: the pglite test harness never issues `SET ROLE`, so its session is SUPERUSER despite faking the service_role JWT claim (too permissive), while its bare `CREATE` leaves BYPASSRLS=false (too restrictive). The test harness has the same blind spot.

Scope as filed: (1) name which question each URL answers, at point of use; (2) give the app-visibility class a verb connecting as the real role, failing loud; (3) audit guidance defaulting to `DATABASE_ADMIN_URL`.
