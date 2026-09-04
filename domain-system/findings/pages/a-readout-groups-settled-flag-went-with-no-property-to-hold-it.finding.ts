import type { Finding } from "../finding.page-type.ts"

export const aReadoutGroupsSettledFlagWentWithNoPropertyToHoldIt = {
  id: "01a06558-bbb0-7004-bcef-f7db0d5c3629",
  pageTypeSlug: "finding",
  slug: "a-readout-groups-settled-flag-went-with-no-property-to-hold-it",
  domainSlug: "page-type/finding",
  claim:
    "The readout groups carried a `settled` flag in markdown that no akasha page carries and no akasha page property declares. The field was dropped across the whole family rather than for one page, so nothing refused it and nothing records that it went. Whoever wants to know which groups were settled has only the backup to read it from.",
  evidence:
    "Measured 2026-09-02 while ablating `readouts/group/values.readout-group.md`. Its frontmatter carried `settled: true` alongside `sequence-slugs`, `sort-order` and `domain-parent-slug`. Every other field is accounted for on `akasha/readout-system/readout-groups/pages/values.readout-group.ts`: the Definition line is the definition, both Design sentences are invariants, `sort-order` is `sortOrder`, and the six `value/*` sequence slugs are recovered from the inverse edge, each of the six `akasha/readout-system/values/pages/*.value.ts` naming `readout-group/values` in `groupSlugs` and carrying `place` 1 to 6 in the markdown's order.\n\n`settled` alone has no home. `grep -l settled akasha/readout-system/readout-groups/pages/*.ts` answers 0 of 7. `find akasha -name 'settled.*property.ts'` answers 0. So this is not a values-specific omission: seven readout-group pages had already landed before I looked, and none of them took the field either.\n\nWhat is not established is what `settled` meant. No akasha page states it and the markdown gives no definition, so I could not judge whether it is worth a property or was already dead. That is why this is filed rather than fixed: adding a property for a flag whose sense nobody can state would carry the loss forward as a guess. The backup at /var/home/walton/repos/akasha-backup-2026-09-02 holds every group's markdown, so which groups carried it is still recoverable.",
} as const satisfies Finding
