---
page-type-slug: finding
id: 41ff296c-8f60-5fa5-9edb-39f71b26ee8f
slug: undeclared-attributes-gate-reads-a-dropped-table
title: "The undeclared-attributes gate reads a table that no longer exists"
domain-slug: domain/pages-system
---

# Claim

The deploy-time undeclared-attributes gate queries `public.pages`, a table that no longer exists in the live database or in the committed schema baseline, so `ops project deploy` fails at `[0/7] undeclared-attributes gate` for every project, whatever it changes.

# Evidence

At 2026-08-22 a deploy of #19440 reached `[0/7] undeclared-attributes gate` and threw `relation "public.pages" does not exist`. Both verdicts came back FAIL, the second reading `the main pipeline's outcome could not be observed`.

`packages/alanwalton/projects/cli/src/lib/undeclared-attributes-gate.ts` runs the file it names in `AUDIT_SQL_PATH`, `packages/shared/pages/proc/src/_page_undeclared_attributes.audit.sql`. That file names `public.pages` at lines 12, 22 and 36.

The table is absent, and deliberately so rather than lost. `DATABASE_URL` reaches database `postgres` on `postgres.postgres.svc.cluster.local`, which carries the application's own schemas — `auth`, `realtime`, `cron`, `net` — so it is the right database rather than a shadow. `information_schema.tables` there returns no table named `pages` in any schema, while `public` holds 25 tables including `page_versions`. The committed baseline agrees: `packages/shared/supabase/database/schema/public/tables/` holds 23 files, among them `page_versions.sql` and no `pages.sql`. The live database matches what is committed, so nothing here is a database fault.

The gate therefore cannot ever pass. The relation it reads is gone, so every run fails the same way, and the failure is a refusal to observe rather than a finding about the change being deployed.

Reaching the gate at all needed `WORKTREE_DIR` set, because `resolveProjectTreeSeq` in the main checkout still reads project documents from `projects/<seq>.md`. That is a separate fault, fixed on branch `project-19440` and not yet landed.

NOT ESTABLISHED. What should replace the gate. The instructions repository runs a `page-holds-properties` gate on every write, judging a file page against what its page type declares, so the question is what the database-side reading reached that the write-time one does not — pages a product writes at runtime being the obvious candidate. Whether any such page still exists is unchecked, as is when `pages` was dropped and by what route changes have landed since.
