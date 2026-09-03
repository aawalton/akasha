import type { Finding } from "../finding.page-type.ts"

export const aRenameBreaksLiveDaemonsBeforeItsCommitLands = {
  id: "01a064e1-41b3-7d79-abc5-92ed478004b1",
  pageTypeSlug: "finding",
  slug: "a-rename-breaks-live-daemons-before-its-commit-lands",
  domainSlug: "domain/akasha-migration",
  claim:
    "Renaming an exported symbol that live daemons import breaks them before the commit lands rather than because of it. Four supervisors failed to import a renamed export three minutes before the commit that renamed it, so the cause is the shared worktree being read mid-rename. It healed itself once the importers caught up.",
  evidence:
    "Measured 2026-09-03. Four supervisor consoles — akasha, alan, dalla and aine — each recorded one ERROR between 01:00:52.707Z and 01:00:56.002Z: `supervisor-decide could not decide proxyLivenessRule`, a SyntaxError naming an export missing from `tools/lib/seat-akasha-beside.ts`. The commit removing that export, `4c2fc57b38`, has committer time 01:03:48Z. The failures precede it by about three minutes, so the commit did not cause them, and its matching message would have been the wrong evidence to stop at.\n\nWhat fits the timestamps is the worktree. Eleven agents share this checkout and a supervisor reads its modules from it directly rather than from a build, so a rename touching a module and its importers in separate writes leaves a window where the module is renamed and an importer is not. Anything importing inside that window fails.\n\nIt healed itself. No occurrence follows 01:00:56 in any console, and the newest errors twenty-five minutes later are an unrelated object-store line. No source file names the old export now.\n\nIt can recur, because the shape is ordinary rather than rare. `tools/lib` holds ten importers of this one module and the supervisor path is live throughout. The bound that would hold is an expand-and-contract rename: export the new name beside the old one, move every importer, then delete the old name, so no window exists in which a live reader can ask for a name that has gone.",
} as const satisfies Finding
