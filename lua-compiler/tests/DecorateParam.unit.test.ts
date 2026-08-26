import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__DecorateParam", () => {
  it("returns a function that forwards target/key plus the captured paramIndex to the decorator", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local seen = {}
        local function paramDec(self, target, key, idx)
          seen.target_kind = target.kind
          seen.key = key
          seen.idx = idx
          return target
        end
        -- this:void → no leading self.
        local legacyDec = ____lualib.__TS__DecorateParam(2, paramDec)
        result_legacy_type = type(legacyDec)
        local target = {kind = "method"}
        -- Returned closure has implicit self; pass nil.
        legacyDec(nil, target, "myMethod")
        result_target_kind = seen.target_kind
        result_key = seen.key
        result_idx = seen.idx
      `)
      expect(vm.get("result_legacy_type")).toBe("function")
      expect(vm.get("result_target_kind")).toBe("method")
      expect(vm.get("result_key")).toBe("myMethod")
      expect(vm.get("result_idx")).toBe(2)
    })
  })

  it("each call captures its own paramIndex (closure scoping)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local seen = {}
        local function paramDec(self, target, key, idx)
          table.insert(seen, idx)
          return target
        end
        local dec0 = ____lualib.__TS__DecorateParam(0, paramDec)
        local dec5 = ____lualib.__TS__DecorateParam(5, paramDec)
        local target = {}
        dec0(nil, target, "fn")
        dec5(nil, target, "fn")
        result_first = seen[1]
        result_second = seen[2]
      `)
      expect(vm.get("result_first")).toBe(0)
      expect(vm.get("result_second")).toBe(5)
    })
  })

  it("forwards undefined (nil) key when the parameter decorator targets a constructor parameter", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local seenKey
        local function paramDec(self, target, key, idx)
          seenKey = key
          return target
        end
        local legacyDec = ____lualib.__TS__DecorateParam(0, paramDec)
        legacyDec(nil, {}, nil)
        result_key = seenKey
        result_key_type = type(seenKey)
      `)
      expect(vm.get("result_key_type")).toBe("nil")
      expect(vm.get("result_key")).toBeNull()
    })
  })
})
