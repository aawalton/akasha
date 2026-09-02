import type { Finding } from "../finding.page-type.ts"

export const aRepointToATwinMovesTheEmittedBytesThoughEverySymbolMatches = {
  id: "01a06375-7313-792d-981e-2afb32475ae2",
  pageTypeSlug: "finding",
  slug: "a-repoint-to-a-twin-moves-the-emitted-bytes-though-every-symbol-matches",
  domainSlug: "domain/temper",
  claim:
    "Repointing a consumer off a legacy package onto its akasha twin is not byte-neutral, even where every symbol matches and the compiler reports the same errors. The twin splits one legacy file into several modules, so the bundle carries different tables. TemperCharacters grew 11,930 bytes on the skill morphs repoint, so a byte-identical result is the wrong acceptance test for such a repoint.",
  evidence:
    "On 2026-09-02 I ablated `temper/game-characters-capture-addon` at 27 files and `temper/game-characters-skills-morphs-addon` at 7. Both twins are whole: 184 of 184 exported symbols and 13 of 13, by two independent instruments agreeing exactly, with 8,359 leaves compared by value at zero differences.\n\nMeasured with `akasha temper-addon-build player-completion-addon --build-only`, the flat leaf being what parts the two folders both named TemperCharacters. The capture ablation was byte-neutral: 1,344,435 bytes, exit 2, 2 errors, at 2be9555a22 before and 6404ea6778 after. The skill morphs repoint was not: 1,356,365 bytes at 737232486a, up 11,930, at the same exit and the same 2 errors.\n\nThe growth is mine rather than a sibling's. Across the 48 commits between the two builds, `git log` restricted to the 35 closure directories returns exactly two, 19f3abf146 and 1f8a766626, both mine. The same query returns rows when pointed wider, so the two is not a blind instrument reporting clean.\n\nThe cause is where the module edges fall. Legacy `src/ui/task-hud-skill-morphs.ts` took five names from one generated file, `skill-line-mappings`; the twin takes the same five from three modules. What the bundle carries follows module edges rather than symbol counts.\n\nAll 12 migrated symbols are in the emitted Lua and a seeded nonsense name is absent.\n\nWhat I did not establish: whether the 11,930 bytes are wholly extra tables or partly a reordering.",
} as const satisfies Finding
