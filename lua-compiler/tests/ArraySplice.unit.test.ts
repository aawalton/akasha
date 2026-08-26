import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArraySplice", () => {
  it("splice(0, 1) on a 1-element array empties it", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a"}
        ____lualib.__TS__ArraySplice(arr, 0, 1)
        result_len = #arr
        result_1 = arr[1]
      `)
      expect(vm.get("result_len")).toBe(0)
      expect(vm.get("result_1")).toBeNull()
    })
  })

  it("splice(0, 1) on a 2-element array leaves [b]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b"}
        ____lualib.__TS__ArraySplice(arr, 0, 1)
        result_len = #arr
        result_1 = arr[1]
        result_2 = arr[2]
      `)
      expect(vm.get("result_len")).toBe(1)
      expect(vm.get("result_1")).toBe("b")
      expect(vm.get("result_2")).toBeNull()
    })
  })

  it("splice(0, 1) on a 3-element array leaves [b, c]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        ____lualib.__TS__ArraySplice(arr, 0, 1)
        result_len = #arr
        result_1 = arr[1]
        result_2 = arr[2]
        result_3 = arr[3]
      `)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1")).toBe("b")
      expect(vm.get("result_2")).toBe("c")
      expect(vm.get("result_3")).toBeNull()
    })
  })

  it("splice(1, 1) on a 3-element array leaves [a, c]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        ____lualib.__TS__ArraySplice(arr, 1, 1)
        result_len = #arr
        result_1 = arr[1]
        result_2 = arr[2]
        result_3 = arr[3]
      `)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("c")
      expect(vm.get("result_3")).toBeNull()
    })
  })

  it("splice(0, 1) returns the removed element", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b"}
        local removed = ____lualib.__TS__ArraySplice(arr, 0, 1)
        result_removed_len = #removed
        result_removed_1 = removed[1]
      `)
      expect(vm.get("result_removed_len")).toBe(1)
      expect(vm.get("result_removed_1")).toBe("a")
    })
  })
})
