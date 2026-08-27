---
id: 58627a64-e144-59a4-8ccd-11fb80f5f0f3
slug: boundary-test-not-typechecked
page-type-slug: finding
title: "Boundary test not typechecked"
domain-slug: domain/metric
---

# Claim

`packages/shared/metrics/access/tsconfig.json` excludes `**/*.test.ts` from typecheck, so the `*.database.test.ts` file that `metrics-access-boundary.md` mandates for every new `MetricName` is never typechecked by `bun run typecheck`, and `bun test` cannot catch it either because `metric_name` is free text in the database — the mandated verification rung cannot actually fail on an unregistered `MetricName`.

# Evidence

Found during #15915 (domain-expiry watch), unrelated to that change.

Observed concretely on #15915: adding a case for a not-yet-registered `MetricName` gave 10 pass / 0 fail and a green typecheck. The TS2322/TS2353 errors only appeared under an out-of-band `tsc` run. So the mandated rung gives runtime insert coverage but no CI rung observes the type coupling it exists to enforce.

Not fixed inline: enabling test typechecking there is a real project, not a small fix. `pg/count.database.test.ts` and `pg/delete.database.test.ts` deliberately insert an "unrelated" control row that only compiles because the exclusion exists, so flipping the exclusion reds them and needs a deliberate decision about how those controls are expressed.

Class: a mandated verification rung that cannot actually fail is a silent no-op — the same shape as the promtool fire-path self-proof #15915 added to guard against.

Project #16355, status someday_maybe, domain metric. Carried no objective; captured off the project's retired `notes` attribute on 2026-08-15.
