import { describe, expect, test } from "bun:test"
import { ASC_ISSUER_ID, ASC_KEY_ID } from "../foundation/foundation.module.code.ts"
import { resolveApp } from "../mobile-app/mobile-app.module.code.ts"
import {
  buildEnsureAppStoreProfile,
  buildLoginOnlyKeychainScope,
  classifyTestflightFailure,
} from "./ios-signing.module.code.ts"

describe("classifyTestflightFailure", () => {
  test("ASC 401/403 sentinel → ASC_PERMISSION_DENIED naming the key + role fix", () => {
    const c = classifyTestflightFailure("…\nASC_PERMISSION_DENIED: /v1/profiles 403\n…")
    expect(c?.failureClass).toBe("ASC_PERMISSION_DENIED")
    expect(c?.remediation).toContain(ASC_KEY_ID)
    expect(c?.remediation).toContain("App Manager")
  })

  test("codesign errSecInternalComponent → SIGNING_KEYCHAIN_ERROR", () => {
    const c = classifyTestflightFailure(
      "Capacitor.framework: replacing existing signature\nCapacitor.framework: errSecInternalComponent"
    )
    expect(c?.failureClass).toBe("SIGNING_KEYCHAIN_ERROR")
    expect(c?.remediation.length).toBeGreaterThan(0)
  })

  test("xcodebuild 'Cloud signing permission error' → SIGNING_KEYCHAIN_ERROR", () => {
    const c = classifyTestflightFailure("error: exportArchive Cloud signing permission error")
    expect(c?.failureClass).toBe("SIGNING_KEYCHAIN_ERROR")
  })

  test("ASC sentinel wins when both patterns are present (permission is the earlier cause)", () => {
    const c = classifyTestflightFailure("ASC_PERMISSION_DENIED: x\nerrSecInternalComponent")
    expect(c?.failureClass).toBe("ASC_PERMISSION_DENIED")
  })

  test("Package.swift 'was modified during the build' → CONCURRENT_BUILD_MUTATION (#14137)", () => {
    const c = classifyTestflightFailure(
      "error: input file '/Users/walton/repos/akasha/native-shell/alanwalton/ios/App/CapApp-SPM/Package.swift' was modified during the build\n** ARCHIVE FAILED **"
    )
    expect(c?.failureClass).toBe("CONCURRENT_BUILD_MUTATION")
    expect(c?.remediation).toContain("re-run")
  })

  test("shared build.db + disk I/O error co-occurrence → CONCURRENT_BUILD_MUTATION (#14171/#14178)", () => {
    const c = classifyTestflightFailure(
      'error: accessing build database "/Users/walton/Library/Developer/Xcode/DerivedData/App-abc/Build/Intermediates.noindex/XCBuildData/build.db": disk I/O error\n** ARCHIVE FAILED **'
    )
    expect(c?.failureClass).toBe("CONCURRENT_BUILD_MUTATION")
  })

  test("the mutex-timeout sentinel → CONCURRENT_BUILD_MUTATION", () => {
    const c = classifyTestflightFailure(
      "CONCURRENT_BUILD_MUTATION: could not acquire the mac build lock within 1800s"
    )
    expect(c?.failureClass).toBe("CONCURRENT_BUILD_MUTATION")
  })

  test("build.db alone (no I/O error) is NOT misclassified as concurrency", () => {
    expect(classifyTestflightFailure("wrote build.db")).toBeUndefined()
  })

  test("ASC sentinel still wins over a concurrency signature (permission is earlier)", () => {
    const c = classifyTestflightFailure(
      "ASC_PERMISSION_DENIED: x\nPackage.swift was modified during the build"
    )
    expect(c?.failureClass).toBe("ASC_PERMISSION_DENIED")
  })

  test("a clean / unknown build failure is unclassified (wrapper falls back to raw tail)", () => {
    expect(classifyTestflightFailure("** ARCHIVE SUCCEEDED **")).toBeUndefined()
    expect(
      classifyTestflightFailure("ld: symbol(s) not found for architecture arm64")
    ).toBeUndefined()
  })
})

describe("buildLoginOnlyKeychainScope", () => {
  test("captures the search list, scopes to login-only, and restores it on cleanup", () => {
    const s = buildLoginOnlyKeychainScope()
    expect(s).toContain("KC_ORIG_LIST=$(security list-keychains -d user")
    expect(s).toContain("login.keychain-db")
    expect(s).toContain("security list-keychains -d user -s $KC_ORIG_LIST")
    expect(s).not.toContain("atlas-build")
  })
})

describe("buildEnsureAppStoreProfile", () => {
  const app = resolveApp()
  const bundleId = app.bundleId
  const widgetBundleId = app.widgetBundleId
  const s = buildEnsureAppStoreProfile(app)

  test("discovers the local distribution identity into SIGN_CERT_SHA1 (tolerant of no match)", () => {
    expect(s).toContain("SIGN_CERT_SHA1=")
    expect(s).toContain("security find-identity")
    expect(s).toContain("|| true")
  })

  test("ensures an IOS_APP_STORE profile for the bundle via the ASC API and installs it", () => {
    expect(s).toContain("appstoreconnect-v1")
    expect(s).toContain(ASC_KEY_ID)
    expect(s).toContain(ASC_ISSUER_ID)
    expect(s).toContain(bundleId)
    expect(s).toContain("IOS_APP_STORE")
    expect(s).toContain("Provisioning Profiles")
    expect(s).toContain("SIGN_PROFILE_UUID=")
  })

  test("ensures a SECOND profile for the WidgetKit extension bundle → SIGN_PROFILE_UUID_WIDGET", () => {
    expect(widgetBundleId).not.toBeNull()
    expect(s).toContain(String(widgetBundleId))
    expect(s).toContain("ASC_BUNDLE_ID='com.alanwalton.app.widgets'")
    expect(s).toContain("SIGN_PROFILE_UUID_WIDGET=")
    expect(s).toContain("ASC_PROFILE_NAME=")
    expect(s.split("security find-identity").length - 1).toBe(1)
  })

  test("enables PUSH_NOTIFICATIONS + HEALTHKIT for the app bundle only, not the widget", () => {
    expect(s).toContain("bundleIdCapabilities")
    expect(s).toContain("ASC_ENSURE_CAPABILITIES='PUSH_NOTIFICATIONS,HEALTHKIT'")
    expect(s).toContain("ASC_ENSURE_CAPABILITIES=''")
    expect(s.split("ASC_ENSURE_CAPABILITIES='PUSH_NOTIFICATIONS,HEALTHKIT'").length - 1).toBe(1)
    expect(s).toContain('ENV["ASC_ENSURE_CAPABILITIES"]')
    expect(s).not.toContain("ASC_ENSURE_PUSH")
  })

  test("any newly-enabled capability (201) forces a profile regen, not just push", () => {
    expect(s).toContain("caps_new = true")
    expect(s).toContain("match = nil if caps_new")
  })

  test("emits the ASC_PERMISSION_DENIED sentinel on a 401/403 (the typed Alan-gated case)", () => {
    expect(s).toContain("ASC_PERMISSION_DENIED")
  })

  test("never inlines the ASC private key — only reads it by path", () => {
    expect(s).not.toContain("BEGIN PRIVATE KEY")
    expect(s).toContain("private_keys/AuthKey_")
  })
})
