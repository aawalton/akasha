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
import type {
  RunSshOptions,
  SshResult,
  SshTarget,
} from "akasha/alan/harness/mobile-cli/mobile-ssh/mobile-ssh.module.code.ts"
import { runSshResult } from "akasha/alan/harness/mobile-cli/mobile-ssh/mobile-ssh.module.code.ts"
import {
  answeredWith,
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

const CHECKED_OUT = "DEPLOY_DEVICE_CHECKED_OUT"

const SYNCED = "DEPLOY_DEVICE_SYNCED"

const STEPS: readonly (readonly [string, string])[] = [
  [CHECKED_OUT, `the checkout on ${MACBOOK.host} was moved to ${MAIN}`],
  [SYNCED, "the native seam was synced over that checkout"],
  [BUILT, "the app was built"],
  [INSTALLED, "the app was installed to the phone"],
]

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
    `echo "${CHECKED_OUT}"`,
    buildNativeSync({
      app,
      root: CHECKOUT_ROOT,
      nativeShellAps: readNativeShellApsEnv() ?? OFF,
      nativeShellHealthkit: readNativeShellHealthkitEnv() ?? OFF,
    }),
    `echo "${SYNCED}"`,
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

export function doneIn(out: string): readonly string[] {
  return STEPS.filter(([marker]) => out.includes(marker)).map(([, said]) => said)
}

export type Ran = (target: SshTarget, script: string, options?: RunSshOptions) => Promise<SshResult>

export type Secret = () => string

async function deployed(
  app: MobileApp,
  device: string,
  done: string[],
  ran: Ran = runSshResult,
  secret: Secret = readKeychainPassword
): Promise<Answer> {
  const said = await ran(MACBOOK, scriptOf(app, device), {
    sendEnv: { [KEYCHAIN_PASSWORD_SSH_ENV]: secret() },
  })
  done.push(...doneIn(said.stdout))
  const report = [
    `building ${app.slug} at ${CONFIGURATION} on ${MACBOOK.host} for phone ${device}`,
    said.stdout.trimEnd(),
    ...done,
  ]
  if (said.code !== 0) {
    return answeredWith(report, [`the run on ${MACBOOK.host} exited ${said.code}`], OPERATIONAL)
  }
  if (!said.stdout.includes(BUILT)) {
    return answeredWith(report, [`xcodebuild did not report \`${BUILT}\``], OPERATIONAL)
  }
  if (!said.stdout.includes(INSTALLED)) {
    return answeredWith(
      report,
      [`the install did not report \`${INSTALLED}\`, so nothing reached the phone`],
      OPERATIONAL
    )
  }
  return told(report)
}

export async function installedOnDevice(
  slug: string,
  appNamed: AppNamed = resolveApp,
  ran: Ran = runSshResult,
  secret: Secret = readKeychainPassword
): Promise<Answer> {
  return await answering(async (done) => {
    const app = appNamed(slug)
    const device = app.defaultDeviceUdid
    if (device === null) {
      return refusedBy([
        `${app.slug} names no phone of its own, so nothing says which phone to install to`,
      ])
    }
    return await deployed(app, device, done, ran, secret)
  })
}
