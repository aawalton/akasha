import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addPageTypeTypes = {
  id: "01a09cd3-c095-7c29-9984-4c469f15cc8b",
  type: "change-mechanical-page-type",
  slug: "add-page-type-types",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "one page type turned over to the code that writes its type",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key naming the file and the move of the type are one answer.",
    },
    {
      invariantKind: "departure",
      statement: "The file the type lands at is the `types` file beside the page type.",
    },
    {
      invariantKind: "departure",
      statement: "The type carried over is the one named for the page type's slug.",
    },
    {
      invariantKind: "departure",
      statement: "Every body importing the type that moved is repointed in this same answer.",
    },
    {
      invariantKind: "departure",
      statement: "What the carrying leaves is worked out by the module this change names.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is no page type is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating that key already is refused by its path.",
    },
    {
      invariantKind: "departure",
      statement: "A page type declaring no type of that name gains the key and nothing is moved.",
    },
    {
      invariantKind: "departure",
      statement: "A types file holding no body is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A page type whose type spells a key as a list of another type is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type whose type spells a key as a union of other types is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type is refused for either shape spelled in any type that page type extends.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the key and the shape spelled and the file spelling it.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the type the page type gains.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
