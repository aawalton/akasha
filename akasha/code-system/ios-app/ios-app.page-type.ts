import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { WorkspacePackage } from "../workspace-package/workspace-package.page-type.ts"
import type { BundleId } from "./properties/bundle-id.text-property.ts"
import type { CapacitorConfig } from "./properties/capacitor-config.file-property.ts"
import type { DisplayName } from "./properties/display-name.text-property.ts"
import type { GitIgnore } from "./properties/git-ignore.named-file-property.ts"
import type { IconDrawing } from "./properties/icon-drawing.file-property.ts"
import type { WebEntry } from "./properties/web-entry.file-property.ts"

export type IosApp = WorkspacePackage & {
  bundleId: BundleId
  capacitorConfig: CapacitorConfig
  displayName: DisplayName
  gitIgnore: GitIgnore
  iconDrawing?: IconDrawing
  webEntry?: WebEntry
}

export const iosApp = {
  id: "01a05821-5723-7e65-88e2-045d3e49cb23",
  pageTypeSlug: "page-type",
  slug: "ios-app",
  definition: "the app on a phone and the shell it runs in",
  pluralSlug: "ios-apps",
  partSlugs: [
    "file-property/capacitor-config",
    "file-property/icon-drawing",
    "file-property/web-entry",
    "ios-app/alanwalton",
    "ios-app/smilingjenny",
    "named-file-property/git-ignore",
    "shell-script/build-stamp",
    "shell-script/monarch-url",
    "shell-script/stage-web-entry",
    "shell-script/widget-components",
    "shell-script/write-capacitor-config",
    "text-property/bundle-id",
    "text-property/display-name",
  ],
  extendsSlug: "page-type/workspace-package",
  properties: [
    { pagePropertySlug: "bundle-id", required: true, many: false },
    { pagePropertySlug: "capacitor-config", required: true, many: false },
    { pagePropertySlug: "display-name", required: true, many: false },
    { pagePropertySlug: "git-ignore", required: true, many: false },
    { pagePropertySlug: "icon-drawing", required: false, many: false },
    { pagePropertySlug: "web-entry", required: false, many: false },
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
    {
      invariantKind: "departure",
      statement: "A script one app runs stands beside that app.",
    },
    {
      invariantKind: "departure",
      statement: "A script more than one app runs stands above them all.",
    },
    {
      invariantKind: "departure",
      statement: "An app's web directory holds what a build put there.",
    },
    {
      invariantKind: "departure",
      statement: "The config Capacitor reads is made from the one standing beside the page.",
    },
    {
      invariantKind: "gap",
      statement: "Every script an app's manifest names stands in akasha.",
    },
    {
      invariantKind: "constraint",
      statement: "An app's icon is a picture rather than text.",
    },
    {
      invariantKind: "departure",
      statement: "An app's icon is made from its drawing by whoever changes the drawing.",
    },
  ],
} as const satisfies PageType
