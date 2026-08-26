import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Generator", () => {
  it("a 3-yield body produces three {value, done:false} then {done:true}", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local makeGen = ____lualib.__TS__Generator(function()
          coroutine.yield(10)
          coroutine.yield(20)
          coroutine.yield(30)
        end)
        local it = makeGen()
        local r1 = it:next()
        local r2 = it:next()
        local r3 = it:next()
        local r4 = it:next()
        local r5 = it:next()
        result_v1, result_d1 = r1.value, r1.done
        result_v2, result_d2 = r2.value, r2.done
        result_v3, result_d3 = r3.value, r3.done
        result_v4, result_d4 = r4.value, r4.done
        result_v5, result_d5 = r5.value, r5.done
      `)
      expect(vm.get("result_v1")).toBe(10)
      expect(vm.get("result_d1")).toBe(false)
      expect(vm.get("result_v2")).toBe(20)
      expect(vm.get("result_d2")).toBe(false)
      expect(vm.get("result_v3")).toBe(30)
      expect(vm.get("result_d3")).toBe(false)
      expect(vm.get("result_v4")).toBeNull()
      expect(vm.get("result_d4")).toBe(true)
      expect(vm.get("result_v5")).toBeNull()
      expect(vm.get("result_d5")).toBe(true)
    })
  })

  it("an empty generator body finishes immediately", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local makeGen = ____lualib.__TS__Generator(function() end)
        local it = makeGen()
        local r1 = it:next()
        local r2 = it:next()
        result_v1, result_d1 = r1.value, r1.done
        result_v2, result_d2 = r2.value, r2.done
      `)
      expect(vm.get("result_v1")).toBeNull()
      expect(vm.get("result_d1")).toBe(true)
      expect(vm.get("result_v2")).toBeNull()
      expect(vm.get("result_d2")).toBe(true)
    })
  })

  it("captures generator-function arguments into the coroutine", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local makeGen = ____lualib.__TS__Generator(function(a, b)
          coroutine.yield(a)
          coroutine.yield(b)
          coroutine.yield(a + b)
        end)
        local it = makeGen("x", "y")
        local r1 = it:next()
        local r2 = it:next()
        -- swap to numeric args for the addition
        local makeAdd = ____lualib.__TS__Generator(function(a, b)
          coroutine.yield(a + b)
        end)
        local addIt = makeAdd(2, 3)
        local r3 = addIt:next()
        result_1 = r1.value
        result_2 = r2.value
        result_3 = r3.value
      `)
      expect(vm.get("result_1")).toBe("x")
      expect(vm.get("result_2")).toBe("y")
      expect(vm.get("result_3")).toBe(5)
    })
  })
})
