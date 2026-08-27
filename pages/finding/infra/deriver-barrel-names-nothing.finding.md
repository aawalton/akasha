---
id: 6154784f-bc79-55f7-b178-21a6b32897dd
page-type-slug: finding
title: "Deriver barrel names nothing"
domain-slug: domain/global
---

# Claim

The `check-deriver-barrel` command names two files that stand nowhere in the code repository, so it fails only when somebody runs it.

# Evidence

`bun tools/run-checks.ts` on 2026-08-14 returned `code-paths-resolve` fail: 1107 paths named into the code repository, 2 standing nowhere. Both are named by `tools/commands/check-deriver-barrel.ts` — `packages/infra/checks/src/lib/generate-deriver-barrel.ts` and `packages/infra/checks/src/derivers.generated.ts`.

Neither name matches anything under `packages/` in /home/walton/code. `packages/infra/checks/src/` holds `enrichers.generated.ts` and `producers.generated.ts` and no derivers counterpart, which suggests derivers were split into those two rather than moved. Whether the command should follow the split or go entirely is not settled here.

This is the only failing check in the suite; every other verdict is pass, advisory or not-applicable.
