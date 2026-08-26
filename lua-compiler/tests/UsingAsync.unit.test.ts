import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__UsingAsync shape", () => {
  it("is exported from the lualib bundle as a function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_type = type(____lualib.__TS__UsingAsync)`)
      expect(vm.get("result_type")).toBe("function")
    })
  })
})

describe("__TS__UsingAsync behavioral cases", () => {
  it("calls Symbol.dispose synchronously on each Disposable arg in reverse order", async () => {
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
        local function cb() return "ok" end
        local promise = ____lualib.__TS__UsingAsync(nil, cb, a, b, c)
        result_state_tag = promise.state.tag
        result_state_value = promise.state.value
        result_first = disposed[1]
        result_second = disposed[2]
        result_third = disposed[3]
        result_count = #disposed
      `)
      expect(vm.get("result_state_tag")).toBe("fulfilled")
      expect(vm.get("result_state_value")).toBe("ok")
      expect(vm.get("result_first")).toBe("c")
      expect(vm.get("result_second")).toBe("b")
      expect(vm.get("result_third")).toBe("a")
      expect(vm.get("result_count")).toBe(3)
    })
  })

  it("awaits Symbol.asyncDispose on each AsyncDisposable arg in reverse order", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local asyncDisposeSym = ____lualib.Symbol.asyncDispose
        local disposed = {}
        local function makeAsyncDisposable(name)
          local d = {}
          d[asyncDisposeSym] = function(self) table.insert(disposed, name) end
          return d
        end
        local a = makeAsyncDisposable("a")
        local b = makeAsyncDisposable("b")
        local c = makeAsyncDisposable("c")
        local function cb() return "ok" end
        local promise = ____lualib.__TS__UsingAsync(nil, cb, a, b, c)
        result_state_tag = promise.state.tag
        result_first = disposed[1]
        result_second = disposed[2]
        result_third = disposed[3]
        result_count = #disposed
      `)
      expect(vm.get("result_state_tag")).toBe("fulfilled")
      expect(vm.get("result_first")).toBe("c")
      expect(vm.get("result_second")).toBe("b")
      expect(vm.get("result_third")).toBe("a")
      expect(vm.get("result_count")).toBe(3)
    })
  })

  it("rethrows the callback's error after every resource has been disposed", async () => {
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
        local function cb() error("boom") end
        local promise = ____lualib.__TS__UsingAsync(nil, cb, a, b)
        result_state_tag = promise.state.tag
        result_reason = promise.state.reason
        result_reason_has_boom = type(result_reason) == "string" and string.find(result_reason, "boom") ~= nil
        result_count = #disposed
        result_first = disposed[1]
        result_second = disposed[2]
      `)
      expect(vm.get("result_state_tag")).toBe("rejected")
      expect(vm.get("result_reason_has_boom")).toBe(true)
      expect(vm.get("result_count")).toBe(2)
      expect(vm.get("result_first")).toBe("b")
      expect(vm.get("result_second")).toBe("a")
    })
  })

  it("returns a Promise that resolves with the callback's return value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local disposeSym = ____lualib.Symbol.dispose
        local function makeDisposable() local d = {}; d[disposeSym] = function() end; return d end
        local a = makeDisposable()
        local function cb() return 42 end
        local promise = ____lualib.__TS__UsingAsync(nil, cb, a)
        result_state_tag = promise.state.tag
        result_state_value = promise.state.value
      `)
      expect(vm.get("result_state_tag")).toBe("fulfilled")
      expect(vm.get("result_state_value")).toBe(42)
    })
  })
})
