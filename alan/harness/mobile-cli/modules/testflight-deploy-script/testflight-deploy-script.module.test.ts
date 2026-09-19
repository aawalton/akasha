import { describe, expect, test } from "bun:test"
import {
  mobileApps,
  resolveApp,
} from "akasha/alan/harness/mobile-cli/modules/mobile-app/mobile-app.module.code.ts"
import { buildTestflightDeployScript } from "akasha/alan/harness/mobile-cli/modules/testflight-deploy-script/testflight-deploy-script.module.code.ts"

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
    cutCommit: "0".repeat(40),
  })
}

const ALL = Object.values(mobileApps()).filter((app) => buildable(app.slug))

describe("the mac build lock outliving the run that took it", () => {
  test("more than one app builds a deploy script, so the loops below cover something", () => {
    expect(ALL.length).toBeGreaterThan(1)
  })

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

  test("a no-upload run registers the removal too, since it takes the same lock", () => {
    for (const app of ALL) {
      const script = buildTestflightDeployScript({
        app: resolveApp(app.slug),
        configuration: "Release",
        sync: true,
        ascFloor: 0,
        cutCommit: "0".repeat(40),
        noUpload: true,
      })
      expect(script).toContain(`_on_cleanup 'rm -rf "${app.macBuildLockDir}"`)
    }
  })
})
