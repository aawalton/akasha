import type { Finding } from "../finding.page-type.ts"

export const comparingLuaAndTypescriptLeavesMustAgreeOnWhereASequenceStarts = {
  id: "01a06296-260b-7b4e-b98b-576c56dc8ea6",
  pageTypeSlug: "finding",
  slug: "comparing-lua-and-typescript-leaves-must-agree-on-where-a-sequence-starts",
  domainSlug: "domain/temper",
  claim:
    "Lua counts a sequence from one and a JavaScript array from zero, so the same data read into leaf paths on each side disagrees at every sequence. Reading both sides inside Lua looks like a tidy unification and shifts every index by one. What it prints is not a defect in the instrument but a catastrophic port failure, over data that is in fact leaf-exact.",
  evidence:
    'Measured 2026-09-02 while giving `temper-upstream-data-verify` a body. The four verifiers under `tools/lib/temper-upstream-data` were deliberately not uniform. `lib-treasure` and `housing` carry their tables out of Lua and compare them as TypeScript values. `lib-zone` and `lib-map-data` read their leaves inside Lua. That split follows from which tables hold sequences rather than from who wrote which file.\n\nMoving all four onto the reading inside Lua made LibTreasure report ALL_DATA as 2024 leaves upstream against 2024 ported, 1161 differing, 863 upstream alone and 863 ported alone. ICONS showed the shape plainly: the port carried `/0` through `/18` and upstream `/1` through `/19`, the same nineteen values one place apart. Reverting the two sequence-holding libraries to comparing as TypeScript values returned all ten datasets to leaf-exact.\n\nIt is now a `constraint` invariant on `treasure-upstream-verify` and on `housing-upstream-verify`, each reading "A table is carried out of Lua before that table is walked", and on `upstream-leaf-reading`.\n\nWhat makes this worth a page rather than a commit message. A run over correct data produced 3,911 apparent differences. The only reason that was read as the instrument being wrong rather than the port being broken is that the instrument had been fault-seeded first, so a single corrupted leaf was known to report as exactly one difference. Without that, the honest reading of 1161 differing leaves is that the port is ruined.',
} as const satisfies Finding
