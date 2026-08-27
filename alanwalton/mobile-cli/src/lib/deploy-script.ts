import { ALTOOL_MARKERS, buildUploadApp, buildValidateApp } from "./altool"
import { iosAppDir, type MobileApp, macWwwStagingDir, nativeShellDir } from "./apps"
import {
  buildAcquireMacBuildLock,
  buildClaimBuildNumber,
  buildReleaseMacBuildLock,
} from "./build-serialization"
import { buildStampGate } from "./build-stamp"
import { buildExportOptionsPlist } from "./export-options"
import {
  ascAuthArgs,
  buildKeychainUnlock,
  buildNativeSync,
  buildRunCheckout,
  CHECKOUT_ROOT,
  SCRIPT_HEADER,
} from "./foundation"
import { buildEnsureAppStoreProfile, buildLoginOnlyKeychainScope } from "./signing"

export function buildTestflightDeployScript(opts: {
  readonly app: MobileApp
  readonly configuration: string
  readonly sync: boolean
  readonly buildNumber?: number
  readonly ascFloor: number
  readonly password: string
  readonly noUpload?: boolean
  readonly nativeShellWidget?: string
  readonly nativeShellAps?: string
  readonly nativeShellHealthkit?: string
  readonly nativeShellRingCredential?: string
  readonly nativeShellKokoroTts?: string
  readonly cutCommit: string
}): string {
  const archivePath = "build/App.xcarchive"
  const exportPath = "build/export"
  const ipa = `${exportPath}/App.ipa`
  const plistPath = "build/exportOptions.plist"

  const archive = [
    "xcodebuild",
    "-project App.xcodeproj",
    "-scheme App",
    `-configuration ${opts.configuration}`,
    '-destination "generic/platform=iOS"',
    `-archivePath ${archivePath}`,
    "archive",
    ...ascAuthArgs(),
    `DEVELOPMENT_TEAM=${opts.app.developmentTeam}`,
    "CURRENT_PROJECT_VERSION=$BUILD_NUMBER",
    "2>&1",
  ].join(" ")

  const exportArchive = [
    "xcodebuild",
    "-exportArchive",
    `-archivePath ${archivePath}`,
    `-exportOptionsPlist ${plistPath}`,
    `-exportPath ${exportPath}`,
    "2>&1",
  ].join(" ")

  const sections: string[] = [
    SCRIPT_HEADER,
    buildKeychainUnlock(opts.password),
    buildLoginOnlyKeychainScope(),
    buildAcquireMacBuildLock(opts.app),
    buildRunCheckout(opts.cutCommit),
  ]
  if (opts.sync) {
    sections.push(
      buildNativeSync({
        app: opts.app,
        nativeShellDir: nativeShellDir(opts.app, CHECKOUT_ROOT),
        nativeShellWidget: opts.nativeShellWidget,
        nativeShellAps: opts.nativeShellAps,
        nativeShellHealthkit: opts.nativeShellHealthkit,
        nativeShellRingCredential: opts.nativeShellRingCredential,
        nativeShellKokoroTts: opts.nativeShellKokoroTts,
        stagedWwwDir: macWwwStagingDir(opts.app) ?? undefined,
      })
    )
  }
  sections.push(
    buildEnsureAppStoreProfile(opts.app),
    `cd ${iosAppDir(opts.app, CHECKOUT_ROOT)}`,
    buildClaimBuildNumber({ app: opts.app, explicit: opts.buildNumber, ascFloor: opts.ascFloor }),
    archive,
    `cat > ${plistPath} <<PLIST`,
    buildExportOptionsPlist(opts.app),
    "PLIST",
    exportArchive,
    `test -f ${ipa}`,
    ...buildStampGate({ ipa, expectedCommit: opts.cutCommit }),
    ...(opts.noUpload
      ? [
          ...buildValidateApp(ipa),
          buildReleaseMacBuildLock(opts.app),
          'echo "MOBILE_DEPLOY_TESTFLIGHT_DRYRUN_OK"',
        ]
      : [
          ...buildUploadApp(ipa),
          buildReleaseMacBuildLock(opts.app),
          `echo "${ALTOOL_MARKERS.uploadOk}"`,
        ])
  )
  return sections.join("\n")
}
