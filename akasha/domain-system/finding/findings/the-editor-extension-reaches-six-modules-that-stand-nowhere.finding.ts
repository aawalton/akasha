import type { Finding } from "../finding.page-type.ts"

export const theEditorExtensionReachesSixModulesThatStandNowhere = {
  id: "01a05c99-a656-7da9-a211-987ddd7d1d4a",
  pageTypeSlug: "finding",
  slug: "the-editor-extension-reaches-six-modules-that-stand-nowhere",
  domainSlug: "domain/editor-extension",
  claim:
    "`editor-extension/src/features/status-bar/activate.ts` reaches six modules by relative path that no file in the tree stands at, and one of them is the `day` package. Nothing catches it: `editor-extension` is a workspace but the root `tsconfig.json` names no reference to it, so the whole-tree build never reads the folder and these reaches have stood broken since `day` moved under `shared/`. The extension either does not build or builds from a root this repository does not hold.",
  evidence:
    "Found while sweeping for dangling reaches after `shared/day` and `shared/recurrence` were deleted. Measured by resolving every import specifier in the tree to a filesystem path and asking which resolve to nothing.\n\nAll six escaping specifiers in that one file resolve four levels up, which is the repository root, and none of the six targets exists there: `../../../../day/day.ts`, `../../../../during-call/during-call.ts`, `../../../../readouts/ask-here.ts`, `../../../../readouts/daily-stoplights.ts`, `../../../../readouts/inbox-stoplights.ts`, `../../../../readouts/upkeep-stoplights.ts`. The repository holds no `day/`, no `during-call/` and no `readouts/` folder at its root.\n\nThe first of the six was dangling before this lane touched anything, proven by reading the file at the commit before this lane's first: it spelled `../../../../day/day.ts` there too, while the day package stood at `shared/day/day.ts`, which that path does not reach. So the deletion of `shared/day` did not break this and repointing it would not have fixed it.\n\nOne other file in the tree carried the same stale path: `infra/cluster-checks/src/checks/check-timezone-handling.ts` allowlisted `day/day.ts` by repository-relative path, a path no file has ever answered to since day moved under `shared/`. That entry is dropped at `65f9fea487`.\n\nThe call taken in Alan's absence: leave the extension alone. Fixing one of six dead reaches would be half a job, and what the other five want was never a package this lane moved.",
} as const satisfies Finding
