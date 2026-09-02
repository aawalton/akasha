import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCharactersCharacterUi = {
  id: "01a06360-7480-7000-9774-4c44f4a2124c",
  pageTypeSlug: "workspace-package",
  slug: "temper-characters-character-ui",
  definition: "the character builds a player keeps, listed, edited and shared",
  manifest: "json",
  partSlugs: ["module/use-characters"],
} as const satisfies WorkspacePackage
