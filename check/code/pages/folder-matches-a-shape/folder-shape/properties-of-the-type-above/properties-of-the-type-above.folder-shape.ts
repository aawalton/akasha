import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const propertiesOfTheTypeAbove = {
  id: "01a05f26-edf0-717b-9c73-edea11fb6a86",
  type: "folder-shape",
  slug: "properties-of-the-type-above",
  definition:
    "the shape of a folder named properties with the properties the page type above it declares",
  code: "ts",
  test: "ts",
  enabled: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is named `properties`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The folder above has one page type and that page type declares the properties belonging here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is a property where `page-property` is anywhere above its page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's slug is a property slug that page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file beside a property page is a file that property page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A field declared by a property page beside a property page is declared by that page type too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named `properties` above which no page type sits is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that is neither a page nor a file beside a page is refused.",
    },
  ],
} as const satisfies FolderShape
