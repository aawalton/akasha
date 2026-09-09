import type { Workspace } from "./code-system/workspaces/workspace.page-type.ts"

export const akashaWorkspace = {
  id: "01a06cbb-60a1-73d5-88dc-0ffa3d84c96d",
  pageTypeSlug: "workspace",
  type: "workspace",
  slug: "akasha-workspace",
  definition: "every package in this tree, installed as one",
  workspaceManifest: "json",
  lockfile: "lock",
  biomeConfig: "json",
  bunConfig: "toml",
  dockerIgnore: "dockerignore",
  secretsConfig: "yaml",
  typescriptBaseConfig: "json",
  typescriptConfig: "json",
  workspaceGitIgnore: "gitignore",
  packageDirectory: true,
} as const satisfies Workspace
