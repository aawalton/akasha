---
id: 331b0b6f-5106-5147-a356-5bae024d485f
slug: gin-paren-claim-overreaches
page-type-slug: finding
title: "Gin paren claim overreaches"
domain-slug: domain/global
---

# Claim

The GIN matcher's header states that parenthesising the extraction changes nothing, and two parenthesised spellings walk straight past it: a doubly-wrapped extraction, `((attributes->>'K')) = $1`, and a cast on the wrapper, `(attributes->>'K')::text = $1`. Neither is in the header's `WHAT DELIBERATELY DOES NOT MATCH` list nor in its `predicate-derivation: open-sample` declaration, so the gate certifies both spellings while reaching neither.

# Evidence

Found while verifying #18348, which widened this gate to reach `NOT IN`, `<> ALL` and the `NOT (…)` wrapper. Those three land: planted into `packages/shared/pages/access/src/pg/`, `check-pages-gin-friendly-sql` reports each, and it also reports a single-paren `(attributes->>'status') = $1`, a spaced `( attributes->>'status' ) = $1`, an extraction split across a newline before its `=`, and a `lower(attributes->>'status') = $1`.

Two planted lines in the same file were silent, on a gate that otherwise exits 0 over 147 of 147 source files:

  `SELECT id FROM pages WHERE ((attributes->>'status')) = $1`
  `SELECT id FROM pages WHERE (attributes->>'status')::text = $1`

Both defeat `pages_active_page_type_slug_attributes_gin_idx` exactly as the flagged single-paren form does, so the cost argument in the header reaches them.

The header at `packages/infra/checks/src/lib/ts-pg-gin-friendly-queries.ts` declares one blind spot by name — at most one dotted qualifier, with the six live sites that occupy it — and declares five more shapes as outside the sample. These two are in neither, and the header instead makes a total claim over parenthesising, so a green run reads as covering them.

Neither spelling stands in the tree today, so nothing is red and no repair is owed at a call site: what is owed is either the two spellings read, or the header's parenthesising claim narrowed to the one nesting level the regexes carry.
