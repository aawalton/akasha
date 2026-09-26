import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const inferenceCommand = {
  id: "01a0685e-fd50-7e21-9c04-6b31a0f2c7de",
  type: "page-type/domain",
  slug: "inference-command",
  definition: "the commands an agent runs on the models",
  parts: ["module/inference-answering"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here has the slug the old ops command's path was spelled with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here is called with spaces between its levels rather than by its slug.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A command here keeps no record of a run apart from the page of what it made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here reads a service from that service's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hosts a command here reads are pages rather than a list in code.",
    },
  ],
} as const satisfies Domain
