import type { Finding } from "../finding.page-type.ts"

export const theSharedLibSetsDeclarationDisagreesWithTheLibraryItDescribes = {
  id: "01a0619a-df4c-700e-8e38-3329ad9088f5",
  pageTypeSlug: "finding",
  slug: "the-shared-lib-sets-declaration-disagrees-with-the-library-it-describes",
  domainSlug: "domain/temper",
  claim:
    "The landed `LibSetsApi` in temper-addon-library-types names fourteen members, and every one of the fourteen has a different type from the library's own declaration of the same member. It also lacks `GetSetName` and `GetSetInfo`, which are the only two methods the one real consumer calls. So the shared declaration described a LibSets that does not exist, and the consumer's call typechecked only because a hand-written narrowing predicate sits in front of it.",
  evidence:
    "Measured 2026-09-02 while migrating temper/shared-addon-libraries-lib-sets, whose own `interface LibSetsLib` is declared across fifteen `.d.ts` files under src/types/ and carries 287 members.\n\nAll fourteen shared members differ. Twelve differ by a missing `this: void` parameter and a return widened to `boolean | undefined` rather than `boolean`, which under the TypeScript-to-Lua transpiler is the difference between a free call and a colon call. `GetSetType` differs in its parameter. `IsTrialSet` differs in its return, which the library declares as a two-value return rather than one boolean. Merging the two blocks raises TS2717 on every one of the fourteen, so they cannot both be declared.\n\nThe missing pair is the load-bearing part. temper/game-crafting-addon is the only addon whose manifest depends on LibSets, at addon.json:10, and the only place outside the library that reads the global. smithing-parser-ops.ts:62 calls LibSets.GetSetName(set_id, lang) behind a libSetsHasGetSetName guard, and i18n.ts:57 and writworthy-global.ts:77 reach GetSetInfo through a WritWorthy-injected accessor typed by TemperWritLibSetsApi in eso-writ-smithing rather than by LibSetsApi. Two declarations describe one library and neither is the library's own.\n\nThe migration keeps the library's forms and reduces the shared file to the `LibSets` value alone, which must be `declare var` rather than `declare const` because internal-base.ts:31 assigns the global.",
} as const satisfies Finding
