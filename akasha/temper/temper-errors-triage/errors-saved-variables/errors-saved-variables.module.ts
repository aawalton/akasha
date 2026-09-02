import type { Module } from "@akasha/code-system/module"

export const errorsSavedVariables = {
  id: "01a060cd-564f-7386-bf3f-219a42b803ca",
  pageTypeSlug: "module",
  slug: "errors-saved-variables",
  definition: "the shape the errors addon saves, ruled on as it is read back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A saved field the shape does not name is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The shape is held to the payload the addon writes.",
    },
    {
      invariantKind: "departure",
      statement: "An entry list the addon left out reads as no entries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
