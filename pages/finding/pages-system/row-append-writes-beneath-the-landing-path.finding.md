---
id: d885fed7-833a-5fd8-866e-312d5f8f8a48
slug: row-append-writes-beneath-the-landing-path
page-type-slug: finding
title: "A row append writes beneath the landing path"
domain-slug: domain/pages-system
---

# Claim

`rowAppender` at `tools/lib/page-rows-write.ts:281` is a second way into a page's rows files, beneath the path every other row write takes. It writes with `appendFileSync` at `:319` and commits nothing, where `writeRow`, `patchRow`, `writeRows` and `patchRows` reach the same files through `rowsLanded`, which commits at `:270`. Three things follow at that address. Nothing records who appended: `rowAppender` takes no `by`, where `rowsWritten` at `:235` and `rowsLanded` at `:247` both do and hand it to `commitAll`. Only the first row of an appender's life is judged, because `judged` latches true at `:303` and the `judgeRow` call at `:305` sits behind it. And `catch {}` at `:321` swallows every failure, so an append that never reached disk is indistinguishable from one that did.

# Evidence

Read 2026-08-28 against `tools/lib/page-rows-write.ts`, 13,735 bytes.

The two paths into the same files, side by side. `writeRow` at `:328` returns `rowsWritten(roots, "write-row", pageType, parentName, [values], by, key)`; `rowsWritten` calls `rowsLanded`, which takes `exclusively` on the path, calls `landRows` or `landAppended`, refuses on `landed.refused`, and then commits at `:270` — `commitAll(at, relPaths, pageType, act, parentName, by)`. `rowAppender` at `:281` does none of that: it resolves the home, checks `home.appendOnly`, and hands back an object whose `append` writes the line itself.

The judging latch, verbatim from `:302-310`:

    if (!judged) {
      judged = true
      if (properties !== null) {
        const said = judgeRow(values, pageType, properties, null).refusals
        if (said.length > 0) {
          refused = said.join("\n")
          return
        }
      }
    }

So the second and every later `append` on one appender skips `judgeRow` entirely. The landing path has no such latch: `landRows` judges each row at `:148` and `landAppended` at `:218`, inside their loops.

No owner, actor or writer key appears anywhere in the file. `by` is the only attribution it carries and `rowAppender` is the one entry point without it.

One caller today: `tools/lib/log-append.ts:62`, `rowAppender(roots, "log-line", name, LINES_KEY)`.

Not measured: how many rows a single appender writes in one run, which is what decides whether the unjudged tail is a few rows or all of them.

It is fixed when `rowAppender` is gone, or takes a `by` and lands through `rowsLanded` like every other row write, and judges every row rather than the first. To see: `grep -n 'appendFileSync\|judged = true\|export function rowAppender' tools/lib/page-rows-write.ts`. A fixed state shows no `appendFileSync` reaching a rows file outside the landing path, and no latch in front of `judgeRow`.

This record stood until 2026-08-28 as `raw-sql-upsert-bypasses-owner-guard`, against a write path in a Postgres layer that has since been deleted. The layer went; the shape did not, and it is restated here at the address it now occupies. Its id is unchanged.
