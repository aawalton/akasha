---
id: d885fed7-833a-5fd8-866e-312d5f8f8a48
slug: row-append-writes-beneath-the-landing-path
page-type-slug: finding
title: "A row append writes beneath the landing path"
domain-slug: domain/pages-system
---

# Claim

`rowAppender` at `tools/lib/page-rows-write.ts:281` writes rows with `appendFileSync` at `:319`, outside the `rowsLanded` path at `:241` every other row write takes. It is the only such path: nothing outside `page-rows-write.ts` and `page-rows-parts.ts` writes a rows file. Two of the three harms filed here are repaired — every row is judged, and a failed append refuses by name. The third, that no `by` is recorded, carries nothing. What remains is a duplicated part rollover.

# Evidence

Read 2026-08-28 against `tools/lib/page-rows-write.ts`, 429 lines.

Repaired at `c0513f2db`. The judging latch is gone: `append` at `:299-311` calls `judgeRow` on every value, with no flag in front of it. The `catch {}` is gone: `:321-328` sets `refused` to a message naming the page type, the path and the error, read back through `refused()` at `:330`. Tests at `tools/tests/page-rows-write.test.ts:305-321` hold both; that file passes 19 of 19.

`by` reaches one place from either path, `commitAll` at `:270`. `rowAppender` demands `home.appendOnly` at `:289`, and one property document in any repo declares `append-only: true` — `pages/page-property-definition/log-day-lines.page-property-definition.md`, declaring `uncommitted: true` above it. `rowsLanded` commits only where `!home.uncommitted`, at `:269`, so for the one home an appender opens, that path would not commit either and `by` would go nowhere. Attribution stands in the row instead: `log-line` declares `agent-id`, carried at `tools/lib/log-append.ts:17`.

What remains: `append` copies the rollover of `appendLines` at `tools/lib/page-rows-parts.ts:127-149`, holding `bytes` in a closure from one `lastPartOf` at `:294` where `appendLines` re-reads the directory per call.

It takes no `exclusively`, where `rowsLanded` takes one at `:258`. Not a fault: `appendFileSync` opens `O_APPEND`, so a line lands whole; the lock serves `landRows`, which rewrites parts. Racing appenders overrun the 8 MB ceiling and lose no row. No stale cache either: `readParsed` at `tools/lib/page-rows.ts:88-92` keys on size and mtime.

One caller: `tools/lib/log-append.ts:62`. Unmeasured: rows per appender run; the comment at `:303` claims a median of 3,209 uncited.

Fixed when `rowAppender` is gone, or shares the landing path's rollover. To see: `grep -n 'appendFileSync' tools/lib/page-rows-write.ts`.

Filed until 2026-08-28 as `raw-sql-upsert-bypasses-owner-guard`, against a Postgres layer since deleted. Its id is unchanged.