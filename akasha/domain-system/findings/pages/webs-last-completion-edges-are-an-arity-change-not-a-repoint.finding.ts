import type { Finding } from "../finding.page-type.ts"

export const websLastCompletionEdgesAreAnArityChangeNotARepoint = {
  id: "01a06381-d831-7e38-a03a-ad8cf804c697",
  pageTypeSlug: "finding",
  slug: "webs-last-completion-edges-are-an-arity-change-not-a-repoint",
  domainSlug: "domain/temper",
  claim:
    "The 21 edges left from `temper/web` to `@temper/player-completion` cannot be repointed. 12 of the 20 transforms they name now take a catalog the legacy version did not take, and `buildCharacterSummary` and `buildAccountSummary` landed nowhere in akasha at all. Counting these as repointing work overstates what is left, by reading a data-plumbing job as a rename. Two of the blockers are not gated on `src/generated`: the summary builders are pure folds over progress shapes.",
  evidence:
    "Measured 2026-09-02 at the commit removing web's dead card-registry barrel, over the git index, with two parsers agreeing on all 2,717 of web's edges and all 264 of scripts'.\n\nComparing each imported function's parameter list in `temper/player-completion/src` against its `.module.code.ts` twin: 8 of 20 kept their arity and 12 gained one or two catalog parameters. `transformAccountTraitResearchUnion` and `transformCompletionCharacters` gained two. That is 12 call sites in `account-progress.ts` and `character-progress.ts` needing a catalog handed in, against 1 that is one-for-one.\n\nSearching all 37,752 exported names under `akasha/` finds `buildCharacterSummary` and `buildAccountSummary` nowhere, across 3 call sites. `getTabForCard` is not absent: it landed as `getCompletionCardTab` in `completion-card-tab`.\n\nA census reading only import specifiers misses an edge of another kind. `temper/web/tsconfig.json` and `temper/scripts/tsconfig.json` each carried a `references` entry naming `../player-completion`, which holds the package open exactly as an import does. Scripts' entry is gone; web's remains.",
} as const satisfies Finding
