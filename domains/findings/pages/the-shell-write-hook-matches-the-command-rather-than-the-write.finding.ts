import type { Finding } from "../finding.page-type.ts"

export const theShellWriteHookMatchesTheCommandRatherThanTheWrite = {
  id: "01a06418-219d-794a-a10e-14fddb8d73d6",
  pageTypeSlug: "finding",
  slug: "the-shell-write-hook-matches-the-command-rather-than-the-write",
  domainSlug: "workspace-package/hook-system",
  claim:
    "The hook refusing shell writes under `akasha/` matches on the command word rather than on the write itself. `cp` onto a path under `akasha/` is refused, and a `bun -e` script calling `fs.writeFileSync` on that same path is not. An agent seeding a fault therefore edits the tree by a route the gate does not see, which is also a route the restore hook races.",
  evidence:
    "Met 2026-09-02 while seeding faults against the completion picker spine.\n\n`bun -e` with `fs.writeFileSync` was used four times to mutate `completion-card-checkers.module.code.ts`, `completion-generic-checker-progress.module.code.ts`, `completion-item-picker.module.code.ts` and `completion-next-character.module.code.ts`, all under `akasha/`. Every one succeeded with no refusal.\n\nThe next call tried `cp` to put the original body back at `akasha/temper/temper-player-completion/completion-card-checkers/completion-card-checkers.module.code.ts` and was refused by `block-akasha-shell-writes`, which named `cp` and pointed at `akasha write`. So the mutation went in unseen and the tidy-up was stopped, which is the worse way round: the refusal arrived when the tree was dirty rather than when it was clean.\n\nThe restore was then done with the same `bun -e` route and `git diff --stat HEAD` over the package answered empty, so the tree was returned to the commit exactly.\n\nThis bears on `seeding-a-fault-and-watching-it-fire-reports-green-in-this-shared-worktree`. Where a mutation lands by a route the gate does not watch, nothing records that the file moved, and an agent who reads the runner's verdict without printing the mutated line off disk in the same call cannot tell a fault that never landed from one the restore hook removed mid-run. Printing the line off disk immediately before the runner was used here for all seven faults, and each printed line matched the failure the runner then reported.",
} as const satisfies Finding
