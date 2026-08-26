import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringSplit", () => {
  it("splits on a single-character separator", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__StringSplit("a,b,c", ",")
        result_len = #result
        result_0 = result[1]
        result_1 = result[2]
        result_2 = result[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_0")).toBe("a")
      expect(vm.get("result_1")).toBe("b")
      expect(vm.get("result_2")).toBe("c")
    })
  })

  it("splits into characters when separator is empty string", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__StringSplit("abc", "")
        result_len = #result
        result_0 = result[1]
        result_1 = result[2]
        result_2 = result[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_0")).toBe("a")
      expect(vm.get("result_1")).toBe("b")
      expect(vm.get("result_2")).toBe("c")
    })
  })

  it("respects the limit argument", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__StringSplit("a,b,c,d", ",", 2)
        result_len = #result
        result_0 = result[1]
        result_1 = result[2]
      `)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_0")).toBe("a")
      expect(vm.get("result_1")).toBe("b")
    })
  })

  it("treats regex metacharacters in separator as literals (plain mode)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result_dot = ____lualib.__TS__StringSplit("a.b.c", ".")
        result_dot_len = #result_dot
        result_dot_0 = result_dot[1]
        result_dot_1 = result_dot[2]
        result_dot_2 = result_dot[3]
        local result_no_dot = ____lualib.__TS__StringSplit("axbxc", ".")
        result_no_dot_len = #result_no_dot
        result_no_dot_0 = result_no_dot[1]
      `)
      expect(vm.get("result_dot_len")).toBe(3)
      expect(vm.get("result_dot_0")).toBe("a")
      expect(vm.get("result_dot_1")).toBe("b")
      expect(vm.get("result_dot_2")).toBe("c")
      expect(vm.get("result_no_dot_len")).toBe(1)
      expect(vm.get("result_no_dot_0")).toBe("axbxc")
    })
  })
})
