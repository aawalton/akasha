import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("____lualib.JSON.stringify — primitives", () => {
  it("stringifies nil as 'null'", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify(nil)`)
      expect(vm.get("result")).toBe("null")
    })
  })

  it("stringifies true and false", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_t = ____lualib.JSON.stringify(true)`)
      await vm.run(`result_f = ____lualib.JSON.stringify(false)`)
      expect(vm.get("result_t")).toBe("true")
      expect(vm.get("result_f")).toBe("false")
    })
  })

  it("stringifies integers and floats", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r0 = ____lualib.JSON.stringify(0)`)
      await vm.run(`r1 = ____lualib.JSON.stringify(42)`)
      await vm.run(`r2 = ____lualib.JSON.stringify(-1)`)
      await vm.run(`r3 = ____lualib.JSON.stringify(1.5)`)
      await vm.run(`r4 = ____lualib.JSON.stringify(-0.25)`)
      expect(vm.get("r0")).toBe("0")
      expect(vm.get("r1")).toBe("42")
      expect(vm.get("r2")).toBe("-1")
      expect(vm.get("r3")).toBe("1.5")
      expect(vm.get("r4")).toBe("-0.25")
    })
  })

  it("encodes NaN and ±Infinity as 'null' (TC39 § 25.5.2)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_nan = ____lualib.JSON.stringify(0/0)`)
      await vm.run(`r_pinf = ____lualib.JSON.stringify(math.huge)`)
      await vm.run(`r_ninf = ____lualib.JSON.stringify(-math.huge)`)
      expect(vm.get("r_nan")).toBe("null")
      expect(vm.get("r_pinf")).toBe("null")
      expect(vm.get("r_ninf")).toBe("null")
    })
  })

  it("stringifies empty and ASCII strings with the surrounding quotes", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_empty = ____lualib.JSON.stringify("")`)
      await vm.run(`r_hello = ____lualib.JSON.stringify("hello")`)
      expect(vm.get("r_empty")).toBe('""')
      expect(vm.get("r_hello")).toBe('"hello"')
    })
  })
})

describe("____lualib.JSON.stringify — string escaping", () => {
  it("escapes the seven required short-form characters", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_q = ____lualib.JSON.stringify('a"b')`)
      await vm.run(`r_bs = ____lualib.JSON.stringify("a\\\\b")`)
      await vm.run(`r_n = ____lualib.JSON.stringify("a\\nb")`)
      await vm.run(`r_r = ____lualib.JSON.stringify("a\\rb")`)
      await vm.run(`r_t = ____lualib.JSON.stringify("a\\tb")`)
      await vm.run(`r_b = ____lualib.JSON.stringify("a\\bb")`)
      await vm.run(`r_f = ____lualib.JSON.stringify("a\\fb")`)
      expect(vm.get("r_q")).toBe('"a\\"b"')
      expect(vm.get("r_bs")).toBe('"a\\\\b"')
      expect(vm.get("r_n")).toBe('"a\\nb"')
      expect(vm.get("r_r")).toBe('"a\\rb"')
      expect(vm.get("r_t")).toBe('"a\\tb"')
      expect(vm.get("r_b")).toBe('"a\\bb"')
      expect(vm.get("r_f")).toBe('"a\\fb"')
    })
  })

  it("escapes other control chars (U+0000..U+001F) as \\u00XX", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_nul = ____lualib.JSON.stringify(string.char(0))`)
      await vm.run(`r_one = ____lualib.JSON.stringify(string.char(1))`)
      await vm.run(`r_1f = ____lualib.JSON.stringify(string.char(0x1f))`)
      expect(vm.get("r_nul")).toBe('"\\u0000"')
      expect(vm.get("r_one")).toBe('"\\u0001"')
      expect(vm.get("r_1f")).toBe('"\\u001f"')
    })
  })

  it("passes UTF-8 byte sequences through unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r = ____lualib.JSON.stringify("e" .. string.char(0xc3, 0xa9))`)
      expect(vm.get("r")).toBe('"eé"')
    })
  })
})

describe("____lualib.JSON.stringify — arrays", () => {
  it("encodes an empty Lua table as '[]' (lossy: empty objects also become [])", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({})`)
      expect(vm.get("result")).toBe("[]")
    })
  })

  it("encodes a sequential integer-keyed table as a JSON array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_nums = ____lualib.JSON.stringify({1, 2, 3})`)
      await vm.run(`r_strs = ____lualib.JSON.stringify({"a", "b"})`)
      expect(vm.get("r_nums")).toBe("[1,2,3]")
      expect(vm.get("r_strs")).toBe('["a","b"]')
    })
  })

  it("encodes nested arrays", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({{1, 2}, {3, 4}})`)
      expect(vm.get("result")).toBe("[[1,2],[3,4]]")
    })
  })

  it("replaces NaN/Infinity inside arrays with 'null'", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({1, 0/0, math.huge, 4})`)
      expect(vm.get("result")).toBe("[1,null,null,4]")
    })
  })

  it("encodes mixed-type arrays", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({1, "x", true, false})`)
      expect(vm.get("result")).toBe('[1,"x",true,false]')
    })
  })
})

describe("____lualib.JSON.stringify — objects", () => {
  it("encodes a string-keyed table as a JSON object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({a = 1})`)
      expect(vm.get("result")).toBe('{"a":1}')
    })
  })

  it("sorts object keys alphabetically (deterministic output under Lua pairs)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({b = 2, a = 1, c = 3})`)
      expect(vm.get("result")).toBe('{"a":1,"b":2,"c":3}')
    })
  })

  it("encodes nested objects", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({outer = {inner = 1}})`)
      expect(vm.get("result")).toBe('{"outer":{"inner":1}}')
    })
  })

  it("drops Lua function values from objects (TC39 spec for non-serializable)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({a = 1, b = function() end, c = 3})`)
      expect(vm.get("result")).toBe('{"a":1,"c":3}')
    })
  })

  it("replaces non-finite numbers in objects with 'null'", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.JSON.stringify({a = 0/0, b = 1})`)
      expect(vm.get("result")).toBe('{"a":null,"b":1}')
    })
  })
})

describe("____lualib.JSON.parse — primitives", () => {
  it("parses null, true, false", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_null_type = type(____lualib.JSON.parse("null"))`)
      await vm.run(`r_t = ____lualib.JSON.parse("true")`)
      await vm.run(`r_f = ____lualib.JSON.parse("false")`)
      expect(vm.get("r_null_type")).toBe("nil")
      expect(vm.get("r_t")).toBe(true)
      expect(vm.get("r_f")).toBe(false)
    })
  })

  it("parses integers, negatives, fractions, and exponents", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_int = ____lualib.JSON.parse("42")`)
      await vm.run(`r_neg = ____lualib.JSON.parse("-7")`)
      await vm.run(`r_frac = ____lualib.JSON.parse("1.5")`)
      await vm.run(`r_exp = ____lualib.JSON.parse("1e2")`)
      await vm.run(`r_negexp = ____lualib.JSON.parse("-1.5e-3")`)
      expect(vm.get("r_int")).toBe(42)
      expect(vm.get("r_neg")).toBe(-7)
      expect(vm.get("r_frac")).toBe(1.5)
      expect(vm.get("r_exp")).toBe(100)
      expect(vm.get("r_negexp")).toBe(-0.0015)
    })
  })

  it("parses strings with the standard JSON escapes", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_empty = ____lualib.JSON.parse('""')`)
      await vm.run(`r_plain = ____lualib.JSON.parse('"hello"')`)
      await vm.run(`r_n = ____lualib.JSON.parse('"a\\\\nb"')`)
      await vm.run(`r_t = ____lualib.JSON.parse('"a\\\\tb"')`)
      await vm.run(`r_q = ____lualib.JSON.parse('"a\\\\"b"')`)
      await vm.run(`r_bs = ____lualib.JSON.parse('"a\\\\\\\\b"')`)
      expect(vm.get("r_empty")).toBe("")
      expect(vm.get("r_plain")).toBe("hello")
      expect(vm.get("r_n")).toBe("a\nb")
      expect(vm.get("r_t")).toBe("a\tb")
      expect(vm.get("r_q")).toBe('a"b')
      expect(vm.get("r_bs")).toBe("a\\b")
    })
  })

  it("parses \\uXXXX escapes for ASCII and Latin-1 code points", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`r_a = ____lualib.JSON.parse('"\\\\u0041"')`)
      await vm.run(`r_e_acute = ____lualib.JSON.parse('"\\\\u00e9"')`)
      expect(vm.get("r_a")).toBe("A")
      expect(vm.get("r_e_acute")).toBe("é")
    })
  })
})

describe("____lualib.JSON.parse — arrays and objects", () => {
  it("parses an empty array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`local r = ____lualib.JSON.parse("[]")
        r_len = #r
        r_type = type(r)`)
      expect(vm.get("r_len")).toBe(0)
      expect(vm.get("r_type")).toBe("table")
    })
  })

  it("parses a flat array of numbers", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`local r = ____lualib.JSON.parse("[1,2,3]")
        r_len = #r
        r_1 = r[1]; r_2 = r[2]; r_3 = r[3]`)
      expect(vm.get("r_len")).toBe(3)
      expect(vm.get("r_1")).toBe(1)
      expect(vm.get("r_2")).toBe(2)
      expect(vm.get("r_3")).toBe(3)
    })
  })

  it("parses nested arrays", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`local r = ____lualib.JSON.parse("[[1,2],[3,4]]")
        r_outer_len = #r
        r_inner_1_2 = r[1][2]
        r_inner_2_1 = r[2][1]`)
      expect(vm.get("r_outer_len")).toBe(2)
      expect(vm.get("r_inner_1_2")).toBe(2)
      expect(vm.get("r_inner_2_1")).toBe(3)
    })
  })

  it("parses an empty object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`local r = ____lualib.JSON.parse("{}")
        local n = 0; for _ in pairs(r) do n = n + 1 end
        r_count = n
        r_type = type(r)`)
      expect(vm.get("r_count")).toBe(0)
      expect(vm.get("r_type")).toBe("table")
    })
  })

  it("parses a flat object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`local r = ____lualib.JSON.parse('{"a":1,"b":"x","c":true}')
        r_a = r.a; r_b = r.b; r_c = r.c`)
      expect(vm.get("r_a")).toBe(1)
      expect(vm.get("r_b")).toBe("x")
      expect(vm.get("r_c")).toBe(true)
    })
  })

  it("parses nested objects", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`local r = ____lualib.JSON.parse('{"outer":{"inner":42}}')
        r_inner = r.outer.inner`)
      expect(vm.get("r_inner")).toBe(42)
    })
  })

  it("tolerates whitespace between tokens", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        `local r = ____lualib.JSON.parse("  [ 1 , 2 ,  3 ] ")
        r_1 = r[1]; r_2 = r[2]; r_3 = r[3]; r_len = #r`
      )
      expect(vm.get("r_len")).toBe(3)
      expect(vm.get("r_1")).toBe(1)
      expect(vm.get("r_2")).toBe(2)
      expect(vm.get("r_3")).toBe(3)
    })
  })
})

describe("____lualib.JSON.parse — error paths", () => {
  it("throws on a bare unquoted identifier", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        ok, err = pcall(function() ____lualib.JSON.parse("abc") end)
        err_msg = (type(err) == "table" and err.message) or tostring(err)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err_msg"))).toContain("JSON.parse")
    })
  })

  it("throws on an unterminated array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        ok, err = pcall(function() ____lualib.JSON.parse("[1,2") end)
        err_msg = (type(err) == "table" and err.message) or tostring(err)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err_msg"))).toContain("JSON.parse")
    })
  })

  it("throws on an object missing a colon", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        ok, err = pcall(function() ____lualib.JSON.parse('{"a"}') end)
        err_msg = (type(err) == "table" and err.message) or tostring(err)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err_msg"))).toContain("JSON.parse")
    })
  })

  it("throws on an unterminated string", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        ok, err = pcall(function() ____lualib.JSON.parse('"unterminated') end)
        err_msg = (type(err) == "table" and err.message) or tostring(err)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err_msg"))).toContain("JSON.parse")
    })
  })

  it("throws on trailing non-whitespace after a complete value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        ok, err = pcall(function() ____lualib.JSON.parse("[1] garbage") end)
        err_msg = (type(err) == "table" and err.message) or tostring(err)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err_msg"))).toContain("JSON.parse")
    })
  })
})

describe("JSON round-trip", () => {
  it("preserves a flat object across stringify → parse", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local input = {a = 1, b = "x", c = true}
        local s = ____lualib.JSON.stringify(input)
        local r = ____lualib.JSON.parse(s)
        r_str = s
        r_a = r.a; r_b = r.b; r_c = r.c
      `)
      expect(vm.get("r_str")).toBe('{"a":1,"b":"x","c":true}')
      expect(vm.get("r_a")).toBe(1)
      expect(vm.get("r_b")).toBe("x")
      expect(vm.get("r_c")).toBe(true)
    })
  })

  it("preserves a nested array-of-objects across the round-trip", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local input = {{name = "a", n = 1}, {name = "b", n = 2}}
        local s = ____lualib.JSON.stringify(input)
        local r = ____lualib.JSON.parse(s)
        r_str = s
        r_len = #r
        r_1_name = r[1].name; r_2_n = r[2].n
      `)
      expect(vm.get("r_str")).toBe('[{"n":1,"name":"a"},{"n":2,"name":"b"}]')
      expect(vm.get("r_len")).toBe(2)
      expect(vm.get("r_1_name")).toBe("a")
      expect(vm.get("r_2_n")).toBe(2)
    })
  })
})
