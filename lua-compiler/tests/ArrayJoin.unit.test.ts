import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayJoin", () => {
  it("uses comma as the default separator", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        result = ____lualib.__TS__ArrayJoin(arr)
      `)
      expect(vm.get("result")).toBe("a,b,c")
    })
  })

  it("uses the provided separator", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        result = ____lualib.__TS__ArrayJoin(arr, " - ")
      `)
      expect(vm.get("result")).toBe("a - b - c")
    })
  })
})
