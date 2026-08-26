import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__SparseArrayPush", () => {
  it("appends args after the existing sparseLength", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local sa = ____lualib.__TS__SparseArrayNew("a", "b")
        ____lualib.__TS__SparseArrayPush(sa, "c", "d")
        result_len = sa.sparseLength
        result_1 = sa[1]
        result_2 = sa[2]
        result_3 = sa[3]
        result_4 = sa[4]
      `)
      expect(vm.get("result_len")).toBe(4)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
      expect(vm.get("result_3")).toBe("c")
      expect(vm.get("result_4")).toBe("d")
    })
  })

  it("appends to an empty sparse array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local sa = ____lualib.__TS__SparseArrayNew()
        ____lualib.__TS__SparseArrayPush(sa, "x", "y")
        result_len = sa.sparseLength
        result_1 = sa[1]
        result_2 = sa[2]
      `)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1")).toBe("x")
      expect(vm.get("result_2")).toBe("y")
    })
  })

  it("counts trailing nil arguments via select('#')", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local sa = ____lualib.__TS__SparseArrayNew("a")
        ____lualib.__TS__SparseArrayPush(sa, "b", nil)
        result_len = sa.sparseLength
        result_1 = sa[1]
        result_2 = sa[2]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
    })
  })
})
