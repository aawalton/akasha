import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const rustModuleName = {
  id: "01a06040-f979-76e1-87ca-d456990e75c8",
  type: "page-type/text-property",
  slug: "rust-module-name",
  propertySlug: "module-name",
  definition: "the name by which Cargo reads a module's file",
  maxLength: 100,
  nameFormat: "name-format/lower-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A `mod` line names a module by its module name rather than by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seam copies the page's Rust file to the module name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module name is unique within its crate alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug is unique across the whole of akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The module a crate's run begins in is named `main`.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
