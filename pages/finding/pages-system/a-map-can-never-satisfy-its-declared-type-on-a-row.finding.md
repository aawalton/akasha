---
id: 01a02000-c71b-7004-b503-7563c7a61878
slug: a-map-can-never-satisfy-its-declared-type-on-a-row
page-type-slug: finding
title: "A map can never satisfy its declared type on a row"
domain-slug: domain/pages-system
---

# Claim

A value declared `map(...)` cannot satisfy its declared type on a sidecar row through the carrier that judges one. The reader stringifies a map, and `mapRule` refuses a string. The second carrier this page once described — a gate handed raw JSON, where nested numbers fail `text` — is struck: no gate type-checks a row. On `inference-run.service-versions`, 6,992 of 6,992 refuse through the reader's carry; the raw-JSON count this once stated is withdrawn in the evidence below. The stringify is deliberate and tested, so this is not a one-line repair.

# Evidence

Measured 2026-08-20 over all 6,992 `inference-run` rows — the only map-typed property with a row population. 9 properties declare `map(...)`; the other 8 are on markdown page types.

`carried()` at `tools/lib/page-carry.ts:18` returns the JSON text of a plain object, and `valuesOfLine` at `tools/lib/page-data-rows.ts:31` applies it to every row value. `mapRule` at `tools/lib/page-value.ts:134` refuses a string outright. Through the live `answer()` path the value reads back as a string, n=6992.

This paragraph read that the gate does not use `carried()` but hands `judgeRow` the raw parsed JSON, and that against raw values the refusals fall because nested integers are numbers. Mechanism struck 2026-08-28: `judgeRow` at `page/property/judge.ts:184-207` evaluates no type rule at all. It tests two things — a key the page type does not declare, and a required key dropped from a standing row — and returns. There is no second carrier and never a raw-JSON judgement to fail. Nested value kinds across all 6,992 maps still stand as measured: 17,351 strings and 3,206 integers, with no nulls, arrays or nested maps.

WITHDRAWN RATHER THAN CORRECTED: the raw-JSON figure of 6,973. Re-measured 2026-08-28 over the same unchanged file it is 3,698, and nothing reconciles the two. What did reproduce exactly on that run is 6,992 of 6,992 through the carry, and 3,206 nested integers — so the corpus is identical and that one figure was never reproducible. `tools/gates/page-holds-properties.ts` and `tools/lib/page-value.ts` are both gone; `mapRule` now stands at `page/property/value.ts`, and `judgeRow` at `page/property/judge.ts:184-207` type-checks nothing at all, so neither number bites today.

A shape-preserving carrier that also stringifies nested scalars passes 6,500; the remaining 492 are empty maps, which `mapRule` refuses as "an empty map".

The stringify is not an oversight. Commit 97fbf9503 established it, and `tools/tests/page-carry.test.ts:99-107` asserts that a frontmatter map and a row map carry identically. Changing `carried()` reverses that decision and breaks four assertions. No reader reads `service-versions` back off a row.
