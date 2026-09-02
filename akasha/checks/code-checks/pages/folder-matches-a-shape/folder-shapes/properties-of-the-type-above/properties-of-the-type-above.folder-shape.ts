import type { FolderShape } from "../folder-shape.page-type.ts"

export const propertiesOfTheTypeAbove = {
  id: "01a05f26-edf0-717b-9c73-edea11fb6a86",
  pageTypeSlug: "folder-shape",
  slug: "properties-of-the-type-above",
  definition:
    "the shape of a folder named properties holding the properties the page type above it declares",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `properties`.",
    },
    {
      invariantKind: "departure",
      statement: "The folder above holds one page type and that page type says what belongs here.",
    },
    {
      invariantKind: "departure",
      statement: "A page is a property where `page-property` is anywhere above its page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page's slug is a property slug that page type declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A field declared by a record property beside a property page is declared by that page type too.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `properties` above which no page type sits is refused.",
    },
  ],
} as const satisfies FolderShape
