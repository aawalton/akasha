import type { Finding } from "../finding.page-type.ts"

export const aPathKeyedRuleFailsOpenWhenThePathMoves = {
  id: "01a05b66-5c35-7fd6-ab2d-789fd7302c3c",
  pageTypeSlug: "finding",
  slug: "a-path-keyed-rule-fails-open-when-the-path-moves",
  domainSlug: "domain/akasha-check",

  claim:
    "A package's folder path is spelled as a bare string in places no move repoints, and nothing ties the string back to the folder. For `shared/pages-core` the worst is a biome override banning react and the design packages from it: move the folder and the override matches nothing, the ban quietly stops applying, and biome reports success. The rot is already visible rather than feared, because the one other list of this kind carries an entry naming a folder this repository does not have.",
  evidence:
    '`biome.json` `overrides[1].includes` is literally `["shared/pages-core/**"]`. Under it sit six banned specifiers, each with its own message naming `@shared/pages-core`: `react`, `react-dom`, `@shared/design-layout`, `@shared/design-primitives`, `@shared/design-forms`, `@shared/pages-ui`. An override applies to the files its includes match, so once the folder is elsewhere the whole block matches nothing. Nothing fails. The guard is simply gone, and the six messages go on naming a package name that no longer exists.\n\nThe proof that this rots unnoticed is in `infra/cluster-checks/src/checks/check-syntax-bundle.ts:43`, where `WIDENING_PATHS = ["packages/infra/checks/", "shared/pages-core/"]`. There is no `packages/` directory anywhere in this repository. That entry has been dead since the folder went, and nothing anywhere said so.\n\nThe same path is also spelled at `tools/commands/page/icon-search-index/generate.ts:24` as the generated icon index\'s output, and at `tools/commands/tests/run.ts:43` in a help example.\n\nWhat a move does repoint is only what typechecks or resolves: the root `package.json` workspaces, the root `tsconfig.json` references, and the eight app tsconfigs that reference `../../shared/pages-core` from `alanwalton/web`, `alanwalton/atlas-web`, `alanwalton/awen-core`, `alanwalton/personas-core`, `archive-of-worlds/web`, `collections/litrpg`, `temper/scripts` and `temper/web`. The biome override and the widening list are neither, so both survive a move as dead text and both fail open.',
} as const satisfies Finding
