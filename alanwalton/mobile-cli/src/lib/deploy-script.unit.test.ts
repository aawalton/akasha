import { describe, expect, test } from "bun:test"
import { macWwwStagingDir, mobileApps, resolveApp } from "./apps"
import { buildTestflightDeployScript } from "./deploy-script"

const ALL = Object.values(mobileApps())

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

describe("buildTestflightDeployScript www injection", () => {
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
