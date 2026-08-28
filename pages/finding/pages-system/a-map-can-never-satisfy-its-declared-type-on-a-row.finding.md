---
id: 01a02000-c71b-7004-b503-7563c7a61878
slug: a-map-can-never-satisfy-its-declared-type-on-a-row
page-type-slug: finding
title: "A map can never satisfy its declared type on a row"
domain-slug: domain/pages-system
---

# Claim

A value declared `map(...)` cannot satisfy its declared type on a sidecar row through the carrier that reads one: `carried()` stringifies a map, and `mapRule` refuses a string. Nothing brings the two together, though — `judgeRow` evaluates no value rule, so no row is refused for this on any path. `inference-run.service-versions` is the only map-typed property with rows, and all 7,132 read back as strings. The stringify is deliberate and tested, so this is not a one-line repair.

# Evidence

Re-read 2026-08-28. `carried()` at `tools/lib/page-carry.ts:13-19` returns `jsonOf(value)` for a plain object, so a map reaches a row value as JSON text, and `valuesOfLine` at `tools/lib/page-rows.ts:24-35` applies it to every row value. `mapRule` at `page/property/value.ts:84-100` refuses a string outright at `:89`.

Nothing asks it. `judgeRow` at `page/property/judge.ts:184-207` evaluates no type rule at all: it tests an undeclared key and a required key dropped from a standing row, then returns. It takes neither a vocabulary nor an arming, so it cannot arm a rule. The check at `checks-system/check/page-holds-to-its-type/rows.ts:101` and the write path at `tools/lib/page-rows-write.ts:148`, `:218` and `:306` all call that one function. There is no second carrier, and never a raw-JSON judgement to fail.

Population, re-counted 2026-08-28. 11 property documents declare `map(...)` and exactly one is defined on a row page type, `inference-run.service-versions`; the 2026-08-20 reading said 9. Its sidecar stands in two parts — `pages/generation-log/alan.generation-log.runs.jsonl` holds 6,992 rows and `.part2.jsonl` a further 140, so 7,132 rather than 6,992. A measurer opening only the base file counts one part short, the hazard `page/rows-file.ts:58-71` names.

Nested value kinds across the 6,992 base rows: 17,351 strings and 3,206 integers, no nulls, arrays or nested maps. A shape-preserving carrier that also stringifies nested scalars passes 6,500; the remaining 492 are empty maps, which `mapRule` refuses as "an empty map".

The stringify is not an oversight. Commit 97fbf9503 established it and `tools/tests/page-carry.test.ts:99-107` asserts a frontmatter map and a row map carry identically, so changing `carried()` reverses that and breaks four assertions. Nothing reads `service-versions` back off a row; the only other mentions hold the value before it is written.

A raw-JSON figure of 6,973 once stated here was withdrawn as unreproducible; do not re-derive it.