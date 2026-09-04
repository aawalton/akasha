import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const dockerfiles = {
  id: "01a06865-abff-7000-a441-7a4caa49c9d9",
  pageTypeSlug: "workspace-package",
  slug: "dockerfiles",
  definition: "the Dockerfile each service is built from, written from what the service imports",
  manifest: "json",
  partSlugs: [
    "module/dockerfile-builder",
    "module/dockerfile-bun-service",
    "module/dockerfile-deps",
    "module/dockerfile-extensions",
    "module/dockerfile-imports",
    "module/dockerfile-nextjs",
    "module/dockerfile-services",
    "module/dockerfile-tool-image",
    "module/dockerfile-writing",
  ],
} as const satisfies WorkspacePackage
