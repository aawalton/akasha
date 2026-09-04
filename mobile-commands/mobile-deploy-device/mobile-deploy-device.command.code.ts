import type { Answer } from "@akasha/command-system/calling"
import {
  ascAuthArgs,
  buildKeychainUnlock,
  buildNativeSync,
  buildRunCheckout,
  CHECKOUT_ROOT,
  readKeychainPassword,
  readNativeShellApsEnv,
  readNativeShellHealthkitEnv,
  SCRIPT_HEADER,
} from "@akasha/mobile-cli/foundation"
import { MACBOOK } from "@akasha/mobile-cli/macbook-target"
import type { MobileApp } from "@akasha/mobile-cli/mobile-app"
import { iosAppDir, nativeShellDir } from "@akasha/mobile-cli/mobile-app"
import { runSshCapture } from "@akasha/mobile-cli/mobile-ssh"
import {
  APP_SAID,
  answering,
  appIn,
  flagsAloneIn,
  OPERATIONAL,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const DEVICE = "--device"

const CONFIGURATION = "--configuration"

const NO_SYNC = "--no-sync"

const VALUED = [APP_SAID, DEVICE, CONFIGURATION]

const SWITCHES = [NO_SYNC]

const CONFIGURATIONS = ["Debug", "Release"]

const DEFAULT_CONFIGURATION = "Debug"

const MAIN = "origin/main"

const OFF = "0"

const A_UDID = /^[0-9A-Za-z-]{8,}$/

const BUILT = "** BUILD SUCCEEDED **"

const INSTALLED = "MOBILE_DEPLOY_DEVICE_OK"

export type Read = {
  readonly app: MobileApp
  readonly configuration: string
  readonly device: string
  readonly sync: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }

  const configuration = said.named[CONFIGURATION] ?? DEFAULT_CONFIGURATION
  if (!CONFIGURATIONS.includes(configuration)) {
    const known = CONFIGURATIONS.map((one) => `\`${one}\``).join(", ")
    return {
      refused: [`\`${configuration}\` is no configuration this builds — it builds ${known}`],
    }
  }

  const app = appIn(said)
  if ("refused" in app) return app

  const device = said.named[DEVICE] ?? app.defaultDeviceUdid
  if (device === null || device === undefined) {
    return {
      refused: [
        `${app.slug} names no phone of its own, so \`${DEVICE} <udid>\` says which phone to install to`,
      ],
    }
  }
  if (!A_UDID.test(device)) {
    return { refused: [`\`${device}\` is no hardware udid`] }
  }

  return { app, configuration, device, sync: !said.flags.has(NO_SYNC) }
}

export function scriptOf(read: Read, password: string): string {
  const appPath = `${iosAppDir(read.app, CHECKOUT_ROOT)}/build/Build/Products/${read.configuration}-iphoneos/App.app`
  const xcodebuild = [
    "xcodebuild",
    "-project App.xcodeproj",
    "-scheme App",
    `-configuration ${read.configuration}`,
    `-destination "platform=iOS,id=${read.device}"`,
    "-derivedDataPath build",
    ...ascAuthArgs(),
    `DEVELOPMENT_TEAM=${read.app.developmentTeam}`,
    "CODE_SIGN_STYLE=Automatic",
    "build",
  ].join(" ")

  const sections: string[] = [SCRIPT_HEADER, buildKeychainUnlock(password), buildRunCheckout(MAIN)]
  if (read.sync) {
    sections.push(
      buildNativeSync({
        app: read.app,
        nativeShellDir: nativeShellDir(read.app, CHECKOUT_ROOT),
        nativeShellAps: readNativeShellApsEnv() ?? OFF,
        nativeShellHealthkit: readNativeShellHealthkitEnv() ?? OFF,
      })
    )
  }
  sections.push(
    `cd ${iosAppDir(read.app, CHECKOUT_ROOT)}`,
    xcodebuild,
    `APP=${appPath}`,
    'CODESIGN_OUT=$(codesign -dv "$APP" 2>&1)',
    'echo "$CODESIGN_OUT"',
    `echo "$CODESIGN_OUT" | grep -q "Identifier=${read.app.bundleId}"`,
    `echo "$CODESIGN_OUT" | grep -q "TeamIdentifier=${read.app.developmentTeam}"`,
    `xcrun devicectl device install app --device ${read.device} "$APP"`,
    `echo "${INSTALLED}"`
  )
  return sections.join("\n")
}

async function deployed(read: Read): Promise<Answer> {
  const password = readKeychainPassword()
  const report = [
    `building ${read.app.slug} at ${read.configuration} on ${MACBOOK.host} for phone ${read.device}`,
  ]
  const out = await runSshCapture(MACBOOK, scriptOf(read, password))
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
  report.push(`installed ${read.app.slug} at ${read.configuration} to phone ${read.device}`)
  return told(report)
}

export async function mobileDeployDevice(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await deployed(read))
}
