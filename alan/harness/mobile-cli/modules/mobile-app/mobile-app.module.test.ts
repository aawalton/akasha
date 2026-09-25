import { describe, expect, test } from "bun:test"
import {
  DEFAULT_APP_SLUG,
  mobileApps,
  resolveApp,
  ringCredentialPartIn,
  splitRepoPath,
} from "akasha/alan/harness/mobile-cli/modules/mobile-app/mobile-app.module.code.ts"
import { InputError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { alanwalton } from "akasha/code/ios-app/pages/alanwalton/alanwalton.ios-app.ts"
import { smilingjenny } from "akasha/code/ios-app/pages/smilingjenny/smilingjenny.ios-app.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { readingNone } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ALL = Object.values(mobileApps())

describe("resolveApp", () => {
  test("no slug resolves to the default app, so Alan's daily invocation needs no flag", () => {
    expect(resolveApp().slug).toBe(DEFAULT_APP_SLUG)
    expect(resolveApp(undefined).slug).toBe(DEFAULT_APP_SLUG)
    expect(resolveApp("").slug).toBe(DEFAULT_APP_SLUG)
  })

  test("the default app is the app the alanwalton page states", () => {
    expect(resolveApp().bundleId).toBe(alanwalton.bundleId)
  })

  test("an unknown slug is REFUSED, never defaulted", () => {
    expect(() => resolveApp("alanwaltn")).toThrow(InputError)
    expect(() => resolveApp("alanwaltn")).toThrow(/known apps:/)
  })
})

describe("the pages the apps are read from", () => {
  test("apps are read from the pages handed in rather than from the checkout", () => {
    expect(mobileApps(readingNone())).toEqual({})
    expect(() => resolveApp(DEFAULT_APP_SLUG, readingNone())).toThrow(/known apps:/)
  })

  test("the pages a commit holds answer the apps that commit holds", () => {
    const pinned = pagesAt(codeRoot(), "HEAD")
    expect(resolveApp(DEFAULT_APP_SLUG, pinned).bundleId).toBe(alanwalton.bundleId)
  })
})

describe("two apps do not contend", () => {
  test("no two apps share a build lock, a counter, a bundle id or a shell directory", () => {
    expect(new Set(ALL.map((a) => a.macBuildLockDir)).size).toBe(ALL.length)
    expect(new Set(ALL.map((a) => a.macBuildNumberFile)).size).toBe(ALL.length)
    expect(new Set(ALL.map((a) => a.bundleId)).size).toBe(ALL.length)
    expect(new Set(ALL.map((a) => a.nativeShellRepoPath)).size).toBe(ALL.length)
  })

  test("the default app keeps the lock and counter paths its page states", () => {
    const alan = resolveApp(DEFAULT_APP_SLUG)
    expect(alan.macBuildLockDir).toBe(alanwalton.macBuildLockDir)
    expect(alan.macBuildNumberFile).toBe(alanwalton.macBuildNumberFile)
  })
})

describe("capabilities are chosen per app", () => {
  test("HealthKit is enabled ONLY on the app that actually ships it", () => {
    for (const app of ALL) {
      if (app.slug === DEFAULT_APP_SLUG) continue
      expect(app.ascCapabilities).not.toContain("HEALTHKIT")
    }
    expect(resolveApp(DEFAULT_APP_SLUG).ascCapabilities).toEqual(alanwalton.ascCapabilities)
  })

  test("Smiling Jenny carries the capabilities her page states", () => {
    expect(resolveApp("smilingjenny").ascCapabilities).toEqual(smilingjenny.ascCapabilities)
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

const JENNY = "smilingjenny"

const RING = '"shell-script/smilingjenny-ring-credential",'

describe("the ring credential an app bakes", () => {
  test("an app read from a commit's pages carries the ring credential script those pages name", () => {
    const pinned = pagesAt(codeRoot(), "HEAD")
    const held = resolveApp(JENNY, pinned).ringCredentialScript
    expect(held).not.toBeNull()
    expect(held).toBe(resolveApp(JENNY).ringCredentialScript)
  })

  test("pages naming no ring credential script answer none, whatever the checkout names", () => {
    const pinned = pagesAt(codeRoot(), "HEAD")
    const page = resolveApp(JENNY).pagePath
    const unringed: Reading = {
      ...pinned,
      read: (path) => {
        const body = pinned.read(path)
        return path === page && body !== null ? body.replace(RING, "") : body
      },
    }
    expect(resolveApp(JENNY, unringed).ringCredentialScript).toBeNull()
    expect(resolveApp(JENNY).ringCredentialScript).not.toBeNull()
  })
})

describe("ringCredentialPartIn", () => {
  const at = "one.ios-app.ts"
  const ring = "shell-script/one-ring-credential"
  const other = "shell-script/one-widget-target"

  test("the ring credential a page names is answered whatever place it is written in", () => {
    expect(ringCredentialPartIn([ring, other], at)).toBe(ring)
    expect(ringCredentialPartIn([other, ring], at)).toBe(ring)
  })

  test("a page naming two ring credential scripts is refused rather than answered by the first", () => {
    const two = [ring, "shell-script/two-ring-credential"]
    expect(() => ringCredentialPartIn(two, at)).toThrow(InputError)
    expect(() => ringCredentialPartIn([...two].reverse(), at)).toThrow(InputError)
  })

  test("a page naming no ring credential script is answered as none", () => {
    expect(ringCredentialPartIn([other], at)).toBeNull()
  })
})
