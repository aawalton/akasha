import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
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

export const workspace = {
  id: "01a06cbb-60a1-7163-bbdd-7ba51e6b3ed6",
  pageTypeSlug: "page-type",
  slug: "workspace",
  definition: "the tree a package manager installs every package in at once",
  pluralSlug: "workspaces",
  parts: [
    "file-property/biome-config",
    "file-property/bun-config",
    "file-property/docker-ignore",
    "file-property/lockfile",
    "file-property/secrets-config",
    "file-property/typescript-base-config",
    "file-property/typescript-build-info",
    "file-property/typescript-config",
    "file-property/workspace-git-ignore",
    "file-property/workspace-manifest",
    "build-folder-property/package-directory",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "file-property/workspace-manifest", required: true, many: false },
    { pagePropertySlug: "file-property/lockfile", required: true, many: false },
    { pagePropertySlug: "file-property/biome-config", required: true, many: false },
    { pagePropertySlug: "file-property/bun-config", required: true, many: false },
    { pagePropertySlug: "file-property/docker-ignore", required: true, many: false },
    { pagePropertySlug: "file-property/secrets-config", required: true, many: false },
    { pagePropertySlug: "file-property/typescript-base-config", required: true, many: false },
    { pagePropertySlug: "file-property/typescript-config", required: true, many: false },
    {
      pagePropertySlug: "file-property/typescript-build-info",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "file-property/workspace-git-ignore", required: true, many: false },
    { pagePropertySlug: "build-folder-property/package-directory", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workspace has its manifest at the root of its own folder.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace has its lockfile beside that manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace manifest is no package's manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A package a workspace manifest names is reached from anywhere in the tree.",
    },
    {
      invariantKind: "departure",
      statement: "The package manager rather than an author writes the lockfile.",
    },
    {
      invariantKind: "departure",
      statement: "One lockfile answers for every package the workspace installs.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the workspace root has is claimed by a property here.",
    },
  ],
} as const satisfies PageType
