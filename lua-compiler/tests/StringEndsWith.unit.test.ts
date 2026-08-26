import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringEndsWith", () => {
  it("matches by suffix without endPosition", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_yes = ____lualib.__TS__StringEndsWith("hello world", "world")
        result_no = ____lualib.__TS__StringEndsWith("hello world", "hello")
        result_case = ____lualib.__TS__StringEndsWith("hello", "Hello")
      `)
      expect(vm.get("result_yes")).toBe(true)
      expect(vm.get("result_no")).toBe(false)
      expect(vm.get("result_case")).toBe(false)
    })
  })

  it("respects endPosition by truncating the receiver", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_yes = ____lualib.__TS__StringEndsWith("hello world", "hello", 5)
        result_no = ____lualib.__TS__StringEndsWith("hello world", "world", 5)
      `)
      expect(vm.get("result_yes")).toBe(true)
      expect(vm.get("result_no")).toBe(false)
    })
  })

  it("any string endsWith the empty string", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_a = ____lualib.__TS__StringEndsWith("hello", "")
        result_b = ____lualib.__TS__StringEndsWith("", "")
      `)
      expect(vm.get("result_a")).toBe(true)
      expect(vm.get("result_b")).toBe(true)
    })
  })
})
