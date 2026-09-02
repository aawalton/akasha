import type { Finding } from "../finding.page-type.ts"

export const theCompletionAddOnIsHeldOpenOnlyByAnotherAddOnsRelativeImports = {
  id: "01a06358-4f7c-7e23-a42a-7a76a19646ea",
  pageTypeSlug: "finding",
  slug: "the-completion-add-on-is-held-open-only-by-another-add-ons-relative-imports",
  domainSlug: "domain/temper",
  claim:
    "Every reference site `temper/player-completion-addon` had inside a completion seat's lane is cleared, and what holds it open is four files in `game-characters-skills-morphs-addon` reaching `../../../player-completion-addon/src/` by relative path. No manifest, no lockfile and no tsconfig records that reach. `temper/player-completion` is held open more widely, by `temper/web`, `temper/scripts` and nine catalog generators that write into it.",
  evidence:
    "Measured 2026-09-02 after 9d399d1e0c. `git grep player-completion -- tools/lib/temper-addon-data/` answers one line, `output-dirs.ts:24`, naming the library rather than the add-on; the add-on's two rows there are gone.\n\nResolving every `references[].path` in the 70 tracked tsconfig files against the filesystem rather than searching for the package name: 91 references, 0 dangling, 2 naming a target, both `temper/player-completion`, from `temper/scripts/tsconfig.json` and `temper/web/tsconfig.json`. No tsconfig names the add-on.\n\nThe five reaches into the add-on, in 4 files of the 7 `game-characters-skills-morphs-addon` tracks: `src/tracking/skill-morphs.ts:2`, `src/ui/task-auto-complete-skill-morphs.ts:1`, `src/ui/task-hud-skill-morphs.ts:18`, `src/ui/task-progress-resolver-skill-morphs.ts:13` and `:14`. Four want `src/saved-variables`, one wants `src/ui/task-progress-resolver-types`. A search for `@temper/player-completion-addon` finds none of them.\n\nThe library's own reaches: 23 import lines in `temper/web` under `app/components/completion/`, 6 in `temper/scripts`, and nine `*-catalog-tier` modules under `akasha/temper/temper-catalog-generators` naming `temper/player-completion/src/generated/` as an `outputPath`. The add-on's last reach into the library went at 9d399d1e0c.\n\n`ast-unused.temper.config.json` reports clean on both packages by examining nothing: their entry globs match no file, so that audit is evidence of nothing here.",
} as const satisfies Finding
