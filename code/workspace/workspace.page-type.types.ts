import type { BiomeConfig } from "akasha/code/workspace/properties/biome-config.file-property.types.ts"
import type { BunConfig } from "akasha/code/workspace/properties/bun-config.file-property.types.ts"
import type { DockerIgnore } from "akasha/code/workspace/properties/docker-ignore.file-property.types.ts"
import type { EditorSettings } from "akasha/code/workspace/properties/editor-settings.file-property.types.ts"
import type { Lockfile } from "akasha/code/workspace/properties/lockfile.file-property.types.ts"
import type { PackageDirectory } from "akasha/code/workspace/properties/package-directory.build-folder-property.types.ts"
import type { SecretsConfig } from "akasha/code/workspace/properties/secrets-config.file-property.types.ts"
import type { ToolReached } from "akasha/code/workspace/properties/tool-reached.text-property.types.ts"
import type { TypescriptBaseConfig } from "akasha/code/workspace/properties/typescript-base-config.file-property.types.ts"
import type { TypescriptBuildInfo } from "akasha/code/workspace/properties/typescript-build-info.file-property.types.ts"
import type { WorkspaceGitIgnore } from "akasha/code/workspace/properties/workspace-git-ignore.file-property.types.ts"
import type { WorkspaceManifest } from "akasha/code/workspace/properties/workspace-manifest.file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { TypescriptConfig } from "akasha/domain/properties/typescript-config.file-property.types.ts"

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
  editorSettings: EditorSettings
}
