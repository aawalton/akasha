---
id: 9a18fc4e-b916-5544-99dd-2e225e17c854
page-type-slug: finding
title: "Owner attribution unmeasured"
domain-slug: domain/pages-system
---

# Claim

Nothing measures the owner attribution of a page row. `pages_owner_select` enforces the `user_id` column rather than checking it, and `_enforce_owner_stability` refuses any change to it, so a bulk import that stamped the wrong owner is preserved by both and reads correctly to whoever it was stamped for. The exposure is live: 1,203 of the 1,210 undeleted `location` rows belong to one external human's account, all loaded on her behalf, and she cannot notice.

# Evidence

Measured 2026-08-07 against the live database and the live code, reading only counts and policy text.

`select page_type_slug, user_id, count(*) from public.pages where page_type_slug in ('location','location-deal','location-collection') group by 1,2` through `ops db psql` splits `location` 1203 / 11 / 1 across three owners and puts all 417 `location-deal` rows under the first of those. A second query over `location` returns 1210 undeleted of 1215 total, first row 2026-06-29 and last 2026-07-06, across 9 distinct creation minutes. Rows written in nine minutes over eight days are a load rather than a use.

`packages/shared/supabase/database/schema/public/tables/pages.sql:232` carries `CREATE POLICY pages_owner_select ON public.pages FOR SELECT TO authenticated USING ((user_id = (auth.uid())::text))`. It answers who may read a row given its owner and has no opinion about whether that owner is the right one. `packages/shared/pages/proc/src/_enforce_owner_stability.ts` refuses an UPDATE changing `user_id`, preserving a wrong attribution as faithfully as a right one.

Nothing reads the distribution. `domains/lists/unresolved-checks.md` names no ownership, tenant or attribution check over page rows; its only ownership entry, `check-addon-global-ownership`, is about addon global state. Nothing under `packages/infra/checks/src/checks/` counts rows by owner.

A row under the wrong owner reads perfectly — the fields are right and nothing errors — so no signal is disturbed by it, and the person exposed is an external user with no view of the system and no channel to report a fault. `packages/agents/routing-core/src/sms-entry-points.ts:52` carries her wake source at `status: "LIVE"`.

There is no oracle for who should own a row, so this is not a check that could pass or fail on its own; what is absent is any reading of the distribution at all. Found while ingesting `dirty/skills/jenny/SKILL.md`, which records the same absence and is queued for removal.
