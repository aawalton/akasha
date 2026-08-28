---
id: 01a04808-8208-736b-ab96-1a0b176dacc4
slug: a-family-read-under-the-heads-declaration-answers-absent-everywhere
page-type-slug: finding
title: "A family read under the heads declaration answers absent everywhere"
domain-slug: domain/pages-system
---

# Claim

Reading a family of page types under the head's own declaration answers absent under every key a page type beneath it adds, and nothing refuses. Over the `domain` family, 52 pages state `enabled`; read under `domain`'s declaration 0 of them answer a value, and the query succeeds. A true empty and a failure read alike, so the caller is handed a successful query over ground it never covered.

# Evidence

Measured 2026-08-28 against akasha at HEAD, by running the store and query packages rather than by reading them.

`familyOf("domain")` is 48 page types over 4769 pages. `domain` declares `enabled` neither as a property nor as `beyond`. Five page types beneath it declare it: `flag`, `readout`, `persona`, `value`, `workstation-service`.

Each page read twice, once under its own page type's declaration and once under `domain`'s. Under its own: 52 pages hold a value — `workstation-service` 35, `readout` 11, `value` 6. Under the head's: 0. No refusal either way.

Counted a second way, off the files: `workstation-service` 35 of 35 state `enabled:`, `readout` 11 of 16, `value` 6 of 6, `persona` 0 of 41, `flag` 0 of 0. The same 52.

`persona` and `value` inherit the key rather than declare it, both extending `readout`, whose `readout-enabled` property definition stands in `readouts/readout/`. `automation-enabled` is defined on `automation`, which extends `page` rather than `domain`, so it falls outside this family — a count taken from property definitions alone reaches 35 and misses the `readout` subtree.

The mechanism is `pageAt` at `pages-system/store/store.ts:246-248`, which fills only the keys of the declaration it is handed, so a key that declaration lacks is never read; `narrowed` at `pages-system/query/keys.ts:143` then fills it absent. `pages-system/query/query.ts:327-330` already states this in prose, and names the correct pairing at `:324-325`.