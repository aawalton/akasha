import type { Finding } from "../finding.page-type.ts"

export const theImportGateAdmitsToolsLibByNameAndRefusesCollectionsExercises = {
  id: "01a0658f-e6c3-7004-b1ed-0ae5aa80f969",
  pageTypeSlug: "finding",
  slug: "the-import-gate-admits-tools-lib-by-name-and-refuses-collections-exercises",
  domainSlug: "domain/akasha-migration",
  claim:
    "The gate barring an akasha file from importing outside akasha does not key on the specifier alone. `@tools/lib/page-query` lands; `@collections/exercises/pages/access` is refused, and the refusal names the file the specifier resolves to. Both are workspace package names the repository installs, so a worker told that a package name always clears the gate will plan an order that one of its files cannot follow.",
  evidence:
    "Measured 2026-09-02 while carrying `tools/lib/exercise-pages.ts` and `tools/lib/exercise-ask-pages.ts` into `akasha/alan/fitness/exercise-access/`.\n\nThe two modules were handed to one `akasha write`. The refusal named one of them and not the other: ``akasha/alan/fitness/exercise-access/exercise-asking/exercise-asking.module.code.ts — `@collections/exercises/pages/access` reaches `collections/exercises/src/pages/access.ts` — an akasha file imports no file outside the akasha folder``. Nothing was said about `selection-policy.module.code.ts`, whose four imports are `@tools/lib/page-query`, `@tools/lib/page-derive-shape`, `@tools/lib/page-query-values` and `@tools/lib/page-write`, every one of them resolving into `tools/lib/` just as plainly.\n\nWith `exercise-asking` taken out of the call and `@collections/exercises` taken out of the manifest, the same four `@tools/lib` specifiers passed: 40 checks judged them and none refused, committed as f8c6487f3e7eda09d5ad557ddd08f4dea913a58b.\n\nSo `@tools/lib` is admitted by something other than being a package name. What that something is was not established here. `akasha/agents`, `akasha/editor-extension` and `akasha/mobile-cli` already name `@tools/lib` as a dependency, and no akasha manifest names `@collections/exercises`, which is one candidate and untested.\n\nThe call taken: `tools/lib/exercise-ask-pages.ts` was left where it is. It reaches the exercise collection's own query builder and row reducer, so it cannot move until that package moves or until whatever admits `@tools/lib` admits it too.",
} as const satisfies Finding
