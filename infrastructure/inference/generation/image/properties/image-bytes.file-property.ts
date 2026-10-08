import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const imageBytes = {
  id: "01a0c5a1-0c16-7cc7-a193-157978ff825a",
  type: "page-type/file-property",
  slug: "image-bytes",
  propertySlug: "bytes",
  definition: "the picture itself",
  extensions: ["png", "jpg"],
  runsFileLength: false,
  holdsBytes: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image's bytes are a file beside that image's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture is held under the ending its bytes arrived with, png or jpg.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image keeping no ending beside it is a png.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are held out of the commit, and the page beside them is committed.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-21T20:21:01.078Z",
  updatedAt: "2026-09-21T22:24:18.000Z",
} as const satisfies FileProperty
