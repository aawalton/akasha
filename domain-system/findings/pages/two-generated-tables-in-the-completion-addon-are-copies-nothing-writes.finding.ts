import type { Finding } from "../finding.page-type.ts"

export const twoGeneratedTablesInTheCompletionAddonAreCopiesNothingWrites = {
  id: "01a060f0-4c38-7a51-9514-0e1b12dfef23",
  pageTypeSlug: "finding",
  slug: "two-generated-tables-in-the-completion-addon-are-copies-nothing-writes",
  domainSlug: "domain/temper",
  claim:
    "Two `.generated.ts` files under `player-completion-addon/src/generated/` are neither akasha build output nor source. Nothing writes them. Codegen writes both names into `game-companions-addon/src/generated/` instead. One has no importer anywhere; the other holds a wire-index table already stale against the copy codegen maintains. So the generator-page test answers no here, and the converse test that would call them source answers no too.",
  evidence:
    "Measured on 2026-09-02 over all four generated files of `temper/player-completion-addon/src/generated/`.\n\nTwo are ordinary build output, and the settled route applies to them: `motif-style-lookup.generated.ts` (14,079 bytes) is written by `akasha/temper/temper-addon-generators/temper-motif-style/`, called at `tools/lib/temper-addon-data/writes/lore.ts:20`; `scribing-sources.generated.ts` (10,694 bytes) is written by `temper-scribing-sources`, called at `writes/scribing.ts:11`.\n\nThe other two are the finding. `companion-mappings.generated.ts` (722 bytes) and `skill-mappings.generated.ts` (4,385 bytes) have no page in `temper-addon-generators` under any fuzzy match. The only `w(...)` calls carrying those two names are `tools/lib/temper-addon-data/writes/companion-mappings.ts:9-10`, and `COMPANIONS_OUTPUT_DIR` at `tools/lib/temper-addon-data/constants.ts:4` is `temper/game-companions-addon/src/generated`. Codegen has never written the copies under `player-completion-addon`.\n\nThey have drifted, which is what makes it worth writing down. `companion-mappings.generated.ts` is byte-identical to the game-companions copy. `skill-mappings.generated.ts` is not: 4,385 bytes against 4,383, with about 66 divergent index assignments. Its values are positions in `companionSkills.ids`, read by `writeBits` in the companion build codec, so the copy is an older wire order.\n\n`skill-mappings.generated.ts` has zero importers in the addon. `companion-mappings.generated.ts` has one, `ui/task-progress-resolver-world.ts:8`, for `ALL_COMPANION_IDS` alone.",
} as const satisfies Finding
