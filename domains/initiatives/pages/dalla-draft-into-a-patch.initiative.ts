import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "page-type/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "Every command that changes a file drafts rather than landing on its own.",
      workingMemory:
        "84 command pages declare a change kind; 5 draft: `change`, `replace`, `apply`, `patch`, `lint-exception`. The rest declare `change-mechanical` and land through `landedMechanically`. `replace` drafts under an agent id and lands under none. The store is the git ref `refs/akasha/edits`. `preambleOf` writes `runsChecks`, `writerOwesReading` and `readersOweReading` before the first `diff --git`, only where false, so a line lost reads as true; `runsWarrants` is read and never written.",
    },
    {
      statement: "A seat and its subagents draft against one worktree of their own.",
      workingMemory:
        "Held by the constraint that the worktree waits until drafting works without it. Not begun, and it waits on the intents above.",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "Not so at the `landedMechanically` call sites, which land straight onto the tree, nor at `page-writing.module.code.ts:147`, which calls `landing()` with a null gate and skips the ask. `page-retyping` went with `refactor`. `replace` and the change commands are what drafts today, so porting those mechanical call sites onto one batched call is the work left.",
    },
    {
      statement: "An applied patch runs the checks and the warrants its changes call for.",
      workingMemory:
        "`unwarrantedIn` lives in `warrant-owing` and is called by `replace` and by the apply, which warrants every row whose writer owes reading before the edits fold. A row saying nothing of its writer is warranted, so a flag lost reads as owing. `--break-the-glass` passes the checks and passes no warrant. Left: `lint-exception` and `patch` declare `change-authored`, whose data says they owe reads, and never ask.",
    },
    {
      statement: "One command run carries several changes, each judged by its own requirements.",
      workingMemory:
        "`changeKindSlug` is `many: false` on the command page and a landing is one commit, so a per-change kind cannot be said. Four shapes found: a sequence of acts (`food` lands three commits), batch until done (`migration-system`, which buys it by leaving the gate), budget and re-run, and accumulate-then-apply (the patch).",
    },
    {
      statement: "A command declares the guards and the capabilities it carries.",
      workingMemory:
        "22 of the 27 properties on `command.page-type.ts` are written by no page, because nothing reads them. `verdict`, `reading` and `irreversible` are typed at `command-declaring.module.code.ts:61` and cannot be reached from a page. Whether a command drafts, takes a dry run, or takes the glass is a literal at each call site rather than read off the command's page. An opt-out is data on the subject page and nowhere on the command.",
    },
    {
      statement: "A guard that cannot see what it judges refuses rather than passing.",
      workingMemory:
        "`orphaningIn` answers an empty list where the shadow refuses, so a shadow that will not build disarms the importer check and nothing says so; `mintingOnto` and `earlyIn` hand the change back untouched the same way. The gate itself fails closed. A false negative and a true negative are the same answer.",
    },
    {
      statement: "The record is carried and dropped by the landing rather than by each command.",
      workingMemory:
        "`carryLanded` in `landing-reading` is the one carry site, gated on the change kind's `readersOweReading` and handed the rename pairs at `asked.readings`, so the landing binds the carry. The drop is not the landing's yet: `dropReadings` is called from `reading`, `landing-reading`, `subagent-sweep`, `seat-stopping`, `subagent-presence` and `log-day-sweeping` rather than from one place.",
    },
    {
      statement: "Every mechanical change is a change page rather than code a command holds.",
      workingMemory:
        "The three tiers are one, every change sitting under `changes/pages` and taking a `World`. The `refactor` command that ran them is deleted, so a mechanical change is reached by its address through `change-running` or from the `akasha change` command line. `rename-page-address` and `rename-page-slug` are mechanical pages and `rename-page` is a checked one. Left: renaming a page type and its slug.",
    },
    {
      statement: "Every change page is mechanical, checked or authored.",
      workingMemory:
        "The four page types `akasha change` dispatches over are named at `change.command.code.ts:72`, so the page type carries whether a change is reached from the command line. A mechanical change is a building block a checked change composes, and no command line reaches one. `slug` is unique per page type, so `add-file` and `change-file` each name a mechanical page and an authored page. Left: `change-command` names no page and is still dispatched over.",
    },
    {
      statement: "Removing a page, a page type and a page property are three peer changes.",
      workingMemory:
        "Each composes `remove-file` and `remove-property-value` rather than calling a sibling, so each asserts its own precondition. A sibling call would bar that precondition. Guards are scoped to the change rather than branched inside one change. A guard inert on most calls breaks without notice. `remove-page` refuses a page type outright and names `remove-page-type`, which refuses every other page and names `remove-page`. Left: removing a page property.",
    },
    {
      statement: "A page type is not removed while the value index still holds pages of that type.",
      workingMemory:
        "`remove-page-type` reads that population off `everyOfType` and refuses naming the pages, because `pageTypeSlug` files no relation edge: `reaching.module.code.ts:28` holds that key in FILED_AS_IDENTITY, so `namersOf` never answers pages of a type. The import guard caught this before, through the `satisfies` import every page of a type carries, and that import is a convention rather than a rule.",
    },
    {
      statement: "A change is reached by its address rather than by an import.",
      workingMemory:
        "`change-running` loads a change by address and runs the guards its page names, so no call reaches one unguarded. Its `addressed` sidecar maps each address to `Parameters<typeof import(path)['runChange']>[1]`, reading each signature rather than restating one, and `address-mapping` writes it inside `preparing` where the gate judges it. The map reaches `change-mechanical` alone, so any other address refuses at compile time. Left: a change still reaches another change by import.",
    },
    {
      statement: "The patch a landing works out is held by no page property.",
      workingMemory:
        "`agent.page-type.ts` declares `file-property/patch` and `file-property/edits`, defaulting to `diff` and `jsonl`, and `patch-keeping` still defines itself as a file beside the page across its definition and all 8 invariants. Both stores already moved to `refs/akasha/patch`, `refs/akasha/edits` and `refs/akasha/edits-handed`, so each property names a file that is no longer the store. Five `.patch.diff` files remain tracked beside pages, 412 KB, last written 2026-09-06.",
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
