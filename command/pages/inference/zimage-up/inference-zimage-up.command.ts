import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceZimageUp = {
  id: "01a0e36d-53a8-7f2c-acb3-effe08fa9d29",
  type: "page-type/command",
  slug: "inference-zimage-up",
  definition: "the command starting the Z-Image container with the card attached",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The container is started by the zimage-up script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container already running is left running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A script ending at anything but zero is refused with every line the script wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent starts the container here, since its own shell reaches no container.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here provisions the weights.",
    },
  ],
  name: "zimage-up",
  maxWallSeconds: 1800,
  arguments: [],
} as const satisfies Command
