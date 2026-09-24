import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const inferenceCommand = {
  id: "01a0685e-fd50-7e21-9c04-6b31a0f2c7de",
  type: "page-type/domain",
  slug: "inference-command",
  definition: "what an agent runs by name over the models the inference hosts serve",
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
      decisionKind: "decision-kind/departure",
      statement: "A command here files a run row for the work that command sends to a model.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run row is filed whether the work finished or failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run rows a command here files are akasha pages.",
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
