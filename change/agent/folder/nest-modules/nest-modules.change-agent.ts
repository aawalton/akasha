import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const nestModules = {
  id: "01a095f8-a367-726d-98cb-052fe5052d45",
  type: "page-type/change-agent",
  slug: "nest-modules",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "every module's folder carried under a modules folder beside the page above it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module's folder is carried under a `modules` folder beside where it sat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder keeps the name the folder has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module already under a `modules` folder is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module under a `.server` folder is passed over too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many folders one run carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no count carries every folder that is not under one already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run carrying no folder answers no edit and says why.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One folder refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each module is looked up again as the run leaves the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module a folder already carried is passed over on that lookup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move is left to the mechanical change moving a folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page's own body.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
