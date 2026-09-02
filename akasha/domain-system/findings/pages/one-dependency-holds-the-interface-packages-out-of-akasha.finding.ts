import type { Finding } from "../finding.page-type.ts"

export const oneDependencyHoldsTheInterfacePackagesOutOfAkasha = {
  id: "01a0630c-64ff-7a5b-a14a-625452d34e46",
  pageTypeSlug: "finding",
  slug: "one-dependency-holds-the-interface-packages-out-of-akasha",
  domainSlug: "domain/temper",
  claim:
    "The eight `-ui` packages under `temper/` are held out of akasha by one dependency rather than by a rule. `imports-inside` names no specifier prefix: it judges only files already inside `akasha/` and refuses a specifier by where the manifests land it. Across their 143 source files every dependency already reaches `@akasha/*` or a sibling `-ui` package that moves with them, save `@shared/auth`, imported 13 times. `shared/auth` is three tracked files.",
  evidence:
    "Measured at `0efab78803` by parsing 143 source files across `player-inventory-management-ui`, `player-economics-ui`, `player-completion-ui`, `player-completion-skills-morphs-ui`, `game-companions-ui`, `game-characters-equipment-ui`, `game-characters-character-ui` and `player-profile`, some 156 tracked files in all. The reached packages are led by `@akasha/temper-items-rules-core` at 153, `@akasha/design-primitives` at 116 and `@akasha/temper-items-core` at 73. Every `@temper/` row names a sibling `-ui` package. `@shared/auth` at 13 is the only row naming a package that is neither. `imports-inside.code-check.code.ts:47` answers nothing for a path outside `akasha/`, and `:51` refuses only where `landingOf` puts a specifier outside; the check's invariant says a specifier no manifest names lands nowhere and is passed over. The refusal therefore follows the manifest rather than the spelling, and carrying a manifest inside `akasha/` ends it. The precedent is landed already: `shared/pages-ui` has an akasha twin at `akasha/pages-system/pages-ui`, and those same interface packages import `@akasha/pages-ui` 19 times. Of the four packages under `shared/`, `pages-ui` has moved and `auth`, `pages-query` and `utils-test` have not. `shared/auth` is a manifest, a tsconfig and one module, `src/use-auth.ts`, named by 27 files across the repository. What is not yet measured is what `use-auth.ts` itself reaches: where its own closure lands outside `akasha/`, carrying it inside moves the refusal rather than ending it.",
} as const satisfies Finding
