import { describe, expect, test } from "bun:test"
import { assessGlobalKill, GLOBAL_MIN_AVAIL_GB, GLOBAL_MIN_FREE_SWAP_GB } from "./memory-monitor/host-global"
import { type PidSnapshot } from "./memory-monitor/shared"

const KB_PER_GB = 1024 * 1024
const minAvailKb = GLOBAL_MIN_AVAIL_GB * KB_PER_GB
const minFreeSwapKb = GLOBAL_MIN_FREE_SWAP_GB * KB_PER_GB

function snap(pid: number, ppid: number, rssGb: number, name = `proc-${pid}`): PidSnapshot {
  return { pid, ppid, vmRssKb: Math.round(rssGb * KB_PER_GB), name }
}

const swapHealthy = {
  availableKb: 32 * KB_PER_GB,
  swapTotalKb: 16 * KB_PER_GB,
  swapFreeKb: 12 * KB_PER_GB,
  minAvailKb,
  minFreeSwapKb,
}

describe("assessGlobalKill — headroom leg disarmed (swap-healthy)", () => {
  test("does not fire even when the uid-1000 VmRSS sum is enormous (aggregate leg retired #14389)", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 25), snap(200, 1, 25), snap(300, 1, 15)]
    const result = assessGlobalKill({
      snapshots,
      supervisorPids: [100],
      ...swapHealthy,
    })
    expect(result.kill).toBe(false)
  })

  test("swap-healthy + low MemAvailable → no kill (eviction headroom exists)", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 30), snap(200, 1, 20)]
    const result = assessGlobalKill({
      snapshots,
      supervisorPids: [100],
      availableKb: 2 * KB_PER_GB,
      swapTotalKb: 16 * KB_PER_GB,
      swapFreeKb: 12 * KB_PER_GB,
      minAvailKb,
      minFreeSwapKb,
    })
    expect(result.kill).toBe(false)
  })
})

describe("assessGlobalKill — swap-armed headroom leg (pre-OOM pre-emption)", () => {
  const pidSet: PidSnapshot[] = [snap(100, 1, 8), snap(110, 100, 7), snap(200, 1, 5)]

  test("swap exhausted + MemAvailable at/under the margin → FIRES (largest tree)", () => {
    const result = assessGlobalKill({
      snapshots: pidSet,
      supervisorPids: [100, 200],
      availableKb: 3 * KB_PER_GB,
      swapTotalKb: 16 * KB_PER_GB,
      swapFreeKb: 100 * 1024,
      minAvailKb,
      minFreeSwapKb,
    })
    expect(result.kill).toBe(true)
    expect(result.target?.kind).toBe("tree")
    if (result.target?.kind === "tree") {
      expect(result.target.rootPid).toBe(100)
    }
    expect(result.reason).toContain("pre-OOM margin")
  })

  test("swap exhausted + MemAvailable above the margin → does NOT fire", () => {
    const result = assessGlobalKill({
      snapshots: pidSet,
      supervisorPids: [100, 200],
      availableKb: 13 * KB_PER_GB,
      swapTotalKb: 16 * KB_PER_GB,
      swapFreeKb: 100 * 1024,
      minAvailKb,
      minFreeSwapKb,
    })
    expect(result.kill).toBe(false)
  })

  test("MemAvailable exactly at the margin with swap drained → FIRES (inclusive boundary)", () => {
    const result = assessGlobalKill({
      snapshots: pidSet,
      supervisorPids: [100],
      availableKb: minAvailKb,
      swapTotalKb: 16 * KB_PER_GB,
      swapFreeKb: minFreeSwapKb,
      minAvailKb,
      minFreeSwapKb,
    })
    expect(result.kill).toBe(true)
  })

  test("SwapFree just above the arming floor → leg stays disarmed", () => {
    const result = assessGlobalKill({
      snapshots: pidSet,
      supervisorPids: [100],
      availableKb: 1 * KB_PER_GB,
      swapTotalKb: 16 * KB_PER_GB,
      swapFreeKb: minFreeSwapKb + 1,
      minAvailKb,
      minFreeSwapKb,
    })
    expect(result.kill).toBe(false)
  })

  test("swapless host (SwapTotal=0) + low MemAvailable → FIRES (no eviction cushion at all)", () => {
    const result = assessGlobalKill({
      snapshots: pidSet,
      supervisorPids: [],
      availableKb: 2 * KB_PER_GB,
      swapTotalKb: 0,
      swapFreeKb: 0,
      minAvailKb,
      minFreeSwapKb,
    })
    expect(result.kill).toBe(true)
    expect(result.target?.kind).toBe("pid")
    if (result.target?.kind === "pid") {
      expect(result.target.pid).toBe(100)
    }
  })

  test("headroom leg armed but no snapshots → no kill target → kill:false", () => {
    const result = assessGlobalKill({
      snapshots: [],
      supervisorPids: [],
      availableKb: 1 * KB_PER_GB,
      swapTotalKb: 0,
      swapFreeKb: 0,
      minAvailKb,
      minFreeSwapKb,
    })
    expect(result.kill).toBe(false)
    expect(result.target).toBeNull()
  })
})
