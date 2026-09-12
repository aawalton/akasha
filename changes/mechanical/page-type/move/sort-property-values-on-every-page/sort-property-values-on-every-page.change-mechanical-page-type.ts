import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const sortPropertyValuesOnEveryPage = {
  id: "01a095ce-4e42-7067-8c69-add95e48ed0b",
  type: "change-mechanical-page-type",
  slug: "sort-property-values-on-every-page",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "the values one key holds put into the order they sort in, on every page of one page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page holding the key out of order is answered in this one answer.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages hold the key out of order is read from the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page is carried when a value it holds sits outside the longest run already in order.",
    },
    {
      invariantKind: "departure",
      statement: "The values of a page carried come out in the order they sort in.",
    },
    {
      invariantKind: "departure",
      statement: "One page's property is answered by one edit over that property.",
    },
    {
      invariantKind: "departure",
      statement: "The spelling a value already has is the spelling that value keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no list under the key is refused by its path.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "absence",
      statement: "A key holding no list is passed over rather than refused.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalPageType
