import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const inferenceCommands = {
  id: "01a0685e-fd50-7e21-9c04-6b31a0f2c7de",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "inference-commands",
  definition: "what an agent runs by name over the models the inference hosts serve",
  parts: ["module/inference-answering"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A command here files a run row for the work that command sends to a model.",
    },
    {
      invariantKind: "departure",
      statement: "A run row is filed whether the work finished or failed.",
    },
    {
      invariantKind: "gap",
      statement: "The run rows a command here files are akasha pages.",
    },
    {
      invariantKind: "departure",
      statement: "A command here reads a service from that service's own page.",
    },
    {
      invariantKind: "gap",
      statement: "The hosts a command here reads are pages rather than a list in code.",
    },
  ],
} as const satisfies Domain
