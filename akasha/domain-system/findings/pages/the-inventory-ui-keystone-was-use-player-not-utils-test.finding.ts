import type { Finding } from "../finding.page-type.ts"

export const theInventoryUiKeystoneWasUsePlayerNotUtilsTest = {
  id: "01a06354-4b4b-7b4a-84cd-55a139919ff7",
  pageTypeSlug: "finding",
  slug: "the-inventory-ui-keystone-was-use-player-not-utils-test",
  domainSlug: "domain/temper",
  claim:
    "`shared/utils-test` barred nothing. `temper/player-inventory-management-ui` holds zero test files, so its `bunfig.toml` preloaded a DOM for no test, and the `@shared/utils-test` devDependency and tsconfig reference served only that dead preload. What actually barred the package was `temper/player-profile/use-player`, a 141-line hook reaching `@akasha/*` and `react` and nothing else.",
  evidence:
    "`git ls-files temper/player-inventory-management-ui` answers 114 files: 74 `.tsx`, 37 `.ts`, 2 `.json`, 1 `.toml`. Two instruments over that denominator find no test: no filename matches `.test.` or `.spec.`, and no file imports `bun:test`. `infra/cluster-checks/src/lib/test-preload-obligations.ts` raises an obligation only from a file whose `detectTestType` answers `component`, so a package holding none is owed no bunfig and `bunfigRegisters` is never asked about it. `shared/utils-test` is 8 tracked files whose own closure leaves the workspace altogether, reaching `@testing-library/react`, `@happy-dom/global-registrator`, `bun:test` and `react`, so carrying it inside would have moved no refusal; nothing needed carrying. It keeps two live import edges from `alanwalton/web` component tests and so remains where it is. `temper/player-profile` is three tracked files, one of them source. That source landed unchanged as `akasha/temper/temper-player-profile/use-player/use-player.module.code.ts` at `cf90e65826`. `player-inventory-management-ui` then typechecks at 0 errors with 3 `@temper/*` edges left, all in `src/use-rule-matcher-context.ts`, all on packages another seat holds.",
} as const satisfies Finding
