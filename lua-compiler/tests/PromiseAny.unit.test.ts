import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__PromiseAny shape", () => {
  it("is exported from the lualib bundle as a function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_type = type(____lualib.__TS__PromiseAny)`)
      expect(vm.get("result_type")).toBe("function")
    })
  })
})

describe("__TS__PromiseAny behavioral cases", () => {
  it("Promise.any([rejected(e), resolved(1)]) resolves to 1 (first fulfilled wins)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAny({
          ____lualib.__TS__Promise.reject("e"),
          ____lualib.__TS__Promise.resolve(1),
        })
        result_tag = p.state.tag
        result_value = p.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_value")).toBe(1)
    })
  })

  it("Promise.any([rejected(e1), rejected(e2)]) rejects with an AggregateError carrying [e1, e2]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local r1, r2
        local pendingReject1 = ____lualib.__TS__New(
          ____lualib.__TS__Promise,
          function(_self, _resolve, reject) r1 = reject end
        )
        local pendingReject2 = ____lualib.__TS__New(
          ____lualib.__TS__Promise,
          function(_self, _resolve, reject) r2 = reject end
        )
        local p = ____lualib.__TS__PromiseAny({pendingReject1, pendingReject2})
        result_tag_before = p.state.tag
        r1(nil, "e1")
        result_tag_after_first = p.state.tag
        r2(nil, "e2")
        result_tag_after_second = p.state.tag
        result_name = p.state.reason.name
        result_message = p.state.reason.message
        result_errors_len = #p.state.reason.errors
        result_errors_1 = p.state.reason.errors[1]
        result_errors_2 = p.state.reason.errors[2]
      `)
      expect(vm.get("result_tag_before")).toBe("pending")
      expect(vm.get("result_tag_after_first")).toBe("pending")
      expect(vm.get("result_tag_after_second")).toBe("rejected")
      expect(vm.get("result_name")).toBe("AggregateError")
      expect(vm.get("result_message")).toBe("All Promises rejected")
      expect(vm.get("result_errors_len")).toBe(2)
      expect(vm.get("result_errors_1")).toBe("e1")
      expect(vm.get("result_errors_2")).toBe("e2")
    })
  })

  it("Promise.any([]) rejects with 'No promises to resolve with .any()'", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAny({})
        result_tag = p.state.tag
        result_reason = p.state.reason
      `)
      expect(vm.get("result_tag")).toBe("rejected")
      expect(vm.get("result_reason")).toBe("No promises to resolve with .any()")
    })
  })

  it("Promise.any([nonPromise]) resolves to nonPromise (non-thenables short-circuit)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAny({"raw"})
        result_tag = p.state.tag
        result_value = p.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_value")).toBe("raw")
    })
  })
})
