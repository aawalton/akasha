import {
  ascAuthArgs,
  buildKeychainUnlock,
  buildNativeSync,
  buildRunCheckout,
  CHECKOUT_ROOT,
  KEYCHAIN_PASSWORD_SSH_ENV,
  readKeychainPassword,
  readNativeShellApsEnv,
  readNativeShellHealthkitEnv,
  SCRIPT_HEADER,
} from "akasha/alan/harness/mobile-cli/foundation/foundation.module.code.ts"
import { MACBOOK } from "akasha/alan/harness/mobile-cli/macbook-target/macbook-target.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  iosAppDir,
  resolveApp,
} from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { runSshCapture } from "akasha/alan/harness/mobile-cli/mobile-ssh/mobile-ssh.module.code.ts"
import {
  answering,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"

const CONFIGURATION = "Debug"

const MAIN = "origin/main"

const OFF = "0"

const BUILT = "** BUILD SUCCEEDED **"

const INSTALLED = "DEPLOY_DEVICE_OK"

export type AppNamed = (slug: string) => MobileApp

export function scriptOf(app: MobileApp, device: string): string {
  const appPath = `${iosAppDir(app, CHECKOUT_ROOT)}/build/Build/Products/${CONFIGURATION}-iphoneos/App.app`
  const xcodebuild = [
    "xcodebuild",
    "-project App.xcodeproj",
    "-scheme App",
    `-configuration ${CONFIGURATION}`,
    `-destination "platform=iOS,id=${device}"`,
    "-derivedDataPath build",
    ...ascAuthArgs(),
    `DEVELOPMENT_TEAM=${app.developmentTeam}`,
    "CODE_SIGN_STYLE=Automatic",
    "build",
  ].join(" ")

  return [
    SCRIPT_HEADER,
    buildKeychainUnlock(),
    buildRunCheckout(MAIN),
    buildNativeSync({
      app,
      root: CHECKOUT_ROOT,
      nativeShellAps: readNativeShellApsEnv() ?? OFF,
      nativeShellHealthkit: readNativeShellHealthkitEnv() ?? OFF,
    }),
    `cd ${iosAppDir(app, CHECKOUT_ROOT)}`,
    xcodebuild,
    `APP=${appPath}`,
    'CODESIGN_OUT=$(codesign -dv "$APP" 2>&1)',
    'echo "$CODESIGN_OUT"',
    `echo "$CODESIGN_OUT" | grep -q "Identifier=${app.bundleId}"`,
    `echo "$CODESIGN_OUT" | grep -q "TeamIdentifier=${app.developmentTeam}"`,
    `xcrun devicectl device install app --device ${device} "$APP"`,
    `echo "${INSTALLED}"`,
  ].join("\n")
}

async function deployed(app: MobileApp, device: string): Promise<Answer> {
  const password = readKeychainPassword()
  const report = [`building ${app.slug} at ${CONFIGURATION} on ${MACBOOK.host} for phone ${device}`]
  const out = await runSshCapture(MACBOOK, scriptOf(app, device), {
    sendEnv: { [KEYCHAIN_PASSWORD_SSH_ENV]: password },
  })
  report.push(out.trimEnd())
  if (!out.includes(BUILT)) {
    return { report, refusals: [`xcodebuild did not report \`${BUILT}\``], code: OPERATIONAL }
  }
  if (!out.includes(INSTALLED)) {
    return {
      report,
      refusals: [`the install did not report \`${INSTALLED}\`, so nothing reached the phone`],
      code: OPERATIONAL,
    }
  }
  report.push(`installed ${app.slug} at ${CONFIGURATION} to phone ${device}`)
  return told(report)
}

export async function installedOnDevice(
  slug: string,
  appNamed: AppNamed = resolveApp
): Promise<Answer> {
  return await answering(async () => {
    const app = appNamed(slug)
    const device = app.defaultDeviceUdid
    if (device === null) {
      return refusedBy([
        `${app.slug} names no phone of its own, so nothing says which phone to install to`,
      ])
    }
    return await deployed(app, device)
  })
}
