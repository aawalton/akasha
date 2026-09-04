import type { Finding } from "../finding.page-type.ts"

export const websLastCompletionEdgesAreAnArityChangeNotARepoint = {
  id: "01a06381-d831-7e38-a03a-ad8cf804c697",
  pageTypeSlug: "finding",
  slug: "webs-last-completion-edges-are-an-arity-change-not-a-repoint",
  domainSlug: "domain/temper",
  claim:
    "The 21 edges left from `temper/web` to `@temper/player-completion` are a data-plumbing job rather than a rename. 12 of the 20 transforms they name now take a catalog the legacy version did not take, so a repoint alone leaves each call short an argument. The summary builders are no longer among the blockers: `buildCharacterSummary` and `buildAccountSummary` both landed in akasha after this was measured. Counting the whole set as repointing work overstates what is left.",
  evidence:
    "Measured 2026-09-02 at the commit removing web's dead card-registry barrel, over the git index, with two parsers agreeing on all 2,717 of web's edges and all 264 of scripts'.\n\nComparing each imported function's parameter list in `temper/player-completion/src` against its `.module.code.ts` twin: 8 of 20 kept their arity and 12 gained one or two catalog parameters. `transformAccountTraitResearchUnion` and `transformCompletionCharacters` gained two. That is 12 call sites in `account-progress.ts` and `character-progress.ts` needing a catalog handed in, against 1 that is one-for-one.\n\nSearching all 37,752 exported names under `akasha/` found `buildCharacterSummary` and `buildAccountSummary` nowhere, across 3 call sites. That was true when measured and is not now: this page landed at `d54ccc114b` on 2026-09-02 at 13:05:16, and both builders landed 37 minutes later at `197ddc2645` at 13:42:23, in `completion-summary.module.code.ts` and `completion-summary-account.module.code.ts`, with the package manifest naming both. Corrected at the commit landing the orchestrator that folds them. `getTabForCard` is not absent: it landed as `getCompletionCardTab` in `completion-card-tab`.\n\nA census reading only import specifiers misses an edge of another kind. `temper/web/tsconfig.json` and `temper/scripts/tsconfig.json` each carried a `references` entry naming `../player-completion`, which holds the package open exactly as an import does. Scripts' entry is gone; web's remains.",
} as const satisfies Finding
