import { describe, expect, test } from "bun:test"
import {
  manifestFault,
  placedAt,
} from "akasha/command/pages/deploy/modules/extension-placing/deploy-extension-placing.module.code.ts"

const WHOLE = {
  manifest_version: 3,
  background: { service_worker: "worker.js" },
  content_scripts: [{ matches: ["https://example.com/*"], js: ["site.js"] }],
}

describe("manifestFault", () => {
  test("a manifest naming the worker and the site code is no fault", () => {
    expect(manifestFault(WHOLE)).toBeNull()
  })

  test("no manifest at all is a fault", () => {
    expect(manifestFault(undefined)).toContain("no manifest")
  })

  test("a manifest naming another worker is a fault", () => {
    expect(manifestFault({ ...WHOLE, background: { service_worker: "bg.js" } })).toContain(
      "worker.js"
    )
  })

  test("a manifest naming no page for the site code is a fault", () => {
    expect(manifestFault({ ...WHOLE, content_scripts: [] })).toContain("no page")
  })

  test("a manifest naming another site file is a fault", () => {
    const other = { ...WHOLE, content_scripts: [{ matches: [], js: ["site.js", "more.js"] }] }
    expect(manifestFault(other)).toContain("site.js")
  })
})

describe("placedAt", () => {
  test("an extension is placed under its slug in the extensions folder", () => {
    expect(placedAt("/home/one", "watching")).toBe(
      "/home/one/.local/share/browser-extensions/watching"
    )
  })
})
