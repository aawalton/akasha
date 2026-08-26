import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayToObject", () => {
  it("maps a 1-indexed array to a 0-keyed record", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        local result = ____lualib.__TS__ArrayToObject(arr)
        result_0 = result[0]
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
      `)
      expect(vm.get("result_0")).toBe("a")
      expect(vm.get("result_1")).toBe("b")
      expect(vm.get("result_2")).toBe("c")
      expect(vm.get("result_3")).toBeNull()
    })
  })

  it("returns an empty record for an empty array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {}
        local result = ____lualib.__TS__ArrayToObject(arr)
        result_is_table = type(result) == "table"
        result_0 = result[0]
      `)
      expect(vm.get("result_is_table")).toBe(true)
      expect(vm.get("result_0")).toBeNull()
    })
  })
})
