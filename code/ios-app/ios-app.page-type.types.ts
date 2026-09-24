import type { AppIcon } from "akasha/code/ios-app/properties/app-icon.file-property.types.ts"
import type { AppProfileName } from "akasha/code/ios-app/properties/app-profile-name.text-property.types.ts"
import type { AscCapabilities } from "akasha/code/ios-app/properties/asc-capabilities.text-property.types.ts"
import type { BuildScript } from "akasha/code/ios-app/properties/build-script.relation-property.types.ts"
import type { BundleId } from "akasha/code/ios-app/properties/bundle-id.text-property.types.ts"
import type { CapacitorConfig } from "akasha/code/ios-app/properties/capacitor-config.file-property.types.ts"
import type { DefaultDeviceUdid } from "akasha/code/ios-app/properties/default-device-udid.text-property.types.ts"
import type { DevelopmentTeam } from "akasha/code/ios-app/properties/development-team.text-property.types.ts"
import type { DisplayName } from "akasha/code/ios-app/properties/display-name.text-property.types.ts"
import type { IconDrawing } from "akasha/code/ios-app/properties/icon-drawing.file-property.types.ts"
import type { MacBuildLockDir } from "akasha/code/ios-app/properties/mac-build-lock-dir.text-property.types.ts"
import type { MacBuildNumberFile } from "akasha/code/ios-app/properties/mac-build-number-file.text-property.types.ts"
import type { MarketingVersion } from "akasha/code/ios-app/properties/marketing-version.text-property.types.ts"
import type { NativeShellRepoPath } from "akasha/code/ios-app/properties/native-shell-repo-path.text-property.types.ts"
import type { Programs } from "akasha/code/ios-app/properties/programs.multi-relation-property.types.ts"
import type { SyncScript } from "akasha/code/ios-app/properties/sync-script.relation-property.types.ts"
import type { WebDirectory } from "akasha/code/ios-app/properties/web-directory.build-folder-property.types.ts"
import type { WebEntry } from "akasha/code/ios-app/properties/web-entry.file-property.types.ts"
import type { WebEnvPath } from "akasha/code/ios-app/properties/web-env-path.text-property.types.ts"
import type { WidgetBundleId } from "akasha/code/ios-app/properties/widget-bundle-id.text-property.types.ts"
import type { WidgetProfileName } from "akasha/code/ios-app/properties/widget-profile-name.text-property.types.ts"
import type { GitIgnore } from "akasha/code/properties/git-ignore.file-property.types.ts"
import type { ToolReached } from "akasha/code/workspace/properties/tool-reached.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"

export type IosApp = Domain &
  AkashaService & {
    appProfileName: AppProfileName
    ascCapabilities?: AscCapabilities
    buildScript?: BuildScript
    bundleId: BundleId
    capacitorConfig: CapacitorConfig
    defaultDeviceUdid?: DefaultDeviceUdid
    developmentTeam: DevelopmentTeam
    displayName: DisplayName
    gitIgnore: GitIgnore
    appIcon?: AppIcon
    iconDrawing?: IconDrawing
    macBuildLockDir?: MacBuildLockDir
    macBuildNumberFile?: MacBuildNumberFile
    marketingVersion: MarketingVersion
    nativeShellRepoPath?: NativeShellRepoPath
    programs?: Programs
    webEntry?: WebEntry
    webEnvPath?: WebEnvPath
    widgetBundleId?: WidgetBundleId
    widgetProfileName?: WidgetProfileName
    webDirectory?: WebDirectory
    syncScript?: SyncScript
    toolReached?: ToolReached
  }
