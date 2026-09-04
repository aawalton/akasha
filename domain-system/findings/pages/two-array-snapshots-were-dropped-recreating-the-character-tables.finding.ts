import type { Finding } from "../finding.page-type.ts"

export const twoArraySnapshotsWereDroppedRecreatingTheCharacterTables = {
  id: "01a060fa-0a9e-79fc-aef4-ebd8f765fab0",
  pageTypeSlug: "finding",
  slug: "two-array-snapshots-were-dropped-recreating-the-character-tables",
  domainSlug: "domain/temper",
  claim:
    "Two exported constants were dropped recreating the character tables in akasha. temper-curse.generated.ts held TEMPER_CURSES and temper-vampire-stage.generated.ts held TEMPER_VAMPIRE_STAGES, each an ordered array beside the keyed record the engine reads. Neither is carried by the akasha module replacing it. No file read either, so nothing broke, but a caller wanting a stable iteration order without the data-file helper now has none.",
  evidence:
    "Measured 2026-09-02, in commits 8ebebf12af and 9a01a3df89.\n\nBoth generated files carried two shapes of the same rows. The keyed record fed createDataFile, and a comment above the array said it was an array snapshot preserving displayOrder, for callers wanting a stable iteration order without consulting the data-file helper.\n\nakasha/temper/temper-character-sources/curses and the vampire-stages module beside it carry the keyed record alone. The reason is that createDataFile already answers an ordered list on .list and an ordered id list on .ids, so the array said nothing the data file does not, and a second copy of an ordered table is exactly the shape that drifts.\n\nA grep for TEMPER_CURSES and TEMPER_VAMPIRE_STAGES across every tracked file answered only their own declarations and the comment naming one of them. Neither generator emits the array any more either, because neither generator is called; that is recorded in fifteen-more-generators-now-write-nowhere.\n\nThe call taken was to drop both rather than carry a second ordering across. Where a caller ever wants one, curses.list and vampireStages.list answer it in the same order.",
} as const satisfies Finding
