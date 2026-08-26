import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringIncludes", () => {
  it("locates a substring without position", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_yes = ____lualib.__TS__StringIncludes("hello world", "lo wo")
        result_no = ____lualib.__TS__StringIncludes("hello world", "xyz")
        result_case = ____lualib.__TS__StringIncludes("hello", "HELLO")
      `)
      expect(vm.get("result_yes")).toBe(true)
      expect(vm.get("result_no")).toBe(false)
      expect(vm.get("result_case")).toBe(false)
    })
  })

  it("respects position to skip earlier matches", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_match = ____lualib.__TS__StringIncludes("abcabc", "a", 3)
        result_skip = ____lualib.__TS__StringIncludes("abcabc", "a", 4)
      `)
      expect(vm.get("result_match")).toBe(true)
      expect(vm.get("result_skip")).toBe(false)
    })
  })

  it("treats special regex chars as literals (plain mode)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_dot = ____lualib.__TS__StringIncludes("a.b", ".")
        result_no_dot = ____lualib.__TS__StringIncludes("axb", ".")
      `)
      expect(vm.get("result_dot")).toBe(true)
      expect(vm.get("result_no_dot")).toBe(false)
    })
  })
})
