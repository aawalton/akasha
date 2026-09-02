import type { Finding } from "../finding.page-type.ts"

export const theSharedFcoisDeclarationReturnsOneValueWhereTheLibraryReturnsTwo = {
  id: "01a061cc-a0b1-7a97-8e9d-2d0acadb541c",
  pageTypeSlug: "finding",
  slug: "the-shared-fcois-declaration-returns-one-value-where-the-library-returns-two",
  domainSlug: "domain/temper",
  claim:
    "`ItemSaver_IsItemSaved` is declared in the shared library types as returning `boolean`. The library returns two values, and both the crafting panel and the potion window read the second one to learn which mark was set. Every caller therefore has to cast, and a caller that trusts the declaration silently loses the mark.",
  evidence:
    "`akasha/temper/temper-addon-library-types/fcois/fcois.type-declaration.d.ts` line 31 declares it as `((this: void, bagId: number, slotIndex: number) => boolean) | undefined`. `craft-inventory` and `potion-reagents` both destructure two values from the call, so each now routes it through a named `asSaveResult` cast to `LuaMultiReturn<[boolean, string | undefined]>`. Widening the shared declaration was left undone because `LuaMultiReturn<[boolean, ...]>` is not assignable to `boolean`, so the one-line change would refuse at every consumer that treats the call as a plain condition, and that set was not measured.",
} as const satisfies Finding
