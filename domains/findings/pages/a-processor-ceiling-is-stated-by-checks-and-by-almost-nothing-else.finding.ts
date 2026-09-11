import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aProcessorCeilingIsStatedByChecksAndByAlmostNothingElse = {
  id: "01a091a8-e3ec-75e7-8c87-160bdf2f42ee",
  type: "finding",
  slug: "a-processor-ceiling-is-stated-by-checks-and-by-almost-nothing-else",
  domain: "domain/cpu-limit",
  claim:
    "The one ceiling a run is held to is stated almost only by checks. Fifty-eight of the fifty-nine code checks state maxCpuSeconds of their own, every module test inherits five seconds because the test property states it once, and seven files in the whole repository state a processor ceiling beside those. A module's code and a command's code state none, so the runs that take the longest are the ones nothing holds.",
  evidence:
    "Counted on 2026-09-11. Sixty-five files state `maxCpuSeconds: `, of which fifty-eight are code checks. checks/code-checks/pages holds fifty-nine pages.\n\ncode/modules/properties/test.code-file-property.ts:11 states maxCpuSeconds: 5 on the property itself, so every module's test run inherits it. There are 6946 module pages.\n\ncode/modules/properties/code.code-file-property.ts states no ceiling, so a module's code run is held to none.\n\nA check states two: `check: { maxCpuSeconds: 10 }` and `audit: { maxCpuSeconds: 15 }` are the usual pair, with twenty seconds for the audit of no-relative-specifier.\n\nranOver in checks/modules/checking/checking.module.code.ts:119 is what judges a run, and it compares cpuSeconds plus childCpuSeconds against the ceiling the check states. The refusal is check-over-its-ceiling.\n\nmaxWallSeconds and maxMemoryMb are declared beside maxCpuSeconds on module-property-group and on code-file-property. No code reads either and no page states a value for either, which is recorded separately.\n\nA run blocked on a network call or on a lock spends no processor seconds, so a processor ceiling never ends it however long it is waited on.",
} as const satisfies Finding
