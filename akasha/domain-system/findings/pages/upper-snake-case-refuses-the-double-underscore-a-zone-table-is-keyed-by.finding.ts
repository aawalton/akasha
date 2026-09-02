import type { Finding } from "../finding.page-type.ts"

export const upperSnakeCaseRefusesTheDoubleUnderscoreAZoneTableIsKeyedBy = {
  id: "01a061b1-a094-72af-9a09-2fd49b7dce73",
  pageTypeSlug: "finding",
  slug: "upper-snake-case-refuses-the-double-underscore-a-zone-table-is-keyed-by",
  domainSlug: "domain/temper",
  claim:
    "`name-format/upper-snake-case` admits `^[A-Z0-9]+(_[A-Z0-9]+)*$`, so a name holding a doubled underscore cannot be renamed into it. The skyshards data files export 375 constants named `<zone>__<map>` and every one was refused. No rename saves them, because the doubled separator is the join between two fields the reader splits on. What works is one record per file with the old names as keys, since a key is never judged.",
  evidence:
    "`identifier-matches-its-place`, at `akasha/checks/code-checks/pages/identifier-matches-its-place/identifier-matches-its-place.code-check.code.ts`, walks top-level variable statements and holds any bound to an object, array, string, number, regex, template or boolean literal to the constant format. Its `keyed` test excludes a property access name, a qualified name's right, a property assignment name and a binding element's property name, so a name written as an object key is never judged at all.\n\n`temper/game-collections-addon/src/skyshards/data/part-1.ts` through `part-17.ts` hold 375 lines of the form `export const alikr__aldunz_base = [...] satisfies readonly SkyshardPin[]`. Upper-casing gives `ALIKR__ALDUNZ_BASE`, which the pattern still refuses. Collapsing to one underscore loses the field boundary the gatherer reads, where `part1.alikr__aldunz_base` becomes the entry `alikr` then `aldunz_base`.\n\nEach part became `export const SKYSHARDS_PART_N = { alikr__aldunz_base: [...], ... } satisfies Record<string, readonly SkyshardPin[]>`, and the gatherer moved from `import * as part1` to `import { SKYSHARDS_PART_1 }`. Naming refusals over the 98 landed files went from 375 to zero. Evaluating both tables and comparing them gives 37 zones, 375 maps and 967 placements identical, zone for zone, map for map and placement for placement.\n\nAny upstream table keyed by a joined name meets this.",
} as const satisfies Finding
