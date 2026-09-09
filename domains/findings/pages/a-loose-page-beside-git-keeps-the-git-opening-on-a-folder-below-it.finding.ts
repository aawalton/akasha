import type { Finding } from "../finding.page-type.types.ts"

export const aLoosePageBesideGitKeepsTheGitOpeningOnAFolderBelowIt = {
  id: "01a087c2-1440-770d-86fb-d02f969825ca",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-loose-page-beside-git-keeps-the-git-opening-on-a-folder-below-it",
  domain: "code-check/folder-matches-a-shape",
  claim:
    "`git/running` is asked for the name `git-running` by `folder-matches-a-shape`, and renaming it to that mends nothing. `git/` holds two pages of two slugs, so they do not pair, nothing is known to take off, and the whole slug comes back. The fault is `oid.domain.ts` sitting loose in `git/` rather than in a folder of its own. Move it and `git/` answers `git`, at which point `git-running` would be refused for opening with `git` instead. So the folder is right as `running`, and the refusal names a fault one level above it.",
  evidence:
    "`namingOver` at checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.code.ts line 335 asks for `names[1] ?? names[0]`, where `names` is built at line 322 as the page's slug followed by its plural slug where the page states one, and `strippedOf` at line 207 takes off whatever the naming folder is named. So the name a folder is asked for is the plural slug where there is one and the slug where there is none.\n\n`git/` holds two pages, git/git.workspace-package.ts and git/oid.domain.ts. `pairedIn` at line 280 gives a pair only where one of the two is a page type and the other a workspace package or a domain of that same slug. A workspace package `git` beside a domain `oid` is neither, so `holds` answers `git` with no names at all, and `strippedOf` hands back `git-running` unchanged. Nothing is taken off because nothing is known.\n\nThe fault is `oid.domain.ts` sitting loose in `git/` rather than in a folder of its own. Every other module folder under `git/` already carries the `git-` opening on its page and a bare name on its folder, and `git/running` is one of those. Move `oid` into a folder and `holds` answers `git` with `git`, at which point `openingWith` at line 253 refuses `git/git-running` at stage one, before any shape is asked. So `running` is the name that survives the mend and `git-running` is the name that does not.\n\nThe four other folders this finding once covered are mended and no longer refused: `checks` states a plural of `checks` on its package page, and `smilingjenny`, `products/audhdalan` and `products/archive-of-worlds` each had a plural of a proper name taken off.",
} as const satisfies Finding
