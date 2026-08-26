import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Using disposes registered resources", () => {
  it("calls Symbol.dispose on each arg in reverse order (LIFO) after the callback returns", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local disposeSym = ____lualib.Symbol.dispose
        local disposed = {}
        local function makeDisposable(name)
          local d = {}
          d[disposeSym] = function(self) table.insert(disposed, name) end
          return d
        end
        local a = makeDisposable("a")
        local b = makeDisposable("b")
        local c = makeDisposable("c")
        local function cb() return "result-value" end
        local result = ____lualib.__TS__Using(nil, cb, a, b, c)
        result_value = result
        result_first = disposed[1]
        result_second = disposed[2]
        result_third = disposed[3]
        result_count = #disposed
      `)
      expect(vm.get("result_value")).toBe("result-value")
      expect(vm.get("result_first")).toBe("c")
      expect(vm.get("result_second")).toBe("b")
      expect(vm.get("result_third")).toBe("a")
      expect(vm.get("result_count")).toBe(3)
    })
  })

  it("forwards the args to the callback in their original order", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local disposeSym = ____lualib.Symbol.dispose
        local function makeDisposable() local d = {}; d[disposeSym] = function() end; return d end
        local a = makeDisposable()
        local b = makeDisposable()
        local seen = {}
        local function cb(x, y)
          table.insert(seen, x == a and "a" or (x == b and "b" or "?"))
          table.insert(seen, y == a and "a" or (y == b and "b" or "?"))
        end
        ____lualib.__TS__Using(nil, cb, a, b)
        result_first = seen[1]
        result_second = seen[2]
      `)
      expect(vm.get("result_first")).toBe("a")
      expect(vm.get("result_second")).toBe("b")
    })
  })

  it("disposes every resource even when the callback throws, then rethrows the error", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local disposeSym = ____lualib.Symbol.dispose
        local disposed = {}
        local function makeDisposable(name)
          local d = {}
          d[disposeSym] = function(self) table.insert(disposed, name) end
          return d
        end
        local a = makeDisposable("a")
        local b = makeDisposable("b")
        local function cb()
          error("boom")
        end
        local ok, err = pcall(function()
          ____lualib.__TS__Using(nil, cb, a, b)
        end)
        result_ok = ok
        result_err_has_boom = type(err) == "string" and string.find(err, "boom") ~= nil
        result_count = #disposed
        result_first = disposed[1]
        result_second = disposed[2]
      `)
      expect(vm.get("result_ok")).toBe(false)
      expect(vm.get("result_err_has_boom")).toBe(true)
      expect(vm.get("result_count")).toBe(2)
      expect(vm.get("result_first")).toBe("b")
      expect(vm.get("result_second")).toBe("a")
    })
  })
})
