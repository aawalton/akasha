---
page-type-slug: finding
id: 061c91de-ebc2-5ea8-918c-771d373e7f3e
title: "The database-backed pages layer is gone while its code and docs still stand"
domain-slug: domain/pages-system
---

# Claim

The database-backed pages layer is gone from the live database and from the committed schema baseline — no `pages` table, no index over one, and no `page*` function of any kind — while `packages/shared/pages/access/` still carries 108 TypeScript files and a documentation tree describing the RPCs that layer provided.

# Evidence

Queried on `DATABASE_URL` at 2026-08-22, against database `postgres` on `postgres.postgres.svc.cluster.local`, which carries `auth`, `realtime`, `cron` and `net` and is the application's own database rather than a shadow.

`information_schema.tables` returns no table named `pages` in any schema. `pg_proc` joined to `pg_namespace` on `public` returns nothing matching `%page%` — so `pages_for_view`, `_pages_row_matches`, `_pages_project`, `page_create` and `page_patch` are all absent, not merely the table they read. Of the seven `%page%` indexes on `public`, every one belongs to `events` or `page_versions`.

The committed baseline agrees rather than disagreeing, so this is a removal that landed rather than a database that drifted: `packages/shared/supabase/database/schema/public/tables/` holds 23 files, `page_versions.sql` among them and no `pages.sql`.

What still describes the removed layer: `packages/shared/pages/access/` holds 108 TypeScript files outside tests, plus `pages-rpc.md`, `pages-interface.md`, `pages-interface-functions.md`, `pages-iteration.md`, `json-path-patches.md`, two page-types-interface files, and six markdown files under `pages-for-view/`.

How it surfaced: the deploy-time object-name-claims gate flagged one sentence naming `pages_active_page_type_id_updated_at_idx`. That gate reads markdown for identifiers ending `_idx`, `_pkey` or `_fkey`, so it caught the index name and is blind to the prose around it describing the RPC. Only the flagged section was removed, under project #19440, which is about tracking sources and not about this.

NOT ESTABLISHED. Whether those 108 files are dead or are still reached by a caller that fails at runtime. One reference to `pages_for_view` by name was found outside that directory, in a generated prometheus baseline. When the layer was dropped, and by what change, is unchecked. Whether anything still writes a page row at runtime is unchecked, and it is the question deciding whether this is dead weight or a live gap.
