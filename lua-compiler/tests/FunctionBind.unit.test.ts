import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__FunctionBind", () => {
  it("prepends bound args to the per-call args before invoking the underlying function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local function concat(a, b, c)",
          "  return tostring(a) .. ',' .. tostring(b) .. ',' .. tostring(c)",
          "end",
          "local bound = ____lualib.__TS__FunctionBind(concat, 'A', 'B')",
          "result = bound(nil, 'C')",
        ].join("\n")
      )
      expect(vm.get("result")).toBe("A,B,C")
    })
  })

  it("works with method-style colon calls (self auto-supplied as the reserved slot)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local function concat(a, b, c, d)",
          "  return tostring(a) .. ',' .. tostring(b) .. ',' .. tostring(c) .. ',' .. tostring(d)",
          "end",
          "local t = {}",
          "t.bound = ____lualib.__TS__FunctionBind(concat, 1, 2)",
          "result = t:bound(3, 4)",
        ].join("\n")
      )
      expect(vm.get("result")).toBe("1,2,3,4")
    })
  })

  it("zero bound args — bound function is a thin pass-through", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local function concat(a, b, c)",
          "  return tostring(a) .. ',' .. tostring(b) .. ',' .. tostring(c)",
          "end",
          "local bound = ____lualib.__TS__FunctionBind(concat)",
          "result = bound(nil, 'X', 'Y', 'Z')",
        ].join("\n")
      )
      expect(vm.get("result")).toBe("X,Y,Z")
    })
  })

  it("all bound args, no per-call args — invokes the underlying function with just the bound args", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local function concat(a, b, c)",
          "  return tostring(a) .. ',' .. tostring(b) .. ',' .. tostring(c)",
          "end",
          "local bound = ____lualib.__TS__FunctionBind(concat, 'X', 'Y', 'Z')",
          "result = bound(nil)",
        ].join("\n")
      )
      expect(vm.get("result")).toBe("X,Y,Z")
    })
  })
})
