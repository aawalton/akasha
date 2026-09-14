import { describe, expect, test } from "bun:test"
import {
  buildResolveAndBootSimScript,
  buildStartAppiumScript,
  parseResolvedUdid,
} from "akasha/alan/harness/mobile-cli/modules/sim-macbook/sim-macbook.module.code.ts"

describe("buildStartAppiumScript", () => {
  test("starts Appium detached on port 4723 with relaxed security", () => {
    const s = buildStartAppiumScript()
    expect(s).toContain("nohup appium --address 0.0.0.0 --port 4723 --relaxed-security")
    expect(s).toContain("</dev/null")
    expect(s).toContain("set -euo pipefail")
    expect(s).not.toContain("set -x")
  })
})

describe("buildResolveAndBootSimScript", () => {
  test("embeds an explicit preferred udid, single-quoted", () => {
    expect(buildResolveAndBootSimScript("UDID-1")).toContain("PREF='UDID-1'")
  })
  test("empty preferred udid resolves booted/available", () => {
    const s = buildResolveAndBootSimScript()
    expect(s).toContain("PREF=''")
    expect(s).toContain("simctl list devices booted")
  })
})

describe("parseResolvedUdid", () => {
  test("extracts SIM_UDID=<udid>", () => {
    expect(parseResolvedUdid("noise\nSIM_UDID=7E6CC581-6299-49D1-AFF5-C788ABF22F9F\n")).toBe(
      "7E6CC581-6299-49D1-AFF5-C788ABF22F9F"
    )
  })
  test("throws when absent", () => {
    expect(() => parseResolvedUdid("no udid here")).toThrow(/could not resolve/)
  })
})
