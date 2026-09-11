import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const renameFolderImports = {
  id: "01a08dc4-e449-7081-b339-7a0d9b4ca947",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "rename-folder-imports",
  changeMode: "change-mode-rename",
  definition: "every relative path a folder's bodies name spelled from the checkout root instead",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A relative path is spelled as the root package name joined to the path from the checkout root.",
    },
    {
      invariantKind: "departure",
      statement: "Every body under the folder named is read.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not TypeScript is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A relative path landing on no body the world holds is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A relative path climbing above the checkout root is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming a package is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming no module is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no TypeScript is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder whose bodies name no relative path is refused.",
    },
    {
      invariantKind: "absence",
      statement: "No file is moved here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "No manifest is read here.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
