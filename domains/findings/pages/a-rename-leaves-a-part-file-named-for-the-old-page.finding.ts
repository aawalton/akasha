import type { Finding } from "../finding.page-type.types.ts"

export const aRenameLeavesAPartFileNamedForTheOldPage = {
  id: "01a082a1-fb72-7bbe-99be-24cced56eb25",
  pageTypeSlug: "finding",
  slug: "a-rename-leaves-a-part-file-named-for-the-old-page",
  domain: "domain/change-mechanical-file-rename",
  claim:
    "A rename carries a property's numbered part files under the old page's name, so each names a page that is gone.",
  evidence:
    "Renaming `eso.temper-mine.ts` to `eso-x` carried all 23 `items.partN.jsonl` files and left every one named `eso.temper-mine.items.partN.jsonl`, which the new page claims nothing of. `besideIn` also spells an uncommitted file property's file without its mark. Since `b596d58e80` the guard refuses this rather than orphaning it, so the data is held while the mend waits.",
} as const satisfies Finding
