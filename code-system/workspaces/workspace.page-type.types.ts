import type { Domain } from "../../domains/domain.page-type.ts"
import type { BiomeConfig } from "./properties/biome-config.file-property.ts"
import type { BunConfig } from "./properties/bun-config.file-property.ts"
import type { DockerIgnore } from "./properties/docker-ignore.file-property.ts"
import type { Lockfile } from "./properties/lockfile.file-property.ts"
import type { PackageDirectory } from "./properties/package-directory.build-folder-property.ts"
import type { SecretsConfig } from "./properties/secrets-config.file-property.ts"
import type { TypescriptBaseConfig } from "./properties/typescript-base-config.file-property.ts"
import type { TypescriptBuildInfo } from "./properties/typescript-build-info.file-property.ts"
import type { TypescriptConfig } from "./properties/typescript-config.file-property.ts"
import type { WorkspaceGitIgnore } from "./properties/workspace-git-ignore.file-property.ts"
import type { WorkspaceManifest } from "./properties/workspace-manifest.file-property.ts"

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
}
