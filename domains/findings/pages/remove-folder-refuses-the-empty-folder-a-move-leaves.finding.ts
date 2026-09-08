import type { Finding } from "../finding.page-type.ts"

export const removeFolderRefusesTheEmptyFolderAMoveLeaves = {
  id: "01a08294-42c2-789d-93e5-b3d5f038aeb9",
  pageTypeSlug: "finding",
  slug: "remove-folder-refuses-the-empty-folder-a-move-leaves",
  domainSlug: "workspace-package/change",
  claim:
    "`remove-folder` takes a folder away by taking every file under it away, so it refuses the one folder nothing else can reach: the folder that already holds no file. A move empties the folders it carries files out of, and `clearedOff` sweeps a folder only where that same landing emptied it, because the climb starts at the folder each path that went was in. A folder emptied by an earlier landing is the start of no climb and the target of no act, so it stays in the working tree with nothing able to remove it.",
  evidence:
    "Measured 2026-09-08. `personas` was carried out of `persona-system` on 2026-09-06 by commit 113fba4023. `git ls-files persona-system` counts 0 and `find persona-system -type d` counts 42: the root, `personas/`, and 40 empty slug folders.\n\n`akasha change-draft remove-folder` handed `at: persona-system` refuses with `persona-system holds no file, so nothing is taken away`. The refusal is stated as an invariant on `remove-folder.change-mechanical-folder.ts`: `A folder with no file is refused.` The code answers `world.under(at)`, and an empty folder answers an empty list.\n\n`emptiedBy` in `folder-clearing.module.code.ts` climbs from `dirname(path)` for each path that went, so a landing that moves nothing out of a folder never names that folder. The module page states the same thing as a departure: `The climb starts at the folder each path that went was in.`\n\nGit tracks no directory, so `git status` shows nothing, and `akasha audit --check folder-matches-a-shape --file-path persona-system` refuses with `persona-system is no file this repository holds, and no folder holding one`. The shell hook refuses `rmdir` inside the checkout as it refuses every write.\n\nThis observation was filed once before, as `no-route-through-the-gate-removes-an-empty-directory`, and taken away as done on 2026-09-08 by commit 2aaffa650b on the reasoning that `remove-folder` had since been built and was that route. That reasoning read the act's name rather than running it.",
} as const satisfies Finding
