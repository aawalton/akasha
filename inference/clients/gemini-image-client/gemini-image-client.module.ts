import type { Module } from "@akasha/code-system/module"

export const geminiImageClient = {
  id: "01a0682d-8ef5-7004-ae3d-4d4efd7dcff0",
  pageTypeSlug: "module",
  slug: "gemini-image-client",
  definition: "an image edited by Gemini from a prompt and reference images",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The image being edited is carried inline as base64 rather than uploaded.",
    },
    {
      invariantKind: "departure",
      statement: "A reference image follows the edited image in the same part list.",
    },
    {
      invariantKind: "departure",
      statement: "Both text and image are asked for back, and the image alone is kept.",
    },
    {
      invariantKind: "departure",
      statement: "The first inline part carrying bytes is the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A response carrying no inline image part is at fault in its data.",
    },
    {
      invariantKind: "departure",
      statement: "A mime type is read from the file's extension rather than from its bytes.",
    },
    {
      invariantKind: "departure",
      statement: "Transcoding shells out to ImageMagick over a pipe rather than a temp file.",
    },
  ],
} as const satisfies Module
