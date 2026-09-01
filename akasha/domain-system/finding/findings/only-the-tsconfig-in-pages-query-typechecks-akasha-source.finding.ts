import type { Finding } from "../finding.page-type.ts"

export const onlyTheTsconfigInPagesQueryTypechecksAkashaSource = {
  id: "01a05c95-fe95-7c6f-b21c-b6f4dcba6a14",
  pageTypeSlug: "finding",
  slug: "only-the-tsconfig-in-pages-query-typechecks-akasha-source",
  domainSlug: "domain/akasha-migration",
  claim:
    "`shared/pages-query/tsconfig.json` is the only tsconfig in the tree naming an akasha source file, and no akasha package carries one of its own. Deleting it drops 226 files out of the whole-tree `tsc -b`, 31 of them under `akasha/`. The file the migration wants to empty is what typechecks the folder the migration is filling.",
  evidence:
    "228 tracked tsconfigs parse clean. None carries a non-empty `files[]`, so every hand-listed path in the repository stands in an `include[]`. `shared/pages-query/tsconfig.json` includes lines 17 to 235: one glob at line 18 and 216 literal `../../` paths at lines 19 to 234, every one of which exists. 31 reach into `akasha/`, being editor-extension 1, pages-system 21 and seat-system 9. `find akasha -name 'tsconfig*.json'` answers nothing against 75 package.json files there.\n\nThe counts in circulation are wrong. This file names 216 rather than 88 and the span is 19 to 234 rather than 52 to 234. `shared/status-bar-access` names 26 rather than 12. `infra/scripts` at 7 is right. Four more tsconfigs escape their own folder, all under `temper/` and all reaching `temper/addons`. The union of the three page-engine lists is 226 distinct files.\n\nThe root tsconfig is a solution file with `files: []` and 40 references whose closure is 73 of the 228. `shared/pages-query` sits in it twice, at root line 7 and at `shared/status-bar-access` line 56.\n\nThe router itself still cannot move. `imports-inside` refuses any relative specifier landing outside `akasha/`, and the closure of `shared/pages-query/src` over relative imports is 214 files and 694,238 bytes under `tools/`, `page/`, `repo/`, `readouts/` and `agent/`. `roots.ts` losing its depth arithmetic unblocked the engine's own move rather than the router's.",
} as const satisfies Finding
