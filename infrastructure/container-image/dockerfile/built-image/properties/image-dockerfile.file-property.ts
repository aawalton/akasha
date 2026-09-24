import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const imageDockerfile = {
  id: "01a0d580-9637-7929-a257-b95b33f2ea5b",
  type: "page-type/file-property",
  slug: "image-dockerfile",
  propertySlug: "dockerfile",
  definition: "the Dockerfile an image is built from",
  extensions: ["dockerfile"],
  fileName: "Dockerfile",
  generated: true,
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The `dockerfile-writing` change generator writes this file.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
