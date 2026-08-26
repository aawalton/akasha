import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__NumberToFixed", () => {
  it("formats a fractional number to the requested precision", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__NumberToFixed(3.14159, 2)`)
      expect(vm.get("result")).toBe("3.14")
    })
  })

  it("formats integers with the requested fractional padding", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_int = ____lualib.__TS__NumberToFixed(1, 2)
        result_zero = ____lualib.__TS__NumberToFixed(0, 0)
      `)
      expect(vm.get("result_int")).toBe("1.00")
      expect(vm.get("result_zero")).toBe("0")
    })
  })

  it("rounds the final digit per IEEE-754 / printf %.*f", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__NumberToFixed(1.005, 2)`)
      expect(vm.get("result")).toBe("1.00")
    })
  })
})
