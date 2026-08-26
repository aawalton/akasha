import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("Date.UTC", () => {
  it("Date.UTC(2026, 0, 1) is 2026-01-01T00:00:00Z in ms", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.UTC(2026, 0, 1)`)
      expect(vm.get("result")).toBe(1767225600000)
    })
  })

  it("Date.UTC(2026, 3, 29, 12, 34, 56) yields the expected ms value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.UTC(2026, 3, 29, 12, 34, 56)`)
      expect(vm.get("result")).toBe(1777466096000)
    })
  })

  it("Date.UTC(1970, 0, 1) is 0 (the epoch)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.UTC(1970, 0, 1)`)
      expect(vm.get("result")).toBe(0)
    })
  })

  it("Date.UTC(1969, 11, 31, 23, 59, 59) is -1000 (negative epoch)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.UTC(1969, 11, 31, 23, 59, 59)`)
      expect(vm.get("result")).toBe(-1000)
    })
  })

  it("Date.UTC(2000, 1, 29) handles Feb 29 in a leap year", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.UTC(2000, 1, 29)`)
      expect(vm.get("result")).toBe(951782400000)
    })
  })

  it("Date.UTC(2026, 0, 1, 0, 0, 0, 500) accepts the millisecond argument", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.UTC(2026, 0, 1, 0, 0, 0, 500)`)
      expect(vm.get("result")).toBe(1767225600500)
    })
  })
})

describe("Date.now", () => {
  it("first call returns GetTimeStamp() * 1000", async () => {
    await withLualibVm(
      {
        stubs: `
          GetTimeStamp = function() return 1700000000 end
          GetGameTimeMilliseconds = function() return 5000 end
        `,
      },
      async (vm) => {
        await vm.run(`result = ____lualib.Date.now()`)
        expect(vm.get("result")).toBe(1700000000000)
      }
    )
  })

  it("subsequent calls advance by GetGameTimeMilliseconds delta", async () => {
    await withLualibVm(
      {
        stubs: `
          GetTimeStamp = function() return 1700000000 end
          _gameMs = 5000
          GetGameTimeMilliseconds = function() return _gameMs end
        `,
      },
      async (vm) => {
        await vm.run(`
        result_a = ____lualib.Date.now()
        _gameMs = 5042
        result_b = ____lualib.Date.now()
      `)
        expect(vm.get("result_a")).toBe(1700000000000)
        expect(vm.get("result_b")).toBe(1700000000042)
      }
    )
  })

  it("anchor pins GetTimeStamp — changing it after first call does not shift later results", async () => {
    await withLualibVm(
      {
        stubs: `
          GetTimeStamp = function() return 1700000000 end
          _gameMs = 5000
          GetGameTimeMilliseconds = function() return _gameMs end
        `,
      },
      async (vm) => {
        await vm.run(`
        result_a = ____lualib.Date.now()
        GetTimeStamp = function() return 9999999999 end
        _gameMs = 5042
        result_b = ____lualib.Date.now()
      `)
        expect(vm.get("result_a")).toBe(1700000000000)
        expect(vm.get("result_b")).toBe(1700000000042)
      }
    )
  })

  it("re-anchors to GetTimeStamp when GetGameTimeMilliseconds goes backward", async () => {
    await withLualibVm(
      {
        stubs: `
          _ts = 1700000000
          GetTimeStamp = function() return _ts end
          _gameMs = 5000
          GetGameTimeMilliseconds = function() return _gameMs end
        `,
      },
      async (vm) => {
        await vm.run(`
        result_a = ____lualib.Date.now()
        _ts = 1700000050
        _gameMs = 5
        result_b = ____lualib.Date.now()
      `)
        expect(vm.get("result_a")).toBe(1700000000000)
        expect(vm.get("result_b")).toBe(1700000050000)
      }
    )
  })
})

describe("new Date(ms) and getTime()", () => {
  it("new Date(0).getTime() is 0", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, 0)
        result = d:getTime()
      `)
      expect(vm.get("result")).toBe(0)
    })
  })

  it("new Date(1767225600000).getTime() round-trips", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, 1767225600000)
        result = d:getTime()
      `)
      expect(vm.get("result")).toBe(1767225600000)
    })
  })

  it("new Date(-1000).getTime() preserves negative ms", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, -1000)
        result = d:getTime()
      `)
      expect(vm.get("result")).toBe(-1000)
    })
  })
})

describe("accessors on new Date(0) — 1970-01-01T00:00:00Z (Thursday)", () => {
  it("getFullYear/getMonth/getDate/getDay/getHours/getMinutes/getSeconds", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, 0)
        result_year = d:getFullYear()
        result_month = d:getMonth()
        result_date = d:getDate()
        result_day = d:getDay()
        result_hours = d:getHours()
        result_minutes = d:getMinutes()
        result_seconds = d:getSeconds()
      `)
      expect(vm.get("result_year")).toBe(1970)
      expect(vm.get("result_month")).toBe(0)
      expect(vm.get("result_date")).toBe(1)
      expect(vm.get("result_day")).toBe(4)
      expect(vm.get("result_hours")).toBe(0)
      expect(vm.get("result_minutes")).toBe(0)
      expect(vm.get("result_seconds")).toBe(0)
    })
  })
})

describe("accessors on new Date(1777466096789) — 2026-04-29T12:34:56.789Z (Wednesday)", () => {
  it("getFullYear/getMonth/getDate/getDay/getHours/getMinutes/getSeconds", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, 1777466096789)
        result_year = d:getFullYear()
        result_month = d:getMonth()
        result_date = d:getDate()
        result_day = d:getDay()
        result_hours = d:getHours()
        result_minutes = d:getMinutes()
        result_seconds = d:getSeconds()
      `)
      expect(vm.get("result_year")).toBe(2026)
      expect(vm.get("result_month")).toBe(3)
      expect(vm.get("result_date")).toBe(29)
      expect(vm.get("result_day")).toBe(3)
      expect(vm.get("result_hours")).toBe(12)
      expect(vm.get("result_minutes")).toBe(34)
      expect(vm.get("result_seconds")).toBe(56)
    })
  })
})

describe("accessors on new Date(-1) — 1969-12-31T23:59:59.999Z", () => {
  it("getFullYear/getMonth/getDate/getHours/getMinutes for negative ms", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, -1)
        result_year = d:getFullYear()
        result_month = d:getMonth()
        result_date = d:getDate()
        result_hours = d:getHours()
        result_minutes = d:getMinutes()
      `)
      expect(vm.get("result_year")).toBe(1969)
      expect(vm.get("result_month")).toBe(11)
      expect(vm.get("result_date")).toBe(31)
      expect(vm.get("result_hours")).toBe(23)
      expect(vm.get("result_minutes")).toBe(59)
    })
  })
})

describe("Date.prototype.toISOString", () => {
  it("new Date(0).toISOString() is the epoch string", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, 0)
        result = d:toISOString()
      `)
      expect(vm.get("result")).toBe("1970-01-01T00:00:00.000Z")
    })
  })

  it("new Date(1777466096789).toISOString() preserves fractional ms", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, 1777466096789)
        result = d:toISOString()
      `)
      expect(vm.get("result")).toBe("2026-04-29T12:34:56.789Z")
    })
  })

  it("new Date(1767225600000).toISOString() pads zero ms", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local d = ____lualib.__TS__New(____lualib.Date, 1767225600000)
        result = d:toISOString()
      `)
      expect(vm.get("result")).toBe("2026-01-01T00:00:00.000Z")
    })
  })
})

describe("Date.parse", () => {
  it('Date.parse("2026-01-01T00:00:00.000Z") matches Date.UTC', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.parse("2026-01-01T00:00:00.000Z")`)
      expect(vm.get("result")).toBe(1767225600000)
    })
  })

  it('Date.parse("2026-04-29T12:34:56.789Z") preserves fractional ms', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.parse("2026-04-29T12:34:56.789Z")`)
      expect(vm.get("result")).toBe(1777466096789)
    })
  })

  it('Date.parse("1970-01-01T00:00:00Z") accepts no fractional ms', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.Date.parse("1970-01-01T00:00:00Z")`)
      expect(vm.get("result")).toBe(0)
    })
  })
})

describe("Date round-trip", () => {
  it("Date.parse(new Date(ms).toISOString()) === ms", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local ms = 1777466096789
        local d = ____lualib.__TS__New(____lualib.Date, ms)
        result = ____lualib.Date.parse(d:toISOString())
      `)
      expect(vm.get("result")).toBe(1777466096789)
    })
  })
})
