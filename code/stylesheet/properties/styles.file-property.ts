import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const styles = {
  id: "01a05b01-48b2-7b95-9b72-f48b799f4e5c",
  type: "page-type/file-property",
  slug: "styles",
  propertySlug: "styles",
  definition: "the rules dressing a thing in a browser",
  extensions: ["css"],
  toolResolvesPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Rules are written in CSS.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path in a stylesheet is a specifier a bundler resolves rather than a place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change moving what such a specifier reaches repoints that specifier.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T03:26:45.938Z",
  updatedAt: "2026-09-24T22:27:46.000Z",
} as const satisfies FileProperty
