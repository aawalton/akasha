import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectGroupBy", () => {
  it("groups items by the keySelector return value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local items = {1, 2, 3, 4, 5}
        local grouped = ____lualib.__TS__ObjectGroupBy(items, function(_, n)
          if n % 2 == 0 then return "even" else return "odd" end
        end)
        odd_len = #grouped.odd
        even_len = #grouped.even
        odd_1 = grouped.odd[1]
        odd_2 = grouped.odd[2]
        odd_3 = grouped.odd[3]
        even_1 = grouped.even[1]
        even_2 = grouped.even[2]
      `)
      expect(vm.get("odd_len")).toBe(3)
      expect(vm.get("even_len")).toBe(2)
      expect(vm.get("odd_1")).toBe(1)
      expect(vm.get("odd_2")).toBe(3)
      expect(vm.get("odd_3")).toBe(5)
      expect(vm.get("even_1")).toBe(2)
      expect(vm.get("even_2")).toBe(4)
    })
  })

  it("passes the zero-based index to keySelector", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local items = {"a", "b", "c"}
        local seen = {}
        ____lualib.__TS__ObjectGroupBy(items, function(_, _item, index)
          seen[#seen + 1] = index
          return "g"
        end)
        result_len = #seen
        idx_1 = seen[1]
        idx_2 = seen[2]
        idx_3 = seen[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("idx_1")).toBe(0)
      expect(vm.get("idx_2")).toBe(1)
      expect(vm.get("idx_3")).toBe(2)
    })
  })

  it("returns an empty object for empty input", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local grouped = ____lualib.__TS__ObjectGroupBy({}, function() return "x" end)
        local count = 0
        for _ in pairs(grouped) do count = count + 1 end
        result_count = count
      `)
      expect(vm.get("result_count")).toBe(0)
    })
  })
})
