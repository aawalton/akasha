import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__PromiseRace shape", () => {
  it("is exported from the lualib bundle as a function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_type = type(____lualib.__TS__PromiseRace)`)
      expect(vm.get("result_type")).toBe("function")
    })
  })
})

describe("__TS__PromiseRace behavioral cases", () => {
  it("Promise.race([resolved(1), pending]) resolves to 1 (first fulfilled wins)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local pending = ____lualib.__TS__New(
          ____lualib.__TS__Promise,
          function(_self, _resolve, _reject) end
        )
        local p = ____lualib.__TS__PromiseRace({
          ____lualib.__TS__Promise.resolve(1),
          pending,
        })
        result_tag = p.state.tag
        result_value = p.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_value")).toBe(1)
    })
  })

  it("Promise.race([rejected(e), pending]) rejects with e (first rejected wins)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local pending = ____lualib.__TS__New(
          ____lualib.__TS__Promise,
          function(_self, _resolve, _reject) end
        )
        local p = ____lualib.__TS__PromiseRace({
          ____lualib.__TS__Promise.reject("e"),
          pending,
        })
        result_tag = p.state.tag
        result_reason = p.state.reason
      `)
      expect(vm.get("result_tag")).toBe("rejected")
      expect(vm.get("result_reason")).toBe("e")
    })
  })

  it("Promise.race([nonPromise, resolved(2)]) resolves to nonPromise (non-thenables short-circuit on first iteration)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseRace({
          "raw",
          ____lualib.__TS__Promise.resolve(2),
        })
        result_tag = p.state.tag
        result_value = p.state.value
      `)
      expect(vm.get("result_tag")).toBe("fulfilled")
      expect(vm.get("result_value")).toBe("raw")
    })
  })

  it("Promise.race([]) returns a forever-pending promise (per spec)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local p = ____lualib.__TS__PromiseRace({})
        result_tag = p.state.tag
      `)
      expect(vm.get("result_tag")).toBe("pending")
    })
  })
})
