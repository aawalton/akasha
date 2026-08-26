import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayConcat", () => {
  it("flattens array arguments and appends scalars", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b"}
        local result = ____lualib.__TS__ArrayConcat(arr, {"c", "d"}, "e")
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
        result_4 = result[4]
        result_5 = result[5]
      `)
      expect(vm.get("result_len")).toBe(5)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
      expect(vm.get("result_3")).toBe("c")
      expect(vm.get("result_4")).toBe("d")
      expect(vm.get("result_5")).toBe("e")
    })
  })

  it("does not mutate the receiver", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b"}
        ____lualib.__TS__ArrayConcat(arr, {"c"})
        arr_len = #arr
        arr_1 = arr[1]
        arr_2 = arr[2]
      `)
      expect(vm.get("arr_len")).toBe(2)
      expect(vm.get("arr_1")).toBe("a")
      expect(vm.get("arr_2")).toBe("b")
    })
  })
})
