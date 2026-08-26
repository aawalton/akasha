import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringStartsWith", () => {
  it("matches by prefix without position", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_yes = ____lualib.__TS__StringStartsWith("hello world", "hello")
        result_no = ____lualib.__TS__StringStartsWith("hello world", "world")
        result_case = ____lualib.__TS__StringStartsWith("hello", "Hello")
      `)
      expect(vm.get("result_yes")).toBe(true)
      expect(vm.get("result_no")).toBe(false)
      expect(vm.get("result_case")).toBe(false)
    })
  })

  it("respects position by shifting the comparison window", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_at = ____lualib.__TS__StringStartsWith("hello world", "world", 6)
        result_off = ____lualib.__TS__StringStartsWith("hello world", "world", 5)
      `)
      expect(vm.get("result_at")).toBe(true)
      expect(vm.get("result_off")).toBe(false)
    })
  })

  it("any string startsWith the empty string", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_a = ____lualib.__TS__StringStartsWith("hello", "")
        result_b = ____lualib.__TS__StringStartsWith("", "")
      `)
      expect(vm.get("result_a")).toBe(true)
      expect(vm.get("result_b")).toBe(true)
    })
  })
})
