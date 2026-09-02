import type { Finding } from "../finding.page-type.ts"

export const theGeneratedShalidorCatalogHasNoLandedHomeAndItsGeneratorReadsLikeOne = {
  id: "01a061da-4fe9-790f-b9d2-0cbfba0460db",
  pageTypeSlug: "finding",
  slug: "the-generated-shalidor-catalog-has-no-landed-home-and-its-generator-reads-like-one",
  domainSlug: "domain/temper",
  claim:
    "`shalidorLibraryCollections` has no importable home under akasha. Of the nine subpaths the TemperCharacters add-on took from the un-migrated player-completion package, eight are landed and this one is not. Searching for the name finds it under `temper-addon-generators/lore-shalidor`, but that occurrence is text inside a template literal the generator emits rather than a declaration, so repointing an import at it would not compile.",
  evidence:
    "Measured 2026-09-02. `akasha/temper/temper-addon-generators/lore-shalidor/lore-shalidor.module.code.ts` opens a template literal at line 61 that closes at line 82. Everything between is the text the generator writes, including `export interface LoreShalidorBook` at 68, `export interface LoreShalidorCollection` at 73 and `export const shalidorLibraryCollections` at 79. The file's only real top-level export is `generateLoreShalidor` at line 22, which answers a string. The whole file is 83 lines and 2,295 bytes, far short of the catalog it writes, which is the cheapest tell. The value exists only at `temper/player-completion/src/generated/lore-shalidor-data.generated.ts:18`, which is not migrated. A grep for the name at the start of a line matches the template text and reads exactly like a landed declaration, so the name looks landed to any search that does not check whether the match sits inside a template. The add-on's import is therefore left pointing at the un-migrated package, and its old dependency stays in the manifest beside the new one until the catalog has a home.",
} as const satisfies Finding
