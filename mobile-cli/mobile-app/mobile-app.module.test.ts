import { describe, expect, test } from "bun:test"
import { InputError } from "@akasha/errors-core/exit-code"
import {
  DEFAULT_APP_SLUG,
  macWwwStagingDir,
  mobileApps,
  resolveApp,
  splitRepoPath,
  stagedWwwRepoPath,
} from "./mobile-app.module.code.ts"

const ALL = Object.values(mobileApps())

describe("resolveApp", () => {
  test("no slug resolves to the default app, so Alan's daily invocation needs no flag", () => {
    expect(resolveApp().slug).toBe(DEFAULT_APP_SLUG)
    expect(resolveApp(undefined).slug).toBe(DEFAULT_APP_SLUG)
    expect(resolveApp("").slug).toBe(DEFAULT_APP_SLUG)
  })

  test("the default app is still the one every command used to assume", () => {
    expect(resolveApp().bundleId).toBe("com.alanwalton.app")
  })

  test("an unknown slug is REFUSED, never defaulted", () => {
    expect(() => resolveApp("alanwaltn")).toThrow(InputError)
    expect(() => resolveApp("alanwaltn")).toThrow(/known apps:/)
  })
})

describe("two apps do not contend", () => {
  test("no two apps share a build lock, a counter, a bundle id or a shell directory", () => {
    expect(new Set(ALL.map((a) => a.macBuildLockDir)).size).toBe(ALL.length)
    expect(new Set(ALL.map((a) => a.macBuildNumberFile)).size).toBe(ALL.length)
    expect(new Set(ALL.map((a) => a.bundleId)).size).toBe(ALL.length)
    expect(new Set(ALL.map((a) => a.nativeShellRepoPath)).size).toBe(ALL.length)
  })

  test("the default app keeps the legacy lock + counter paths, so its counter never resets", () => {
    const alan = resolveApp(DEFAULT_APP_SLUG)
    expect(alan.macBuildLockDir).toBe("$HOME/.appstoreconnect/deploy-testflight.lock")
    expect(alan.macBuildNumberFile).toBe("$HOME/.appstoreconnect/testflight-build-number")
  })
})

describe("capabilities are chosen per app", () => {
  test("HealthKit is enabled ONLY on the app that actually ships it", () => {
    for (const app of ALL) {
      if (app.slug === DEFAULT_APP_SLUG) continue
      expect(app.ascCapabilities).not.toContain("HEALTHKIT")
    }
    expect(resolveApp(DEFAULT_APP_SLUG).ascCapabilities).toEqual([
      "PUSH_NOTIFICATIONS",
      "HEALTHKIT",
    ])
  })

  test("Smiling Jenny carries push and nothing else — her phone receives the surplus fall", () => {
    expect(resolveApp("smilingjenny").ascCapabilities).toEqual(["PUSH_NOTIFICATIONS"])
  })

  test("Atlas carries no capabilities at all", () => {
    expect(resolveApp("atlas").ascCapabilities).toEqual([])
  })
})

describe("records agree with the shells they name", () => {
  test("a widget bundle id, where present, is the app bundle id plus a suffix", () => {
    for (const app of ALL) {
      if (app.widgetBundleId === null) continue
      expect(app.widgetBundleId.startsWith(`${app.bundleId}.`)).toBe(true)
    }
  })

  test("the widget bundle id and the widget profile name are present or absent together", () => {
    for (const app of ALL) {
      expect(app.widgetBundleId === null).toBe(app.widgetProfileName === null)
    }
  })

  test("an app with a www stage script also names its shell, env and SPA source", () => {
    for (const app of ALL) {
      if (app.wwwStageScript === null) continue
      expect(app.nativeShellRepoPath).not.toBeNull()
      expect(app.webEnvSegments).not.toBeNull()
      expect(app.spaSourceRepoPath).not.toBeNull()
    }
  })

  test("an app has a mac staging directory exactly when it has content to stage", () => {
    for (const app of ALL) {
      expect(app.macWwwStagingRel === null).toBe(app.wwwStageScript === null)
    }
  })

  test("no two apps share a mac staging directory", () => {
    const dirs = ALL.map((app) => app.macWwwStagingRel).filter((rel) => rel !== null)
    expect(dirs.length).toBe(new Set(dirs).size)
  })

  test("an app with nothing staged resolves to no staging directory at all", () => {
    for (const app of ALL) {
      if (app.macWwwStagingRel !== null) continue
      expect(macWwwStagingDir(app)).toBeNull()
    }
  })

  test("the staged www path sits inside the shell that syncs it", () => {
    for (const app of ALL) {
      const staged = stagedWwwRepoPath(app)
      if (staged === null) {
        expect(app.nativeShellRepoPath).toBeNull()
        continue
      }
      const bare = (app.nativeShellRepoPath ?? "").replace(/^[a-z-]+:/, "")
      expect(staged).toBe(`${bare}/www`)
    }
  })
})

describe("splitRepoPath", () => {
  test("a bare path belongs to the code repo, which is where every shell began", () => {
    expect(splitRepoPath("packages/alanwalton/web")).toEqual({
      repo: "code",
      path: "packages/alanwalton/web",
    })
  })

  test("a prefixed path names the repository it is in", () => {
    expect(splitRepoPath("akasha:native-shell/atlas")).toEqual({
      repo: "akasha",
      path: "native-shell/atlas",
    })
  })

  test("only the first colon splits, so the path may carry others", () => {
    expect(splitRepoPath("akasha:a/b:c")).toEqual({ repo: "akasha", path: "a/b:c" })
  })
})
