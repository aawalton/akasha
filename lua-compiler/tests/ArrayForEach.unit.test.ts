import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayForEach", () => {
  it("invokes the callback for each element with the value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        captured = {}
        ____lualib.__TS__ArrayForEach({"a", "b", "c"}, function(self, value)
          captured[#captured + 1] = value
        end)
        captured_len = #captured
        captured_1 = captured[1]
        captured_2 = captured[2]
        captured_3 = captured[3]
      `)
      expect(vm.get("captured_len")).toBe(3)
      expect(vm.get("captured_1")).toBe("a")
      expect(vm.get("captured_2")).toBe("b")
      expect(vm.get("captured_3")).toBe("c")
    })
  })

  it("passes 0-based indices to the callback", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        indices = {}
        ____lualib.__TS__ArrayForEach({10, 20, 30}, function(self, value, index)
          indices[#indices + 1] = index
        end)
        indices_len = #indices
        indices_1 = indices[1]
        indices_2 = indices[2]
        indices_3 = indices[3]
      `)
      expect(vm.get("indices_len")).toBe(3)
      expect(vm.get("indices_1")).toBe(0)
      expect(vm.get("indices_2")).toBe(1)
      expect(vm.get("indices_3")).toBe(2)
    })
  })

  it("does not invoke the callback for an empty array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        called = 0
        ____lualib.__TS__ArrayForEach({}, function() called = called + 1 end)
      `)
      expect(vm.get("called")).toBe(0)
    })
  })
})
