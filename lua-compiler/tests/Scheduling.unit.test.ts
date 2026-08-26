import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

const SCHEDULING_STUBS = `
-- zo_callLater stub: queue (fn, ms) tuples in submission order. Tests call
-- flush_timers() to invoke every queued callback in FIFO order, mirroring
-- the order the ESO scheduler would fire them on a frame boundary.
local timers = {}
function zo_callLater(fn, ms)
  table.insert(timers, {fn = fn, ms = ms})
end
function timer_count()
  return #timers
end
function timer_ms(i)
  return timers[i].ms
end
function flush_timers()
  local cur = timers
  timers = {}
  for _, t in ipairs(cur) do t.fn() end
end

-- EVENT_MANAGER stub: track active interval registrations by namespace name.
-- flush_interval(name) invokes the registered callback once; interval_active(name)
-- reports whether the namespace is currently registered.
local intervals = {}
EVENT_MANAGER = {
  RegisterForUpdate = function(self, name, ms, fn)
    intervals[name] = {ms = ms, fn = fn}
  end,
  UnregisterForUpdate = function(self, name)
    intervals[name] = nil
  end,
}
function flush_interval(name)
  local entry = intervals[name]
  if entry ~= nil then entry.fn() end
end
function interval_active(name)
  return intervals[name] ~= nil
end
function interval_ms(name)
  return intervals[name].ms
end
`

describe("__TS__SetTimeout", () => {
  it("queues a zo_callLater with the requested delay", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        ____lualib.__TS__SetTimeout(function() end, 250)
        result_count = timer_count()
        result_ms = timer_ms(1)
      `)
      expect(vm.get("result_count")).toBe(1)
      expect(vm.get("result_ms")).toBe(250)
    })
  })

  it("invokes the callback when the queued timer fires", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        ran = false
        ____lualib.__TS__SetTimeout(function() ran = true end, 100)
        result_before = ran
        flush_timers()
        result_after = ran
      `)
      expect(vm.get("result_before")).toBe(false)
      expect(vm.get("result_after")).toBe(true)
    })
  })

  it("returns a strictly-increasing handle for each call", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        h1 = ____lualib.__TS__SetTimeout(function() end, 0)
        h2 = ____lualib.__TS__SetTimeout(function() end, 0)
        h3 = ____lualib.__TS__SetTimeout(function() end, 0)
        delta_2_1 = h2 - h1
        delta_3_2 = h3 - h2
      `)
      expect(vm.get("delta_2_1")).toBeGreaterThan(0)
      expect(vm.get("delta_3_2")).toBeGreaterThan(0)
    })
  })

  it("clamps a negative delay to 0", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        ____lualib.__TS__SetTimeout(function() end, -50)
        result_ms = timer_ms(1)
      `)
      expect(vm.get("result_ms")).toBe(0)
    })
  })

  it("clamps a NaN delay to 0", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        ____lualib.__TS__SetTimeout(function() end, 0/0)
        result_ms = timer_ms(1)
      `)
      expect(vm.get("result_ms")).toBe(0)
    })
  })
})

describe("__TS__ClearTimeout", () => {
  it("suppresses the callback when called before the timer fires", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        ran = false
        local h = ____lualib.__TS__SetTimeout(function() ran = true end, 100)
        ____lualib.__TS__ClearTimeout(h)
        flush_timers()
        result = ran
      `)
      expect(vm.get("result")).toBe(false)
    })
  })

  it("only suppresses the cancelled handle, leaving siblings intact", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        ran_a = false
        ran_b = false
        local h_a = ____lualib.__TS__SetTimeout(function() ran_a = true end, 100)
        ____lualib.__TS__SetTimeout(function() ran_b = true end, 100)
        ____lualib.__TS__ClearTimeout(h_a)
        flush_timers()
        result_a = ran_a
        result_b = ran_b
      `)
      expect(vm.get("result_a")).toBe(false)
      expect(vm.get("result_b")).toBe(true)
    })
  })

  it("is a safe no-op for an unknown handle", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        local ok, err = pcall(function()
          ____lualib.__TS__ClearTimeout(99999)
        end)
        result_ok = ok
      `)
      expect(vm.get("result_ok")).toBe(true)
    })
  })
})

describe("__TS__SetInterval", () => {
  it("registers under EVENT_MANAGER with a handle-derived unique name", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        local h = ____lualib.__TS__SetInterval(function() end, 200)
        result_active = interval_active("__TS__SetInterval_" .. tostring(h))
        result_ms = interval_ms("__TS__SetInterval_" .. tostring(h))
      `)
      expect(vm.get("result_active")).toBe(true)
      expect(vm.get("result_ms")).toBe(200)
    })
  })

  it("invokes the registered callback every time the interval fires", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        count = 0
        local h = ____lualib.__TS__SetInterval(function() count = count + 1 end, 100)
        local name = "__TS__SetInterval_" .. tostring(h)
        flush_interval(name)
        flush_interval(name)
        flush_interval(name)
        result = count
      `)
      expect(vm.get("result")).toBe(3)
    })
  })

  it("produces distinct names for concurrent intervals", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        local h1 = ____lualib.__TS__SetInterval(function() end, 100)
        local h2 = ____lualib.__TS__SetInterval(function() end, 100)
        result_distinct = h1 ~= h2
        result_a_active = interval_active("__TS__SetInterval_" .. tostring(h1))
        result_b_active = interval_active("__TS__SetInterval_" .. tostring(h2))
      `)
      expect(vm.get("result_distinct")).toBe(true)
      expect(vm.get("result_a_active")).toBe(true)
      expect(vm.get("result_b_active")).toBe(true)
    })
  })

  it("clamps a negative interval to 0", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        local h = ____lualib.__TS__SetInterval(function() end, -10)
        result_ms = interval_ms("__TS__SetInterval_" .. tostring(h))
      `)
      expect(vm.get("result_ms")).toBe(0)
    })
  })
})

describe("__TS__ClearInterval", () => {
  it("unregisters the matching EVENT_MANAGER name", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        local h = ____lualib.__TS__SetInterval(function() end, 100)
        local name = "__TS__SetInterval_" .. tostring(h)
        result_before = interval_active(name)
        ____lualib.__TS__ClearInterval(h)
        result_after = interval_active(name)
      `)
      expect(vm.get("result_before")).toBe(true)
      expect(vm.get("result_after")).toBe(false)
    })
  })

  it("only unregisters the cancelled handle, leaving siblings intact", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        local h_a = ____lualib.__TS__SetInterval(function() end, 100)
        local h_b = ____lualib.__TS__SetInterval(function() end, 100)
        ____lualib.__TS__ClearInterval(h_a)
        result_a = interval_active("__TS__SetInterval_" .. tostring(h_a))
        result_b = interval_active("__TS__SetInterval_" .. tostring(h_b))
      `)
      expect(vm.get("result_a")).toBe(false)
      expect(vm.get("result_b")).toBe(true)
    })
  })

  it("is a safe no-op for an unknown handle", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        local ok, err = pcall(function()
          ____lualib.__TS__ClearInterval(99999)
        end)
        result_ok = ok
      `)
      expect(vm.get("result_ok")).toBe(true)
    })
  })
})

describe("__TS__QueueMicrotask", () => {
  it("queues via zo_callLater with ms=0", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        ____lualib.__TS__QueueMicrotask(function() end)
        result_count = timer_count()
        result_ms = timer_ms(1)
      `)
      expect(vm.get("result_count")).toBe(1)
      expect(vm.get("result_ms")).toBe(0)
    })
  })

  it("invokes the callback when the queue is flushed", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        ran = false
        ____lualib.__TS__QueueMicrotask(function() ran = true end)
        result_before = ran
        flush_timers()
        result_after = ran
      `)
      expect(vm.get("result_before")).toBe(false)
      expect(vm.get("result_after")).toBe(true)
    })
  })

  it("preserves submission order across mixed queueMicrotask + setTimeout(0) calls", async () => {
    await withLualibVm({ stubs: SCHEDULING_STUBS }, async (vm) => {
      await vm.run(`
        log = {}
        ____lualib.__TS__QueueMicrotask(function() table.insert(log, "micro_a") end)
        ____lualib.__TS__SetTimeout(function() table.insert(log, "timer_b") end, 0)
        ____lualib.__TS__QueueMicrotask(function() table.insert(log, "micro_c") end)
        flush_timers()
        result_1 = log[1]
        result_2 = log[2]
        result_3 = log[3]
      `)
      expect(vm.get("result_1")).toBe("micro_a")
      expect(vm.get("result_2")).toBe("timer_b")
      expect(vm.get("result_3")).toBe("micro_c")
    })
  })
})
