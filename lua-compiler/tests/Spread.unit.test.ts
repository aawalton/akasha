import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Spread", () => {
  it("expands an array into its elements as a Lua multi-return", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local a, b, c = ____lualib.__TS__Spread({10, 20, 30})",
          "result_a = a",
          "result_b = b",
          "result_c = c",
        ].join("\n")
      )
      expect(vm.get("result_a")).toBe(10)
      expect(vm.get("result_b")).toBe(20)
      expect(vm.get("result_c")).toBe(30)
    })
  })

  it("expands a string into its characters", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local a, b, c = ____lualib.__TS__Spread('abc')",
          "result_a = a",
          "result_b = b",
          "result_c = c",
        ].join("\n")
      )
      expect(vm.get("result_a")).toBe("a")
      expect(vm.get("result_b")).toBe("b")
      expect(vm.get("result_c")).toBe("c")
    })
  })

  it("an empty array spreads to zero values (select('#', ...) is 0)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(["result_count = select('#', ____lualib.__TS__Spread({}))"].join("\n"))
      expect(vm.get("result_count")).toBe(0)
    })
  })

  it("works in call position — flattens arr1 and arr2 inline as f(...arr1, ...arr2)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local function tally(...) return select('#', ...), ... end",
          "local count, x, y, z = tally(____lualib.__TS__Spread({1, 2, 3}))",
          "result_count = count",
          "result_x = x",
          "result_y = y",
          "result_z = z",
        ].join("\n")
      )
      expect(vm.get("result_count")).toBe(3)
      expect(vm.get("result_x")).toBe(1)
      expect(vm.get("result_y")).toBe(2)
      expect(vm.get("result_z")).toBe(3)
    })
  })
})
