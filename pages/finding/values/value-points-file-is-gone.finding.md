---
id: 1db92b92-efb3-5c91-bd45-15a5c7b9a344
slug: value-points-file-is-gone
page-type-slug: finding
title: "Value points file is gone"
domain-slug: readout-group/values
---

# Claim

This group's `code-path` named `packages/alanwalton/daily-tracking/src/value-points.ts` until commit `9fdfdefa1`, and no such file stands in the code repository. The directory it sat in appears to have gone with it.

# Evidence

Measured on 2026-08-23. The value was removed by commit `9fdfdefa1` and is not carried into any property.

`packages/alanwalton/daily-tracking/src/value-points.ts` is absent from the code repository. It is not alone: the `code-paths-resolve` check reports a run of references into `packages/alanwalton/daily-tracking/src/` that all resolve to nothing, among them `session-points-totals.ts`, `sleep-points.ts`, `sleep-title-words.ts`, `stoplight-mean-points.ts`, `strength-points.ts` and `title-word-match.ts`, named from `tools/lib/daily-tracking/run-commit-points.ts`, `tools/lib/daily-tracking/sleep-minutes.ts`, `tools/lib/daily-tracking/points-source-engine.ts` and `tools/lib/tracking-pillars.ts`.

That whole directory reads as moved or deleted, with the references left behind. Nothing here settles where the code went or whether the group still needs it named.
