import { expect, test } from "bun:test"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { INPUT } from "../../../modules/answering/command-answering.module.code.ts"
import { installedOnDevice, scriptOf } from "./deploy-device-installing.module.code.ts"

const UDID = "00008030-000B0C0D0E0F1112"

const QUIET = {
  slug: "quiet",
  pagePath: "akasha/quiet.ios-app.ts",
  displayName: "Quiet",
  bundleId: "me.quiet.app",
  widgetBundleId: null,
  developmentTeam: "TEAM123456",
  nativeShellRepoPath: "code:apps/quiet-shell",
  simBuildScript: null,
  wwwStageScript: null,
  spaSourceRepoPath: null,
  webEnvSegments: null,
  ascCapabilities: [],
  appProfileName: "Quiet App",
  widgetProfileName: null,
  macBuildLockDir: "$HOME/.quiet-lock",
  macBuildNumberFile: "$HOME/.quiet-build",
  macWwwStagingRel: null,
  defaultDeviceUdid: null,
} as const satisfies MobileApp

test("the build is of what is on main rather than of this checkout", () => {
  expect(scriptOf(QUIET, UDID)).toContain("origin/main")
})

test("the signature is proved to carry the app's bundle id and team", () => {
  const said = scriptOf(QUIET, UDID)

  expect(said).toContain("Identifier=me.quiet.app")
  expect(said).toContain("TeamIdentifier=TEAM123456")
})

test("the install names the phone rather than whichever phone is there", () => {
  expect(scriptOf(QUIET, UDID)).toContain(`--device ${UDID}`)
})

test("an app whose page names no phone is refused rather than guessed at", async () => {
  const answer = await installedOnDevice("quiet", () => QUIET)

  expect(answer.code).toBe(INPUT)
  expect(answer.refusals.join(" ")).toContain("names no phone")
})
