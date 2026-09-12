import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const thePeakMemoryARunRecordsIsMeasuredThreeIncompatibleWays = {
  id: "01a09574-a194-7801-916a-76c6366f2828",
  type: "finding",
  slug: "the-peak-memory-a-run-records-is-measured-three-incompatible-ways",
  domain: "domain/memory-limit",
  claim:
    "Every kind of work records a peak, and three different things are being called the peak. A change, a check, an audit, a command and a hook record the akasha process's own high-water mark. A test records the resident peak the kernel reports for a spawned child. An agent's bash call records a cgroup's memory.peak. A ceiling set from what is recorded today would be set from three measurements wearing one name.",
  evidence:
    "check-cost.module.code.ts writes peakAddedBytes as the VmHWM in /proc/self/status after the run less the VmRSS before it, having reset the high-water mark through /proc/self/clear_refs in opening(). Self is the akasha process, so work a run hands to a child is outside the number. This path is called from calling.module.code.ts for every command, checking.module.code.ts for every check and audit, change-running and apply-running for a change, and hook-dispatch for every hook.\n\nrunning.module.code.ts answers peakBytes as resourceUsage.maxRSS times 1024, which is the kernel's ru_maxrss and counts only children the process waited on. code-tests.module.code.ts carries that number into a test's cost, and costSpawned in check-cost.module.code.ts records it as peakAddedBytes with residentBeforeBytes zero.\n\nbash-call-weighing.shell-script.shell.sh reads memory.peak from the cgroup akasha-call-$$ that the agent's shell put itself in, and writes that value as both peakBytes and peakAddedBytes. This is the only reading in the repository taken from a cgroup counter.\n\nAll three land in the same Cost record, declared in check-cost.module.code.ts, under the same field names, distinguished by nothing the record carries. check-measuring.module.code.ts reads peakAddedBytes into one mem column across kinds.\n\nThe recorded change peaks of a median 345 MiB and a maximum of 29.8 GiB over 40,586 runs are therefore the akasha process's own footprint rather than the change's.",
} as const satisfies Finding
