import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__PromiseAllSettled shape", () => {
  it("is exported from the lualib bundle as a function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_type = type(____lualib.__TS__PromiseAllSettled)`)
      expect(vm.get("result_type")).toBe("function")
    })
  })
})

describe("__TS__PromiseAllSettled behavioral cases", () => {
  it("Promise.allSettled([resolved(1), rejected(e)]) resolves to [{status:'fulfilled',value:1}, {status:'rejected',reason:e}]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAllSettled({
          ____lualib.__TS__Promise.resolve(1),
          ____lualib.__TS__Promise.reject("oops"),
        })
        result_tag = p.state.tag
        result_len = #p.state.value
        result_1_status = p.state.value[1].status
        result_1_value = p.state.value[1].value
        result_2_status = p.state.value[2].status
        result_2_reason = p.state.value[2].reason
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1_status")).toBe("fulfilled")
      expect(vm.get("result_1_value")).toBe(1)
      expect(vm.get("result_2_status")).toBe("rejected")
      expect(vm.get("result_2_reason")).toBe("oops")
    })
  })

  it("Promise.allSettled([nonPromise]) wraps the non-thenable as fulfilled", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAllSettled({"raw"})
        result_tag = p.state.tag
        result_len = #p.state.value
        result_1_status = p.state.value[1].status
        result_1_value = p.state.value[1].value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_len")).toBe(1)
      expect(vm.get("result_1_status")).toBe("fulfilled")
      expect(vm.get("result_1_value")).toBe("raw")
    })
  })

  it("Promise.allSettled([]) resolves to []", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseAllSettled({})
        result_tag = p.state.tag
        result_len = #p.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_len")).toBe(0)
    })
  })

  it("Promise.allSettled([pending,pending]) resolves once both settle, regardless of outcome", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local r1, r2
        local pendingFulfill = ____lualib.__TS__New(
          ____lualib.__TS__Promise,
          function(_self, resolve, _reject) r1 = resolve end
        )
        local pendingReject = ____lualib.__TS__New(
          ____lualib.__TS__Promise,
          function(_self, _resolve, reject) r2 = reject end
        )
        local p = ____lualib.__TS__PromiseAllSettled({pendingFulfill, pendingReject})
        result_tag_before = p.state.tag
        r1(nil, "done")
        result_tag_after_first = p.state.tag
        r2(nil, "bad")
        result_tag_after_second = p.state.tag
        result_len = #p.state.value
        result_1_status = p.state.value[1].status
        result_1_value = p.state.value[1].value
        result_2_status = p.state.value[2].status
        result_2_reason = p.state.value[2].reason
      `)
      expect(vm.get("result_tag_before")).toBe("pending")
      expect(vm.get("result_tag_after_first")).toBe("pending")
      expect(vm.get("result_tag_after_second")).toBe("fulfilled")
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1_status")).toBe("fulfilled")
      expect(vm.get("result_1_value")).toBe("done")
      expect(vm.get("result_2_status")).toBe("rejected")
      expect(vm.get("result_2_reason")).toBe("bad")
    })
  })
})
