import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const styles = {
  id: "01a05b01-48b2-7b95-9b72-f48b799f4e5c",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "styles",
  propertySlug: "styles",
  definition: "the rules a browser dresses a thing by",
  extensions: ["css"],
  toolResolvesPaths: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Rules are written in CSS.",
    },
    {
      invariantKind: "departure",
      statement: "A path in a stylesheet is a specifier a bundler resolves rather than a place.",
    },
    {
      invariantKind: "gap",
      statement: "A change moving what such a specifier reaches repoints that specifier.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
