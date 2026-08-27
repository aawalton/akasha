---
id: 0da8655f-2dcb-5d7b-80e8-2f108e1687d8
slug: bulk-upsert-picks-a-page-type-silently
page-type-slug: finding
title: "Bulk upsert picks a page type silently"
domain-slug: domain/pages-system
---

# Claim

`pages_bulk_upsert` resolves its page-type row with a bare `SELECT … INTO` carrying no `LIMIT` and no `STRICT`, and it does not go through `_page_type_id_by_slug`, the helper that raises on a duplicate slug. Under two live page-type rows sharing a slug, every other write path raises and this one silently takes whichever row comes first, then composes the whole batch from its blob and reports success.

# Evidence

Read 2026-08-07 against `~/code`. `packages/shared/pages/proc/src/pages-bulk-upsert.ts:82-87`:

    SELECT p.id, p.attributes->'propertyDefinitions', p.attributes->'coherenceRules'
      INTO v_page_type_id, v_property_defs, v_coherence_rules
      FROM public.pages p
     WHERE p.page_type_slug = 'page-type'
       AND p.slug = ${p_page_type_slug}
       AND p.deleted_at IS NULL;

plpgsql assigns the first row of a multi-row `SELECT … INTO` and raises nothing. The only guard after it tests `v_page_type_id IS NULL`, which a duplicate does not trigger.

IT DOES NOT USE THE RAISING HELPER. `rg -ln "_page_type_id_by_slug|pageTypeIdBySlug" packages/shared/pages/proc/src/` returns three files — `ctx-args.ts`, `_page_type_id_by_slug.ts` and `index.ts`. `pages-bulk-upsert.ts` is not among them.

WHAT THE CHOSEN BLOB DRIVES. `v_property_defs` and `v_coherence_rules` compose `unique_key`, `status`, `completed_at`, `parent_key`, `favorited_at` and `last_viewed_at` for every item in the batch, and feed the coherence-rule guard. The rows land composed from an arbitrarily chosen definition and the call returns success.

THE CONDITION IS REACHABLE. `pages/finding/pages-system/page-type-slug-unconstrained.finding.md` establishes that two `page_type_create` calls on one slug both commit, and names `_page_type_id_by_slug` as where the duplicate finally surfaces — "after the fact, at whatever later call happens to resolve that slug". This is the complement it does not cover: the one write path where it never surfaces.

WHY AN EARLIER CENSUS MISSED IT. The enumeration that found the loud sites searched for scalar subqueries, the construct that raises. A `SELECT … INTO` is not one.

NOT MEASURED: whether any duplicate stands on live today.

Searched `~/memory/findings/` first: `rg -l -i "pages_bulk_upsert|bulk.upsert" findings/` returns five, and none is about how the verb resolves its page-type. The nearest, `bulk-exemption-framed-as-caller-discipline.md`, is about how two guard headers frame the bulk exemption.
