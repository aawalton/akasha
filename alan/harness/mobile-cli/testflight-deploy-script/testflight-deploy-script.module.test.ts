import { describe, expect, test } from "bun:test"
import { macWwwStagingDir, mobileApps, resolveApp } from "../mobile-app/mobile-app.module.code.ts"
import { buildTestflightDeployScript } from "./testflight-deploy-script.module.code.ts"

function buildable(slug: string): boolean {
  try {
    scriptFor(slug, true)
    return true
  } catch {
    return false
  }
}

function scriptFor(slug: string, sync: boolean): string {
  return buildTestflightDeployScript({
    app: resolveApp(slug),
    configuration: "Release",
    sync,
    ascFloor: 0,
    password: "unused",
    cutCommit: "0".repeat(40),
  })
}

const ALL = Object.values(mobileApps()).filter((app) => buildable(app.slug))

describe("buildTestflightDeployScript www injection", () => {
  test("more than one app builds a deploy script, so the loops below cover something", () => {
    expect(ALL.length).toBeGreaterThan(1)
  })

  test("a cut of an app with nothing staged replaces no www, even with sync on", () => {
    for (const app of ALL) {
      if (app.wwwStageScript !== null) continue
      const script = scriptFor(app.slug, true)
      expect(script).not.toContain("rm -rf www")
      expect(script).not.toContain("cp -R")
    }
  })

  test("a cut reads no staging directory belonging to another app", () => {
    for (const app of ALL) {
      const script = scriptFor(app.slug, true)
      for (const other of ALL) {
        const otherDir = macWwwStagingDir(other)
        if (otherDir === null || other.slug === app.slug) continue
        expect(script).not.toContain(otherDir)
      }
    }
  })

  test("a cut of an app with staged content injects that app's own directory", () => {
    for (const app of ALL) {
      const ownDir = macWwwStagingDir(app)
      if (ownDir === null) continue
      const script = scriptFor(app.slug, true)
      expect(script).toContain(`cp -R ${ownDir}/. www/`)
    }
  })

  test("sync off replaces no www for any app", () => {
    for (const app of ALL) {
      expect(scriptFor(app.slug, false)).not.toContain("rm -rf www")
    }
  })
})

describe("the mac build lock outliving the run that took it", () => {
  test("the lock directory is registered for removal on the way out, right after it is taken", () => {
    for (const app of ALL) {
      const script = scriptFor(app.slug, true)
      const taken = script.indexOf(`mkdir "${app.macBuildLockDir}"`)
      const registered = script.indexOf(
        `_on_cleanup 'rm -rf "${app.macBuildLockDir}" 2>/dev/null || true'`
      )
      expect(taken).toBeGreaterThan(-1)
      expect(registered).toBeGreaterThan(taken)
    }
  })

  test("the removal is registered before the checkout, so a run dying there still releases", () => {
    for (const app of ALL) {
      const script = scriptFor(app.slug, true)
      const registered = script.indexOf(`_on_cleanup 'rm -rf "${app.macBuildLockDir}"`)
      const checkout = script.indexOf("NATIVE_SHELL_CHECKOUT=$(mktemp -d)")
      expect(registered).toBeGreaterThan(-1)
      expect(checkout).toBeGreaterThan(registered)
    }
  })

  test("a dry run registers the removal too, since a dry run takes the same lock", () => {
    for (const app of ALL) {
      const script = buildTestflightDeployScript({
        app: resolveApp(app.slug),
        configuration: "Release",
        sync: true,
        ascFloor: 0,
        password: "unused",
        cutCommit: "0".repeat(40),
        noUpload: true,
      })
      expect(script).toContain(`_on_cleanup 'rm -rf "${app.macBuildLockDir}"`)
    }
  })
})
