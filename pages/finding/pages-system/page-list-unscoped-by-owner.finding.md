---
id: d8d87d64-3f1c-5d13-9b55-1b585d1f931c
slug: page-list-unscoped-by-owner
page-type-slug: finding
title: "Page list unscoped by owner"
domain-slug: domain/pages-system
---

# Claim

`ops page list` reads through `createServiceRoleClient()` with no owner predicate, so the estate's general-purpose page enumeration returns every tenant's rows: `--type persona --all` returns 42 for the 41 Alan owns, and the surplus arrives as a second row under an existing slug rather than as anything a reader would notice was foreign.

# Evidence

Measured 2026-08-07 against the live database and `~/code`.

`ops page list --type persona --properties title --all` returns 42 lines, two of which read `Selah`. It exits 0 and prints nothing distinguishing them.

`packages/shared/pages/cli/src/page/list.ts:81` is `const sb = createServiceRoleClient()`, imported from `@shared/supabase-server` at line 16. The service role bypasses row-level security, and the file holds no `user_id` or `owner` predicate re-establishing the scope RLS would have applied.

The database agrees: `select count(*), count(*) filter (where user_id = '9ba554f7-cb18-48bb-a709-ec935a895ca7'), count(distinct user_id) from public.pages where page_type_slug='persona' and deleted_at is null` returns 42, 41, 2. The extra `selah` belongs to a second owner.

This is a third unscoped path, and neither standing finding names it. `pages/finding/database/adhoc-role-bypasses-rls.finding.md` covers the `ops db psql` connection. `pages/finding/pages-system/persona-enumeration-unscoped-by-owner.finding.md` covers `listPersonaTargets` at `packages/agents/shared/persona-wake-slugs.ts:92`. `ops page list` is neither: it is the verb an agent reaches for by hand, and its output goes straight into a document.

The consequence already sits in a document queued for promotion. `dirty/maybe-keep/knowledge/persona-faucet-composed.md`, a keep composed by another ingesting seat, rests two measurements on this verb. Line 15 reads "returns 42 rows, of which nine declare `faucetKind: delta`"; line 35 reads "over 42 live persona rows: 8 carry prefixes ... 34 are skipped". The population is 41.

Not established: whether the foreign `selah` falls inside either subset, or whether other `--type` values show the same surplus. I measured personas, where the duplicate slug made it visible.
