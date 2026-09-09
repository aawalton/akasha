import type { PageType } from "@akasha/pages/page-type"
import type { WorkspacePackage } from "../workspace-packages/workspace-package.page-type.ts"
import type { AppIcon } from "./properties/app-icon.file-property.ts"
import type { AppProfileName } from "./properties/app-profile-name.text-property.ts"
import type { AscCapabilities } from "./properties/asc-capabilities.text-property.ts"
import type { BuildScript } from "./properties/build-script.relation-property.ts"
import type { BundleId } from "./properties/bundle-id.text-property.ts"
import type { CapacitorConfig } from "./properties/capacitor-config.file-property.ts"
import type { DefaultDeviceUdid } from "./properties/default-device-udid.text-property.ts"
import type { DevelopmentTeam } from "./properties/development-team.text-property.ts"
import type { DisplayName } from "./properties/display-name.text-property.ts"
import type { GitIgnore } from "./properties/git-ignore.file-property.ts"
import type { IconDrawing } from "./properties/icon-drawing.file-property.ts"
import type { MacBuildLockDir } from "./properties/mac-build-lock-dir.text-property.ts"
import type { MacBuildNumberFile } from "./properties/mac-build-number-file.text-property.ts"
import type { MacWwwStagingRel } from "./properties/mac-www-staging-rel.text-property.ts"
import type { MarketingVersion } from "./properties/marketing-version.text-property.ts"
import type { NativeShellRepoPath } from "./properties/native-shell-repo-path.text-property.ts"
import type { Programs } from "./properties/programs.relation-property.ts"
import type { SpaSourcePath } from "./properties/spa-source-path.text-property.ts"
import type { StageScript } from "./properties/stage-script.relation-property.ts"
import type { WebDirectory } from "./properties/web-directory.build-folder-property.ts"
import type { WebEntry } from "./properties/web-entry.file-property.ts"
import type { WebEnvPath } from "./properties/web-env-path.text-property.ts"
import type { WidgetBundleId } from "./properties/widget-bundle-id.text-property.ts"
import type { WidgetProfileName } from "./properties/widget-profile-name.text-property.ts"

export type IosApp = WorkspacePackage & {
  appProfileName: AppProfileName
  ascCapabilities?: AscCapabilities
  buildScript?: BuildScript
  bundleId: BundleId
  capacitorConfig: CapacitorConfig
  defaultDeviceUdid?: DefaultDeviceUdid
  developmentTeam: DevelopmentTeam
  displayName: DisplayName
  gitIgnore: GitIgnore
  icon?: AppIcon
  iconDrawing?: IconDrawing
  macBuildLockDir?: MacBuildLockDir
  macBuildNumberFile?: MacBuildNumberFile
  macWwwStagingRel?: MacWwwStagingRel
  marketingVersion: MarketingVersion
  nativeShellRepoPath?: NativeShellRepoPath
  programs?: Programs
  spaSourcePath?: SpaSourcePath
  stageScript?: StageScript
  webEntry?: WebEntry
  webEnvPath?: WebEnvPath
  widgetBundleId?: WidgetBundleId
  widgetProfileName?: WidgetProfileName
  webDirectory?: WebDirectory
}

export const iosApp = {
  id: "01a05821-5723-7e65-88e2-045d3e49cb23",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ios-app",
  definition: "the app on a phone and the shell it runs in",
  pluralSlug: "ios-apps",
  parts: [
    "file-property/app-icon",
    "file-property/capacitor-config",
    "file-property/icon-drawing",
    "file-property/web-entry",
    "ios-app/alanwalton",
    "ios-app/atlas",
    "ios-app/smilingjenny",
    "module/app-building",
    "file-property/git-ignore",
    "relation-property/build-script",
    "relation-property/programs",
    "relation-property/stage-script",
    "shell-script/build-sim",
    "shell-script/build-stamp",
    "shell-script/monarch-url",
    "shell-script/stage-web-entry",
    "shell-script/widget-components",
    "shell-script/write-capacitor-config",
    "text-property/app-profile-name",
    "text-property/asc-capabilities",
    "text-property/bundle-id",
    "text-property/default-device-udid",
    "text-property/development-team",
    "text-property/display-name",
    "text-property/mac-build-lock-dir",
    "text-property/mac-build-number-file",
    "text-property/mac-www-staging-rel",
    "text-property/marketing-version",
    "text-property/native-shell-repo-path",
    "text-property/spa-source-path",
    "text-property/web-env-path",
    "text-property/widget-bundle-id",
    "text-property/widget-profile-name",
    "build-folder-property/web-directory",
  ],
  extends: ["page-type/workspace-package"],
  properties: [
    { pageProperty: "text-property/app-profile-name", required: true, many: false },
    {
      pageProperty: "text-property/asc-capabilities",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "relation-property/build-script", required: false, many: false },
    { pageProperty: "text-property/bundle-id", required: true, many: false },
    { pageProperty: "file-property/capacitor-config", required: true, many: false },
    { pageProperty: "text-property/default-device-udid", required: false, many: false },
    { pageProperty: "text-property/development-team", required: true, many: false },
    { pageProperty: "text-property/display-name", required: true, many: false },
    { pageProperty: "file-property/git-ignore", required: true, many: false },
    { pageProperty: "file-property/app-icon", required: false, many: false },
    { pageProperty: "file-property/icon-drawing", required: false, many: false },
    { pageProperty: "text-property/mac-build-lock-dir", required: false, many: false },
    { pageProperty: "text-property/mac-build-number-file", required: false, many: false },
    { pageProperty: "text-property/mac-www-staging-rel", required: false, many: false },
    { pageProperty: "text-property/marketing-version", required: true, many: false },
    { pageProperty: "text-property/native-shell-repo-path", required: false, many: false },
    {
      pageProperty: "relation-property/programs",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/spa-source-path", required: false, many: false },
    { pageProperty: "relation-property/stage-script", required: false, many: false },
    { pageProperty: "file-property/web-entry", required: false, many: false },
    { pageProperty: "text-property/web-env-path", required: false, many: false },
    { pageProperty: "text-property/widget-bundle-id", required: false, many: false },
    { pageProperty: "text-property/widget-profile-name", required: false, many: false },
    { pageProperty: "build-folder-property/web-directory", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An app is installed by the workspace rather than on its own.",
    },
    {
      invariantKind: "departure",
      statement: "The programs an app builds are the ones its page names.",
    },
    {
      invariantKind: "departure",
      statement: "A script one app runs sits beside that app.",
    },
    {
      invariantKind: "departure",
      statement: "A script more than one app runs sits above all those apps.",
    },
    {
      invariantKind: "departure",
      statement: "An app's web directory has the site a build put there.",
    },
    {
      invariantKind: "departure",
      statement: "The config Capacitor reads is made from the config file beside the page.",
    },
    {
      invariantKind: "gap",
      statement: "Every script an app's manifest names exists in akasha.",
    },
    {
      invariantKind: "departure",
      statement: "Every program an app builds is signed for the one team the app names.",
    },
    {
      invariantKind: "departure",
      statement: "An app's icon is made from its drawing by the change to that drawing.",
    },
    {
      invariantKind: "departure",
      statement: "A build names a commit rather than a branch.",
    },
  ],
} as const satisfies PageType
