import type { Finding } from "../finding.page-type.ts"

export const unhookingAWriterAndDeletingWhatItWroteCannotBeOneCommit = {
  id: "01a062a5-6401-737a-b940-64aaeaf86463",
  pageTypeSlug: "finding",
  slug: "unhooking-a-writer-and-deleting-what-it-wrote-cannot-be-one-commit",
  domainSlug: "domain/temper",
  claim:
    "Where a tracked path outside `akasha/` goes and a body elsewhere has to stop naming it, the two cannot land as one change. `akasha edit` takes a substitution anywhere in the repository but removes only under `akasha/`; `akasha remove` reaches outside and carries no substitution. Every ablation of a temper package whose writer lives in `tools/` meets this.",
  evidence:
    "`akasha edit --help` reads `--remove takes a path under `akasha/` alone — say `akasha remove` for one outside it`, and `akasha remove --help` offers `--file-path`, `--message`, `--break-the-glass` and `--dry-run` with no way to state a passage. So for `temper/game-items-addon` the unhook landed at `3d501da2dc` and the ablation at `c7d9fa364f`.\n\nThe order matters and only one of the two is sound throughout. Unhook first and the middle commit holds a folder nothing writes to, which harms nothing. Ablate first and the middle commit holds `assertOutputDirParentsExist` throwing on a row whose folder is gone, which is the whole generator down for whoever pulls between them. Nothing in either command says this, and the reasoning is left to the seat.\n\nThis is the case `a-removal-landed-three-commits-before-the-lists-that-named-it` closes by saying `Both akasha remove and akasha edit take several paths and land them as one commit, so nothing forced the split — it was mine.` That holds where every path is under `akasha/`. It does not hold here, and the migration out of `temper/` is where it stops holding: the thing going is outside `akasha/` and the body naming it is a build tool, so the split is forced rather than chosen.\n\nWhat would close it is either `--remove` on `akasha edit` reaching outside `akasha/` on the same terms its `--file-path` already does, or `akasha remove` taking `--old-file`/`--new-file` triples. Both commands already judge nothing outside `akasha/`, so neither widening changes what is checked.",
} as const satisfies Finding
