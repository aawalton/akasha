import { describe, expect, test } from "bun:test"
import { seamSharedDirsUnder } from "./sim-tree"

describe("seamSharedDirsUnder", () => {
  test("resolves the shared seam dirs the way apply-ios-seam.sh resolves them, from the shell", () => {
    expect(seamSharedDirsUnder("native-shell/alanwalton")).toEqual(["ios-seam", "ios-widget/ring"])
  })
  test("follows the shell wherever it stands, rather than naming one app's tree", () => {
    expect(seamSharedDirsUnder("native-shell/smilingjenny")).toEqual(["ios-seam", "ios-widget/ring"])
  })
  test("stays inside the repo for a shell nested deeper, so no delivery reaches above the root", () => {
    for (const path of seamSharedDirsUnder("native-shell/deep/example")) {
      expect(path.startsWith("..")).toBe(false)
    }
  })
})
