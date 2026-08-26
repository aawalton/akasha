import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("lualib callback calling convention", () => {
  it("__TS__ArraySort passes a leading nil self slot to the comparator", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {30, 10, 20}
        call_count = 0
        all_self_nil = true
        first_a = 0
        first_b = 0
        ____lualib.__TS__ArraySort(arr, function(self, a, b)
          if self ~= nil then all_self_nil = false end
          if call_count == 0 then
            first_a = a
            first_b = b
          end
          call_count = call_count + 1
          return a - b
        end)
        first_a_is_element = (first_a == 10 or first_a == 20 or first_a == 30)
        first_b_is_element = (first_b == 10 or first_b == 20 or first_b == 30)
        result_1 = arr[1]
        result_2 = arr[2]
        result_3 = arr[3]
      `)
      expect(vm.get("all_self_nil")).toBe(true)
      expect(vm.get("first_a_is_element")).toBe(true)
      expect(vm.get("first_b_is_element")).toBe(true)
      expect(vm.get("result_1")).toBe(10)
      expect(vm.get("result_2")).toBe(20)
      expect(vm.get("result_3")).toBe(30)
    })
  })

  it("the adapter wrapper shape absorbs the leading nil for a self-free comparator", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local byName = function(a, b)
          if a.name < b.name then return -1 end
          if a.name > b.name then return 1 end
          return 0
        end
        local arr = { {name = "cherry"}, {name = "apple"}, {name = "banana"} }
        ____lualib.__TS__ArraySort(arr, function(____, ...) return byName(...) end)
        result_1 = arr[1].name
        result_2 = arr[2].name
        result_3 = arr[3].name
      `)
      expect(vm.get("result_1")).toBe("apple")
      expect(vm.get("result_2")).toBe("banana")
      expect(vm.get("result_3")).toBe("cherry")
    })
  })

  it("__TS__ArrayMap routes callbacks through .call with nil thisArg in the first slot", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {10, 20, 30}
        call_count = 0
        all_first_arg_nil = true
        first_value = 0
        first_index = -1
        local mapped = ____lualib.__TS__ArrayMap(arr, function(self, value, index)
          if self ~= nil then all_first_arg_nil = false end
          if call_count == 0 then
            first_value = value
            first_index = index
          end
          call_count = call_count + 1
          return value * 2
        end)
        result_count = call_count
        mapped_1 = mapped[1]
        mapped_2 = mapped[2]
        mapped_3 = mapped[3]
      `)
      expect(vm.get("all_first_arg_nil")).toBe(true)
      expect(vm.get("first_value")).toBe(10)
      expect(vm.get("first_index")).toBe(0)
      expect(vm.get("result_count")).toBe(3)
      expect(vm.get("mapped_1")).toBe(20)
      expect(vm.get("mapped_2")).toBe(40)
      expect(vm.get("mapped_3")).toBe(60)
    })
  })
})
