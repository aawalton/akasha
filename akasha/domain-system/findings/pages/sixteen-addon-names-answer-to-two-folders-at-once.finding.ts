import type { Finding } from "../finding.page-type.ts"

export const sixteenAddonNamesAnswerToTwoFoldersAtOnce = {
  id: "01a061c6-84f5-74e1-892e-c2adaa37490f",
  pageTypeSlug: "finding",
  slug: "sixteen-addon-names-answer-to-two-folders-at-once",
  domainSlug: "domain/temper",
  claim:
    "Now that the roster reads a manifest at either spelling, sixteen addon names each answer to two folders: the akasha package and the source folder it was recreated from. `resolveAddon` hands back whichever comes first in sorted order, which is always the akasha one, and says nothing. `listAllAddons` answers both, so building the whole roster builds each of the sixteen twice into one dist folder.",
  evidence:
    "Measured 2026-09-02 at `aa8afbd442`. `listAllAddons({ repoRoot })` answers 64 addons where the roster held 48 before, and grouping by `canonicalName` finds sixteen names with two directories each: the fourteen `temper-lib-*` libraries plus `TemperErrors` and `TemperSales`.\n\n`akasha/temper/temper-addons-resolve/addon-roster/addon-roster.module.code.ts` builds the roster as the flat root followed by `listExternalAddonRelDirs`, which sorts repository-relative paths. `akasha/...` sorts before `temper/...`, so the akasha copy is always the one found. `resolveAddon` answers the first match and stops.\n\nThat this seat wanted the akasha copy is luck rather than design. The same order would have been wrong had the source been the proven one, and nothing in the roster says a name is claimed twice.\n\nThe collision is the migration window itself, and the library teardown closes it by deleting the source folders. Until then two guards would help: `listAllAddons` could refuse where one canonical name answers to two folders outside the flat root, and `temper addon list` could mark the pair. `infra/cluster-checks/src/checks/check-addon-build.ts` sets a least count of 48 found addons and will not notice a doubled roster.",
} as const satisfies Finding
