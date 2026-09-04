import { describe, expect, test } from "bun:test"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { requireMatch } from "@akasha/utils-narrow/require-match"
import { z } from "zod"
import { resolveRepoRoot } from "../git-tree-hash/git-tree-hash.module.code.ts"
import { mobileApps, resolveApp, shellRepoRoot } from "../mobile-app/mobile-app.module.code.ts"
import { buildTestflightDeployScript } from "../testflight-deploy-script/testflight-deploy-script.module.code.ts"
import {
  APP_STAMP_MARKER,
  buildStampGate,
  STAMP_GATE_OK,
  WIDGET_STAMP_MARKER,
} from "./build-stamp-gate.module.code.ts"

const APP = resolveApp("alanwalton")
const SHARED_SEAM_DIR = "akasha/code-system/ios-apps/scripts"
const STAMP_SEAM_REPO_PATH = `${SHARED_SEAM_DIR}/build-stamp/build-stamp.shell-script.shell.sh`
const APP_SEAM_DIR = "akasha/code-system/ios-apps/pages"
const COMMIT = "977e7d5a3e2f4fbc3942db6faff252272809668e"
const IPA = "build/export/App.ipa"

describe("buildStampGate", () => {
  const script = buildStampGate({ ipa: IPA, expectedCommit: COMMIT }).join("\n")

  test("establishes the commit from the compiled binaries, not from a file beside them", () => {
    expect(script).toContain(`unzip -q -o ${IPA}`)
    expect(script).toContain("strings -a")
    expect(script).not.toContain("PlistBuddy")
    expect(script).not.toContain("Info.plist")
  })

  test("reads the app executable and every embedded extension separately", () => {
    expect(script).toContain('"$STAMP_APP_BUNDLE/$(basename "$STAMP_APP_BUNDLE" .app)"')
    expect(script).toContain('"$STAMP_APP_BUNDLE"/PlugIns/*.appex')
  })

  test("holds each target to its own marker, so a stale widget cannot hide behind a fresh app", () => {
    expect(APP_STAMP_MARKER).not.toBe(WIDGET_STAMP_MARKER)
    expect(script).toContain(APP_STAMP_MARKER)
    expect(script).toContain(WIDGET_STAMP_MARKER)
  })

  test("compares against the commit it was given, so the artifact cannot vouch for itself", () => {
    expect(script).toContain(`STAMP_EXPECTED=${COMMIT}`)
  })

  test("refuses a MISSING stamp, rather than reading absent evidence as a pass", () => {
    expect(script).toContain("carries no $3 stamp at all")
  })

  test("refuses by exiting non-zero, which is what stops the run before altool", () => {
    expect(script).toContain("exit 1")
    expect(script).toContain("REFUSED")
  })

  test("names which binary disagreed and what it carried", () => {
    expect(script).toContain("was compiled from $stamp_actual, but this cut ships $STAMP_EXPECTED")
    expect(script).toContain('basename "$stamp_appex"')
  })

  test("installs no EXIT trap, which would silently replace the keychain restore", () => {
    expect(script).not.toContain("trap ")
  })

  test("emits its OK marker last, so the marker cannot outrun the verdict", () => {
    const lines = buildStampGate({ ipa: IPA, expectedCommit: COMMIT })
    expect(lines[lines.length - 1]).toBe(`echo "${STAMP_GATE_OK}"`)
  })
})

describe("the marker contract with the seam that writes it", () => {
  const seamPath = join(resolveRepoRoot(shellRepoRoot(APP)), STAMP_SEAM_REPO_PATH)

  test("the shared seam script this gate depends on is still there", () => {
    expect(existsSync(seamPath)).toBe(true)
  })

  function seamMarker(seam: string, shellVariable: string): string {
    return requireMatch(
      new RegExp(`^${shellVariable}="(?<marker>[^"]*)"$`, "m"),
      z.object({ marker: z.string().min(1) }),
      seam,
      STAMP_SEAM_REPO_PATH
    ).marker
  }

  test("the seam bakes exactly the two markers the gate reads back", () => {
    const seam = readFileSync(seamPath, "utf8")
    expect(seamMarker(seam, "NATIVE_SHELL_APP_STAMP_MARKER")).toBe(APP_STAMP_MARKER)
    expect(seamMarker(seam, "NATIVE_SHELL_WIDGET_STAMP_MARKER")).toBe(WIDGET_STAMP_MARKER)
  })

  test("each baked literal is the marker followed by the commit, which is the shape the gate greps", () => {
    const seam = readFileSync(seamPath, "utf8")
    expect(seam).toContain('"${NATIVE_SHELL_APP_STAMP_MARKER}=${commit}"')
    expect(seam).toContain('"${NATIVE_SHELL_WIDGET_STAMP_MARKER}=${commit}"')
  })

  test("the seam bakes each marker into an @objc class, which the linker will not strip", () => {
    const seam = readFileSync(seamPath, "utf8")
    expect(seam).toContain("@objc(NativeShellBuildStamp)")
    expect(seam).toContain("@objc(NativeShellWidgetBuildStamp)")
  })

  test("every app that ships a widget calls the shared seam rather than stamping its own way", () => {
    let checked = 0
    for (const app of Object.values(mobileApps())) {
      if (app.nativeShellRepoPath === null || app.widgetBundleId === null) continue
      const repoRoot = resolveRepoRoot(shellRepoRoot(app))
      const scriptsDir = join(repoRoot, APP_SEAM_DIR, app.slug, "scripts")
      if (!existsSync(scriptsDir)) continue
      const seamTree = readdirSync(scriptsDir, { recursive: true, encoding: "utf8" })
        .filter((name) => name.endsWith(".sh"))
        .map((name) => readFileSync(join(scriptsDir, name), "utf8"))
        .join("\n")
      expect(seamTree).toContain("build-stamp.shell-script.shell.sh")
      expect(seamTree).toContain("native_shell_stamp_app ")
      expect(seamTree).toContain("native_shell_stamp_widget ")
      checked += 1
    }
    expect(checked).toBeGreaterThan(0)
  })
})

describe("the gate's place in the cut script", () => {
  const base = {
    app: APP,
    configuration: "Release",
    sync: true,
    ascFloor: 0,
    password: "pw",
    cutCommit: COMMIT,
  } as const

  test("stands after the artifact exists and before anything reaches Apple", () => {
    const s = buildTestflightDeployScript({ ...base })
    const exported = s.indexOf(`test -f ${IPA}`)
    const gate = s.indexOf("build-stamp gate")
    const upload = s.indexOf("altool --upload-app")
    expect(exported).toBeGreaterThan(-1)
    expect(gate).toBeGreaterThan(exported)
    expect(upload).toBeGreaterThan(gate)
  })

  test("gates the dry run too, so a refusal is provable without spending an upload slot", () => {
    const s = buildTestflightDeployScript({ ...base, noUpload: true })
    const gate = s.indexOf("build-stamp gate")
    const validate = s.indexOf("altool --validate-app")
    expect(gate).toBeGreaterThan(-1)
    expect(validate).toBeGreaterThan(gate)
  })

  test("gates a --no-sync cut, the vector that recorded nothing at all", () => {
    const s = buildTestflightDeployScript({ ...base, sync: false })
    expect(s).not.toContain("npm run ios:sync")
    expect(s).toContain(`STAMP_EXPECTED=${COMMIT}`)
  })

  test("gates a widget-opted-out cut, the vector that recorded a falsehood", () => {
    const s = buildTestflightDeployScript({ ...base, nativeShellWidget: "0" })
    expect(s).toContain("export NATIVE_SHELL_WIDGET='0'")
    expect(s).toContain(WIDGET_STAMP_MARKER)
  })
})
