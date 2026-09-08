import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const moveFolder = {
  id: "01a07c54-a9b0-797b-add8-8e9d734c5213",
  pageTypeSlug: "change-agent",
  slug: "move-folder",
  changeModeSlug: "change-mode-move",
  definition: "one folder and every file under it carried to another path",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The carry is left to the mechanical change carrying a folder.",
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
} as const satisfies ChangeAgent
