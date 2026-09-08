import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const moveFolderPackage = {
  id: "01a07c5e-055f-7000-a6d5-243a29d1858a",
  pageTypeSlug: "change-agent",
  slug: "move-folder-package",
  changeModeSlug: "change-mode-move",
  definition: "a workspace package carried to another folder, taking the slug that folder names",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The carry is left to the mechanical change carrying a package's folder.",
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
  changeKindSlug: "change-checked",
} as const satisfies ChangeAgent
