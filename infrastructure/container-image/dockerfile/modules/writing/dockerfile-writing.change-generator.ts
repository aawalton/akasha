import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const dockerfileWriting = {
  id: "01a06865-abff-7009-bb75-4f5d740fd537",
  type: "page-type/change-generator",
  slug: "dockerfile-writing",
  definition: "the Dockerfile written for a built image, from what that image states and imports",
  code: "ts",
  runsAfter: ["change-generator/group-writing"],
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every built image's Dockerfile is written beside its page as the change leaves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an image imports is read from the change rather than from the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Dockerfile the same as the one already written is no file change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change touching no code, no manifest, no patch and no image writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image stating no extensions adds nothing to the Dockerfile written for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image stating extensions its file is not there for is refused.",
    },
  ],
} as const satisfies ChangeGenerator
