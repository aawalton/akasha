import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__PromiseAll shape", () => {
  it("is exported from the lualib bundle as a function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_type = type(____lualib.__TS__PromiseAll)`)
      expect(vm.get("result_type")).toBe("function")
    })
  })
})

describe("__TS__PromiseAll behavioral cases", () => {
  it("Promise.all([resolved(1), resolved(2), resolved(3)]) resolves to [1, 2, 3]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAll({
          ____lualib.__TS__Promise.resolve(1),
          ____lualib.__TS__Promise.resolve(2),
          ____lualib.__TS__Promise.resolve(3),
        })
        result_tag = p.state.tag
        result_len = #p.state.value
        result_1 = p.state.value[1]
        result_2 = p.state.value[2]
        result_3 = p.state.value[3]
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe(1)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3")).toBe(3)
    })
  })

  it("Promise.all([resolved(1), rejected(e), resolved(2)]) rejects with e (first rejection wins)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAll({
          ____lualib.__TS__Promise.resolve(1),
          ____lualib.__TS__Promise.reject("boom"),
          ____lualib.__TS__Promise.resolve(2),
        })
        result_tag = p.state.tag
        result_reason = p.state.reason
      `)
      expect(vm.get("result_tag")).toBe("rejected")
      expect(vm.get("result_reason")).toBe("boom")
    })
  })

  it("Promise.all([nonPromise, resolved(2)]) resolves to [nonPromise, 2] (non-thenables pass through)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAll({
          "raw",
          ____lualib.__TS__Promise.resolve(2),
        })
        result_tag = p.state.tag
        result_len = #p.state.value
        result_1 = p.state.value[1]
        result_2 = p.state.value[2]
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1")).toBe("raw")
      expect(vm.get("result_2")).toBe(2)
    })
  })

  it("Promise.all([]) resolves to []", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAll({})
        result_tag = p.state.tag
        result_len = #p.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_len")).toBe(0)
    })
  })

  it("Promise.all([pending]) resolves once the pending promise fulfills", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local capturedResolve
        local pending = ____lualib.__TS__New(
          ____lualib.__TS__Promise,
          function(_self, resolve, _reject) capturedResolve = resolve end
        )
        local p = ____lualib.__TS__PromiseAll({pending})
        result_tag_before = p.state.tag
        capturedResolve(nil, 99)
        result_tag_after = p.state.tag
        result_len = #p.state.value
        result_1 = p.state.value[1]
      `)
      expect(vm.get("result_tag_before")).toBe("pending")
      expect(vm.get("result_tag_after")).toBe("fulfilled")
      expect(vm.get("result_len")).toBe(1)
      expect(vm.get("result_1")).toBe(99)
    })
  })
})
