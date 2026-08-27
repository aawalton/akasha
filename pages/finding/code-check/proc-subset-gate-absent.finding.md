---
id: 6f7d8ef1-0510-5202-85d8-9f84477c795c
page-type-slug: finding
title: "Proc subset gate absent"
domain-slug: domain/global
---

# Claim

The TypeScript subset that plpgsql procedures must be authored in is enforced by nothing: the CI gate named for it does not exist, and `findForbidden` has no caller outside its own tests.

# Evidence

`packages/shared/proc-compiler/src/forbidden.ts` implements `findForbidden`, a syntactic checker that walks a proc source's AST and emits one finding per construct outside the lowering subset. Its header at line 7 reads "Same module is imported by the CI gate (`check-proc-subset`) and by each per-domain compiler entry point, so compile-path and check-path agree by construction."

Neither half is true.

There is no `check-proc-subset`. Nothing matching that name exists under `packages/infra/checks/src/checks/`, and a repo-wide search returns exactly one hit — the comment above, asserting its own consumer. `domains/lists/unresolved-checks.md` carries `check-no-raw-plpgsql` and `check-sargable-pages-predicates` and does not carry this name. (`check-forbidden-reachability` is unrelated: `architecture.config.json#forbiddenReachability` glob pairs over the package dependency graph.)

No compiler entry point calls it either. `packages/shared/pages/proc-compiler/src/index.ts:2-5` states it outright: "`findForbidden`, `CompileOptions`, and `CompileResult` are wired but not re-exported here yet — no consumer outside this package's tests references them … Add to this barrel when an external caller (a deploy-time gate, another package's CLI, etc.) lands." Neither `compile.ts` nor `bin/compile.ts` in that package mentions `findForbidden`.

So a forbidden construct in a proc source is caught by no gate. What happens instead is that the proc fails to lower, and that failure is swallowed too: `packages/shared/supabase/migrations/cli/src/lib/checks/no-raw-proc-mutation-io.ts:164-171` catches the compile error, writes "failed to compile … skipping byte-comparison" to stderr and returns null, and lines 199-201 skip the entry — so the proc also drops out of the byte-equality gate, which still exits 0.

Found while ingesting `dirty/docs/ts-to-plpgsql.md`, whose Enforcement section listed `check-proc-subset` as one of four hard gates backing the policy.
