import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Decorate", () => {
  it("applies decorators in reverse order (bottom-up composition)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        -- A decorator object exposes a .call method matching Function.prototype.call:
        --   call(self, contextSelf, originalValue, context) → newValue
        local function makeDec(suffix)
          return setmetatable(
            { call = function(self, ctxSelf, value, ctx) return value .. suffix end },
            { __call = function(self, ...) return self.call(self, ...) end }
          )
        end
        local dec1 = makeDec("-d1")
        local dec2 = makeDec("-d2")
        local result = ____lualib.__TS__Decorate(nil, "x", {dec1, dec2}, {})
        result_value = result
      `)
      expect(vm.get("result_value")).toBe("x-d2-d1")
    })
  })

  it("preserves the previous result when a decorator returns nil/undefined", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local nilDec = setmetatable(
          { call = function(self, ctxSelf, value, ctx) return nil end },
          { __call = function(self, ...) return self.call(self, ...) end }
        )
        result_value = ____lualib.__TS__Decorate(nil, "kept", {nilDec}, {})
      `)
      expect(vm.get("result_value")).toBe("kept")
    })
  })

  it("returns the original value unchanged when the decorator list is empty", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_value = ____lualib.__TS__Decorate(nil, "untouched", {}, {})`)
      expect(vm.get("result_value")).toBe("untouched")
    })
  })

  it("forwards the decorator-context object as the second argument to each decorator's call", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local seenCtx
        local capturingDec = setmetatable(
          {
            call = function(self, ctxSelf, value, ctx)
              seenCtx = ctx
              return value
            end,
          },
          { __call = function(self, ...) return self.call(self, ...) end }
        )
        local context = { kind = "method", name = "fn" }
        ____lualib.__TS__Decorate(nil, "v", {capturingDec}, context)
        result_kind = seenCtx and seenCtx.kind
        result_name = seenCtx and seenCtx.name
      `)
      expect(vm.get("result_kind")).toBe("method")
      expect(vm.get("result_name")).toBe("fn")
    })
  })
})
