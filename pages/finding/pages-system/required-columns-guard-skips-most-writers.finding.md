---
id: 02fba29b-20f3-5570-966e-779a091827fd
slug: required-columns-guard-skips-most-writers
page-type-slug: finding
title: "Required columns guard skips most writers"
domain-slug: domain/pages-system
---

# Claim

The write-boundary guard `_page_assert_required_columns` is called by 2 of the 7 live page-write procs, and the access layer's commonest patch route bypasses it. The three other patch procs carry every other guard but not this one, and none delegates to `page_patch`. `patchPage` dispatches a sole id-equality or seq-equality where clause to exactly those ungated procs, so the gated path is the uncommon one. An `isRequired` property makes a row un-creatable rather than unconstructable.

# Evidence

Read 2026-08-07 against `~/code`, at the committed schema snapshot under `packages/shared/supabase/database/schema/public/functions/`, whose files carry a `GENERATED — regenerate via bun run gen-schema` header and are the snapshot of live.

Counting guard calls per proc file: `page_create.sql` and `page_patch.sql` each call `_page_assert_required_columns` once. `page_patch_by_id.sql`, `page_patch_by_id_if_status.sql` and `page_patch_by_seq.sql` return 0 for it while returning 1 each for `_enforce_page_schema`, `_enforce_content_storage`, `_enforce_page_coherence` and `_enforce_declared_attributes`. `page_upsert.sql` returns 0 for all five and `page_create_if_absent.sql` returns 0 for all five; neither is a hole, because both delegate — `page_create_if_absent.sql:67` returns `public.page_create(...)`.

The denominator is 7 rather than the 8 a quarantined document stated. `page_patch_by_seq_if_unclaimed` no longer exists: `git log --diff-filter=RD` over its path names `5d598992a2`, "migration 5578: drop the orphaned page_patch_by_seq_if_unclaimed and sync the snapshot", and `rg -uuu` for the basename outside `.git`, `node_modules` and `dist` returns one unrelated file. Checked for a rename before recording it as dropped.

The routing half is at `packages/shared/pages/access/src/patch.ts`. `callPagePatch` calls `tryExtractIdEq(args.where)` and, when it returns a value, issues `sb.rpc("page_patch_by_id", ...)` and returns; it then calls `tryExtractSeqEq(args.where)` and issues `sb.rpc("page_patch_by_seq", ...)` and returns; only a where clause that is neither shape falls through to `sb.rpc("page_patch", ...)`. So the two shapes that reach the ungated procs are the two commonest ways to name one row.

Searched `~/memory/findings/` for `_page_assert_required_columns`, `required-columns`, `isRequired`, `un-creatable` and `uncreatable` before filing; the only hit was `pages/finding/style/two-read-shape-unenforced.finding.md`, on an unrelated subject. Nothing carries this.
