import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const imageInputs = {
  id: "01a08da2-9e44-7155-8ecf-d7ded3c83ef1",
  pageTypeSlug: "module",
  type: "module",
  slug: "image-inputs",
  definition: "what a built image is built from, and the hash naming those inputs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The inputs are what the Dockerfile copies out of the context.",
    },
    {
      invariantKind: "departure",
      statement: "The inputs are read at the commit HEAD is at rather than off the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A path a second stage copies is no input, because an earlier stage made it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A copied path is named from the root rather than from the folder the build is handed.",
    },
  ],
} as const satisfies Module
