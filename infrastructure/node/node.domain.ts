import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const node = {
  id: "01a0675b-16f6-70fc-b7f0-5a700f512e86",
  type: "page-type/domain",
  slug: "node",
  definition: "one machine in a cluster",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "node" },
    { partOfSpeech: "part-of-speech/noun", spelling: "nodes" },
  ],
  parts: ["manifest/nvidia-device-plugin"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A node's configuration is declared in code and applied whole rather than changed on the machine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A node's disks are matched by each disk's own identity rather than by device path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The GPU memory a node can use is measured from the card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The GPU memory a node can use falls short of the card's nominal size.",
    },
  ],
} as const satisfies Domain
