import type { Finding } from "../finding.page-type.ts"

export const theDeadReferencesInClusterChecksWereNeverAlive = {
  id: "01a05c85-a8d3-7d64-a2bb-6988ef1702d1",
  pageTypeSlug: "finding",
  slug: "the-dead-references-in-cluster-checks-were-never-alive",
  domainSlug: "domain/akasha-migration",
  claim:
    "The six dead references in `infra/cluster-checks/tsconfig.json` are not damage from the akasha migration. None of the six paths has ever existed in this repository's history, so they were never valid. Nothing raises them because the root `tsconfig.json` names no `infra/cluster-checks`, so the repo-wide typecheck never walks it and its types go unchecked.",
  evidence:
    "`git log --all --oneline -- <path>` returns 0 commits for each of `shared/design/tokens`, `shared/graph/core`, `shared/graph/producers`, `shared/worker-runtime`, `infra/ci/pipeline-core` and `infra/workflow-dsl`. No `shared/design/`, `shared/graph/` or `infra/ci/` folder stands in the tree. `shared/design/tokens` sits three lines below a correct `../../shared/design-tokens` in the same list, so it reads as a nested-path guess rather than a rename, and akasha keeps package names flat when it moves them.\n\nThe root `tsconfig.json` names no cluster-checks, while it does name `./infra/k8s`, `./infra/k8s-types`, `./infra/scripts`, `./infra/ci-workflows`, `./infra/loki-service`, `./infra/seaweedfs` and `./infra/auth-proxy`. cluster-checks is the one infra package the tree build does not reach, and the whole-tree typecheck stood at 0 errors with all six standing.\n\nBuilding it alone raises twelve TS6053 lines and nothing else, exit 2. It does not segfault.\n\nTwo further gaps, read but not proven. Its references name neither `infra/k8s-synth` nor `infra/git-porcelain`, though `check-start-script.ts` and `check-porcelain-status-boundary.ts` import both. And it sets a `rootDir` of `../..` while including only `src/**/*.ts`; every `.ts` it pulls from an akasha package, such as `@akasha/errors-core/exit-code` and `@akasha/utils-fs/atomic-write` which ship raw TypeScript and no `dist`, falls under that rootDir and outside that include, which is the shape TS6307 is raised for. A previous lane hit TS6307 here and reverted.\n\nNothing was acted on: the file is dirty, another lane mid-removal of its `../../shared/errors-core` reference.",
} as const satisfies Finding
