import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aFolderMoveLeavesTheRunPathAServicePageSpellsPointingAtNothing = {
  id: "01a08ddd-412d-7421-80d6-0a7adc38c497",
  type: "finding",
  slug: "a-folder-move-leaves-the-run-path-a-service-page-spells-pointing-at-nothing",
  domain: "domain/service",
  claim:
    "A folder move repoints the specifiers bodies import and leaves the paths a workstation service page spells under `runs` pointing at nothing.",
  evidence:
    "`straysIn` in `services/workstation-services/run-path-reading/run-path-reading.module.code.ts` is imported by exactly one file, its own test. That test's cases each build fixtures in a temp directory, and none walks the workstation service pages. So no check, command or service reads the run paths on the real pages, and a folder move leaving one pointing at nothing is caught by nothing. Over the 28 pages in `services/workstation-services/pages`, 25 repo-relative run paths resolve and none is missing — the 43 this finding first recorded were repointed by hand. The claim holds: what let them happen is unmended.",
} as const satisfies Finding
