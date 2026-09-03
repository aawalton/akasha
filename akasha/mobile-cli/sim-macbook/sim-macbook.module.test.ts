import { describe, expect, test } from "bun:test"
import type { MobileApp } from "../mobile-app/mobile-app.module.code.ts"
import {
  buildInstallScript,
  buildResolveAndBootSimScript,
  buildStartAppiumScript,
  parseInstalledUdid,
  parseResolvedUdid,
} from "./sim-macbook.module.code.ts"

const RUN_TREE = "$HOME/.mobile-sim-run/alanwalton/native-shell/alanwalton"

const APP: MobileApp = {
  slug: "alanwalton",
  pagePath: "akasha:pages/ios-app/alanwalton-ios.ios-app.md",
  displayName: "Fixture",
  bundleId: "com.example.fixture",
  widgetBundleId: "com.example.fixture.widgets",
  developmentTeam: "TEAM123456",
  nativeShellRepoPath: "packages/example/native-shell",
  simBuildScript: null,
  wwwStageScript: null,
  spaSourceRepoPath: null,
  webEnvSegments: null,
  ascCapabilities: [],
  appProfileName: "fixture app App Store",
  widgetProfileName: "fixture widget App Store",
  macBuildLockDir: "$HOME/.lock",
  macBuildNumberFile: "$HOME/.build-number",
  macWwwStagingRel: null,
  defaultDeviceUdid: null,
}

describe("buildStartAppiumScript", () => {
  test("starts Appium detached on port 4723 with relaxed security", () => {
    const s = buildStartAppiumScript()
    expect(s).toContain("nohup appium --address 0.0.0.0 --port 4723 --relaxed-security")
    expect(s).toContain("</dev/null")
    expect(s).toContain("set -euo pipefail")
    expect(s).not.toContain("set -x")
  })
})

describe("buildResolveAndBootSimScript", () => {
  test("embeds an explicit preferred udid, single-quoted", () => {
    expect(buildResolveAndBootSimScript("UDID-1")).toContain("PREF='UDID-1'")
  })
  test("empty preferred udid resolves booted/available", () => {
    const s = buildResolveAndBootSimScript()
    expect(s).toContain("PREF=''")
    expect(s).toContain("simctl list devices booted")
  })
})

describe("parseResolvedUdid", () => {
  test("extracts SIM_UDID=<udid>", () => {
    expect(parseResolvedUdid("noise\nSIM_UDID=7E6CC581-6299-49D1-AFF5-C788ABF22F9F\n")).toBe(
      "7E6CC581-6299-49D1-AFF5-C788ABF22F9F"
    )
  })
  test("throws when absent", () => {
    expect(() => parseResolvedUdid("no udid here")).toThrow(/could not resolve/)
  })
})

describe("buildInstallScript", () => {
  test("names the tree this run delivered, and no clone standing on the macbook", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "f28fded72f035a57e382744c3bcbf370bd771491",
    })
    expect(s).toContain(`export NATIVE_SHELL_DIR="${RUN_TREE}"`)
    expect(s).not.toContain("repos/code")
  })
  test("states the commit the tree was made from, which a delivered tree has no .git to answer", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "f28fded72f035a57e382744c3bcbf370bd771491",
    })
    expect(s).toContain(
      "export NATIVE_SHELL_STAMP_COMMIT='f28fded72f035a57e382744c3bcbf370bd771491'"
    )
  })
  test("carries a dirty marker through untouched, so a stamp never claims a clean commit", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "f28fded72f035a57e382744c3bcbf370bd771491-dirty",
    })
    expect(s).toContain(
      "export NATIVE_SHELL_STAMP_COMMIT='f28fded72f035a57e382744c3bcbf370bd771491-dirty'"
    )
  })
  test("prepends SIM_UDID / CONFIGURATION exports before the delivered source", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "abc",
      udid: "UDID-1",
      configuration: "Debug",
    })
    expect(s).toContain("export SIM_UDID='UDID-1'")
    expect(s).toContain("export CONFIGURATION='Debug'")
    expect(s.trimEnd().endsWith("echo body")).toBe(true)
  })
  test("omits the optional exports when those args are absent", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "abc",
    })
    expect(s).not.toContain("export SIM_UDID")
    expect(s).not.toContain("export CONFIGURATION")
    expect(s).not.toContain("export STAGED_WWW_DIR")
  })
  test("exports STAGED_WWW_DIR when provided (build-sim.sh injects it, #15638)", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "abc",
      stagedWwwDir: "$HOME/.testflight-www-staging-alanwalton",
    })
    expect(s).toContain('export STAGED_WWW_DIR="$HOME/.testflight-www-staging-alanwalton"')
  })
  test("carries the values the app page states, so the seam script restates none of them", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "abc",
    })
    expect(s).toContain("export NATIVE_SHELL_BUNDLE_ID='com.example.fixture'")
    expect(s).toContain("export NATIVE_SHELL_WIDGET_BUNDLE_ID='com.example.fixture.widgets'")
    expect(s).toContain("export NATIVE_SHELL_DEVELOPMENT_TEAM='TEAM123456'")
    expect(s).toContain("export NATIVE_SHELL_DISPLAY_NAME='Fixture'")
  })
  test("the keychain access group is the team joined to the bundle id, in that order", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "abc",
    })
    expect(s).toContain(
      "export NATIVE_SHELL_KEYCHAIN_ACCESS_GROUP='TEAM123456.com.example.fixture'"
    )
  })
  test("the device secret service is the bundle id with the store's own suffix", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "abc",
    })
    expect(s).toContain(
      "export NATIVE_SHELL_DEVICE_SECRET_SERVICE='com.example.fixture.device-secret'"
    )
  })
  test("a profile name carrying spaces reaches the seam as one value", () => {
    const s = buildInstallScript({
      app: APP,
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "abc",
    })
    expect(s).toContain("export NATIVE_SHELL_APP_PROFILE_NAME='fixture app App Store'")
    expect(s).toContain("export NATIVE_SHELL_WIDGET_PROFILE_NAME='fixture widget App Store'")
  })
  test("an app whose page states no widget exports no widget value, rather than an empty one", () => {
    const s = buildInstallScript({
      app: { ...APP, widgetBundleId: null, widgetProfileName: null },
      buildSimSource: "echo body",
      nativeShellDir: RUN_TREE,
      stampCommit: "abc",
    })
    expect(s).not.toContain("NATIVE_SHELL_WIDGET_BUNDLE_ID")
    expect(s).not.toContain("NATIVE_SHELL_WIDGET_PROFILE_NAME")
  })
})

describe("parseInstalledUdid", () => {
  test("extracts the udid from a BUILD_SIM_OK line", () => {
    expect(
      parseInstalledUdid(
        "BUILD_SIM_OK bundle=com.alanwalton.app udid=7E6CC581-6299-49D1-AFF5-C788ABF22F9F app=/x/App.app"
      )
    ).toBe("7E6CC581-6299-49D1-AFF5-C788ABF22F9F")
  })
  test("throws when BUILD_SIM_OK is absent (build/install failed)", () => {
    expect(() => parseInstalledUdid("** BUILD FAILED **")).toThrow(/BUILD_SIM_OK/)
  })
})
