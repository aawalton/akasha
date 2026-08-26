import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__DelegatedYield", () => {
  it("forwards all yields from a sub-iterable in order", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        -- Wrap the polyfill in a coroutine since coroutine.yield is only
        -- valid inside a running coroutine. Drive it from outside via
        -- coroutine.resume to collect the forwarded values.
        local arr = {1, 2, 3}
        local co = coroutine.create(function()
          ____lualib.__TS__DelegatedYield(arr)
        end)
        local collected = {}
        local n = 0
        while true do
          local ok, value = coroutine.resume(co)
          if coroutine.status(co) == "dead" then break end
          n = n + 1
          collected[n] = value
        end
        result_count = n
        result_1 = collected[1]
        result_2 = collected[2]
        result_3 = collected[3]
      `)
      expect(vm.get("result_count")).toBe(3)
      expect(vm.get("result_1")).toBe(1)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3")).toBe(3)
    })
  })

  it("forwards each character of a string source in order", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local co = coroutine.create(function()
          ____lualib.__TS__DelegatedYield("abc")
        end)
        local collected = {}
        local n = 0
        while true do
          local ok, value = coroutine.resume(co)
          if coroutine.status(co) == "dead" then break end
          n = n + 1
          collected[n] = value
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

  it("forwards values from an inner GeneratorIterator", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        -- Build an inner generator via __TS__Generator, then delegate to it
        -- from an outer coroutine.
        local makeInner = ____lualib.__TS__Generator(function()
          coroutine.yield("a")
          coroutine.yield("b")
        end)
        local inner = makeInner()
        local outer = coroutine.create(function()
          ____lualib.__TS__DelegatedYield(inner)
        end)
        local collected = {}
        local n = 0
        while true do
          local ok, value = coroutine.resume(outer)
          if coroutine.status(outer) == "dead" then break end
          n = n + 1
          collected[n] = value
        end
        result_count = n
        result_1 = collected[1]
        result_2 = collected[2]
      `)
      expect(vm.get("result_count")).toBe(2)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
    })
  })
})
