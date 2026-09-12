import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const nestModules = {
  id: "01a095f8-a367-726d-98cb-052fe5052d45",
  type: "change-agent",
  slug: "nest-modules",
  changeMode: "change-mode-move",
  definition: "every module's folder carried under a modules folder beside the page above it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module's folder is carried under a `modules` folder beside where it sat.",
    },
    {
      invariantKind: "departure",
      statement: "The folder keeps the name the folder has.",
    },
    {
      invariantKind: "departure",
      statement: "A module already under a `modules` folder is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A module under a `.server` folder is passed over too.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many folders one run carries.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count carries every folder that is not under one already.",
    },
    {
      invariantKind: "departure",
      statement: "A run carrying no folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One folder refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "Each module is looked up again as the run leaves the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A module a folder already carried is passed over on that lookup.",
    },
    {
      invariantKind: "departure",
      statement: "The move is left to the mechanical change moving a folder.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's own body.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
