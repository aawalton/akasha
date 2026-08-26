import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Iterator on a readonly array", () => {
  it("drives a Lua generic-for loop over the array elements", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        local collected = {}
        local n = 0
        for _, v in ____lualib.__TS__Iterator(arr) do
          n = n + 1
          collected[n] = v
        end
        result_count = n
        result_1 = collected[1]
        result_2 = collected[2]
        result_3 = collected[3]
      `)
      expect(vm.get("result_count")).toBe(3)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
      expect(vm.get("result_3")).toBe("c")
    })
  })
})

describe("__TS__Iterator on a string", () => {
  it("iterates one character per step (1-indexed positions)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local collected = {}
        local n = 0
        for _, ch in ____lualib.__TS__Iterator("abc") do
          n = n + 1
          collected[n] = ch
        end
        result_count = n
        result_1 = collected[1]
        result_2 = collected[2]
        result_3 = collected[3]
      `)
      expect(vm.get("result_count")).toBe(3)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
      expect(vm.get("result_3")).toBe("c")
    })
  })
})

describe("__TS__Iterator on a Symbol.iterator iterable", () => {
  it("drives an iterator object that returns {value, done}", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local sym_iter = ____lualib.Symbol.iterator
        local iterable = {}
        iterable[sym_iter] = function(self)
          local i = 0
          return {
            next = function(self)
              i = i + 1
              if i > 3 then
                return { done = true }
              end
              return { value = i * 10, done = false }
            end
          }
        end
        local collected = {}
        local n = 0
        for _, v in ____lualib.__TS__Iterator(iterable) do
          n = n + 1
          collected[n] = v
        end
        result_count = n
        result_1 = collected[1]
        result_2 = collected[2]
        result_3 = collected[3]
      `)
      expect(vm.get("result_count")).toBe(3)
      expect(vm.get("result_1")).toBe(10)
      expect(vm.get("result_2")).toBe(20)
      expect(vm.get("result_3")).toBe(30)
    })
  })
})
