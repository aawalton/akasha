import type { Finding } from "../finding.page-type.ts"

export const fortySixDomainPagesWereAblatedWithNothingLandedInsideAkasha = {
  id: "01a0675c-b781-752e-9651-0c5ca6a3a450",
  pageTypeSlug: "finding",
  slug: "forty-six-domain-pages-were-ablated-with-nothing-landed-inside-akasha",
  domainSlug: "domain/akasha-migration",
  claim:
    "Commit fb018236edaae0e25ee7e1d44b4caaf2bc2bfe0e removed 46 files from `pages/domain` and 44 from `pages/page-type` on the ground that their content was carried into akasha or was obsolete with the markdown system. The commit adds nothing anywhere in the tree. For the 44 `ops-*` domain pages the carried limb is false: none of their definitions or design sentences is inside akasha, so that vocabulary now exists only in git history and in the backup.",
  evidence:
    "Measured 2026-09-03 between 06:44 and 06:56. At 06:45, before the commit, I indexed all 129 `.domain.ts` pages under `akasha/` serially and cross-checked the 94 slugs then in `pages/domain`: one hit, `monarch`. The commit landed at 06:49:21 as `change-mechanical`, so no check judged it, and `git show --name-status fb018236ed` is 90 lines of which every one is a `D`. Afterwards I grepped all of `akasha/` for six distinctive sentences from the deleted files: `Every answer carries what bounded it` from ops-loki, `A namespace holds namespaces as well as commands` and `Every namespace is a domain` from ops-namespace, `how agents do things that need no judgment` from ops-cli, and two more. Zero hits. I seeded the instrument against /var/home/walton/repos/akasha-backup-2026-09-02/pages/domain first and it found ops-namespace there, so the zeros are true negatives rather than a blind instrument. akasha holds 95 `.command.ts` pages and none is named for an ops namespace, so the content did not arrive under another page type either. Recovery is re-deriving each file from git or from the backup rather than restoring blindly, since the ops CLI under `tools/` is live.",
} as const satisfies Finding
