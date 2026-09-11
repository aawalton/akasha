import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aBoundedRunIsWeighedBesideItsSeatRatherThanInsideIt = {
  id: "01a0919e-0485-710e-bd5c-d81a2e214a09",
  type: "finding",
  slug: "a-bounded-run-is-weighed-beside-its-seat-rather-than-inside-it",
  domain: "domain/cpu-limit",
  claim:
    "A run given a processor ceiling gets a control group beside the seat that started it rather than under it, at the same share. The group is made under the nearest ancestor where processor time is delegated, and a seat's scope delegates nothing, so the group lands in app.slice as a sibling of every seat. A seat with three bounded runs going pulls four shares where a quiet seat pulls one. Nine such groups are also still there with no processes in them, though running states that the group is taken away once the run is over.",
  evidence:
    "running.module.code.ts:40-47 walks upward from this process's own group to the nearest ancestor whose cgroup.subtree_control holds `cpu` and which this process may write in. Line 60 makes `akasha-<pid>-<nanoseconds>` there.\n\nRead on 2026-09-11: app.slice has subtree_control `cpu io memory pids dmem`, and a seat scope has subtree_control empty. A scope is a leaf, so nothing can be made below it. The nearest delegated ancestor of a seat scope is therefore app.slice itself.\n\nEvery child of app.slice holds cpu.weight 100, the akasha groups and the seat scopes alike.\n\nNine groups were there with cgroup.procs empty: akasha-1172364-12858364, akasha-1371087-10049661923, akasha-1784856-3100586453, akasha-228186-4096604216, akasha-3680322-2231290540, akasha-3691610-2343182862, akasha-637822-10789364992, akasha-750962-9424582797, akasha-870418-1598119305.\n\nswept at running.module.code.ts:106-115 tries rmdirSync twenty times, sleeping 50 milliseconds between, and then gives up without saying so. running.module.ts states 'The group is taken away once the run is over whatever the run said'.\n\nA group is made only for a run that states a cpuCeiling; a run stating none is spawned with no group of its own.",
} as const satisfies Finding
