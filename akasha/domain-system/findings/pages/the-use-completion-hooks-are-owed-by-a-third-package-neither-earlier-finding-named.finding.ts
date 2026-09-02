import type { Finding } from "../finding.page-type.ts"

export const theUseCompletionHooksAreOwedByAThirdPackageNeitherEarlierFindingNamed = {
  id: "01a06307-dd2b-720a-8001-1f2d535baa67",
  pageTypeSlug: "finding",
  slug: "the-use-completion-hooks-are-owed-by-a-third-package-neither-earlier-finding-named",
  domainSlug: "domain/temper",
  claim:
    "The `use-completion` hooks belong to `temper/player-completion-ui`. An earlier finding bundled them with the transform and summary functions and gave both to `temper/player-completion`, which is right for the transforms and wrong for the hooks. Handing them there leaves them unowned a second time.",
  evidence:
    "Measured at `a887c313be` by parsing exported declarations with the TypeScript compiler, counting declarations rather than occurrences, which is what parts the two readings. `useAccountCompletion` and `useCompletionCharacters` are exported functions of `temper/player-completion-ui/src/use-completion.ts`. Across three populations they score: `temper/player-completion` 82 source files, zero; `temper/web` 349 source files, zero; all of `akasha` 22,764 files, zero. The earlier finding's counts of 9 and 17 were occurrences at call sites and imports, not declarations. `temper/player-completion-ui` holds 4 source files and 18 exported symbols; 11 are already in akasha and 7 are not, the 7 being all six hooks plus `CompletionCompanionRow`. The control is inside one file: `CompletionCharacterRow` and `CompletionCompanionRow` are both declared in `use-completion.ts`, and the first is present in akasha while the second is absent, so the recreation took that file's row types and left its hooks. A `dist/` folder of 119 untracked `.d.ts` files sits under `temper/player-completion` and inflates any census that walks the directory rather than the git index.",
} as const satisfies Finding
