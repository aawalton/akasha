import type { Finding } from "../finding.page-type.ts"

export const theAliasImportsWereMissingFromTheComponentImportCensus = {
  id: "01a06428-7ccb-7ced-bd46-fc792b76f7c9",
  pageTypeSlug: "finding",
  slug: "the-alias-imports-were-missing-from-the-component-import-census",
  domainSlug: "domain/temper",
  claim:
    "The import census handed to the four seats carrying temper's web components counted relative imports and `~/`, and counted no `@/` alias imports. In `app/components/completion` alone the alias form is 60 imports and the relative form is zero, so a seat trusting the census would have expected almost no repointing and met the opposite.",
  evidence:
    "The census said: 296 `@akasha/design-primitives`, 216 `@akasha/temper-companions-core`, and so on, then `only 35 relative imports exist across the whole component tree, and ~/ appears in none of them`.\n\nOver the 60 files of `temper/web/app/components/completion`, `grep -rnE 'from \"\\.\\.?/'` answers nothing and `grep -rn '\"~/'` answers nothing, so both halves of the census hold. `grep -rhoE '@/[^\"]+'` answers 60 specifiers, every one of them under `@/components/completion`, and none reaching outside that folder. Eleven of the 60 files carry at least one.\n\nThe alias resolves through `tsconfig` rather than through a package name, so it is invisible to a search for `../` and to a search for `~/` alike. Repointing them is what the move needs: `@/components/completion/use-completion-catalogs` became `../use-completion-catalogs/use-completion-catalogs.module.code.ts`.\n\nThat none of the 60 reached outside the folder is the reason no import was left pointing at a sibling seat's destination. The three files that reach in from outside are `app/routes/completion.tsx`, `app/routes/completion.u.$userId.tsx` and `app/components/home/home-page-content.tsx`, all owned by other seats.",
} as const satisfies Finding
