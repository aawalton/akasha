import type { Finding } from "../finding.page-type.ts"

export const noCheckJudgesARelationOutsideAkasha = {
  id: "01a05fde-aa74-7aa7-b3d6-fae72fa9343c",
  pageTypeSlug: "finding",
  slug: "no-check-judges-a-relation-outside-akasha",
  domainSlug: "workspace-package/checks",
  claim:
    "Whether a relation outside `akasha/` names a page that exists is judged by nothing. `relation-resolves` is live and clean, but every check is handed a change narrowed to `akasha/` before it runs, and the one checker that ever read `pages/` is reached by nothing and its runner is gone. Deleting the markdown `error` page type left 15 pages under `pages/` naming `page-type/error`, and no phase said so.",
  evidence:
    "`akasha/checks/modules/checking/checking.module.code.ts:162,166` hands every check `insideOf(given)`, which at `akasha/checks/modules/change-walking/change-walking.module.code.ts:119-122` keeps only paths opening with the `INSIDE` of line 44, `akasha/`. `relation-resolves` narrows again at `akasha/checks/code-checks/pages/relation-resolves/relation-resolves.code-check.code.ts:25`. Probed at ce1c045a67: `akasha audit --check relation-resolves` judged 16210 files and refused none, and the whole audit ran 40 checks over 15019 files for 62 refusals, not one of them a relation. So akasha itself is covered and clean. Outside it, `tools/audits/relations-resolve.ts` and `tools/gates/relations-resolve.ts` are named by nothing but each other and one finding, `tools/gates/` holds that one file alone, and the runner `tools/run-checks.ts` they were reached through no longer exists. Commit 87d95e82f6 took away `pages/page-type/error.page-type.md`; 15 markdown pages went on naming `page-type/error` afterward, 13 page property definitions and 2 package pages, and every one of them landed and stayed unrefused. They were taken away at 8eb7634ca4 once `rg` found no slug of theirs and no id of theirs named anywhere else in the repo.",
} as const satisfies Finding
