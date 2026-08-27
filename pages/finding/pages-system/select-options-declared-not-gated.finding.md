---
id: 7245289e-014c-5141-8bb2-9926c21fb198
slug: select-options-declared-not-gated
page-type-slug: finding
title: "Select options declared not gated"
domain-slug: domain/pages-system
---

# Claim

A `select` property-definition's option list is a declaration, not a write gate. The only enforcement at the database write boundary is a per-page-type `valueIn` coherence rule, and live carries 2 of those against 168 select-typed property-definitions. The one guard that does read an option list, `ensureSelectOptionsValid`, is scoped to the CLI verbs, so every non-CLI writer lands an out-of-options value that reads back as legal.

# Evidence

Measured on live 2026-08-07, on the substrate the values actually sit on. Coherence rules are page-type row data rather than source, so a code search answers the wrong question here.

Counting `valueIn` rules over `jsonb_array_elements(attributes->'coherenceRules')` on live `page-type` rows returns **2**, both on `persona`. Counting live `property-definition` rows with `attributes->>'type'='select'` returns **168**. So 166 select properties have no write-boundary enforcement of their own option list.

THE CLI GUARD IS NOT THE BOUNDARY. `packages/shared/pages/cli/src/lib/ensure-select-options-valid.ts` does reject an out-of-options single-select write, and its own docstring scopes it: "The `bun ops` page-write verbs are the surface through which agents store arbitrary property values." It sits in the CLI layer. A browser RPC caller reaching `page_create` or `page_patch*` directly, a worker calling `@shared/pages-access`, and `pages_bulk_upsert` all go around it.

WHY THE DECLARATION READS AS A GATE. An option list on a property-definition is the same artifact whether or not a `valueIn` rule exists beside it, and the CLI refuses out-of-options writes, so the surface an agent tests by is the one surface that enforces. The 166 without a rule fail open and silently.

CORRECTING WHAT I INGESTED. The quarantined entry this comes from said three `valueIn` rules stood, naming `persona.faucetKind`, `persona.faucetAggregate` and a `persona.role` rule added by #16485. Live holds two; the third is gone. The entry also cited a `schema-validation.md` as naming browser RPC callers as the reason value gates must be plpgsql — no file of that name exists in `~/code` or in the quarantined head documents under `~/instructions/dirty/code/`.

Searched `~/memory/findings/` first: `rg -l -i "ensureSelectOptionsValid|select.*option|valueIn" findings/` returns ten documents and none carries this. The nearest in class is `pages-system/required-columns-guard-skips-most-writers.md`, which is a different guard.
