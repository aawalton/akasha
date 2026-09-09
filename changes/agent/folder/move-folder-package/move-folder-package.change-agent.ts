import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const moveFolderPackage = {
  id: "01a07c5e-055f-7000-a6d5-243a29d1858a",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "move-folder-package",
  changeMode: "change-mode-move",
  definition: "a workspace package moved to another folder, taking the slug that folder names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The move is left to the mechanical change moving a package's folder.",
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
