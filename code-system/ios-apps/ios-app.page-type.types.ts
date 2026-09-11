import type { AppIcon } from "akasha/code-system/ios-apps/properties/app-icon.file-property.ts"
import type { AppProfileName } from "akasha/code-system/ios-apps/properties/app-profile-name.text-property.types.ts"
import type { AscCapabilities } from "akasha/code-system/ios-apps/properties/asc-capabilities.text-property.types.ts"
import type { BuildScript } from "akasha/code-system/ios-apps/properties/build-script.relation-property.types.ts"
import type { BundleId } from "akasha/code-system/ios-apps/properties/bundle-id.text-property.types.ts"
import type { CapacitorConfig } from "akasha/code-system/ios-apps/properties/capacitor-config.file-property.ts"
import type { DefaultDeviceUdid } from "akasha/code-system/ios-apps/properties/default-device-udid.text-property.types.ts"
import type { DevelopmentTeam } from "akasha/code-system/ios-apps/properties/development-team.text-property.types.ts"
import type { DisplayName } from "akasha/code-system/ios-apps/properties/display-name.text-property.types.ts"
import type { GitIgnore } from "akasha/code-system/ios-apps/properties/git-ignore.file-property.ts"
import type { IconDrawing } from "akasha/code-system/ios-apps/properties/icon-drawing.file-property.ts"
import type { MacBuildLockDir } from "akasha/code-system/ios-apps/properties/mac-build-lock-dir.text-property.types.ts"
import type { MacBuildNumberFile } from "akasha/code-system/ios-apps/properties/mac-build-number-file.text-property.types.ts"
import type { MacWwwStagingRel } from "akasha/code-system/ios-apps/properties/mac-www-staging-rel.text-property.types.ts"
import type { MarketingVersion } from "akasha/code-system/ios-apps/properties/marketing-version.text-property.types.ts"
import type { NativeShellRepoPath } from "akasha/code-system/ios-apps/properties/native-shell-repo-path.text-property.types.ts"
import type { Programs } from "akasha/code-system/ios-apps/properties/programs.relation-property.types.ts"
import type { SpaSourcePath } from "akasha/code-system/ios-apps/properties/spa-source-path.text-property.types.ts"
import type { StageScript } from "akasha/code-system/ios-apps/properties/stage-script.relation-property.types.ts"
import type { WebDirectory } from "akasha/code-system/ios-apps/properties/web-directory.build-folder-property.types.ts"
import type { WebEntry } from "akasha/code-system/ios-apps/properties/web-entry.file-property.ts"
import type { WebEnvPath } from "akasha/code-system/ios-apps/properties/web-env-path.text-property.types.ts"
import type { WidgetBundleId } from "akasha/code-system/ios-apps/properties/widget-bundle-id.text-property.types.ts"
import type { WidgetProfileName } from "akasha/code-system/ios-apps/properties/widget-profile-name.text-property.types.ts"
import type { WorkspacePackage } from "akasha/code-system/workspace-packages/workspace-package.page-type.types.ts"

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
