import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Promise shape", () => {
  it("is exported as a class table whose prototype carries the public method names", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_class_type = type(____lualib.__TS__Promise)
        result_proto_type = type(____lualib.__TS__Promise.prototype)
        result_then_type = type(____lualib.__TS__Promise.prototype["then"])
        result_catch_type = type(____lualib.__TS__Promise.prototype.catch)
        result_finally_type = type(____lualib.__TS__Promise.prototype.finally)
        result_resolve_type = type(____lualib.__TS__Promise.resolve)
        result_reject_type = type(____lualib.__TS__Promise.reject)
      `)
      expect(vm.get("result_class_type")).toBe("table")
      expect(vm.get("result_proto_type")).toBe("table")
      expect(vm.get("result_then_type")).toBe("function")
      expect(vm.get("result_catch_type")).toBe("function")
      expect(vm.get("result_finally_type")).toBe("function")
      expect(vm.get("result_resolve_type")).toBe("function")
      expect(vm.get("result_reject_type")).toBe("function")
    })
  })
})

describe("__TS__Promise#finally on a forged settled promise", () => {
  it("invokes onFinally immediately when the promise is already fulfilled and returns the same promise", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local proto = ____lualib.__TS__Promise.prototype
        local p = setmetatable({
          state = {tag = "fulfilled", value = 42},
          fulfilledCallbacks = {},
          rejectedCallbacks = {},
          finallyCallbacks = {},
        }, proto)
        local ran = false
        local returned = p:finally(function() ran = true end)
        result_ran = ran
        result_same = returned == p
      `)
      expect(vm.get("result_ran")).toBe(true)
      expect(vm.get("result_same")).toBe(true)
    })
  })

  it("invokes onFinally immediately when the promise is already rejected", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local proto = ____lualib.__TS__Promise.prototype
        local p = setmetatable({
          state = {tag = "rejected", reason = "boom"},
          fulfilledCallbacks = {},
          rejectedCallbacks = {},
          finallyCallbacks = {},
        }, proto)
        local ran = false
        p:finally(function() ran = true end)
        result_ran = ran
      `)
      expect(vm.get("result_ran")).toBe(true)
    })
  })
})

describe("__TS__Promise behavioral cases", () => {
  it("new Promise(executor) runs executor synchronously and resolve(v) settles state to fulfilled", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__New(
          ____lualib.__TS__Promise,
          function(_self, resolve, reject) resolve(nil, 42) end
        )
        result_tag = p.state.tag
        result_value = p.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_value")).toBe(42)
    })
  })

  it("Promise.resolve(v) returns a fulfilled promise carrying v", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__Promise.resolve("hi")
        result_tag = p.state.tag
        result_value = p.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_value")).toBe("hi")
    })
  })

  it("Promise.reject(reason) returns a rejected promise carrying reason", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__Promise.reject("boom")
        result_tag = p.state.tag
        result_reason = p.state.reason
      `)
      expect(vm.get("result_tag")).toBe("rejected")
      expect(vm.get("result_reason")).toBe("boom")
    })
  })

  it("p.then(onFulfilled) invokes onFulfilled synchronously when p is already fulfilled", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__Promise.resolve(7)
        local seen = nil
        local child = p["then"](p, function(_self, value)
          seen = value
          return value * 2
        end)
        result_seen = seen
        result_child_tag = child.state.tag
        result_child_value = child.state.value
      `)
      expect(vm.get("result_seen")).toBe(7)
      expect(vm.get("result_child_tag")).toBe("fulfilled")
      expect(vm.get("result_child_value")).toBe(14)
    })
  })

  it("p.catch(onRejected) invokes onRejected synchronously when p is already rejected", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__Promise.reject("nope")
        local seen = nil
        local child = p:catch(function(_self, reason)
          seen = reason
          return "recovered"
        end)
        result_seen = seen
        result_child_tag = child.state.tag
        result_child_value = child.state.value
      `)
      expect(vm.get("result_seen")).toBe("nope")
      expect(vm.get("result_child_tag")).toBe("fulfilled")
      expect(vm.get("result_child_value")).toBe("recovered")
    })
  })

  it("a thenable returned by then is unwrapped before resolving the outer promise", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local outer = ____lualib.__TS__Promise.resolve(1)
        local inner = ____lualib.__TS__Promise.resolve("inner-value")
        local child = outer["then"](outer, function(_self, _value)
          return inner
        end)
        result_tag = child.state.tag
        result_value = child.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_value")).toBe("inner-value")
    })
  })
})
