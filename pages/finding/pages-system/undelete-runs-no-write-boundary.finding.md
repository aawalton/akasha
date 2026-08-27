---
id: 98e77a47-b7c3-532e-abd3-df50a51cec85
slug: undelete-runs-no-write-boundary
page-type-slug: finding
title: "Undelete runs no write boundary"
domain-slug: domain/pages-system
---

# Claim

`page_undelete`, `page_undelete_by_id` and `page_undelete_by_seq` call no write-boundary guard at all — not `_page_assert_required_columns`, not `_enforce_page_schema`, not `_enforce_page_coherence`, not `_enforce_declared_attributes` — and none delegates to a proc that does. Restoring a soft-deleted row returns it to the live population without any check that governs its creation, so undelete is a second construction path for a live row that could not be created today.

# Evidence

Read 2026-08-07 against `~/code`, at the committed schema snapshot under `packages/shared/supabase/database/schema/public/functions/`, whose files carry a `GENERATED — regenerate via bun run gen-schema` header and are the snapshot of live.

`page_undelete.sql`, `page_undelete_by_id.sql` and `page_undelete_by_seq.sql` each return 0 for all four guard names. Read whole, `page_undelete.sql` refuses an unauthenticated caller and refuses the two definition-tier slugs, then loops over matching soft-deleted rows and issues `UPDATE public.pages AS p SET deleted_at = NULL`, builds an `updated` event carrying only `deletedAt`, and emits. There is no guard call and no comment stating a rationale for their absence.

What makes the absence load-bearing rather than merely tidy: the row's attributes are not revalidated against the page-type as it stands NOW. A property-definition retired, or an `isRequired` flag set, after the row was soft-deleted leaves a row that `page_create` would refuse today and that undelete restores without complaint.

This is adjacent to `~/memory/findings/pages-system/undeclared-audit-skips-soft-deleted.md` and is not the same observation. That one is about the deploy-time undeclared-attributes audit filtering `WHERE p.deleted_at IS NULL`, and names `page_undelete` only as the vector that returns an unexamined row to the live set; its repair is to widen the audit. This one is about the undelete procs themselves calling none of the four write-boundary guards, and its repair is at the procs. Read that finding in full before filing to be sure the two differ.

Searched `~/memory/findings/` for `undelete` before filing. Ten files match; the only pages-system ones are the audit finding above, `owner-attribution-unmeasured.md` and `agent-rows-carry-no-history.md`, and neither of the latter two is about guard coverage. Nothing carries this.
