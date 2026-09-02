import type { TextProperty } from "@akasha/pages-system/text-property"

export type RustModuleName = string

export const rustModuleName = {
  id: "01a06040-f979-76e1-87ca-d456990e75c8",
  pageTypeSlug: "text-property",
  slug: "rust-module-name",
  propertySlug: "module-name",
  definition: "the name Cargo reads a module's file by",
  max: 100,
  nameFormatSlug: "name-format/lower-snake-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `mod` line names a module by its module name rather than by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A seam copies the page's Rust file to the module name.",
    },
    {
      invariantKind: "departure",
      statement: "A module name is unique within its crate alone.",
    },
    {
      invariantKind: "departure",
      statement: "A slug is unique across the whole of akasha.",
    },
    {
      invariantKind: "departure",
      statement: "The module a crate's run begins in is named `main`.",
    },
  ],
} as const satisfies TextProperty
