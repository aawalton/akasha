import type { Finding } from "../finding.page-type.ts"

export const nothingGatedRenamesAFileBesideAPage = {
  id: "01a06741-b245-7433-b6eb-5946a81e1857",
  pageTypeSlug: "finding",
  slug: "nothing-gated-renames-a-file-beside-a-page",
  domainSlug: "domain/akasha-migration",
  claim:
    "No gated command renames a file sitting beside a page. A key rename carries no file by its own account, a move refuses anything that is not a page's own file, and a hook refuses `git mv`. So renaming a property key always strands the beside-files named for it, and the only route through is `landedMechanically`, which judges nothing.",
  evidence:
    "Measured 2026-09-03 while repairing the `evidence` key collision.\n\nRenaming the key on `file-property/topic-evidence` respelled 34 files and left all 32 beside-files named for the old key. `akasha refactor` says as much in its own help: a key rename carries no file, so it takes no plural and repoints no address. `akasha move` then refused each of the 32, answering that a move changes a page's own slug and these are no page's own file. `git mv` was refused by `block-git-writes`, which directs you back to `akasha move`. The gated write route, putting each body at its new path and taking the old one away, first demanded a recorded read of all 32 bodies: 44 KB of Alan's prose read into an agent to rename files byte for byte.\n\nWhat was left is `landedMechanically`, whose kind at `asking.module.code.ts:485` sets `runsChecks` and `runsWarrants` both false. It worked. `b3beb936f7` carried all 32 and `git show --find-renames` reads R100 on every one, so no byte moved. Nothing judged the result.\n\n`4e034dbfe7` is the worked example of what this costs. It renamed the property's own file and its page slug to `topic-evidence` and left the key spelled the old way, which is the field the resolver reads. Its message reads as a completed fix. The beside-files were untouched, the shadow outlived the rename, and finding creation was refused for another seven hours while the commit log said the defect was repaired. Had the key rename carried its own files, the half-repair would have shown itself, because either the 32 files would have moved or the command would have refused to move them.",
} as const satisfies Finding
