import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__MapGroupBy", () => {
  it('partitions [1,2,3,4] into "even" / "odd" buckets', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__MapGroupBy(
          {1, 2, 3, 4},
          function(_self, x)
            if x % 2 == 0 then return "even" else return "odd" end
          end
        )
        local odd = result:get("odd")
        local even = result:get("even")
        result_size = result.size
        result_odd_len = #odd
        result_odd_1 = odd[1]
        result_odd_2 = odd[2]
        result_even_len = #even
        result_even_1 = even[1]
        result_even_2 = even[2]
      `)
      expect(vm.get("result_size")).toBe(2)
      expect(vm.get("result_odd_len")).toBe(2)
      expect(vm.get("result_odd_1")).toBe(1)
      expect(vm.get("result_odd_2")).toBe(3)
      expect(vm.get("result_even_len")).toBe(2)
      expect(vm.get("result_even_1")).toBe(2)
      expect(vm.get("result_even_2")).toBe(4)
    })
  })

  it("an empty input yields an empty Map", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__MapGroupBy(
          {},
          function(_self, x) return "k" end
        )
        result_size = result.size
      `)
      expect(vm.get("result_size")).toBe(0)
    })
  })

  it("passes the 0-indexed iteration index to the key selector", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__MapGroupBy(
          {"a", "b", "c", "d"},
          function(_self, _item, index)
            if index < 2 then return "head" else return "tail" end
          end
        )
        local head = result:get("head")
        local tail = result:get("tail")
        result_head_len = #head
        result_head_1 = head[1]
        result_head_2 = head[2]
        result_tail_len = #tail
        result_tail_1 = tail[1]
        result_tail_2 = tail[2]
      `)
      expect(vm.get("result_head_len")).toBe(2)
      expect(vm.get("result_head_1")).toBe("a")
      expect(vm.get("result_head_2")).toBe("b")
      expect(vm.get("result_tail_len")).toBe(2)
      expect(vm.get("result_tail_1")).toBe("c")
      expect(vm.get("result_tail_2")).toBe("d")
    })
  })
})
