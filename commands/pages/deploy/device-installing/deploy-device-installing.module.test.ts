import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Ran } from "akasha/commands/pages/deploy/device-installing/deploy-device-installing.module.code.ts"
import {
  doneIn,
  installedOnDevice,
  scriptOf,
} from "akasha/commands/pages/deploy/device-installing/deploy-device-installing.module.code.ts"

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
  syncScript: "akasha:apps/quiet-shell/scripts/ios-add/quiet-ios-add.shell-script.shell.sh",
  wwwStageScript: null,
  spaSourceRepoPath: null,
  webEnvSegments: null,
  ascCapabilities: [],
  toolReached: [],
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

const PHONED = { ...QUIET, defaultDeviceUdid: UDID } as const satisfies MobileApp

const CHECKED_OUT = "DEPLOY_DEVICE_CHECKED_OUT"

const SYNCED = "DEPLOY_DEVICE_SYNCED"

const WHOLE = `${CHECKED_OUT}\n${SYNCED}\n** BUILD SUCCEEDED **\nDEPLOY_DEVICE_OK`

function ran(stdout: string, code: number): Ran {
  return () => Promise.resolve({ stdout, code })
}

test("each step the mac got through is named in the order the script ran them", () => {
  expect(doneIn(WHOLE)).toEqual([
    doneIn(CHECKED_OUT)[0] as string,
    "the native seam was synced over that checkout",
    "the app was built",
    "the app was installed to the phone",
  ])
})

test("a run that failed after the checkout still names the checkout and the sync", async () => {
  const answer = await installedOnDevice(
    "quiet",
    () => PHONED,
    ran(`${CHECKED_OUT}\n${SYNCED}\nerror: code signing failed`, 65)
  )

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.report).toContain("the native seam was synced over that checkout")
  expect(answer.report).not.toContain("the app was built")
  expect(answer.refusals.join(" ")).toContain("exited 65")
})

test("a run that reached the mac and got nothing done names no step", async () => {
  const answer = await installedOnDevice("quiet", () => PHONED, ran("", 255))

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.report).not.toContain("the app was built")
  expect(doneIn("")).toEqual([])
})

test("an ssh that threw before the mac ran anything names nothing", async () => {
  const answer = await installedOnDevice(
    "quiet",
    () => PHONED,
    () => Promise.reject(new OperationalError("ssh not found on PATH"))
  )

  expect(answer.report).toEqual([])
  expect(answer.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
