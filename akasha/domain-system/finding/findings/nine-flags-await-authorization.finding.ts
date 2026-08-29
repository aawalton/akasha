import type { Finding } from "../finding.page-type.ts"

export const nineFlagsAwaitAuthorization = {
  id: "01a04bf5-74d0-73c6-b3f7-efebd2649ba8",
  pageTypeSlug: "finding",
  slug: "nine-flags-await-authorization",
  domainSlug: "domain/command-system",
  claim:
    "Nine things the reference commands accept are not accepted here, and the owner authorized none of them.",
  evidence:
    "Dropped for having one repository where the reference addresses many: the repo flag, the rule that a path inside no repository is written where it lies, the rule that a move between repositories is one act and two commits, and the reading of which repository a call addresses off the paths it names. Dropped for having no system behind them: the file kinds that told write which extensions carry bytes, so raw bytes now land unexamined and the no-raw-nul-bytes check is what judges them; the mechanical flag and the authored-write gate it stood aside for. Dropped as surface rather than substance: replace all, which would widen a substitution past the rule that a match of no times or more than once is refused; the patch file that assembled a change across several calls; stdin, which the caller shape carries no channel for, so passages and bodies arrive as files. Dropped from move and remove only: dry run and message file, which write and edit both keep. Recorded because the owner set an explicit review of features with him first and his authorization for the list to be removed, and these were decided in his absence under the standing instruction to decide and note it.",
} as const satisfies Finding
