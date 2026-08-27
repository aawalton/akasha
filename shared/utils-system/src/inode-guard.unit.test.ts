import { describe, expect, test } from "bun:test"
import {
  assessInodeAdmission,
  assessInodePressure,
  classifyMountInodes,
  DEFAULT_INODE_THRESHOLDS,
  INODE_ADMISSION_OUTCOMES,
  type InodeAdmissionInput,
  type InodeAdmissionOutcome,
  type InodeReading,
  type InodeThresholds,
  MIN_FREE_INODES,
} from "./inode-guard"

const OBSERVED = {
  tmp: {
    mountPoint: "/tmp",
    filesystemType: "tmpfs",
    totalInodes: 1_048_576n,
    freeInodes: 1_015_739n,
  },
  tmpExhausted: {
    mountPoint: "/tmp",
    filesystemType: "tmpfs",
    totalInodes: 1_048_576n,
    freeInodes: 88n,
  },
  overlayRoot: {
    mountPoint: "/",
    filesystemType: "overlay",
    totalInodes: -1n,
    freeInodes: -281_056n,
  },
  btrfsVar: { mountPoint: "/var", filesystemType: "btrfs", totalInodes: 0n, freeInodes: 0n },
  vfatEfi: { mountPoint: "/boot/efi", filesystemType: "vfat", totalInodes: 0n, freeInodes: 0n },
  boot: {
    mountPoint: "/boot",
    filesystemType: "ext4",
    totalInodes: 131_072n,
    freeInodes: 131_037n,
  },
  tmpToday: {
    mountPoint: "/tmp",
    filesystemType: "tmpfs",
    totalInodes: 1_048_576n,
    freeInodes: 719_524n,
  },
  credentialsFull: {
    mountPoint: "/run/credentials/systemd-resolved.service",
    filesystemType: "tmpfs",
    totalInodes: 1_024n,
    freeInodes: 0n,
  },
} as const satisfies Record<string, InodeReading>

function atPercent(usedPercent: number, mountPoint = "/tmp"): InodeReading {
  const total = 1_000_000n
  const used = BigInt(Math.round((usedPercent / 100) * 1_000_000))
  return { mountPoint, filesystemType: "tmpfs", totalInodes: total, freeInodes: total - used }
}

describe("classifyMountInodes — the no-ceiling sentinels", () => {
  test("the all-ones cap classifies unmeasurable, NOT as a near-zero utilization", () => {
    const state = classifyMountInodes(OBSERVED.overlayRoot, DEFAULT_INODE_THRESHOLDS)
    expect(state.kind).toBe("unmeasurable")
    expect(state).not.toHaveProperty("usedPercent")
    expect(state).not.toHaveProperty("band")
  })

  test("a sentinel ceiling and a dynamic-inode filesystem give different reasons", () => {
    const sentinel = classifyMountInodes(OBSERVED.overlayRoot, DEFAULT_INODE_THRESHOLDS)
    const dynamic = classifyMountInodes(OBSERVED.btrfsVar, DEFAULT_INODE_THRESHOLDS)
    if (sentinel.kind !== "unmeasurable" || dynamic.kind !== "unmeasurable") {
      throw new Error("unreachable")
    }
    expect(sentinel.reason).toContain("sentinel")
    expect(dynamic.reason).toContain("dynamically")
    expect(sentinel.reason).not.toBe(dynamic.reason)
  })

  test("a negative cap with a non-negative free count is unmeasurable, not 100% used", () => {
    const state = classifyMountInodes(
      { mountPoint: "/", filesystemType: "overlay", totalInodes: -1n, freeInodes: 0n },
      DEFAULT_INODE_THRESHOLDS
    )
    expect(state.kind).toBe("unmeasurable")
    expect(state).not.toHaveProperty("band")
  })

  test("btrfs zero-cap classifies unmeasurable, not 0% used", () => {
    const state = classifyMountInodes(OBSERVED.btrfsVar, DEFAULT_INODE_THRESHOLDS)
    expect(state.kind).toBe("unmeasurable")
  })

  test("vfat zero-cap classifies unmeasurable", () => {
    expect(classifyMountInodes(OBSERVED.vfatEfi, DEFAULT_INODE_THRESHOLDS).kind).toBe(
      "unmeasurable"
    )
  })

  test("a free count exceeding the total classifies unmeasurable", () => {
    const bogus: InodeReading = {
      mountPoint: "/weird",
      filesystemType: "fictional",
      totalInodes: 100n,
      freeInodes: 101n,
    }
    expect(classifyMountInodes(bogus, DEFAULT_INODE_THRESHOLDS).kind).toBe("unmeasurable")
  })

  test("an implausibly large cap classifies unmeasurable", () => {
    const bogus: InodeReading = {
      mountPoint: "/weird",
      filesystemType: "fictional",
      totalInodes: 2n ** 40n,
      freeInodes: 2n ** 39n,
    }
    expect(classifyMountInodes(bogus, DEFAULT_INODE_THRESHOLDS).kind).toBe("unmeasurable")
  })
})

describe("classifyMountInodes — measured mounts and bands", () => {
  test("the observed /tmp reading is measured and in the ok band", () => {
    const state = classifyMountInodes(OBSERVED.tmp, DEFAULT_INODE_THRESHOLDS)
    expect(state.kind).toBe("measured")
    if (state.kind !== "measured") throw new Error("unreachable")
    expect(state.band).toBe("ok")
    expect(state.usedPercent).toBeCloseTo(3.13, 2)
    expect(state.usedInodes).toBe(32_837)
    expect(state.totalInodes).toBe(1_048_576)
  })

  test("the outage reading is measured and critical", () => {
    const state = classifyMountInodes(OBSERVED.tmpExhausted, DEFAULT_INODE_THRESHOLDS)
    expect(state.kind).toBe("measured")
    if (state.kind !== "measured") throw new Error("unreachable")
    expect(state.band).toBe("critical")
    expect(state.usedInodes).toBe(1_048_488)
  })

  test("the ok/warn boundary is inclusive at the warn threshold", () => {
    const below = classifyMountInodes(atPercent(49.9), DEFAULT_INODE_THRESHOLDS)
    const at = classifyMountInodes(atPercent(50), DEFAULT_INODE_THRESHOLDS)
    expect(below.kind === "measured" && below.band).toBe("ok")
    expect(at.kind === "measured" && at.band).toBe("warn")
  })

  test("the warn/critical boundary is inclusive at the critical threshold", () => {
    const below = classifyMountInodes(atPercent(79.9), DEFAULT_INODE_THRESHOLDS)
    const at = classifyMountInodes(atPercent(80), DEFAULT_INODE_THRESHOLDS)
    expect(below.kind === "measured" && below.band).toBe("warn")
    expect(at.kind === "measured" && at.band).toBe("critical")
  })

  test("thresholds are inputs, so a caller can gauge against its own bands", () => {
    const strict: InodeThresholds = { warnPercent: 1, criticalPercent: 2 }
    const state = classifyMountInodes(OBSERVED.tmp, strict)
    expect(state.kind === "measured" && state.band).toBe("critical")
  })
})

describe("assessInodePressure — the aggregate verdict", () => {
  test("returns ok when every gauged mount is below the warn threshold", () => {
    const a = assessInodePressure(
      [OBSERVED.tmp, OBSERVED.boot, OBSERVED.btrfsVar],
      DEFAULT_INODE_THRESHOLDS
    )
    expect(a.verdict).toBe("ok")
  })

  test("returns pressure when any gauged mount leaves the ok band", () => {
    const a = assessInodePressure(
      [OBSERVED.tmpExhausted, OBSERVED.boot, OBSERVED.btrfsVar],
      DEFAULT_INODE_THRESHOLDS
    )
    expect(a.verdict).toBe("pressure")
    expect(a.reason).toContain("/tmp")
  })

  test("returns indeterminate when NO mount has an inode ceiling", () => {
    const a = assessInodePressure(
      [OBSERVED.overlayRoot, OBSERVED.btrfsVar, OBSERVED.vfatEfi],
      DEFAULT_INODE_THRESHOLDS
    )
    expect(a.verdict).toBe("indeterminate")
  })

  test("an empty mount table is indeterminate, not ok", () => {
    expect(assessInodePressure([], DEFAULT_INODE_THRESHOLDS).verdict).toBe("indeterminate")
  })

  test("the reason states how many mounts were excluded as unmeasurable", () => {
    const a = assessInodePressure(
      [OBSERVED.tmp, OBSERVED.overlayRoot, OBSERVED.btrfsVar],
      DEFAULT_INODE_THRESHOLDS
    )
    expect(a.reason).toContain("2 without an inode ceiling")
  })

  test("the verdict and the breakdown are projections of one pass", () => {
    const readings = [OBSERVED.tmpExhausted, OBSERVED.tmp, OBSERVED.overlayRoot]
    const a = assessInodePressure(readings, DEFAULT_INODE_THRESHOLDS)
    expect(a.mounts.length).toBe(readings.length)
    const anyPressured = a.mounts.some((m) => m.kind === "measured" && m.band !== "ok")
    expect(anyPressured).toBe(a.verdict === "pressure")
  })

  test("the worst mount named in the reason is the highest-utilization one", () => {
    const midway: InodeReading = atPercent(55, "/run")
    const a = assessInodePressure([midway, OBSERVED.tmpExhausted], DEFAULT_INODE_THRESHOLDS)
    expect(a.verdict).toBe("pressure")
    expect(a.reason).toContain("/tmp")
    expect(a.reason).not.toContain("/run at")
  })
})

function admissionOver(
  readings: readonly InodeReading[],
  minFreeInodes: number = MIN_FREE_INODES
): InodeAdmissionInput {
  return {
    assessment: assessInodePressure(readings, DEFAULT_INODE_THRESHOLDS),
    minFreeInodes,
    kindLabel: "worker foo",
  }
}

function tmpWithFree(freeInodes: bigint): InodeReading {
  return {
    mountPoint: "/tmp",
    filesystemType: "tmpfs",
    totalInodes: 1_048_576n,
    freeInodes,
  }
}

const OUTCOME_REACHABILITY: Readonly<Record<InodeAdmissionOutcome, InodeAdmissionInput>> = {
  headroom: admissionOver([OBSERVED.tmpToday]),
  "no-candidate-mounts": admissionOver([OBSERVED.btrfsVar, OBSERVED.boot]),
  "below-floor": admissionOver([OBSERVED.tmpExhausted]),
  "nothing-gauged": admissionOver([]),
}

const ADMITTING_OUTCOMES: readonly InodeAdmissionOutcome[] = ["headroom", "no-candidate-mounts"]

describe("assessInodeAdmission — every outcome is reachable, so none of them is decoration", () => {
  for (const outcome of INODE_ADMISSION_OUTCOMES) {
    test(`${outcome} is produced by some reading`, () => {
      const decision = assessInodeAdmission(OUTCOME_REACHABILITY[outcome])
      expect(decision.outcome).toBe(outcome)
      expect(decision.allow).toBe(ADMITTING_OUTCOMES.includes(outcome))
      expect(decision.reason).not.toBe("")
    })
  }
})

describe("assessInodeAdmission — the floor", () => {
  test("the reading the floor was derived against admits, with 3.6x the floor free", () => {
    const decision = assessInodeAdmission(admissionOver([OBSERVED.tmpToday]))
    expect(decision.allow).toBe(true)
    expect(decision.reason).toContain("719524")
  })

  test("the incident reading refuses", () => {
    const decision = assessInodeAdmission(admissionOver([OBSERVED.tmpExhausted]))
    expect(decision.allow).toBe(false)
    expect(decision.outcome).toBe("below-floor")
  })

  test("free inodes at the floor refuse and one above it admits", () => {
    const at = assessInodeAdmission(admissionOver([tmpWithFree(BigInt(MIN_FREE_INODES))]))
    const above = assessInodeAdmission(admissionOver([tmpWithFree(BigInt(MIN_FREE_INODES + 1))]))
    expect(at.allow).toBe(false)
    expect(above.allow).toBe(true)
  })

  test("the floor is a parameter, so a caller's override moves the verdict", () => {
    const strict = assessInodeAdmission(admissionOver([OBSERVED.tmpToday], 900_000))
    expect(strict.allow).toBe(false)
    expect(strict.outcome).toBe("below-floor")
  })

  test("a floor above every ceiling on the host refuses rather than disabling itself", () => {
    const decision = assessInodeAdmission(
      admissionOver([OBSERVED.tmpToday, OBSERVED.boot, OBSERVED.btrfsVar], 99_999_999)
    )
    expect(decision.allow).toBe(false)
    expect(decision.outcome).toBe("below-floor")
  })
})

describe("assessInodeAdmission — a refusal names the resource and the reading", () => {
  const decision = assessInodeAdmission(admissionOver([OBSERVED.tmpExhausted]))

  test("it names inodes as the exhausted resource", () => {
    expect(decision.reason).toContain("INODES")
  })

  test("it names the mount", () => {
    expect(decision.reason).toContain("/tmp")
  })

  test("it names the free count, the ceiling and the floor", () => {
    expect(decision.reason).toContain("88")
    expect(decision.reason).toContain("1048576")
    expect(decision.reason).toContain(String(MIN_FREE_INODES))
  })

  test("it is distinguishable from the memory refusal it sits beside", () => {
    expect(decision.reason).not.toContain("MemAvailable")
    expect(decision.reason).not.toContain("GB")
  })
})

describe("assessInodeAdmission — an unreadable reading is not headroom", () => {
  test("a mount table that produced nothing refuses", () => {
    const decision = assessInodeAdmission(admissionOver([]))
    expect(decision.allow).toBe(false)
    expect(decision.outcome).toBe("nothing-gauged")
  })

  test("a host whose mounts all allocate inodes dynamically admits, and says so", () => {
    const decision = assessInodeAdmission(
      admissionOver([OBSERVED.btrfsVar, OBSERVED.overlayRoot, OBSERVED.vfatEfi])
    )
    expect(decision.allow).toBe(true)
    expect(decision.outcome).toBe("no-candidate-mounts")
    expect(decision.reason).toContain("3")
  })

  test("an unmeasurable mount is never counted as the mount with headroom", () => {
    const decision = assessInodeAdmission(admissionOver([OBSERVED.overlayRoot, OBSERVED.tmpToday]))
    expect(decision.allow).toBe(true)
    expect(decision.reason).toContain("/tmp")
    expect(decision.reason).not.toContain("overlay")
  })
})

describe("assessInodeAdmission — which mounts can refuse", () => {
  test("a full mount whose entire ceiling is under the floor does not refuse", () => {
    const decision = assessInodeAdmission(
      admissionOver([OBSERVED.credentialsFull, OBSERVED.tmpToday])
    )
    expect(decision.allow).toBe(true)
    expect(decision.reason).not.toContain("credentials")
  })

  test("the tightest candidate is the one named, not the first", () => {
    const roomy: InodeReading = {
      mountPoint: "/dev/shm",
      filesystemType: "tmpfs",
      totalInodes: 8_147_852n,
      freeInodes: 8_147_609n,
    }
    const decision = assessInodeAdmission(admissionOver([roomy, OBSERVED.tmpToday]))
    expect(decision.reason).toContain("/tmp")
    expect(decision.reason).not.toContain("/dev/shm")
  })

  test("the allow reason states how many mounts were gauged against the floor", () => {
    const decision = assessInodeAdmission(
      admissionOver([OBSERVED.tmpToday, OBSERVED.boot, OBSERVED.btrfsVar])
    )
    expect(decision.reason).toContain("1 of 3")
  })
})
