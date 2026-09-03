import type { Finding } from "../finding.page-type.ts"

export const theTwoPathLaunchersAreTheMigrationBootstrap = {
  id: "01a06866-fd54-798d-8d29-74ab2740a225",
  pageTypeSlug: "finding",
  slug: "the-two-path-launchers-are-the-migration-bootstrap",
  domainSlug: "domain/akasha-migration",
  claim:
    "The dotfiles block moved twenty-seven of its twenty-nine files into akasha and left the two launchers under dotfiles/bin, because taking them away ends every agent's ability to run the migration's own commands.",
  evidence:
    "Both names resolve through /var/home/walton/repos/akasha/dotfiles/bin, which stands on PATH, and `~/.local/bin` holds a symlink to each; `type -a` showed both before the move. Taking the files away dangles both the PATH entry and the symlink at once, for every shell already running, and a subagent may not relink into the live system. The akasha launcher argues the same case in its own header: it is the only part of the name that lives outside the folder, and an akasha file imports nothing from out here. The two code-check tests at file-has-its-page.code-check.test.ts:181 and page-property-has-its-file.code-check.test.ts:207 also use dotfiles/bin/akasha as their fixture for a path outside akasha that is not judged. Resolving this needs setup-symlinks.sh re-run against the new tree first, which is a live-system act.",
} as const satisfies Finding
