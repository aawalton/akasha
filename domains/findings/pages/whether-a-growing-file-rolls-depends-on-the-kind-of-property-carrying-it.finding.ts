import type { Finding } from "../finding.page-type.types.ts"

export const whetherAGrowingFileRollsDependsOnTheKindOfPropertyCarryingIt = {
  id: "01a087eb-5794-7ab8-9be0-9a82fb093616",
  pageTypeSlug: "finding",
  slug: "whether-a-growing-file-rolls-depends-on-the-kind-of-property-carrying-it",
  domain: "workspace-package/page",
  claim:
    "Whether a growing file divides into numbered parts at the ceiling depends on which kind of page property carries it, and no page says so. A `page-property-entry` is divided for its writer. A `file-property` divides only where someone wrote the loop for that one property, so a file property carrying a log is written with no sign that it must roll itself.",
  evidence:
    "`page-composing.module.code.ts:256-259` reaches `partsOver` only where `one.pageTypeSlug === ENTRY_PROPERTY`, so `items` on the eso temper mine is divided into twenty-four files of at most 8,292,587 bytes with nothing written for it. `log-day-writing.module.code.ts:109-119,161-170` is `lines`, a file property whose `lastPartOf` and roll-on-append were written for that property alone. `generation-runs.file-property.ts` is `runs`, a file property with neither, and `alan.generation-log.runs.jsonl` at 16,240,118 bytes was the one file in 121,929 over a ceiling when the audit ran. `page-entry-landing.module.code.ts:75,115` holds `appendedAt` and `landedAt`, generic over the property slug, the extension and the ceiling, and nothing outside that module and its own test calls either. The same loop is written again at `edits-keeping.module.code.ts:141-178` and at `check-cost.module.code.ts:190-203`. Why the difference bites is bound at `entry-ceiling.module.ts:17` rather than restated here.",
} as const satisfies Finding
