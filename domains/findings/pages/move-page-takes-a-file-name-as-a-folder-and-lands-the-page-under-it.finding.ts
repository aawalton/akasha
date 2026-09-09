import type { Finding } from "../finding.page-type.types.ts"

export const movePageTakesAFileNameAsAFolderAndLandsThePageUnderIt = {
  id: "01a08889-bcad-77c1-9c09-0340b5d02bec",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "move-page-takes-a-file-name-as-a-folder-and-lands-the-page-under-it",
  domain: "change-agent-file",
  claim:
    "`change-agent/move-page` reads `to` as a folder and joins the page's own basename onto it, without checking that `to` names a folder rather than a file. A call handing `to` a page path — say `a/x.module.ts` — lands the page at `a/x.module.ts/x.module.ts`, a folder named for a file with the page inside it, and refuses nothing. The mechanical change beneath cannot catch it: `move-file-page` refuses when `basename(from) !== basename(to)`, and a landing composed by joining the basename always keeps the basename, so that guard is unreachable from here. The act is live today and nothing says so.",
  evidence:
    "Found while building `change-agent/move-pages`, which composes its landing the same way. Rather than ship an unreachable copy of the basename guard, the plural act refuses a line whose landing parses as a page file name, `partedIn(to) !== null`, which is reachable and closes the hole for the plural form. The singular form still has it. The same one line before the join would close it there. Nothing has hit it because callers have written folders so far, and the lanes flattening nested folders are about to write many `to` values by hand.",
} as const satisfies Finding
