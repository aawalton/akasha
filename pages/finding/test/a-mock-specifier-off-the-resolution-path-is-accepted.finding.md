---
page-type-slug: finding
title: "A mock specifier off the resolution path is accepted"
domain-slug: test
---

# Claim

`mock.module` accepts a specifier that is not on the resolution path of the code under
test. The call runs, returns, and reports nothing. The factory is registered against a
module the code never loads, so every assertion written beneath the call exercises the
real module. Nothing at the call site distinguishes this from a mock that took.

Thirteen call sites across five test files stand dead this way, by two mechanisms.

**The specifier resolves to nothing.** Ten calls name a module `Bun.resolveSync` cannot
find from the test file's own directory.

Eight carry a path from a directory layout that no longer exists — `shared/pages/ui/src/`
and `shared/errors/client/src/`, since renamed to `shared/pages-ui/src/` and
`shared/errors-client/src/`. The code under test imports the new names; the mocks still
name the old ones.

- `alanwalton/web/app-capacitor/routes/home.component.test.tsx:24, :33, :39`
- `alanwalton/web/app-capacitor/routes/page-detail.component.test.tsx:8, :15, :48, :60`
- `alanwalton/web/app/questions/question-detail.component.test.tsx:27`

Two name a package bare where that package declares no `"."` in its `exports` — only
`"./*"`, which matches subpaths and not the package itself. There is no barrel module for
the mock to key on, and the route imports a subpath.

- `smilingjenny/web/app/routes/api.safety-level.unit.test.ts:60` — `@shared/status-bar-access`,
  where `api.safety-level.ts:2` imports `@shared/status-bar-access/stoplights`
- `smilingjenny/web/app/routes/api.categorization.unit.test.ts:11` — `@shared/monarch-categorization-access`,
  where `api.categorization.ts:2` imports `@shared/monarch-categorization-access/ring-relay`

The `"."` export is the whole difference. `@shared/pages-access` and `@shared/pages-query`
declare one, and the barrel mocks of those under `temper/scripts/src/watcher/` resolve.

**The specifier resolves, but the code under test never reaches it.** Three calls mock a
module absent from the route's transitive import set.

- `smilingjenny/web/app/routes/api.surplus.unit.test.ts:29` mocks `@shared/supabase-server`.
  `api.surplus.ts` does not import it at any depth.
- `smilingjenny/web/app/routes/api.surplus.unit.test.ts:15` and
  `smilingjenny/web/app/routes/api.safety-level.unit.test.ts:46` mock
  `@shared/recurrence/reset-times` to pin `getEsoDayStr`. Both routes take `getEsoDayStr`
  from `day/day.ts`, which imports nothing at all. `ESO_DAY = "1999-12-31"` is never
  pinned and the routes read the real clock.

What a dead call costs here is mostly a red test rather than a green one. Twenty-seven
tests across the five files fail, each because the real module answered where a stub was
meant to. A dead mock is not a quiet mock; it is a test that fails for a reason its own
text does not name.

One assertion passes vacuously. `api.surplus.unit.test.ts:89` asserts
`expect(clientsBuilt).toBe(0)` under the name "reads nothing at all for a caller it
refuses". `clientsBuilt` is incremented only by the dead `@shared/supabase-server`
factory, so the count is zero for a caller the route admits exactly as readily as for one
it refuses. That test would pass with its gate removed.

`pages/finding/test/a-mock-module-factory-must-answer-the-whole-module.finding.md` closes by
naming this half and saying it was not run: "the mock is registered under the specifier the
subject imports, while the real module the factory spreads is reached by whatever resolves
from the mocking file. I did not run that half." It is run here. The two halves are one
fact: registration is keyed on the specifier as written, and nothing checks that key
against what the subject loads.

The guard that would name these cannot run. `check-mock-module-surface` is registered as a
cluster check at `pages/cluster-check/cluster-check-mock-module-surface.cluster-check.md`,
but its graph backend is a stub: running it exits 2 with "`readAt` asked the old graph,
which is gone." Its subject is also narrower than this — it judges whether a factory's keys
cover the mocked module's export surface, and at
`infra/cluster-checks/src/checks/check-mock-module-surface.ts:104` it skips any call whose
target is not a repository file, which is the shape every dead call above takes.

# Evidence

Read and run on 2026-08-27 against the akasha working tree at
`/var/home/walton/repos/akasha`, with Bun 1.3.14.

**That the specifier resolves to nothing.** One call settles each site, run from the test
file's own directory:

```
cd smilingjenny/web/app/routes
bun -e 'console.log(Bun.resolveSync("@shared/status-bar-access", process.cwd()))'
```

exits 1 with `Cannot find module '@shared/status-bar-access'`. The same call for
`@shared/monarch-categorization-access` exits 1; for `@shared/supabase-server`,
`@shared/recurrence/reset-times`, `@shared/status-bar-access/stoplights` and
`@shared/monarch-categorization-access/ring-relay` it exits 0 and prints a path. The
finding is false for a given site as soon as that call exits 0.

**That the package declares no barrel.** `shared/status-bar-access/package.json` and
`shared/monarch-categorization-access/package.json` both carry `"exports": { "./*":
"./src/*.ts" }` and no `"."`. `shared/pages-access/package.json` and
`shared/supabase-server/package.json` do carry a `"."`. I checked every package under
`shared/`: 20 of 50 declare a `"."`.

**That `mock.module` does not refuse an unresolvable specifier.** A one-test file calling
`mock.module("@shared/status-bar-access", () => ({}))` inside a `try` and asserting nothing
was thrown passes. Bun neither throws nor writes a warning.

**That the code under test never reaches the mocked module.** I walked the transitive
import set from each route by resolving every static and dynamic specifier with
`Bun.resolveSync`, stopping at `node_modules`. `api.surplus.ts` and `api.safety-level.ts`
each reach 113 files; `shared/supabase-server/` and `shared/recurrence/src/reset-times.ts`
are in neither set, while `day/day.ts` and `shared/status-bar-access/src/stoplights.ts` are
in both. `day/day.ts` contains zero `from "` clauses.

**That the tests fail.** Run one file at a time:

- `bun test app-capacitor/routes/home.component.test.tsx` from `alanwalton/web` — 5 pass, 4 fail
- `bun test app-capacitor/routes/page-detail.component.test.tsx` — 0 pass, 5 fail
- `bun test app/questions/question-detail.component.test.tsx` — 0 pass, 11 fail
- `bun test app/routes/api.safety-level.unit.test.ts` from `smilingjenny/web` — 5 pass, 5 fail
- `bun test app/routes/api.categorization.unit.test.ts` — 9 pass, 2 fail
- `bun test app/routes/api.surplus.unit.test.ts` — 5 pass, 0 fail

**That the clock is not pinned.** The `api.safety-level` failures print the URL the route
built: `/q/safety-level-on-day?date=2026-08-27`. That is the real day this ran, not the
`1999-12-31` the `reset-times` factory sets. This does not depend on the request
succeeding — the day is chosen before the fetch.

**The census.** Across the repo, `grep -rl --include=*.test.ts --include=*.test.tsx
"mock\.module("` finds 80 files holding 178 `mock.module` call sites. 20 of those name the
module through a template literal or a constant rather than a plain string, and I did not
judge them. Of the remaining 158, twelve resolve to nothing — the ten named in the claim,
plus two inside the fixture string at
`infra/cluster-checks/src/checks/check-mock-module-leak.unit.test.ts:34,:54`, which are
source text a check builds on disk and not calls, and which I therefore excluded.

**What I did not measure.**

- I did not check the 20 non-literal specifiers. Any of them may be dead the same way.
- I did not test mechanism two — a specifier that resolves but is unreachable — across the
  repo. I walked only the three smilingjenny routes. The other 155 literal call sites may
  hold more of it; a repo-wide walk is the work that would say.
- I did not prove that each of the 27 failures is caused solely by its dead mock. I
  established that the mock is dead and that the code under test imports the real module;
  for the three `alanwalton` component files I read the failures as consistent with that
  and did not isolate them further.
- The two `smilingjenny` route files reach the network when their mocks fall through —
  `page-query-service` in-cluster and `alanwalton.com`. This workstation reached neither,
  so those pass/fail counts are this machine's. The resolution refusals, the import-set
  walk and the `2026-08-27` in the URL do not depend on the network and hold anywhere.
- I did not establish what edge the graph would draw for an unresolvable-but-literal
  specifier, because `tools/lib/graph/producers/file/ts-file/parse-mock-module.ts` is a
  stub that refuses when used. That the `continue` at
  `check-mock-module-surface.ts:104` would skip a non-repository target is read from the
  source, not observed.
- I did not check whether these five test files are reached by the change-aware suite, so I
  cannot say whether any check currently runs them.
