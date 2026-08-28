---
page-type-slug: finding
title: "carried rows blow the stack where they are spread"
domain-slug: domain/page-queries-system
---

# Claim

Asking a page query for `log-line` throws `RangeError: Maximum call stack size exceeded` at `tools/lib/page-derive.ts:181`, on a deriver that has been asked for nothing else. That line reads `pages.push(...rowsPagesFor(parent, declaration))`, and the spread hands `push` one argument per carried row. `log-line` carries 3,630,473 of them, which is past what an argument list holds. It is not recursion: the trace carries a single `pagesOf` frame, called straight from `rows`. Any caller that asks broadly meets it, and a domain tree or an index rebuild asks broadly.

# Evidence

Reproduced on 2026-08-28, node v22.20.0, against akasha at commit `38ac197f9`. The whole reproduction is two lines — `const d = deriver(resolveRoots())` and then `d.rows("log-line")` — with nothing asked before it.

Measured twice. With node's default stack it throws `RangeError: Maximum call stack size exceeded`, and the trace is `at pagesOf (tools/lib/page-derive.ts:181:57)`, then `at Object.rows (tools/lib/page-derive.ts:318:12)`, then the caller: one `pagesOf` frame, no recursion, and column 57 is `push`. With `--stack-size=60000 --max-old-space-size=7000` the same call completes, answering 3,630,473 rows in 10.5 seconds at 3.2 GB of heap. A second run that asked `log-day` first answered 3,629,264 rows in 10.8 seconds at 3.4 GB; the two differ because the sidecars are uncommitted and were written between the runs.

Where those rows come from: `pages/page-property-definition/log-day-lines.page-property-definition.md:5-9` declares `defined-on-slug: page-type/log-day`, `target-slug: log-line` and `rows: jsonl`, so `pagesOf("log-line")` walks `beneath("log-day")`. That reaches `seat-log-day`, which `pages/page-type/seat-log-day.page-type.md:5` files as `extends-slug: log-day`, and the lines stand in 249 `.lines.*.uncommitted.jsonl` sidecars under `pages/seat-log-day/`, the largest holding 32,145 lines. `log-day` itself answers 0 rows, no file being named `*.log-day.md`.

The seat that reported this read it as unbounded recursion through `rowsPagesFor`, met by asking all 360 backed page types in one held deriver. Both halves are narrower than that. One page type on a fresh deriver reproduces it, so the breadth of the ask is not what triggers it; and the trace shows no recursion, so the depth of the walk is not what exhausts the stack — the length of one argument list is. The report's second measurement, `--stack-size=4000` running to a 4 GB heap and dying, agrees with what I measured: a larger stack lets the spread through, and one page type's rows are 3.2 GB before the other 370 are added to the same `loaded` map.

This stands independent of the change landed at `38ac197f9`, which made eleven page types reachable through a page query. Those eleven extend `page` or `domain`; none is beneath `log-day`, and none adds a row to `log-line`.

Not measured: whether any page type other than `log-line` carries a row set long enough to reach the argument limit, and where that limit falls. I did not look for a fix and none is proposed here.
