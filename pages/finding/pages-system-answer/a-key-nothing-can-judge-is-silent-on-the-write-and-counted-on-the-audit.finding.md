---
id: 19c66d11-dd0f-521a-b91e-2c067aab4be8
page-type-slug: finding
title: "A key nothing can judge is silent on the write and counted on the audit"
slug: a-key-nothing-can-judge-is-silent-on-the-write-and-counted-on-the-audit
domain-slug: domain/pages-system-answer
---

# Claim

`judgeFrontmatter` answers in three channels — `refusals`, `why` and `unjudged` — and its two consumers disagree about the third. The write gate returns `refusals` and `why` and discards `unjudged`, so a property whose type nothing states produces no line at all on a write. An advisory audit does read it, and prints a bare count naming none of the keys. One verdict object serves both, so the same fault is invisible where the page lands and visible only on a run nobody has to make.

# Evidence

Measured 2026-08-28 by a delegate of seat astra.

The gate: `outsideProperties` at `checks-system/check/page-holds-to-its-type/page-holds-to-its-type.check.code.attachment.ts:36-37` returns `verdict.why === null ? verdict.refusals : [verdict.why]`. `unjudged` is declared at `page/property/judge.ts:15` and filled at `:145`, `:157` and `:161`; the gate never reads it.

The audit: `tools/audits/pages-hold-properties.ts:75` reads `verdict.unjudged` into a list of its own, and `:86` renders that list as a count and nothing else. The list never reaches the report — `:90-91` hands `unjudgeable` and `refusals` to `first()` and not `unjudged` — so the keys are counted and never named. `rg '\.unjudged'` over the tree returns `judge.ts` itself, that one audit line, and ten test assertions. No other consumer.

Run today, `bun tools/run-checks.ts pages-hold-properties` answers:

    [pages-hold-properties (akasha)] advisory [over 59217 claimed page(s)] 59216 of 59216 hold the properties their page type declares, 0 outside them, against 393 page type(s) declare a property set; 1 claimed but not judged; 369 key(s) nothing states a type for

369 stands after `json` bound `oneLineOfJson` at `page/property/value.ts:188` and `relation-name` bound a rule at `:199`, which landed at 9c56bde62d on 2026-08-27. `RULES` at `:178-222` holds 20 keys against 51 files under `pages/page-property-type/`.

`pages/finding/pages-system/property-types-open-but-rules-closed.finding.md` records the state before this, in which the unjudged set was printed as `not judged` on the gate's own PASS line. `pages/finding/checks-system/unjudged-keys-land-like-passes.finding.md` holds the gate half and is another seat's. Answer Or Refuse at `pages/domain/pages-system.domain.md:36-42` binds it: a true empty and a failure read alike.

NOT MEASURED: when the gate stopped reporting it. `git log -S unjudged` over that attachment returns nothing, and the file was renamed into place at `ffea6efacf`, so the history does not settle it cheaply.
