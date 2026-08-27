---
id: 01a02000-c71b-7004-b503-7563c7a61878
slug: a-map-can-never-satisfy-its-declared-type-on-a-row
page-type-slug: finding
title: "A map can never satisfy its declared type on a row"
domain-slug: domain/pages-system
---

# Claim

A value declared `map(...)` cannot satisfy its declared type on a sidecar row under either carrier in use. The reader stringifies a map; the gate is handed raw JSON, where nested numbers fail `text`. On `inference-run.service-versions`, 6,992 of 6,992 refuse through the reader's carry and 6,973 of 6,992 against raw JSON. The stringify is deliberate and tested, so this is not a one-line repair.

# Evidence

Measured 2026-08-20 over all 6,992 `inference-run` rows — the only map-typed property with a row population. 9 properties declare `map(...)`; the other 8 are on markdown page types.

`carried()` at `tools/lib/page-carry.ts:18` returns the JSON text of a plain object, and `valuesOfLine` at `tools/lib/page-data-rows.ts:31` applies it to every row value. `mapRule` at `tools/lib/page-value.ts:134` refuses a string outright. Through the live `answer()` path the value reads back as a string, n=6992.

The gate does not use `carried()`: `tools/gates/page-holds-properties.ts:98` hands `judgeRow` the raw parsed JSON. Against raw values the refusals fall only to 6,973, because nested integers are numbers and the `text` rule refuses a non-string. Nested value kinds across all 6,992 maps: 17,351 strings and 3,206 integers, with no nulls, arrays or nested maps.

A shape-preserving carrier that also stringifies nested scalars passes 6,500; the remaining 492 are empty maps, which `mapRule` refuses as "an empty map".

The stringify is not an oversight. Commit 97fbf9503 established it, and `tools/tests/page-carry.test.ts:99-107` asserts that a frontmatter map and a row map carry identically. Changing `carried()` reverses that decision and breaks four assertions. No reader reads `service-versions` back off a row.
