import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aGroupARunLeavesBehindIsSweptByNothingThatSaysSo = {
  id: "01a09323-b132-7a2f-ac97-f3494d8fd663",
  type: "finding",
  slug: "a-group-a-run-leaves-behind-is-swept-by-nothing-that-says-so",
  domain: "domain/cpu-limit",
  claim:
    "A bounded run whose group will not go away leaves that group behind and says nothing. swept tries for one second and then returns as though it had worked, so running states the group is taken away once the run is over and that is not always so. Nine empty groups were sitting in app.slice from runs long finished. A group left inside a seat's own scope goes when the seat goes, so this only piles up where the run was started by something other than a seat.",
  evidence:
    "Read on 2026-09-11 under /sys/fs/cgroup/user.slice/user-1000.slice/user@1000.service/app.slice.\n\nNine directories named akasha-<pid>-<nanoseconds> each had cgroup.procs empty: akasha-1172364-12858364, akasha-1371087-10049661923, akasha-1784856-3100586453, akasha-228186-4096604216, akasha-3680322-2231290540, akasha-3691610-2343182862, akasha-637822-10789364992, akasha-750962-9424582797, akasha-870418-1598119305.\n\nrunning.module.code.ts swept tries rmdirSync twenty times with fifty milliseconds between, then returns with no word to its caller and no mark anywhere. running.module.ts states 'The group is taken away once the run is over whatever the run said'.\n\nThe groups named akasha-call-<pid> beside them all held live processes, so those are calls going rather than debris.",
} as const satisfies Finding
