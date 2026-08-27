---
id: efe046a4-b451-52bb-8a44-adb8a44c632a
slug: seaweedfs-synth-typechecked-by-nothing
page-type-slug: finding
title: "Seaweedfs synth typechecked by nothing"
domain-slug: domain/global
---

# Claim

The twelve TypeScript files under `packages/infra/seaweedfs/k8s/` — the whole synthesised deployment of the object-storage layer — belong to no TypeScript project, so nothing typechecks them. The package's own tsconfig includes `src/**/*.ts` alone, and the three `seaweedfs/synth*.ts` entries in `packages/infra/k8s/tsconfig.json` resolve to a directory that has not existed since the synth was relocated.

# Evidence

Read on 2026-08-10 at 22:40Z against `/home/walton/code` at dd27605962.

`bunx @typescript/native-preview -p packages/infra/seaweedfs/tsconfig.json --showConfig` resolves exactly three files: `src/foundation.workflow.ts`, `src/rbac.ts`, `src/tunnel-routes.ts`. None under `k8s/`. That tsconfig's include list is the single entry `src/**/*.ts`.

The same command on `packages/infra/k8s/tsconfig.json` resolves 79 files, of which zero match `seaweedfs`. Its include list names `seaweedfs/synth.ts`, `seaweedfs/synth-constants.ts` and `seaweedfs/synth-deployments.ts`, taken relative to `packages/infra/k8s/`; `packages/infra/k8s/seaweedfs/` does not exist. The files are at `packages/infra/seaweedfs/k8s/`, moved there by b3060c5186, "relocate cdk8s synth under workspace k8s/ and reclassify as service".

What hides it: TypeScript drops an include pattern matching no file in silence, raising TS18003 only when NO pattern in the list matches. The others match, so three dead entries cost nothing visible and read as coverage.

The root `tsconfig.json` references `./packages/infra/seaweedfs` as a project at line 274, so it IS built by the root `typecheck` script (`bunx @typescript/native-preview -b`) — built containing nothing from `k8s/`. A green typecheck is consistent with every file in that directory being broken.

Scope: 12 files. `synth.ts`, `synth-deployments.ts`, `synth-constants.ts`, `synth-backup.ts`, `synth-etcd-snapshot.ts`, `synth-longtail-assets.ts`, `synth-maintenance.ts`, `synth-prune.ts`, and four `.unit.test.ts`. Nine were never named by either tsconfig even under the pre-move path.

Project 18490 edited `synth-constants.ts` and `synth-deployments.ts` today, and that change reached production, under no typecheck.

NOT MEASURED. Whether type errors stand in those twelve files now. Whether executing the four unit tests catches what the compiler would. Whether other packages carry the same shape — this came from one package, not a sweep.
