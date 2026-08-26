import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__SparseArrayNew", () => {
  it("packs varargs into a 1-indexed table with sparseLength", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local sa = ____lualib.__TS__SparseArrayNew("a", "b", "c")
        result_len = sa.sparseLength
        result_1 = sa[1]
        result_2 = sa[2]
        result_3 = sa[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
      expect(vm.get("result_3")).toBe("c")
    })
  })

  it("records sparseLength=0 for no arguments", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local sa = ____lualib.__TS__SparseArrayNew()
        result_len = sa.sparseLength
        result_1 = sa[1]
      `)
      expect(vm.get("result_len")).toBe(0)
      expect(vm.get("result_1")).toBeNull()
    })
  })

  it("counts trailing nil arguments via select('#')", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local sa = ____lualib.__TS__SparseArrayNew("a", nil, "c")
        result_len = sa.sparseLength
        result_1 = sa[1]
        result_3 = sa[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_3")).toBe("c")
    })
  })
})
