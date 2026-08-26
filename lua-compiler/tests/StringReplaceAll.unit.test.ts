import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringReplaceAll", () => {
  it("replaces every occurrence with a string replacement", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_word = ____lualib.__TS__StringReplaceAll("a-b-c-d", "-", "+")
        result_long = ____lualib.__TS__StringReplaceAll("foo bar foo", "foo", "baz")
      `)
      expect(vm.get("result_word")).toBe("a+b+c+d")
      expect(vm.get("result_long")).toBe("baz bar baz")
    })
  })

  it("returns source unchanged when search value not found", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StringReplaceAll("hello", "xyz", "abc")`)
      expect(vm.get("result")).toBe("hello")
    })
  })

  it("invokes a function replacer for each match", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        offsets = {}
        local n = 0
        local function replacer(_, match, offset, source)
          n = n + 1
          offsets[n] = offset
          return tostring(offset)
        end
        result = ____lualib.__TS__StringReplaceAll("a-b-c", "-", replacer)
        offsets_len = #offsets
        offset_0 = offsets[1]
        offset_1 = offsets[2]
      `)
      expect(vm.get("result")).toBe("a1b3c")
      expect(vm.get("offsets_len")).toBe(2)
      expect(vm.get("offset_0")).toBe(1)
      expect(vm.get("offset_1")).toBe(3)
    })
  })

  it("treats regex metacharacters in searchValue as literals (plain mode)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_match = ____lualib.__TS__StringReplaceAll("a.b.c", ".", "_")
        result_no_match = ____lualib.__TS__StringReplaceAll("axbxc", ".", "_")
      `)
      expect(vm.get("result_match")).toBe("a_b_c")
      expect(vm.get("result_no_match")).toBe("axbxc")
    })
  })
})
