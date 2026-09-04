import type { Finding } from "../finding.page-type.ts"

export const fourOfTheHiddenLibCheckFaultsAreTheGameTypingsOwn = {
  id: "01a063b0-9db6-7de6-869c-93827128f1fd",
  pageTypeSlug: "finding",
  slug: "four-of-the-hidden-lib-check-faults-are-the-game-typings-own",
  domainSlug: "workspace-package/temper-eso-types",
  claim:
    "Turning lib checking off draws faults from `temper-eso-types` itself, which a landed finding puts wholly in `temper-addon-library-types`. Of the seventeen missing names sixteen are the library package's; the seventeenth is `FcocsSkillLinesTreeNode` in the game typings. Three more are TS2717 on `Object.keys`, `values` and `entries`, which every add-on reads.",
  evidence:
    'Measured with the TypeScript compiler API over `temper/catalog-addon/src` with `skipLibCheck` off and against the same run with it on, so each count is a difference rather than a total.\n\nWith `temper-eso-types` alone the program reads 186 files, and lib checking off adds five: TS2304 `FcocsSkillLinesTreeNode` at `eso-interface-extra-3.type-declaration.d.ts:263`; TS2552 `LscCommand` at `eso-writ-slash.type-declaration.d.ts:19`; and TS2717 at `tstl-language-extensions.type-declaration.d.ts:111`, `:113` and `:115`, where `Object.keys`, `values` and `entries` are re-declared over the shapes the standard library already gives them.\n\nAdding `temper-addon-library-types` takes the program to 238 files and the added faults to twenty-one. Sixteen TS2304 fall in the three files the earlier finding names, `lib-sets-api-3` eight, `lib-sets-api-5` seven, `lib-scrollable-menu` one, and one TS2552 in `lib-sets-api-5:69`. `LscCommand` is no longer missing, `lib-slash-commander` supplying it. So a run over the game typings alone reports a fault no whole build ever meets.\n\nA seeded `const seededControl: number = "nope"` draws TS2322 in each seeded run and none of the clean ones, so a zero here is a measurement.\n\nThe TS2717 three are a widening rather than a missing name, met by a caller as a wrong overload.',
} as const satisfies Finding
