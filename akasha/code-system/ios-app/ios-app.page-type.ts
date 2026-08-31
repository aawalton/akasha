import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { WorkspacePackage } from "../workspace-package/workspace-package.page-type.ts"
import type { CapacitorConfig } from "./properties/capacitor-config.named-file-property.ts"
import type { GitIgnore } from "./properties/git-ignore.named-file-property.ts"

export type IosApp = WorkspacePackage & {
  capacitorConfig: CapacitorConfig
  gitIgnore: GitIgnore
}

export const iosApp = {
  id: "01a05821-5723-7e65-88e2-045d3e49cb23",
  pageTypeSlug: "page-type",
  slug: "ios-app",
  definition: "the app on a phone and the shell it runs in",
  pluralSlug: "ios-apps",
  partSlugs: [
    "ios-app/alanwalton",
    "ios-app/smilingjenny",
    "named-file-property/capacitor-config",
    "named-file-property/git-ignore",
  ],
  extendsSlug: "page-type/workspace-package",
  properties: [
    { pagePropertySlug: "capacitor-config", required: true, many: false },
    { pagePropertySlug: "git-ignore", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An app is installed by the workspace rather than on its own.",
    },
    {
      invariantKind: "departure",
      statement: "The programs an app builds stand among its parts.",
    },
  ],
} as const satisfies PageType
