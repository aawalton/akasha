import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__MathAtan2", () => {
  it("Math.atan2(1, 1) is π/4", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__MathAtan2(1, 1)
        result_close = math.abs(result - math.pi / 4) < 1e-10
      `)
      expect(vm.get("result_close")).toBe(true)
    })
  })

  it("Math.atan2(0, 1) is 0 and Math.atan2(1, 0) is π/2", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_zero = ____lualib.__TS__MathAtan2(0, 1)
        local half_pi = ____lualib.__TS__MathAtan2(1, 0)
        result_half_pi_close = math.abs(half_pi - math.pi / 2) < 1e-10
      `)
      expect(vm.get("result_zero")).toBe(0)
      expect(vm.get("result_half_pi_close")).toBe(true)
    })
  })

  it("Math.atan2(-1, -1) is -3π/4 (third quadrant)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__MathAtan2(-1, -1)
        result_close = math.abs(result - (-3 * math.pi / 4)) < 1e-10
      `)
      expect(vm.get("result_close")).toBe(true)
    })
  })
})
