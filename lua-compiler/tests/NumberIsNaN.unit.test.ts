import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__NumberIsNaN", () => {
  it("returns true only for the NaN value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_nan = ____lualib.__TS__NumberIsNaN(0/0)
        result_one = ____lualib.__TS__NumberIsNaN(1)
        result_zero = ____lualib.__TS__NumberIsNaN(0)
        result_inf = ____lualib.__TS__NumberIsNaN(1/0)
      `)
      expect(vm.get("result_nan")).toBe(true)
      expect(vm.get("result_one")).toBe(false)
      expect(vm.get("result_zero")).toBe(false)
      expect(vm.get("result_inf")).toBe(false)
    })
  })

  it('does not coerce strings — "NaN" returns false (unlike global isNaN)', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_string_nan = ____lualib.__TS__NumberIsNaN("NaN")
        result_string_num = ____lualib.__TS__NumberIsNaN("1")
      `)
      expect(vm.get("result_string_nan")).toBe(false)
      expect(vm.get("result_string_num")).toBe(false)
    })
  })
})
