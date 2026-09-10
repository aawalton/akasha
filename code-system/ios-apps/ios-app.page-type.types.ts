import type { WorkspacePackage } from "../workspace-packages/workspace-package.page-type.types.ts"
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
