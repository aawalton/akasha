import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Await / __TS__AsyncAwaiter shape", () => {
  it("both polyfills are exported from the lualib bundle as functions", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_await_type = type(____lualib.__TS__Await)
        result_awaiter_type = type(____lualib.__TS__AsyncAwaiter)
      `)
      expect(vm.get("result_await_type")).toBe("function")
      expect(vm.get("result_awaiter_type")).toBe("function")
    })
  })
})

describe("__TS__AsyncAwaiter behavioral cases", () => {
  it("AsyncAwaiter(generator) creates a coroutine and resumes it once with the resolve sentinel", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        -- A generator that immediately returns without yielding. The first
        -- coresume runs the body to completion; step() observes status=="dead"
        -- and resolves the outer promise with the returned value.
        local function gen()
          return "done"
        end
        local promise = ____lualib.__TS__AsyncAwaiter(gen)
        result_state_tag = promise.state.tag
        result_state_value = promise.state.value
      `)
      expect(vm.get("result_state_tag")).toBe("fulfilled")
      expect(vm.get("result_state_value")).toBe("done")
    })
  })

  it("an Awaited value yielded from the generator is wrapped via Promise.resolve and chained", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        -- The generator yields a plain value (acts like an awaited
        -- non-thenable), then returns the value the yield resumes with.
        -- step() wraps the yielded value via Promise.resolve, which
        -- synchronously fulfills, calling fulfilled(value) → coresume feeds
        -- the value back into the coroutine as the result of the yield.
        local function gen()
          local resumed = ____lualib.__TS__Await(123)
          return resumed * 2
        end
        local promise = ____lualib.__TS__AsyncAwaiter(gen)
        result_state_tag = promise.state.tag
        result_state_value = promise.state.value
      `)
      expect(vm.get("result_state_tag")).toBe("fulfilled")
      expect(vm.get("result_state_value")).toBe(246)
    })
  })

  it("a thrown error inside the generator rejects the surrounding promise", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local function gen()
          error("boom")
        end
        local promise = ____lualib.__TS__AsyncAwaiter(gen)
        result_state_tag = promise.state.tag
        result_reason = promise.state.reason
        result_reason_has_boom = type(result_reason) == "string" and string.find(result_reason, "boom") ~= nil
      `)
      expect(vm.get("result_state_tag")).toBe("rejected")
      expect(vm.get("result_reason_has_boom")).toBe(true)
    })
  })
})
