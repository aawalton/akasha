import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("performance.now", () => {
  it("returns GetGameTimeMilliseconds()", async () => {
    await withLualibVm(
      {
        stubs: "GetGameTimeMilliseconds = function() return 12345 end",
      },
      async (vm) => {
        await vm.run(`result = ____lualib.performance.now()`)
        expect(vm.get("result")).toBe(12345)
      }
    )
  })

  it("re-reads GetGameTimeMilliseconds on every call", async () => {
    await withLualibVm(
      {
        stubs: "GetGameTimeMilliseconds = function() return 1000 end",
      },
      async (vm) => {
        await vm.run(`
        result_a = ____lualib.performance.now()
        GetGameTimeMilliseconds = function() return 2500 end
        result_b = ____lualib.performance.now()
      `)
        expect(vm.get("result_a")).toBe(1000)
        expect(vm.get("result_b")).toBe(2500)
      }
    )
  })

  it("subtraction yields a duration in milliseconds", async () => {
    await withLualibVm(
      {
        stubs: "GetGameTimeMilliseconds = function() return _G.____now or 0 end",
      },
      async (vm) => {
        await vm.run(`
        _G.____now = 100
        local start = ____lualib.performance.now()
        _G.____now = 100 + 250
        local stop = ____lualib.performance.now()
        elapsed = stop - start
      `)
        expect(vm.get("elapsed")).toBe(250)
      }
    )
  })
})
