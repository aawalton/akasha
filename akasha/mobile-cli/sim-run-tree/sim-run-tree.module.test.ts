import { describe, expect, test } from "bun:test"
import type { MobileApp } from "../mobile-app/mobile-app.module.code.ts"
import {
  shellRepoPath,
  simRunNativeShellDir,
  simRunRootRel,
  simRunSourceRepoPaths,
} from "./sim-run-tree.module.code.ts"

const SEAM_SHARED_COUNT = 3

const APP: MobileApp = {
  slug: "example",
  pagePath: "akasha:pages/ios-app/example-ios.ios-app.md",
  displayName: "Example",
  bundleId: "com.example.app",
  widgetBundleId: null,
  developmentTeam: "TEAM123456",
  nativeShellRepoPath: "akasha:native-shell/example",
  simBuildScript: null,
  wwwStageScript: null,
  spaSourceRepoPath: null,
  webEnvSegments: null,
  ascCapabilities: [],
  appProfileName: "example app App Store",
  widgetProfileName: null,
  macBuildLockDir: "$HOME/.lock",
  macBuildNumberFile: "$HOME/.build-number",
  macWwwStagingRel: null,
  defaultDeviceUdid: null,
}

const SHELLLESS: MobileApp = { ...APP, nativeShellRepoPath: null }

describe("simRunRootRel", () => {
  test("gives each app a run root of its own, named for the app's slug", () => {
    expect(simRunRootRel(APP)).toBe(".mobile-sim-run/example")
    expect(simRunRootRel({ ...APP, slug: "other" })).toBe(".mobile-sim-run/other")
  })
})

describe("shellRepoPath", () => {
  test("drops the repo prefix and answers the path inside that repo", () => {
    expect(shellRepoPath(APP)).toBe("native-shell/example")
  })

  test("an app naming no native shell refuses rather than answering an empty path", () => {
    expect(() => shellRepoPath(SHELLLESS)).toThrow("native-shell-repo-path")
  })
})

describe("simRunSourceRepoPaths", () => {
  const paths = simRunSourceRepoPaths(APP)

  test("delivers the app's own shell first", () => {
    expect(paths[0]).toBe("native-shell/example")
  })

  test("delivers the seam scripts and components every shell shares, named from the repo root", () => {
    expect(paths).toContain("akasha/code-system/ios-app/shell-scripts")
    expect(paths).toContain("akasha/code-system/ios-component/ios-components")
    expect(paths).toContain("akasha/code-system/ios-program/ios-programs")
  })

  test("no delivered path reaches above the repo root", () => {
    for (const path of paths) expect(path.startsWith("..")).toBe(false)
  })

  test("an app delivers its own shell and the shared seam trees and nothing else", () => {
    expect(paths.length).toBe(1 + SEAM_SHARED_COUNT)
  })
})

describe("simRunNativeShellDir", () => {
  test("names the delivered shell under the app's own run root in the home directory", () => {
    expect(simRunNativeShellDir(APP)).toBe("$HOME/.mobile-sim-run/example/native-shell/example")
  })
})
