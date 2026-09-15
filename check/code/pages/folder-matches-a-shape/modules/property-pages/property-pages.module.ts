import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyPages = {
  id: "01a09c99-72a0-7ed5-a56f-d1e08195ecc9",
  type: "module",
  slug: "property-pages",
  definition: "how a folder of property pages is judged, whatever names that folder",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page in the folder is of a page type extending `page-property`.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is neither a page nor a file beside one is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page that page states nowhere is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the page above the folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the name of the folder it judges.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a folder for holding no page.",
    },
  ],
} as const satisfies Module
