import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayEntries", () => {
  it("yields [index, value] pairs in order, 0-indexed", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"x", "y", "z"}
        local it = ____lualib.__TS__ArrayEntries(arr)
        local r1 = it:next()
        local r2 = it:next()
        local r3 = it:next()
        local r4 = it:next()
        r1_done = r1.done
        r1_idx = r1.value[1]
        r1_val = r1.value[2]
        r2_done = r2.done
        r2_idx = r2.value[1]
        r2_val = r2.value[2]
        r3_done = r3.done
        r3_idx = r3.value[1]
        r3_val = r3.value[2]
        r4_done = r4.done
      `)
      expect(vm.get("r1_done")).toBe(false)
      expect(vm.get("r1_idx")).toBe(0)
      expect(vm.get("r1_val")).toBe("x")
      expect(vm.get("r2_done")).toBe(false)
      expect(vm.get("r2_idx")).toBe(1)
      expect(vm.get("r2_val")).toBe("y")
      expect(vm.get("r3_done")).toBe(false)
      expect(vm.get("r3_idx")).toBe(2)
      expect(vm.get("r3_val")).toBe("z")
      expect(vm.get("r4_done")).toBe(true)
    })
  })
})
