import type { Workspace } from "akasha/code/workspaces/workspace.page-type.types.ts"

export const akashaWorkspace = {
  id: "01a06cbb-60a1-73d5-88dc-0ffa3d84c96d",
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
  toolReached: [
    "@biomejs/biome",
    "@vscode/ripgrep",
    "@capacitor/cli",
    "@capacitor/ios",
    "@capacitor/app",
    "@capacitor/filesystem",
    "@capacitor/push-notifications",
    "@capacitor/status-bar",
  ],
} as const satisfies Workspace
