import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addImageMakingFromRuns = {
  id: "01a0de8f-b287-7d6c-a956-28aebf19da3e",
  type: "page-type/change-agent",
  slug: "add-image-making-from-runs",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "how each image was made, stated on its page from the run that made it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The runs are read off every generation log the tree holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completed generate, edit or upscale made the image its output's sha256 names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where several runs made one image, the run that started first is stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The values are worked out by `image-making`, as generation works them out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image stating its service already is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image no run made is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many images one run states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run whose making cannot be read refuses the whole change and names its image.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This change goes once the generation log is gone.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
