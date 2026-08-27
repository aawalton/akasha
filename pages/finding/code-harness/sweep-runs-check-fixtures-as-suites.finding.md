---
id: f0824181-174e-5654-b37e-7507ab26fec8
slug: sweep-runs-check-fixtures-as-suites
page-type-slug: finding
title: "Sweep runs check fixtures as suites"
domain-slug: domain/global
---

# Claim

The nightly slow-suite sweep counts and runs 5 check fixtures as slow suites. They assert nothing, so its denominator overstates the coverage it provides, and two of them install process-global module stubs into the runner they share with real suites.

# Evidence

`selectAllSlowSuites` builds the sweep's population from `git ls-files` and keeps
anything whose path ends in a slow suffix. It has no notion of a workspace, so five
files under `packages/infra/checks/__fixtures__/mock-module-leak/` qualify. Measured on
branch `project-18958` at `ef0d0caa39`: the sweep's run-set is 618 and all five stand
inside it — `pkg-barespec/src/consumer.database.test.ts`,
`pkg-climocker/src/stub.cli.test.ts`, `pkg-dbconsumer/src/consumer.database.test.ts`,
`pkg-dbmocker/src/stub.database.test.ts`, `pkg-rebind/src/uses-helpers.database.test.ts`.

They are inputs to `check-mock-module-surface`, not suites. Run directly they report
`0 pass, 0 fail, Ran 0 tests across 2 files` and exit 0, so nothing goes red and nothing
says the sweep proved less than its count implies.

The second half is worse than the miscount. `pkg-climocker/src/stub.cli.test.ts` and
`pkg-dbmocker/src/stub.database.test.ts` each call `await mock.module("./service", ...)`
at module scope with no test around it. `mock.module` is process-global in bun, which is
the whole reason `check-mock-module-surface` exists — and the sweep runs these files in
a `bun test` process shared with real suites, which is the condition the check is written
to catch. Whether a stub of a fixture-local `./service` reaches anything real is not
measured here; that it is installed at all is.

The import graph does not see these files — they sit under no declared workspace, so the
universal graph skips them and the reachability instrument added by #18958 excludes them
from its 614. The sweep's 618 and the graph's 614 differ by exactly this set, and neither
number is wrong about its own population; nothing reconciles them.

#18958 measured this and left it standing: that project's criteria required the sweep's
population unchanged either side of its change, so narrowing it there would have failed
the criterion it was verifying against.
