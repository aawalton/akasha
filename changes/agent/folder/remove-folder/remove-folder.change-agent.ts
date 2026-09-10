import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const removeFolder = {
  id: "01a08281-d6e6-78ee-a0cc-ad533d8405ae",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "remove-folder",
  changeMode: "change-mode-remove",
  definition: "one folder and every file under it taken away",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The removal is left to the mechanical change taking a folder away.",
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
