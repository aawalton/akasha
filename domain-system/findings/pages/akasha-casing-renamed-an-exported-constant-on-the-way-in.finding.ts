import type { Finding } from "../finding.page-type.ts"

export const akashaCasingRenamedAnExportedConstantOnTheWayIn = {
  id: "01a060ab-ec73-76df-97e2-4dfac07fbb73",
  pageTypeSlug: "finding",
  slug: "akasha-casing-renamed-an-exported-constant-on-the-way-in",
  domainSlug: "domain/temper",
  claim:
    "A module-level constant must be written in upper snake case in akasha, and temper does not spell its constants that way. `initialBrowseState` had to become `INITIAL_BROWSE_STATE` to land. A seat repointing a consumer at the akasha copy renames the import as well, and a plain specifier swap leaves the build red.",
  evidence:
    "The write of `akasha/temper/temper-trading-listings/browse-state/browse-state.module.code.ts` was refused with `line 15 declares the constant `initialBrowseState`, which is not written in `name-format/upper-snake-case``. The sibling constant `NOOP` in the same file passed untouched, so the rule reaches every module-level constant and not only exported ones.\n\nThe source spells it `initialBrowseState` at `temper/game-trading-core/src/browse-state.ts:15` and reads it at line 83. One consumer outside the package reads it: `temper/game-trading-addon/src/browse-engine.ts` at lines 6, 36 and 149.\n\nSo the repoint is two edits rather than one. The specifier moves from `@temper/game-trading-core/browse-state` to `@akasha/temper-trading-listings/browse-state`, and the imported name moves from `initialBrowseState` to `INITIAL_BROWSE_STATE`.\n\nThis is not particular to browse-state. Any temper module holding a lower-camel module-level constant meets the same rename, so a seat planning a teardown should grep its package for module-level constants before counting the repoint as a specifier swap.",
} as const satisfies Finding
