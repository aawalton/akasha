import { describe, expect, test } from "bun:test"
import type { MobileApp } from "../mobile-app/mobile-app.module.code.ts"
import {
  shellRepoPath,
  simRunNativeShellDir,
  simRunRootRel,
  simRunSharedRepoPaths,
  simRunSourceRepoPaths,
} from "./sim-run-tree.module.code.ts"

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

  test("delivers the shell, the Swift and the plists every shell compiles", () => {
    const said = paths.join("\n")
    expect(said).toContain("widget-components/widget-components.shell-script.shell.sh")
    expect(said).toContain("ring/ring.ios-component.swift.swift")
    expect(said).toContain("alanwalton-widget.ios-program.info-plist.plist")
    expect(said).toContain("alanwalton-decode-harness/main.swift")
  })

  test("no delivered path reaches above the repo root", () => {
    for (const path of paths) expect(path.startsWith("..")).toBe(false)
  })

  test("no page's own TypeScript file is delivered, because the macbook reads none", () => {
    for (const path of paths) expect(path.endsWith(".ts")).toBe(false)
  })

  test("an app delivers its own shell and the shared files and nothing else", () => {
    expect(new Set(paths).size).toBe(paths.length)
    expect(paths.slice(1)).toEqual([...simRunSharedRepoPaths()])
  })
})

describe("simRunNativeShellDir", () => {
  test("names the delivered shell under the app's own run root in the home directory", () => {
    expect(simRunNativeShellDir(APP)).toBe("$HOME/.mobile-sim-run/example/native-shell/example")
  })
})
