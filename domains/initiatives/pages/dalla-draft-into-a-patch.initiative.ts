import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "page-type/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "A body reaches write and edit on the command line rather than in a file.",
      workingMemory:
        "`rebasedOnto` follows a path gone from HEAD to the path a rename left it at, hop by hop, by `git log --diff-filter=D` and `git diff-tree -M`. It answers under the path the rename reached, so `showing` lists and marks from `said.held` rather than the stored file. A path taken away by no rename is carried in as a conflict `markedAway` builds, so `patch resolve` acts on it and every other path still applies. `patch drop --file-path` takes one path out and leaves the patch carrying the rest, and takes the patch away where that path was the last.",
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
        "Not so at the `landedMechanically` call sites, 21 outside tests when last counted, which land straight onto the tree; at `page-writing.module.code.ts:140`, which calls `landing()` with a null gate and skips the ask; and at `page-retyping.module.code.ts:512`, whose `Asked` carries no `draft` key though its five siblings do. Only `write`, `edit` and the four change commands draft today.",
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
        "`carryLanded` in `landing-reading` is the one carry site, gated on the change kind's `readersOweReading` and handed the rename pairs at `asked.readings`, so the landing binds the carry. The drop is still each command's. `dropReadings` is called from `remove` twice and from four sweeps, and from neither `write` nor `edit`, so `write --remove` and `edit --remove` take a path away and leave the record naming it.",
    },
    {
      statement: "Every mechanical change is a change page a refactor command runs.",
      workingMemory:
        "The three tiers are one, every change sitting under `changes/pages` and taking a `World`. `page-renaming` reads the edits `rename-page` answers into the paths that moved and the bodies written, so `akasha refactor rename page-slug` runs the live change and takes no dry run. Left: `rename-page-type-slug` and `rename-page-type`. `retype` is the last act of that command still landing through the code a change page replaces.",
    },
    {
      statement: "Every change page is a change-partial or a change-command.",
      workingMemory:
        "`change-partial` narrows `isCommand` and `runsChecks` to false and `change-command` narrows both to true, so the four invariants leave no third shape. A command dispatches to the partials for a page, a page type and a page property, so no second command is needed. One slug sits under both types, which `slug` allows by being unique per page type. `atomic-change` and `refactor-change` are gone, page types and pages and the duplicate trees both held. Left: every live partial is typed `change` rather than `change-partial`, so `change-partial` is a page type naming no page.",
    },
    {
      statement: "Removing a page, a page type and a page property are three peer changes.",
      workingMemory:
        "Each composes `remove-file` and `remove-property-value` rather than calling a sibling, so each asserts its own precondition. A sibling call would bar that precondition. Guards are scoped to the change rather than branched inside one change. A guard inert on most calls breaks without notice. `remove-page` refuses a page type outright and names `remove-page-type`, which refuses every other page and names `remove-page`. Left: removing a page property.",
    },
    {
      statement: "A page type is not removed while the value index still holds pages of that type.",
      workingMemory:
        "`remove-page-type` reads that population off `everyOfType` and refuses naming the pages, because `pageTypeSlug` files no relation edge: `reaching.module.code.ts:28` holds that key in FILED_AS_IDENTITY, so `namersOf` never answers pages of a type. The import guard caught this before, through the `satisfies` import every page of a type carries, and that import is a convention rather than a rule. The fixture had `page-type` extending `page` where the tree has `page-type` extending `domain`, so no fixture filed a `part-slugs` edge onto a page type until that was mended.",
    },
    {
      statement: "A change is reached by its address rather than by an import.",
      workingMemory:
        "`change-running` loads a change by address and runs the guards its page names, so no call reaches a change unguarded. Its `addressed` sidecar maps each address to `Parameters<typeof import(path)['runChange']>[1]`, so the map reads each signature rather than restating one. Augmentation is barred: the formatter rewrites every `interface` into a type alias, so the map is a plain exported alias read by `import type`. `address-mapping` writes it inside `preparing`, in the patch the gate judges. Every change page is mapped, each by exporting `runChange(World, given)`; a wrong argument shape refuses at `TS2353`. Left: a change still reaches another change by import rather than through the runner.",
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
    "A mechanical change is landed by a change page rather than by the command that page replaces.",
    "A change page takes no dry run.",
    "The patch a draft keeps is the dry run.",
  ],
} as const satisfies Initiative
