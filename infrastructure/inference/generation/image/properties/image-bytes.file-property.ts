import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const imageBytes = {
  id: "01a0c5a1-0c16-7cc7-a193-157978ff825a",
  type: "page-type/file-property",
  slug: "image-bytes",
  propertySlug: "bytes",
  definition: "the picture itself",
  extensions: ["png"],
  runsFileLength: false,
  holdsBytes: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image's bytes are a file beside that image's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every image is held as a png, whatever ending the picture arrived under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are held out of the commit, and the page beside them is committed.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
