import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addPageTypeTypes = {
  id: "01a09cd3-c095-7c29-9984-4c469f15cc8b",
  type: "change-mechanical-page-type",
  slug: "add-page-type-types",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "one page type turned over to the code that writes its type",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key naming the file and the move of the type are one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file the type lands at is the `types` file beside the page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type carried over is the one named for the page type's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body importing the type that moved is repointed in this same answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What the carrying leaves is worked out by the module this change names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming no page is refused before any body is worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page that is no page type is refused before any body is worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type stating that key already is refused by its path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type declaring no type of that name gains the key and nothing is moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A types file holding no body is refused rather than written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type whose type spells a key as a list of another type is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type whose type spells a key as a union of other types is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type is refused for either shape spelled in any type that page type extends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the key and the shape spelled and the file spelling it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the type the page type gains.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
