import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const removeFolderPackage = {
  id: "01a08283-b8fd-74bd-bd06-dee89a6470ac",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "remove-folder-package",
  changeMode: "change-mode-remove",
  definition: "one workspace package taken away with the folder that package sits in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The removal is left to the mechanical change taking a package's folder away.",
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
