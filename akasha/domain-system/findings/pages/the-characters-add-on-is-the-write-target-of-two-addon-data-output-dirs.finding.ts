import type { Finding } from "../finding.page-type.ts"

export const theCharactersAddOnIsTheWriteTargetOfTwoAddonDataOutputDirs = {
  id: "01a06307-4a0a-7052-b090-059c4da907a7",
  pageTypeSlug: "finding",
  slug: "the-characters-add-on-is-the-write-target-of-two-addon-data-output-dirs",
  domainSlug: "domain/temper",
  claim:
    "`temper/player-completion-addon` is named by two of the addon-data pipeline's output directories, so ablating it orphans them the way the companions and skills ablations orphaned theirs. The recreation into `akasha/temper/temper-characters-addon` cannot be finished by removing the folder alone: the two declarations come out in the same act, or the pipeline gains a sixth dead destination and keeps throwing before it writes anything.",
  evidence:
    "Measured 2026-09-02 at `d1b6e14672`, over the 83 files of `tools/lib/temper-addon-data`. `constants.ts` line 3 sets `OUTPUT_DIR` to `temperFile('player-completion-addon/src/generated')` and `output-dirs.ts` line 25 sets `TEMPER_ADDONS_CHARACTERS_GENERATED_DIR` to `out('player-completion-addon')`. The earlier finding two-ablations-left-their-write-targets-behind-and-the-generator-throws already records these two names as resolving to one identical path, and records that `ensureAllOutputDirs` short-circuits on the first orphan, so a sixth dead folder is not visible as a sixth error. A first attempt to find this by grepping the generators for a quoted `temper/` path returned zero across 254 files, but the control returned zero too, so that reading was discarded as blind rather than taken as an absence; the declarations are in `tools/`, not in the generator modules. Three tables the add-on generated are already recreated as modules, so the destination wants retiring or repointing rather than merely moving.",
} as const satisfies Finding
