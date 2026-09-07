import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "page-type/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "Only `akasha change` drafts changes.",
      workingMemory:
        "`replace` drafts under an agent id and lands under none, so it drafts where it should land at once. `apply`, `patch` and `lint-exception` work on a patch rather than making one. Every other command declares `change-mechanical` and lands through `landedMechanically`, which is right. The edits `akasha change` keeps are the git ref `refs/akasha/edits`, and `landedMechanically` carries an unused `agentId` that would turn drafting on.",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "`landedMechanically` lands straight onto the tree at every call site. `page-writing.module.code.ts:147` calls `landing()` with a null gate and skips the ask. `harness-landing` writes the tree with `writeFileSync` and `renameSync`, never reaching `landing`. `applying.module.code.ts` is the one path that works a patch out and applies it, and both `akasha apply` and `akasha change --apply` reach it. The patch stays inside the landing rather than being kept.",
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
      statement: "A change is reached by its address rather than by an import.",
      workingMemory:
        "`change-running` loads a change by address and runs the guards its page names, so no call reaches one unguarded. Its `addressed` sidecar maps each address to `Parameters<typeof import(path)['runChange']>[1]`, reading each signature rather than restating one, and `address-mapping` writes it inside `preparing` where the gate judges it. The map reaches `change-mechanical` alone, so any other address refuses at compile time. Left: a change still reaches another change by import.",
    },
    {
      statement: "The patch a landing works out is held by no page property.",
      workingMemory:
        "`agent.page-type.ts` declares `file-property/patch` and `file-property/edits`, defaulting to `diff` and `jsonl`, and `patch-keeping` still defines itself as a file beside the page across its definition and all 8 invariants. Both stores already moved to `refs/akasha/patch`, `refs/akasha/edits` and `refs/akasha/edits-handed`, so each property names a file that is no longer the store. Five `.patch.diff` files remain tracked beside pages, 412 KB, last written 2026-09-06.",
    },
    {
      statement:
        "All changes outside of `akasha change` are mechanical changes made through `runChange`.",
      workingMemory:
        "`harness-landing` writes the tree with raw `writeFileSync`, `renameSync` and `rmSync`, reaching neither `landing` nor a change. `page-writing` lands with a null gate. Every `landedMechanically` call site composes its own `FileEdit`. `replace` builds its own `FileEdit` and imports nothing from `changes/`, so it is `change-file`'s act written twice. The `addressed` sidecar types every address as `Parameters<typeof import(path)['runChange']>[1]` and holds 25, all `change-mechanical-*`.",
    },
  ],
  constraints: [
    "A read hands back the body at HEAD rather than the body the patch would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A patch holding conflicts does not apply.",
    "An agent id carries at most one patch.",
    "A patch and its conflicts are stored in the formats git already reads.",
    "A draft is an authored change.",
    "A patch runs the checks and the warrants that any change drafted into it runs.",
    "A patch applies only where the caller asked for an apply.",
    "A subagent drafts by default rather than applying.",
    "Alan settles each block's shape before it lands.",
    "A mechanical change is landed by a change page rather than by the command that page replaces.",
    "A change page takes no dry run.",
    "The patch a draft keeps is the dry run.",
  ],
} as const satisfies Initiative
