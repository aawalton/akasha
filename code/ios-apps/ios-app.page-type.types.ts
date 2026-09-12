import type { AppIcon } from "akasha/code/ios-apps/properties/app-icon.file-property.types.ts"
import type { AppProfileName } from "akasha/code/ios-apps/properties/app-profile-name.text-property.types.ts"
import type { AscCapabilities } from "akasha/code/ios-apps/properties/asc-capabilities.text-property.types.ts"
import type { BuildScript } from "akasha/code/ios-apps/properties/build-script.relation-property.types.ts"
import type { BundleId } from "akasha/code/ios-apps/properties/bundle-id.text-property.types.ts"
import type { CapacitorConfig } from "akasha/code/ios-apps/properties/capacitor-config.file-property.types.ts"
import type { DefaultDeviceUdid } from "akasha/code/ios-apps/properties/default-device-udid.text-property.types.ts"
import type { DevelopmentTeam } from "akasha/code/ios-apps/properties/development-team.text-property.types.ts"
import type { DisplayName } from "akasha/code/ios-apps/properties/display-name.text-property.types.ts"
import type { GitIgnore } from "akasha/code/ios-apps/properties/git-ignore.file-property.types.ts"
import type { IconDrawing } from "akasha/code/ios-apps/properties/icon-drawing.file-property.types.ts"
import type { MacBuildLockDir } from "akasha/code/ios-apps/properties/mac-build-lock-dir.text-property.types.ts"
import type { MacBuildNumberFile } from "akasha/code/ios-apps/properties/mac-build-number-file.text-property.types.ts"
import type { MacWwwStagingRel } from "akasha/code/ios-apps/properties/mac-www-staging-rel.text-property.types.ts"
import type { MarketingVersion } from "akasha/code/ios-apps/properties/marketing-version.text-property.types.ts"
import type { NativeShellRepoPath } from "akasha/code/ios-apps/properties/native-shell-repo-path.text-property.types.ts"
import type { Programs } from "akasha/code/ios-apps/properties/programs.relation-property.types.ts"
import type { SpaSourcePath } from "akasha/code/ios-apps/properties/spa-source-path.text-property.types.ts"
import type { StageScript } from "akasha/code/ios-apps/properties/stage-script.relation-property.types.ts"
import type { SyncScript } from "akasha/code/ios-apps/properties/sync-script.relation-property.types.ts"
import type { WebDirectory } from "akasha/code/ios-apps/properties/web-directory.build-folder-property.types.ts"
import type { WebEntry } from "akasha/code/ios-apps/properties/web-entry.file-property.types.ts"
import type { WebEnvPath } from "akasha/code/ios-apps/properties/web-env-path.text-property.types.ts"
import type { WidgetBundleId } from "akasha/code/ios-apps/properties/widget-bundle-id.text-property.types.ts"
import type { WidgetProfileName } from "akasha/code/ios-apps/properties/widget-profile-name.text-property.types.ts"
import type { ToolReached } from "akasha/code/workspaces/properties/tool-reached.text-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Service } from "akasha/infrastructure/services/service.page-type.types.ts"

export type IosApp = Domain &
  Service & {
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
    syncScript?: SyncScript
    toolReached?: ToolReached
  }
