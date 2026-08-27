import { describe, expect, test } from "bun:test"
import { componentTestMissingDom } from "./component-dom-guard"

describe("componentTestMissingDom", () => {
  const componentRun = [
    "bun",
    "shared/design-layout/src/components/page-tab-header.component.test.tsx",
  ]

  test("fires when a component-test path runs without a DOM (root invocation)", () => {
    expect(componentTestMissingDom(componentRun, false)).toBe(true)
  })

  test("stays silent when the DOM is present (package-dir run, DOM registered)", () => {
    expect(componentTestMissingDom(componentRun, true)).toBe(false)
  })

  test("stays silent for non-component tests without a DOM", () => {
    const unitRun = ["bun", "shared/utils-test/src/component-dom-guard.unit.test.ts"]
    expect(componentTestMissingDom(unitRun, false)).toBe(false)
  })

  test("matches CI-style package-relative component paths (still silent — DOM present in CI)", () => {
    const ciRelative = ["bun", "./app/components/settings/automation-tab.component.test.tsx"]
    expect(componentTestMissingDom(ciRelative, false)).toBe(true)
    expect(componentTestMissingDom(ciRelative, true)).toBe(false)
  })

  test("stays silent with no test paths in argv", () => {
    expect(componentTestMissingDom(["bun"], false)).toBe(false)
  })
})
