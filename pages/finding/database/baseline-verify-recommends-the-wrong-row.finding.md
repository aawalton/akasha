---
id: 53c15ac5-ea1a-5bae-8e9c-2f0fb114044a
slug: baseline-verify-recommends-the-wrong-row
page-type-slug: finding
title: "Baseline verify recommends the wrong row"
domain-slug: domain/database
---

# Claim

`ops migration baseline-verify` recommends deploying the project that owns a pending migration, without checking whether that migration's DDL is already in effect by another route. Where a second migration has since landed the same change, the recommendation points at an irreversible deploy that fixes nothing and leaves the real repair — a stale baseline — untouched.

# Evidence

Measured 2026-08-07. `baseline-verify` exited 4:

    DIVERGED  public/functions/get_status_bar_snapshot.sql          both
    DIVERGED  public/functions/page_patch_by_seq_if_unclaimed.sql   baselineOnly
    baseline unsound — 0 ledgered seq(s) with absent objects, 2 function(s) matching neither origin/main nor live

Its recommendation was to deploy #17626, which owned migration 5577, pending, whose content is `DROP FUNCTION IF EXISTS public.page_patch_by_seq_if_unclaimed(text, bigint, jsonb, text[], jsonb)`.

That function was already gone. Migration 5578, applied under project #17763, carries the identical DROP. Confirmed against the catalog rather than the ledger: `select proname from pg_proc where proname = 'page_patch_by_seq_if_unclaimed'` returns no row. Deploying #17626 would have run the DROP a second time against nothing.

The divergence was in the baseline database, which lagged both live and `origin/main`. `ops migration baseline-rebuild` cleared it in 66 seconds over 331 seqs, and `baseline-verify` then exited 0 with `get_status_bar_snapshot` reclassified from DIVERGED to NOTE — the applied-but-unlanded arm the verb's own help says does not fail.

The cost while it stood was fleet-wide rather than local to the row. The regen step of `ops migration run` was blocked for every project on the database. A migration on #18147 applied its DDL and then died in regen; a partial `gen-schema` deleted 60 schema snapshot files and reverted another project's function body.

It was caught only because amy, holding a blocked project she did not own the repair for, ran the check herself and refused the recommendation on the grounds that she could not verify an irreversible act on another lead's row. Taking the recommendation was the cheaper move and would have left the fleet blocked with the evidence spent.

Not measured: how many other pending migrations across the ledger are superseded the same way, or whether the recommendation has misdirected anyone before.
