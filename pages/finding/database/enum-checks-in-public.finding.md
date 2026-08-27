---
id: b7c325bf-3c4e-5a05-927d-f2f1aa0f5fda
page-type-slug: finding
title: "Enum checks in public"
domain-slug: domain/database
---

# Claim

Three business-logic CHECK constraints stand in the `public` schema on our own tables, all of them enum-membership tests. Nothing in the repository states that they should not, and no check refuses a new one.

# Evidence

The three, in `packages/shared/supabase/database/schema/public/tables/`:

- `event_subscribers.sql:20` — `CONSTRAINT event_subscribers_status_check CHECK ((status = ANY (ARRAY['idle'::text, 'active'::text, 'error'::text])))`
- `event_subscribers.sql:21` — `CONSTRAINT event_subscribers_worker_kind_check CHECK ((worker_kind = ANY (ARRAY['mutation'::text, 'action'::text])))`
- `filler_jobs.sql:22` — `CONSTRAINT filler_jobs_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'running'::text, 'done'::text, 'failed'::text])))`

Every other CHECK constraint in the tree sits under `schema/auth/`, which is Supabase's own schema rather than ours. The `public` schema carries no others; the remaining `WITH CHECK` matches there are RLS policy predicates, not table constraints.

Nothing states the convention. Searching the live `domains/` tree for `check constraint`, `constraint`, `zod`, `validat`, `parse, don`, `migration` and `CHECK (` returns only the word "invalidate" in `domains/check.md` and two project tasks, none of them about this. `domains/database.md` — live, `code-path: packages/shared/supabase/**` — holds a Definition and one Design line about page-type versioning.

Nothing refuses a new one. A search of `packages/infra/checks/src/` for anything naming a CHECK constraint returns nothing.

The convention was written down once, in `dirty/docs/parse-dont-validate.md`, which is queued for removal. It claims to apply across all packages, citing a migration that removed 33 CHECK constraints from seven schemas. Six of those seven (`connect`, `finances`, `market`, `temper_market`, `projects`, `temper_user`) are absent from the whole database tree, which holds only `auth`, `public`, `publications`, `_realtime` and `realtime`.

So either the convention is held and these three are unnoticed defects, or it was abandoned. Both readings fit the evidence; this records the state rather than settling it.
