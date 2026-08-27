---
id: 55787363-552d-5ce3-85bb-b5dd56119a90
slug: fts-proc-unconsumed-and-lexeme-blind
page-type-slug: finding
title: "Fts proc unconsumed and lexeme blind"
domain-slug: domain/database
---

# Claim

`public.pages_search`, the full-text-search proc over `public.pages`, has no caller in `~/code` outside its own definition and tests, while a live GIN index and a check pin it. Anyone adopting the audit instrument it looks like inherits a blind spot it does not state: `to_tsvector` emits a path-, URL- or host-shaped string as ONE lexeme, so a query for any part of one matches nothing and the count returns small rather than wrong.

# Evidence

Measured 2026-08-07 in `~/code` at `ecf5f9518`, and run live against the database.

THE PROC. `packages/shared/supabase/database/schema/public/functions/pages_search.sql` runs `websearch_to_tsquery('english', p_query)` against `to_tsvector('english', coalesce(title,'') || ' ' || attributes::text)`, `LIMIT p_limit` default 50, and grants EXECUTE to PUBLIC, authenticated, postgres and service_role. Its index is live: `pages_search_fts_gin_idx`, same expression, `WHERE deleted_at IS NULL`.

NO CALLER. `rg -n 'pages_search' .` over the whole repo, excluding `dist/` and `node_modules/`, returns the proc def (`packages/shared/pages/proc/src/pages-search.ts`), the generated types (`database/src/generated/database.ts:1758`), the test-harness RPC table (`supabase/test-harness/src/rpc.ts:54,80`), three test files, and `check-pages-gin-pending-list-limit.ts:54`, which pins the index's `gin_pending_list_limit`. Nothing in production names it.

WHAT SHIPS INSTEAD. `ops page list --help`: "only --search (title/content substring) is applied client-side over the fetched window", and `count` is null whenever `--search` is present. A different instrument with a different limit.

THE BLIND SPOT, RUN. Through `ops db psql` on `ts_debug('english', ...)`: `America/Denver` is one token, alias `file`; `to_tsvector @@ to_tsquery('denver')` is false and `('america')` is false. `packages/agents/cli/src/agent/halt-census-core.ts` is likewise one `file` token. `https://alanwalton.app/pages` yields protocol/url/host/url_path and no bare word. By contrast `temper-task` splits into `temper` and `task`, and `undelete_relation` into `undelete` and `relation` — so the hazard is confined to path, URL and host shapes rather than to punctuation generally, and `attributes::text` is full of all three.

NOT MEASURED. Whether a consumer outside `~/code` — a browser or mobile client calling PostgREST directly, which the grants allow — reaches it.
