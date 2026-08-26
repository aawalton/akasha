import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Delete", () => {
  it("removes a string key and returns true; siblings are untouched", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local t = {a = 1, b = 2}",
          "result_returned = ____lualib.__TS__Delete(t, 'a')",
          "result_a = t.a",
          "result_b = t.b",
        ].join("\n")
      )
      expect(vm.get("result_returned")).toBe(true)
      expect(vm.get("result_a")).toBeNull()
      expect(vm.get("result_b")).toBe(2)
    })
  })

  it("returns true even for an absent key (matches JS — no-op delete is still true)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local t = {a = 1}",
          "result_returned = ____lualib.__TS__Delete(t, 'never_there')",
          "result_a = t.a",
        ].join("\n")
      )
      expect(vm.get("result_returned")).toBe(true)
      expect(vm.get("result_a")).toBe(1)
    })
  })

  it("removes a numeric (array-style) key", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local t = {[1] = 'a', [2] = 'b', [3] = 'c'}",
          "result_returned = ____lualib.__TS__Delete(t, 2)",
          "result_1 = t[1]",
          "result_2 = t[2]",
          "result_3 = t[3]",
        ].join("\n")
      )
      expect(vm.get("result_returned")).toBe(true)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBeNull()
      expect(vm.get("result_3")).toBe("c")
    })
  })
})
