---
id: 01a0200f-54c2-7000-8dd1-cf05d638f3b4
slug: a-row-type-check-is-too-costly-as-a-per-request-fault
page-type-slug: finding
title: "A row type check is too costly as a per request fault"
domain-slug: domain/pages-system
---

# Claim

Reporting a row's declared-type mismatch as a fault beside the answer was measured on 2026-08-20 to add 490ms to a 177ms warm query on `temper-mined-item`, nearly tripling the largest query on the corpus. The premise has since gone: there is no row type check to place anywhere, because `judgeRow` evaluates no value rule on any path. What is costed here is building one, not moving one. The place to report a fault does still stand.

# Evidence

The premise, checked 2026-08-28. `judgeRow` at `page/property/judge.ts:184-207` evaluates no type rule: it tests an undeclared key at `:193-196` and a required key dropped from a standing row at `:197-205`, and calls no `rule.holds`. It takes neither a vocabulary nor an arming, so it cannot arm a rule; `armFor`, the only way into the rule machinery, has two callers and both are inside `judgeFrontmatter`. The check at `checks-system/check/page-holds-to-its-type/rows.ts:101` and the write path at `tools/lib/page-rows-write.ts:148`, `:218` and `:306` all call that one `judgeRow`. The check also dedupes by key shape at `rows.ts:98-99`, so it reads one row per distinct key set.

The reporting place stands. `answer()` in `tools/lib/page-query.ts` carries `faults: [...derive.faults(), ...reducedFault(query, typeOf)]` at `:257`, inside the `beside` block at `:255-260`.

The timings below were taken 2026-08-20 against `answer()` and have not been re-taken. `tools/lib/page-data-rows.ts`, which held the parsed-rows cache the proposed remedy rests on, no longer exists.

| page type | rows | warm answer | key checks | rule evaluation |
|---|---|---|---|---|
| `class-reference` | 107,457 | 129ms | 851,268 | 71ms |
| `temper-mined-item` | 155,440 | 177ms | 6,061,777 | 490ms |
| `inference-run` | 6,992 | 33ms | 142,590 | 15ms |

The remedy — a fault set computed once per body change beside the cached sidecar parse — meets a constraint it predates. `rowsIn` at `pages-system/store/rows.ts:116` and `rowPagesIn` at `store/row-pages.ts:112` are deliberately lazy and give a fresh walk on each iteration, because materialising `log-line` cost 6,924 MB. Any such cache must not make those eager.

Standing scale as read on 2026-08-20: 255,306 of 352,945 rows, 72.3%. The row corpus is now about 4.5M, so that fraction is not today's.