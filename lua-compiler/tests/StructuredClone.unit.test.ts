import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("____lualib.__TS__StructuredClone — primitives", () => {
  it("returns nil unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StructuredClone(nil)`)
      expect(vm.get("result")).toBeNull()
    })
  })

  it("returns booleans unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_t = ____lualib.__TS__StructuredClone(true)`)
      await vm.run(`r_f = ____lualib.__TS__StructuredClone(false)`)
      expect(vm.get("r_t")).toBe(true)
      expect(vm.get("r_f")).toBe(false)
    })
  })

  it("returns integers and floats unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r0 = ____lualib.__TS__StructuredClone(0)`)
      await vm.run(`r1 = ____lualib.__TS__StructuredClone(42)`)
      await vm.run(`r2 = ____lualib.__TS__StructuredClone(-7)`)
      await vm.run(`r3 = ____lualib.__TS__StructuredClone(3.5)`)
      expect(vm.get("r0")).toBe(0)
      expect(vm.get("r1")).toBe(42)
      expect(vm.get("r2")).toBe(-7)
      expect(vm.get("r3")).toBe(3.5)
    })
  })

  it("preserves NaN and ±Infinity (real spec keeps the bit pattern)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local v_nan = ____lualib.__TS__StructuredClone(0/0)
        r_nan_is_nan = (v_nan ~= v_nan)
        r_pinf = ____lualib.__TS__StructuredClone(math.huge)
        r_ninf = ____lualib.__TS__StructuredClone(-math.huge)
      `)
      expect(vm.get("r_nan_is_nan")).toBe(true)
      expect(vm.get("r_pinf")).toBe(Number.POSITIVE_INFINITY)
      expect(vm.get("r_ninf")).toBe(Number.NEGATIVE_INFINITY)
    })
  })

  it("returns strings unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_empty = ____lualib.__TS__StructuredClone("")`)
      await vm.run(`r_hello = ____lualib.__TS__StructuredClone("hello")`)
      await vm.run(`r_utf8 = ____lualib.__TS__StructuredClone("héllo")`)
      expect(vm.get("r_empty")).toBe("")
      expect(vm.get("r_hello")).toBe("hello")
      expect(vm.get("r_utf8")).toBe("héllo")
    })
  })
})

describe("____lualib.__TS__StructuredClone — plain objects and arrays", () => {
  it("deep-clones a flat object, with no shared identity", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local orig = {a = 1, b = "x", c = true}
        local cloned = ____lualib.__TS__StructuredClone(orig)
        r_a = cloned.a; r_b = cloned.b; r_c = cloned.c
        r_same_ref = (cloned == orig)
      `)
      expect(vm.get("r_a")).toBe(1)
      expect(vm.get("r_b")).toBe("x")
      expect(vm.get("r_c")).toBe(true)
      expect(vm.get("r_same_ref")).toBe(false)
    })
  })

  it("deep-clones a nested object — inner table is also cloned", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local orig = {a = {b = {c = 7}}}
        local cloned = ____lualib.__TS__StructuredClone(orig)
        r_c = cloned.a.b.c
        r_inner_same = (cloned.a == orig.a)
        r_innermost_same = (cloned.a.b == orig.a.b)
      `)
      expect(vm.get("r_c")).toBe(7)
      expect(vm.get("r_inner_same")).toBe(false)
      expect(vm.get("r_innermost_same")).toBe(false)
    })
  })

  it("deep-clones an array, preserving sequence shape", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local orig = {"a", "b", "c"}
        local cloned = ____lualib.__TS__StructuredClone(orig)
        r_len = #cloned
        r_1 = cloned[1]; r_2 = cloned[2]; r_3 = cloned[3]
        r_same_ref = (cloned == orig)
      `)
      expect(vm.get("r_len")).toBe(3)
      expect(vm.get("r_1")).toBe("a")
      expect(vm.get("r_2")).toBe("b")
      expect(vm.get("r_3")).toBe("c")
      expect(vm.get("r_same_ref")).toBe(false)
    })
  })

  it("deep-clones nested arrays — inner arrays are independent", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local orig = {{1, 2}, {3, 4}}
        local cloned = ____lualib.__TS__StructuredClone(orig)
        r_1_1 = cloned[1][1]; r_2_2 = cloned[2][2]
        r_inner_same = (cloned[1] == orig[1])
      `)
      expect(vm.get("r_1_1")).toBe(1)
      expect(vm.get("r_2_2")).toBe(4)
      expect(vm.get("r_inner_same")).toBe(false)
    })
  })

  it("mutating the clone does not affect the original (and vice versa)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local orig = {nested = {x = 1}}
        local cloned = ____lualib.__TS__StructuredClone(orig)
        cloned.nested.x = 99
        r_orig_x = orig.nested.x
        r_cloned_x = cloned.nested.x
        orig.nested.x = 7
        r_orig_after = orig.nested.x
        r_cloned_after = cloned.nested.x
      `)
      expect(vm.get("r_orig_x")).toBe(1)
      expect(vm.get("r_cloned_x")).toBe(99)
      expect(vm.get("r_orig_after")).toBe(7)
      expect(vm.get("r_cloned_after")).toBe(99)
    })
  })
})

describe("____lualib.__TS__StructuredClone — Map", () => {
  it("clones an empty Map", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        local cloned = ____lualib.__TS__StructuredClone(m)
        r_size = cloned.size
        r_same_ref = (cloned == m)
      `)
      expect(vm.get("r_size")).toBe(0)
      expect(vm.get("r_same_ref")).toBe(false)
    })
  })

  it("clones entries with primitive keys and values", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set("k1", "v1")
        m:set("k2", "v2")
        local cloned = ____lualib.__TS__StructuredClone(m)
        r_size = cloned.size
        r_k1 = cloned:get("k1")
        r_k2 = cloned:get("k2")
        r_missing = cloned:get("nope")
      `)
      expect(vm.get("r_size")).toBe(2)
      expect(vm.get("r_k1")).toBe("v1")
      expect(vm.get("r_k2")).toBe("v2")
      expect(vm.get("r_missing")).toBeNull()
    })
  })

  it("deep-clones values — mutating cloned value does not affect original", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set("k", {x = 1})
        local cloned = ____lualib.__TS__StructuredClone(m)
        cloned:get("k").x = 99
        r_orig_x = m:get("k").x
        r_cloned_x = cloned:get("k").x
        r_value_same = (cloned:get("k") == m:get("k"))
      `)
      expect(vm.get("r_orig_x")).toBe(1)
      expect(vm.get("r_cloned_x")).toBe(99)
      expect(vm.get("r_value_same")).toBe(false)
    })
  })
})

describe("____lualib.__TS__StructuredClone — Set", () => {
  it("clones an empty Set", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.Set)
        local cloned = ____lualib.__TS__StructuredClone(s)
        r_size = cloned.size
        r_same_ref = (cloned == s)
      `)
      expect(vm.get("r_size")).toBe(0)
      expect(vm.get("r_same_ref")).toBe(false)
    })
  })

  it("clones primitive elements", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.Set)
        s:add("a")
        s:add("b")
        s:add("c")
        local cloned = ____lualib.__TS__StructuredClone(s)
        r_size = cloned.size
        r_has_a = cloned:has("a")
        r_has_b = cloned:has("b")
        r_has_c = cloned:has("c")
        r_has_z = cloned:has("z")
      `)
      expect(vm.get("r_size")).toBe(3)
      expect(vm.get("r_has_a")).toBe(true)
      expect(vm.get("r_has_b")).toBe(true)
      expect(vm.get("r_has_c")).toBe(true)
      expect(vm.get("r_has_z")).toBe(false)
    })
  })

  it("deep-clones object elements — they are not the same reference", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local item = {x = 1}
        local s = ____lualib.__TS__New(____lualib.Set)
        s:add(item)
        local cloned = ____lualib.__TS__StructuredClone(s)
        r_orig_size = s.size
        r_cloned_size = cloned.size
        r_orig_has_item = s:has(item)
        r_cloned_has_item = cloned:has(item)
      `)
      expect(vm.get("r_orig_size")).toBe(1)
      expect(vm.get("r_cloned_size")).toBe(1)
      expect(vm.get("r_orig_has_item")).toBe(true)
      expect(vm.get("r_cloned_has_item")).toBe(false)
    })
  })
})

describe("____lualib.__TS__StructuredClone — Date", () => {
  it("clones a Date and preserves its epoch milliseconds", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, 1700000000000)
        local cloned = ____lualib.__TS__StructuredClone(d)
        r_orig_ms = d:getTime()
        r_cloned_ms = cloned:getTime()
        r_same_ref = (cloned == d)
      `)
      expect(vm.get("r_orig_ms")).toBe(1700000000000)
      expect(vm.get("r_cloned_ms")).toBe(1700000000000)
      expect(vm.get("r_same_ref")).toBe(false)
    })
  })
})

describe("____lualib.__TS__StructuredClone — cycles and shared identity", () => {
  it("round-trips a self-referencing object without infinite recursion", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local t = {a = 1}
        t.self = t
        local cloned = ____lualib.__TS__StructuredClone(t)
        r_a = cloned.a
        r_self_is_clone = (cloned.self == cloned)
        r_self_not_orig = (cloned.self ~= t)
      `)
      expect(vm.get("r_a")).toBe(1)
      expect(vm.get("r_self_is_clone")).toBe(true)
      expect(vm.get("r_self_not_orig")).toBe(true)
    })
  })

  it("round-trips a self-referencing array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local t = {"a", "b"}
        t[3] = t
        local cloned = ____lualib.__TS__StructuredClone(t)
        r_1 = cloned[1]
        r_2 = cloned[2]
        r_self_is_clone = (cloned[3] == cloned)
        r_self_not_orig = (cloned[3] ~= t)
      `)
      expect(vm.get("r_1")).toBe("a")
      expect(vm.get("r_2")).toBe("b")
      expect(vm.get("r_self_is_clone")).toBe(true)
      expect(vm.get("r_self_not_orig")).toBe(true)
    })
  })

  it("preserves shared subtree identity across two references", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local shared = {x = 1}
        local t = {a = shared, b = shared}
        local cloned = ____lualib.__TS__StructuredClone(t)
        r_a_eq_b = (cloned.a == cloned.b)
        r_a_not_orig = (cloned.a ~= shared)
        r_x = cloned.a.x
      `)
      expect(vm.get("r_a_eq_b")).toBe(true)
      expect(vm.get("r_a_not_orig")).toBe(true)
      expect(vm.get("r_x")).toBe(1)
    })
  })

  it("preserves shared subtree identity inside a Map's values", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local shared = {x = 1}
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set("a", shared)
        m:set("b", shared)
        local cloned = ____lualib.__TS__StructuredClone(m)
        r_a_eq_b = (cloned:get("a") == cloned:get("b"))
        r_a_not_orig = (cloned:get("a") ~= shared)
      `)
      expect(vm.get("r_a_eq_b")).toBe(true)
      expect(vm.get("r_a_not_orig")).toBe(true)
    })
  })
})

describe("____lualib.__TS__StructuredClone — throws on unsupported values", () => {
  it("throws on a function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local fn = function() return 1 end
        ok, err = pcall(____lualib.__TS__StructuredClone, fn)
        err_msg = (type(err) == "table" and err.message) or tostring(err)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err_msg"))).toContain("structuredClone")
    })
  })

  it("throws on a class instance other than Map/Set/Date", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local wm = ____lualib.__TS__New(____lualib.WeakMap)
        ok, err = pcall(____lualib.__TS__StructuredClone, wm)
        err_msg = (type(err) == "table" and err.message) or tostring(err)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err_msg"))).toContain("structuredClone")
    })
  })
})
