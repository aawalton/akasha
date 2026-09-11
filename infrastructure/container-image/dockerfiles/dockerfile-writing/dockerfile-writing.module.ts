import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dockerfileWriting = {
  id: "01a06865-abff-7009-bb75-4f5d740fd537",
  type: "module",
  slug: "dockerfile-writing",
  definition: "the Dockerfile written for a built image, from what that image states and imports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An image stating no extensions adds nothing to the Dockerfile written for it.",
    },
    {
      invariantKind: "departure",
      statement: "An image stating extensions its file is not there for is refused.",
    },
  ],
} as const satisfies Module
