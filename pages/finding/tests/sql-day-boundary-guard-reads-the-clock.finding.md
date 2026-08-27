---
id: 60fa4ed8-f1b8-5d01-a707-8da5ae63de74
slug: sql-day-boundary-guard-reads-the-clock
page-type-slug: finding
title: "SQL day boundary guard reads the clock"
domain-slug: domain/global
---

# Claim

The only test crossing the plpgsql ESO-day boundary against the TypeScript one compares two wall-clock reads, so it can catch a divergence between them only during the hours the two spellings would disagree.

If someone moved the boundary in `getEsoDayStr` and not in the plpgsql default, this test would pass on every CI run outside that window and fail on the ones inside it — reporting a real, permanent divergence as a flake.

# Evidence

Read 2026-08-07 off the `~/code` checkout.

`packages/shared/pages/proc/src/_apply_property_defaults.ts` resolves `{"$dynamic":"today"}` in plpgsql, lines 91–93:

```
WHEN extract(hour FROM (now() AT TIME ZONE 'America/New_York')) >= 6
  THEN (now() AT TIME ZONE 'America/New_York')::date
ELSE (now() AT TIME ZONE 'America/New_York')::date - 1
```

Its comment at line 31 says the boundary is "faithful to `getEsoDayStr`" — a claim kept by hand rather than by a call.

`packages/shared/pages/proc-compiler/src/default-value-page-create.equiv.database.test.ts:260` is the one place the two are compared:

```
expect(stored).toBe(getEsoDayStr(new Date()))
```

`stored` came from the plpgsql branch above, evaluated at the database's `now()`; the right-hand side reads the runner's wall clock. Both sides therefore ask "what day is it now" of their own implementation, and they agree whenever the two boundaries agree at the instant of the run. Move one boundary and they differ only for callers inside the window the move opened.

`packages/temper/shared/formula-framework/src/eso-date.crosscheck.unit.test.ts` is the drift guard for the other pair. It pins instants — both DST regimes and both transition boundaries — rather than reading a clock, and asserts the integer and `Date` forms agree to the second. Nothing of that kind exists for the plpgsql form.

`grep` for `getEsoDayStr` across `*.test.ts` finds no other test comparing a SQL-side day against it.

Found emptying `dirty/knowledge/logical-day-boundaries.md`, which recorded that the SQL side re-implements the boundary and did not reach how it is guarded.
