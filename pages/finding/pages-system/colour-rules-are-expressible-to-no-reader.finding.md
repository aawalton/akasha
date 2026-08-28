---
id: 099c6d04-2b1e-5148-985a-32458e2a7a68
slug: colour-rules-are-expressible-to-no-reader
page-type-slug: finding
title: "Colour rules are expressible to no reader, including through values"
domain-slug: domain/pages-system
---

# Claim

165 authored `colorRules` across 29 property definitions reach no file-backed reader. The `values:` map form admits a `color` per option, but `labelled()` (`shared/pages-access/src/file-property-defs.ts:59-65`) extracts only `label` and drops `color`, so even a property document stating colours would render none.

# Evidence

Measured 2026-08-20 over `DATABASE_ADHOC_URL`; re-checked 2026-08-28 at HEAD in akasha. What the 165 rules carried stands as `the-165-colour-rules-as-last-read`.

The `SelectOption` `labelled()` returns is declared `{ id, label }` at `:57`, so colour is absent from the type rather than read and discarded. The gap is wider than the claim: `definitionOf` at `:88-100` emits only `id`, `key`, `title`, `type`, `pageId` and `config.options`; the file-backed `PropertyDefinition` at `page-type-config.ts:9-25` carries no `colorRules` field at all; and the wire `DeclarationSchema` at `shared/pages-query/src/ask.ts:204-214` has nowhere to put one. A property document stating colours reaches no reader at any point on that path, not only at the extraction.

One consumer survives, not two. `alanwalton/web/app/idle/lib/idle-card-page-type.ts:111,190` holds a compiled-in copy, so idle cards keep their colours. `check-color-rule-variants` does not stand in this repository: there is no `infra/checks/` tree, and nothing under `infra/cluster-checks/` or `checks-system/` reads property definitions over `SUPABASE_URL`.

Across all 2,285 property documents — 2,228 under `pages/page-property-definition/` plus the 57 filed beside their own domains under `graph/` and `readouts/`, which a glob rooted at `pages/` does not see — none states `colorRules`, and none states a colour on an option; the four outside `pages/` carrying a `values:` map carry plain string lists.

`pages/page-property-definition/option-color.page-property-definition.md` declares `key: color` on `page-property-type/option`, so the colour a document may state is a live schema in this tree, while `labelled()` at `:61` reads its sibling `label` and nothing else. The one authored survivor of the colour-ladder pattern is `pages/page-property-definition/daily-tracking-stoplights.page-property-definition.md:8`, which emits coloured discs from an `expression:` rather than from rules.
