import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const moveFolder = {
  id: "01a07c54-a9b0-797b-add8-8e9d734c5213",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "move-folder",
  changeMode: "change-mode-move",
  definition: "one folder and every file under it moved to another path",
  code: "ts",
  test: "ts",
  invariants: [
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
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
