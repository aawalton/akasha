import type { WorkspacePackage } from "../../../code-system/workspace-packages/workspace-package.page-type.ts"

export const reading = {
  id: "01a0657b-06a5-7f75-b22c-a538bfe3ba53",
  pageTypeSlug: "workspace-package",
  slug: "reading",
  definition: "how the next thing for Alan to read is chosen",
  manifest: "json",
  partSlugs: [
    "module/reading-shapes",
    "module/resume-chapter",
    "module/story-catalog",
    "module/chapter-choosing",
    "module/story-choosing",
    "module/offline-reading",
  ],
} as const satisfies WorkspacePackage
