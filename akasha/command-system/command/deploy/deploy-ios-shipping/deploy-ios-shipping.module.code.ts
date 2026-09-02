import { readKeychainPassword } from "@akasha/mobile-cli/foundation"
import { acquireLocalCutLock, releaseLocalCutLock } from "@akasha/mobile-cli/local-cut-lock"
import { type MobileApp, resolveApp } from "@akasha/mobile-cli/mobile-app"
import { runTestflightCut } from "@tools/lib/mobile-testflight-cut"
import type { Answer } from "../../../calling/calling.module.code.ts"
import { saidBy } from "../../../fault-saying/fault-saying.module.code.ts"

const DATA = 2

const OPERATIONAL = 3

export const CONFIGURATION = "Release"

export const REF = "origin/main"

export const NO_UPLOAD_SAID =
  "upload\tskipped, so Apple validates the build and no tester is sent it"

export const UPLOAD_SAID =
  "upload\tcarried out, so every internal tester of this app is sent the build"

export function linesOf(said: readonly string[]): readonly string[] {
  return said
    .join("")
    .split("\n")
    .filter((one) => one.trim() !== "")
}

export function linesFor(slug: string, pagePath: string, noUpload: boolean): readonly string[] {
  return [
    `ios-app\t${slug}\t${pagePath}`,
    `build\t${CONFIGURATION}\tfrom ${REF}`,
    noUpload ? NO_UPLOAD_SAID : UPLOAD_SAID,
  ]
}

export async function shipIosApp(
  slug: string,
  pagePath: string,
  noUpload: boolean
): Promise<Answer> {
  const report = [...linesFor(slug, pagePath, noUpload)]
  let app: MobileApp
  try {
    app = resolveApp(slug)
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: DATA }
  }
  let password: string
  try {
    password = readKeychainPassword()
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: OPERATIONAL }
  }
  try {
    acquireLocalCutLock(Date.now(), process.pid)
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: OPERATIONAL }
  }
  const said: string[] = []
  try {
    await runTestflightCut({
      app,
      configuration: CONFIGURATION,
      buildNumber: undefined,
      sync: true,
      wait: false,
      noUpload,
      password,
      ref: REF,
      say: (text) => {
        said.push(text)
      },
    })
  } catch (err) {
    report.push(...linesOf(said))
    return { report, refusals: [saidBy(err)], code: OPERATIONAL }
  } finally {
    releaseLocalCutLock(process.pid)
  }
  report.push(...linesOf(said))
  report.push(
    noUpload
      ? `built\t${slug}\tarchived, exported, validated by Apple, and sent to nobody`
      : `built\t${slug}\tarchived, exported and uploaded to TestFlight`
  )
  return { report, refusals: [], code: 0 }
}
