import type { Finding } from "../finding.page-type.ts"

export const aCleanDraftOnADirectoryRemovalIsEvidenceOfNothing = {
  id: "01a06433-8ace-7bd8-8800-f49b00510e7a",
  pageTypeSlug: "finding",
  slug: "a-clean-draft-on-a-directory-removal-is-evidence-of-nothing",
  domainSlug: "workspace-package/command-system",
  claim:
    "`akasha edit --remove` naming a directory draws both deletions into the drafted patch, yet the checks judge a tree the removal was never worked into, and the land then fails with EISDIR. Naming the page file works the removal in and the checks judge it truly. So a clean draft on the directory form is evidence of nothing. Nothing was harmed: the failed land rolled back whole.",
  evidence:
    "Measured 2026-09-02 removing `akasha/status-bar-access/ask-through`, dead code whose only caller had moved away.\n\nDirectory form, two edits and no mend: the draft answered `40 checks judged the 3 paths the patch would leave, and none refused`, and the patch drew both files deleted. But `partSlugs` still named `module/ask-through`, the very state the page-file form refuses. So the checks did not see the removal the patch drew.\n\nDirectory form with the `partSlugs` mend added: refused `no page names module/ask-through among its parts`, which can only fire while ask-through is in the judged tree. The same conclusion from the other side.\n\nLanding the directory form: `EISDIR: illegal operation on a directory`. Afterwards `git status` was clean for the folder and both files were there.\n\nPage file plus the mend, every other passage identical: 36 checks on the dry run, 40 on the land, committed `cdda094f0e`. One argument differs between the refusal and the landing. Path counts agree: 3 for the directory draft, 5 for the page-file land, being 3 edited and 2 taken away.\n\nNot a timing defect. `akasha/pages-system/shadow/shadow.module.ts:7` calls a shadow the files and index as a change would leave them, and :38-41 says a check reads the index the change leaves rather than the committed one. A removal the change carries is in the judged tree whatever a background index holds.\n\nAlso settled: `akasha edit --remove` does not mend a workspace package's `partSlugs`. Read off the drafted patch, four hunks, none touching that page.",
} as const satisfies Finding
