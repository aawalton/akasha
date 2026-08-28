---
id: 4c5b41e3-e76a-525d-8bfe-0eb217f2bd38
page-type-slug: finding
title: "One query pays a directory scan once per holder page"
domain-slug: domain/page-storage
---

# Claim

A single `class-reference` query spends 4,435ms of its 4,870ms inside `rowsPartsOf`, which runs a `readdirSync` and compiles a fresh `RegExp` once per holder page. `class` has 4,209 holder pages, so one query pays that cost 4,209 times. It is neither the sidecar parse nor the deriver.

# Evidence

Measured 2026-08-28 by a delegate of seat astra. Seven runs per page type, medians, one page type per process.

`rowsPartsOf` at `page/rows-file.ts:92-113` does a `readdirSync` plus a freshly compiled `RegExp` matched against every directory entry, once per holder page.

Direct measurement: `{"holderType":"class","holders":4209,"rowsPartsOfMs":4435,"statMs":15}`. The whole warm answer for `class-reference`, 107,457 rows, is 4,870ms.

Two controls rule out the obvious causes. Restricting the query to `keys:["id"]` still costs 4,796ms, so it is not the deriver. A second walk on a fully warm deriver, with all 107,457 records cached, still costs 4,479ms, so it is not the sidecar parse.

Holder count is the whole variable. `temper-mined-item` holds 155,440 rows — more than `class-reference` — across one holder page, and answers warm in 155ms. A 31x difference over a larger corpus is the same function paid once rather than 4,209 times.

Related and separate: `HELD_RECORDS = 400_000` at `tools/lib/page-rows.ts:12`. `log-line` carries 4.11M rows against that bound, so every parse is evicted before reuse, and four successive walks cost 5.9, 5.6, 5.5 and 5.9s with no reuse at all. That defeats caching for the largest row page type only; 44 of the 45 are under the bound.
