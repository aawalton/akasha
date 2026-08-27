---
id: a8e8edb7-ad3e-5b6a-85cf-c484ee4d7ec4
page-type-slug: finding
title: "Duplicate selah persona rows"
domain-slug: domain/alanwalton-app
---

# Claim

Two live `persona` rows both carry the title "Selah" and the slug "selah", and they disagree: `019fc227-fe66-77e4-856c-17a7b3b7e1b0` has no `faucetKind` at all, `019f0da7-0f73-712e-99fc-d1ae2fce3481` has `external`. The faucet taxonomy is exhaustive, so an absent `faucetKind` is a misconfiguration rather than a sixth kind. This is live evidence that promoted-column `slug` uniqueness is unenforced for ordinary pages, not only for page-type rows.

# Evidence

Measured live rather than read off code. `bun ops page list --type persona --properties title,faucetKind,slug --all --json` returns 42 rows. Two of them:

    019fc227-fe66-77e4-856c-17a7b3b7e1b0  title 'Selah'  slug 'selah'  faucetKind None
    019f0da7-0f73-712e-99fc-d1ae2fce3481  title 'Selah'  slug 'selah'  faucetKind 'external'

`--all` without `--include-deleted`, so both are live rows.

Why nothing stopped it. `_compose_unique_key` composes the `pages.unique_key` column from `p_attributes` alone, returning NULL when any unique-flagged component is absent from that bag. `_pages_split_properties.sql` lines 27-29 route `slug` into the promoted-columns object and not into the attribute bag, under the comment "slug is single-sourced to the promoted column (no attribute mirror)". So for any page-type whose unique-flagged property is `slug`, `unique_key` composes to NULL, and `pages_unique_key_uniq_idx` is partial on `unique_key IS NOT NULL` (tables/pages.sql:198) — the row falls outside the index. `pages_page_type_slug_slug_idx` (line 114) is a plain btree and constrains nothing.

This widens `pages/finding/pages-system/page-type-slug-unconstrained.finding.md`, which recorded the same mechanism against the page-type tier alone. The mechanism is general to every page type that flags `slug` unique, and the Selah pair is a live instance on an ordinary type.

One other row carries no `faucetKind`: `019f5183-6045-7bb8-b382-8f77fdf4e1b3`, title 'Alan', slug 'alan'. Whether Alan's own row is meant to declare a faucet kind is not something I can settle from here, so it is recorded rather than claimed as a fault.
