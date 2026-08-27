---
id: 3bee2854-b256-5c99-985a-68ecc4083e69
slug: fixture-decls-unwakeable
page-type-slug: finding
title: "Fixture decls unwakeable"
domain-slug: domain/global
---

# Claim

A `.d.ts` under a `__fixtures__` directory in `packages/temper` is judged by `check-eso-global-decl-consistency` and cannot wake the step that runs it, because the graph's file producer emits no node for anything under `__fixtures__` and the step's reach is seeded from graph nodes.

# Evidence

Measured on the `18484` tree at `8ab8f6e2a4`, verifying #18467.

The check's walk skips three directory names — `node_modules`, `dist`, `generated` (`NOT_HAND_WRITTEN_DIRS`, `packages/infra/checks/src/checks/check-eso-global-decl-consistency.ts:68`). `__fixtures__` is not among them, so a fixture declaration file is a member of the corpus. Planted `declare function GetNumAddOns(this: void): number` at `packages/temper/addons/types/eso/__fixtures__/spec.d.ts` in an isolated probe root and ran the check with `--repo-root`: exit 1, one finding, `[over 254 of 254 declaration files]`. The file is judged.

The step's wake set is `{ kind: "ts-file", under: "packages/temper" }`, expanded from `ts-file` nodes in the built graph (`expandPopulationEntry`, `packages/infra/ci/worker/src/pure/matcher.ts:51`). `RECOGNIZER_GRAPH_EXEMPT_DIRS` at `matcher.ts:147` holds `__fixtures__`, mirroring the producer's own exempt set, and `isExcludedFromGraphDomain` records that the TS walk skips a `__fixtures__` segment for every extension. No node exists, so no change to such a file intersects the step's closure.

The corpus today holds no member under `__fixtures__`: built the full graph via `buildFullGraph({ workspaceRoot })` and put all 253 members through `fileNodeIdCandidates`, and 0 of 253 fail to wake the step. `packages/temper` holds one `__fixtures__` directory, `packages/temper/shared/build-deploy/checks/__fixtures__`, carrying no `.d.ts` today. The gap is therefore latent rather than standing, and arrives with the first fixture declaration file anybody adds.

The same shape reaches any check whose own walk is wider than the graph's discovery domain.
