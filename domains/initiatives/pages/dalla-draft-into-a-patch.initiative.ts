import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "domain/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "A body reaches write and edit on the command line rather than in a file.",
      workingMemory:
        "`rebasedOnto` follows a path gone from HEAD to the path a rename left it at, hop by hop, by `git log --diff-filter=D` and `git diff-tree -M`. It answers under the path the rename reached, so `showing` lists and marks from `said.held` rather than the stored file. A path taken away by no rename is carried in as a conflict `markedAway` builds, so `patch resolve` acts on it and every other path still applies. Left: no act takes one path out of a patch, so accepting a deletion drops the whole patch.",
    },
    {
      statement: "Every change command drafts into the patch rather than landing on its own.",
      workingMemory:
        "A patch carries `runsChecks` and `runsWarrants` before the first `diff --git`, each unioned over every change drafted in, and a flag is written only where false, so a line lost reads as true. Move, remove, replace and refactor draft under an agent id and land under none. Left: `retype` alone still lands, its file over the length ceiling until split; and a draft expresses no removal of a path HEAD carries no body for, so `write --remove` answers success and leaves the file.",
    },
    {
      statement: "A seat and its subagents draft against one worktree of their own.",
      workingMemory:
        "Held by the constraint that the worktree waits until drafting works without it. Not begun, and it waits on the intents above.",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "Not so at the 36 `landedMechanically` call sites, which land straight onto the tree; at `page-writing.module.code.ts:140`, which calls `landing()` with a null gate and skips the ask; and at `page-retyping.module.code.ts:512`, whose `Asked` carries no `draft` key though its five siblings do. Only `write`, `edit` and the four change commands draft today.",
    },
    {
      statement: "An applied patch runs the checks and the warrants its changes call for.",
      workingMemory:
        "`owedIn` has two production callers, `write` and `edit`, so the read record and the 41 taboo terms guard those two alone. `lint-exception` and `patch` declare `change-authored`, whose data says they owe reads, and never ask. `--break-the-glass` bypasses the warrant at `write` and `edit` and the checks everywhere else: one spelling, two gates.",
    },
    {
      statement: "One command run carries several changes, each judged by its own requirements.",
      workingMemory:
        "`changeKindSlug` is `many: false` on the command page and a landing is one commit, so a per-change kind cannot be said. Four shapes found: a sequence of acts (`food` lands three commits), batch until done (`migration-system`, which buys it by leaving the gate), budget and re-run, and accumulate-then-apply (the patch). `package-phasing` is built and tested and nothing imports it.",
    },
    {
      statement: "A command declares the guards and the capabilities it carries.",
      workingMemory:
        "22 of the 27 properties on `command.page-type.ts` are written by no page, because nothing reads them. `verdict`, `reading` and `irreversible` are typed at `command-declaring.module.code.ts:61` and cannot be reached from a page. Whether a command drafts, takes a dry run, or takes the glass is a literal at each call site, which is why `remove` offers no preview. An opt-out is data on the subject page and nowhere on the command.",
    },
    {
      statement: "No command reaches into another command for a capability.",
      workingMemory:
        "`command-system/commands/refactor` imports `naming`, `repointing`, `manifesting`, `outside` and `renaming` out of `command-system/commands/move`, and calls `move` itself at `refactor.command.code.ts:376`; `move/listing` and `move/renaming` import back out of `refactor`. `move/spreading` imports `trackedUnder` from `remove`'s entry file. `write.command.code.ts` exports 20 names to 17 importers, `glassIn` and `messageIn` among them.",
    },
    {
      statement: "A guard that cannot see what it judges refuses rather than passing.",
      workingMemory:
        "`orphaningIn` answers an empty list where the shadow refuses, so a shadow that will not build disarms the importer check and nothing says so; `mintingOnto` and `earlyIn` hand the change back untouched the same way. The gate itself fails closed. A false negative and a true negative are the same answer.",
    },
    {
      statement: "The record is carried and dropped by the landing rather than by each command.",
      workingMemory:
        "`carryReadings` is called at four hand-written sites, each behind its own `if (landing.code === 0)`, so the rule that passing `carries` obliges carrying the readings is enforced by nothing. `dropReadings` is called by `remove` alone, so `write --remove` and `edit --remove` take a path away and leave the record naming it.",
    },
    {
      statement: "Every mechanical change is an atomic change a refactor command runs.",
      workingMemory:
        "Built: `rename-local-variable`, `rename-export`, `rename-property-signature` addressed as `Type.property`, `rename-path` carrying every importer the index names, and `rename-code-token` composing the first two as the first refactor change. `path-repointing` is lifted out of the move command into `code-system` so no atomic change reaches into a command. Left: nothing loads either page type, since `calling` binds commands by the `command` page type id alone.",
    },
    {
      statement: "The change page types are named change-atomic and change-refactor.",
      workingMemory:
        "`atomic-change` becomes `change-atomic` under `changes/atomic`, and `refactor-change` becomes `change-refactor` under `changes/refactor`. Held until the refactor command is built here: these renames are landed by that command rather than by `akasha refactor rename page-slug`, which is the command it replaces. `rename-path` is the primitive three of the five `refactor rename` namespaces need, and it is landed.",
    },
  ],
  constraints: [
    "A read hands back the body at HEAD rather than the body the patch would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A patch holding conflicts does not apply.",
    "An agent id carries at most one patch.",
    "A patch is a file committed beside its agent's page rather than a page.",
    "A patch and its conflicts are stored in the formats git already reads.",
    "A draft is an authored change.",
    "A patch runs the checks and the warrants that any change drafted into it runs.",
    "A patch applies only where the caller asked for an apply.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "The worktree waits until drafting works without it.",
  ],
} as const satisfies Initiative
