import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringReplace", () => {
  it("replaces the first occurrence with a string replacement", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_one = ____lualib.__TS__StringReplace("hello world", "world", "there")
        result_first = ____lualib.__TS__StringReplace("a-b-c", "-", "+")
      `)
      expect(vm.get("result_one")).toBe("hello there")
      expect(vm.get("result_first")).toBe("a+b-c")
    })
  })

  it("returns the source unchanged when the search value is not found", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StringReplace("hello", "xyz", "abc")`)
      expect(vm.get("result")).toBe("hello")
    })
  })

  it("invokes a function replacer with (match, offset, source)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local function replacer(_, match, offset, source)
          captured_match = match
          captured_offset = offset
          captured_source = source
          return "<" .. match .. "@" .. tostring(offset) .. ">"
        end
        result = ____lualib.__TS__StringReplace("hello world", "world", replacer)
      `)
      expect(vm.get("captured_match")).toBe("world")
      expect(vm.get("captured_offset")).toBe(6)
      expect(vm.get("captured_source")).toBe("hello world")
      expect(vm.get("result")).toBe("hello <world@6>")
    })
  })

  it("treats regex metacharacters in searchValue as literals (plain mode)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_match = ____lualib.__TS__StringReplace("a.b", ".", "_")
        result_no_match = ____lualib.__TS__StringReplace("axb", ".", "_")
      `)
      expect(vm.get("result_match")).toBe("a_b")
      expect(vm.get("result_no_match")).toBe("axb")
    })
  })
})
