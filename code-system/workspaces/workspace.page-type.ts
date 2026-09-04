import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { BiomeConfig } from "./properties/biome-config.named-file-property.ts"
import type { BunConfig } from "./properties/bun-config.named-file-property.ts"
import type { DockerIgnore } from "./properties/docker-ignore.named-file-property.ts"
import type { Lockfile } from "./properties/lockfile.named-file-property.ts"
import type { SecretsConfig } from "./properties/secrets-config.named-file-property.ts"
import type { TypescriptBaseConfig } from "./properties/typescript-base-config.named-file-property.ts"
import type { TypescriptBuildInfo } from "./properties/typescript-build-info.named-file-property.ts"
import type { TypescriptConfig } from "./properties/typescript-config.named-file-property.ts"
import type { WorkspaceGitIgnore } from "./properties/workspace-git-ignore.named-file-property.ts"
import type { WorkspaceManifest } from "./properties/workspace-manifest.named-file-property.ts"

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
}

export const workspace = {
  id: "01a06cbb-60a1-7163-bbdd-7ba51e6b3ed6",
  pageTypeSlug: "page-type",
  slug: "workspace",
  definition: "the tree a package manager installs every package in at once",
  pluralSlug: "workspaces",
  partSlugs: [
    "named-file-property/biome-config",
    "named-file-property/bun-config",
    "named-file-property/docker-ignore",
    "named-file-property/lockfile",
    "named-file-property/secrets-config",
    "named-file-property/typescript-base-config",
    "named-file-property/typescript-build-info",
    "named-file-property/typescript-config",
    "named-file-property/workspace-git-ignore",
    "named-file-property/workspace-manifest",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "workspace-manifest", required: true, many: false },
    { pagePropertySlug: "lockfile", required: true, many: false },
    { pagePropertySlug: "biome-config", required: true, many: false },
    { pagePropertySlug: "bun-config", required: true, many: false },
    { pagePropertySlug: "docker-ignore", required: true, many: false },
    { pagePropertySlug: "secrets-config", required: true, many: false },
    { pagePropertySlug: "typescript-base-config", required: true, many: false },
    { pagePropertySlug: "typescript-config", required: true, many: false },
    {
      pagePropertySlug: "typescript-build-info",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "workspace-git-ignore", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workspace holds its manifest at the root of its own folder.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace holds its lockfile beside that manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace manifest is no package's manifest.",
    },
    {
      invariantKind: "departure",
      statement: "What a workspace manifest names is reached from anywhere in the tree.",
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
      statement: "Every file the workspace root holds is claimed by a property here.",
    },
  ],
} as const satisfies PageType
