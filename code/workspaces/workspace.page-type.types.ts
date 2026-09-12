import type { BiomeConfig } from "akasha/code/workspaces/properties/biome-config.file-property.types.ts"
import type { BunConfig } from "akasha/code/workspaces/properties/bun-config.file-property.types.ts"
import type { DockerIgnore } from "akasha/code/workspaces/properties/docker-ignore.file-property.types.ts"
import type { Lockfile } from "akasha/code/workspaces/properties/lockfile.file-property.types.ts"
import type { PackageDirectory } from "akasha/code/workspaces/properties/package-directory.build-folder-property.types.ts"
import type { SecretsConfig } from "akasha/code/workspaces/properties/secrets-config.file-property.types.ts"
import type { ToolReached } from "akasha/code/workspaces/properties/tool-reached.text-property.types.ts"
import type { TypescriptBaseConfig } from "akasha/code/workspaces/properties/typescript-base-config.file-property.types.ts"
import type { TypescriptBuildInfo } from "akasha/code/workspaces/properties/typescript-build-info.file-property.types.ts"
import type { WorkspaceGitIgnore } from "akasha/code/workspaces/properties/workspace-git-ignore.file-property.types.ts"
import type { WorkspaceManifest } from "akasha/code/workspaces/properties/workspace-manifest.file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { TypescriptConfig } from "akasha/domains/properties/typescript-config.file-property.types.ts"

export type Workspace = Domain & {
  workspaceManifest: WorkspaceManifest
  lockfile: Lockfile
  biomeConfig: BiomeConfig
  bunConfig: BunConfig
  dockerIgnore: DockerIgnore
  secretsConfig: SecretsConfig
  typescriptBaseConfig: TypescriptBaseConfig
  typescriptConfig: TypescriptConfig
  typescriptBuildInfo?: TypescriptBuildInfo
  workspaceGitIgnore: WorkspaceGitIgnore
  packageDirectory?: PackageDirectory
  toolReached?: ToolReached
}
