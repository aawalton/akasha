import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aGroupMayStateAMemoryCeilingAndNothingReadsIt = {
  id: "01a09169-7a7e-767e-b67f-52d5c9948835",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-group-may-state-a-memory-ceiling-and-nothing-reads-it",
  domain: "domain/memory-limit",
  claim:
    "The repository already has a memory ceiling a page may state, and no code reads it. max-memory-mb is declared on module-property-group and on code-file-property beside max-cpu-seconds and max-wall-seconds, but the only ceiling any run is held to is the processor one. No page states a value for it either, so a page that stated one would be held to nothing and nothing would say so.",
  evidence:
    "code-system/module-property-groups/properties/group-max-memory-mb.number-property.ts defines it as the most memory one run of a group's code may hold, in megabytes.\n\nmodule-property-group.page-type.ts declares it at line 41 and names it in ModulePropertyGroupCeilings at line 6 alongside maxCpuSeconds and maxWallSeconds. That page type also states the invariants that a page carrying the group states each ceiling that group's run is held to, and that a group with no ceiling stated holds its run to no ceiling.\n\npages/code-file-properties/code-file-property.page-type.ts declares a second max-memory-mb at line 19.\n\nranOver in checks/modules/checking/checking.module.code.ts is what holds a run to a ceiling, and it compares cpuSeconds plus childCpuSeconds against maxCpuSeconds alone. The refusal it emits is check-over-its-ceiling.\n\nA search over the repository for maxMemoryMb finds the two property pages, the two page types, the two generated types and one test that lists the key by name. A search for `maxMemoryMb:` finds no page stating a value.\n\ncheck-cost already writes peakBytes, residentBeforeBytes, peakAddedBytes and peakMeasured on every run, so the number the ceiling would be judged against is recorded already.",
} as const satisfies Finding
