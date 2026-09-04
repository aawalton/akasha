import type { Finding } from "../finding.page-type.ts"

export const theEsoDeclarationGeneratorWritesIntoAFolderThatIsGone = {
  id: "01a0637d-4e11-7b41-8e02-5d9a3f7c1b6e",
  pageTypeSlug: "finding",
  slug: "the-eso-declaration-generator-writes-into-a-folder-that-is-gone",
  domainSlug: "domain/temper",
  claim:
    "The declarations under `akasha/temper/temper-eso-types` were carried across by hand and nothing regenerates them. The generator that made the tree they replace, `tools/commands/eso/generate-typings.ts`, still names `temper/addons/types/eso/generated` as its output and that path no longer exists. Re-running it against a newer game documentation dump writes into nothing.",
  evidence:
    '`tools/commands/eso/generate-typings.ts:29` holds `const OUT_REL = "temper/addons/types/eso/generated"`, and `tools/commands/eso/generate-chatter-names.ts:16` reads `temper/addons/types/eso/generated/enums.d.ts` as its source. Both were the only two live readers of the removed tree outside the cluster-check system that judges nothing now; the folder went at the commit this finding is filed beside.\n\nThe twin\'s layout is not the generator\'s. The old tree was five files under one `generated/` folder; the twin is one folder per page with a `.type-declaration.d.ts` beside a `.type-declaration.ts` page, spread over `eso-enums-01` through `eso-enums-NN`. So this is a generator to write rather than a path to repoint, and the akasha side has none: `akasha/temper/temper-addon-generators` holds 120 generators and no ESO typings generator among them.\n\nThe freshness gate is already known to have followed the tree out: `check-eso-typings-fresh` walks `WALK_ROOT = "temper"` at `eso-clone-artifacts.module.code.ts:9`, which the finding `an-eso-artifact-leaves-the-freshness-population-when-it-moves-into-akasha` records.',
} as const satisfies Finding
