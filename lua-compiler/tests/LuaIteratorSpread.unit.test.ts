import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__LuaIteratorSpread on ipairs", () => {
  it('collects [index, value] pairs for {"a","b","c"}', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local step, state, firstKey = ipairs({"a", "b", "c"})
        local pairs_collected = { ____lualib.__TS__LuaIteratorSpread(step, state, firstKey) }
        result_n = #pairs_collected
        result_1_k = pairs_collected[1][1]
        result_1_v = pairs_collected[1][2]
        result_2_k = pairs_collected[2][1]
        result_2_v = pairs_collected[2][2]
        result_3_k = pairs_collected[3][1]
        result_3_v = pairs_collected[3][2]
      `)
      expect(vm.get("result_n")).toBe(3)
      expect(vm.get("result_1_k")).toBe(1)
      expect(vm.get("result_1_v")).toBe("a")
      expect(vm.get("result_2_k")).toBe(2)
      expect(vm.get("result_2_v")).toBe("b")
      expect(vm.get("result_3_k")).toBe(3)
      expect(vm.get("result_3_v")).toBe("c")
    })
  })
})

describe("__TS__LuaIteratorSpread on an empty source", () => {
  it("returns no tuples when the iterator is empty", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local step, state, firstKey = ipairs({})
        local pairs_collected = { ____lualib.__TS__LuaIteratorSpread(step, state, firstKey) }
        result_n = #pairs_collected
      `)
      expect(vm.get("result_n")).toBe(0)
    })
  })
})

describe("__TS__LuaIteratorSpread on a custom step function", () => {
  it("stops when the step function returns nil for the key", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local function step(state, key)
          local nextKey = (key or 0) + 1
          if nextKey > 3 then return nil end
          return nextKey, "v" .. tostring(nextKey)
        end
        local pairs_collected = { ____lualib.__TS__LuaIteratorSpread(step, nil, nil) }
        result_n = #pairs_collected
        result_1_k = pairs_collected[1][1]
        result_1_v = pairs_collected[1][2]
        result_3_k = pairs_collected[3][1]
        result_3_v = pairs_collected[3][2]
      `)
      expect(vm.get("result_n")).toBe(3)
      expect(vm.get("result_1_k")).toBe(1)
      expect(vm.get("result_1_v")).toBe("v1")
      expect(vm.get("result_3_k")).toBe(3)
      expect(vm.get("result_3_v")).toBe("v3")
    })
  })
})
