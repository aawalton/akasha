import type { Initiative } from "../initiative.page-type.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  slug: "dalla-draft-into-a-patch",
  domainSlug: "page-type/change",
  personaSlug: "dalla",
  intents: [
    {
      statement: "The wide Edit type no longer exists.",
      workingMemory:
        "`file-arguing.builtIn` reads argv into `{ changes: FileEdit[], message }`, the one place an edit is composed outside the landing. Two near-identical `askedFor` twins decode those bytes back to strings and name a change, in `mechanical-filing` and `tracking-landing`, differing in the write address. `builtIn` answering `Asking[]` takes both with it. `subagent-presence` is the only other reach in. A decoy in `pages/shadow` sorts first in a search.",
    },
    {
      statement: "A file that is not text is refused rather than decoded into an edit.",
      workingMemory:
        "Two functions named `textIn` differ: `change-running:70` throws `NOT_TEXT` where `decodeUtf8` answers null, and `mechanical-change-running:39` answers null instead. The `askedFor` twins refuse with `notUtf8` before either is reached. `holdsBytes` is true on the two wallpaper file properties and nowhere else, and `no-raw-nul-bytes` and `change-taboo-terms` both read it. A file declaring bytes is carried rather than decoded.",
    },
    {
      statement: "A helper two changes share lives in a module rather than in one of the changes.",
      workingMemory:
        "`literal-splicing` landed at `30c27d5f31` and took four reaches away. Six remain, in five landings: package naming from `rename-package`, JSON manifest arithmetic from `remove-manifest-ways`, `specifierFor` which wants `code-system/code-specifier` rather than a module of its own, `splicedIn` which belongs in `change-answer`, and `requiredIn`, which reads the checker and is its own concern. Scan for them across lines: a single-line scan misses the reach `remove-package-alias` makes.\n",
    },
    {
      statement: "An applied patch runs the checks and the warrants its changes call for.",
      workingMemory:
        "`apply-running:25` declares the apply's run as `{ checks: true, writerOwesReading: false, readersOweReading: true }`, and `applying:252` runs `warrantedAgain` only where `writerOwesReading` is true, so an apply runs the checks and no warrant. The warrant runs earlier, at `asking:255` and `file-arguing:276`, both reaching `unwarrantedIn` in `warrant-owing`. What is left is for the apply to warrant what its own changes call for.",
    },
    {
      statement:
        "All changes outside of `akasha change` are mechanical changes made through `runChange`.",
      workingMemory:
        "`landedMechanically` is its own module at `command-system/mechanical-landing`, whose one caller is `subagent-presence:109`; deleting it drops the folder, the export entry and the part slug. Its caller's test file is the block, at 8.1s against a 5s ceiling, and dividing that file is dead. A landing costs 0.033s under `bun run` and 0.40s inside `bun test`: a 12x amplification that is neither the env copy, the namespace nor the overlay mount. 26 processes a landing, 22 git, 8 redundant.\n",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "`landedMechanically` lands straight onto the tree at its one remaining call site, `subagent-presence`. Every other program reaches `applied` through `runMechanicalChange`, and `change-apply` reaches `applying` through `apply-running`. Those two entries into `applying.module.code.ts` are the one path that works a patch out and applies it. The patch stays inside the landing rather than being kept.",
    },
    {
      statement: "Only `akasha change` drafts changes.",
      workingMemory:
        "`change-draft`, `change-apply` and `change-drop` are the acts, and `change-apply` works on a patch rather than making one. Every other command declares `change-mechanical` and lands through `runMechanicalChange`, which is right. `landedMechanically` takes an `agentId` that drafts rather than lands, and no caller hands one.",
    },
    {
      statement: "A draft survives between commands in the store an agent's page declares.",
      workingMemory:
        "`drafting` writes and commits `<agent page>.patch.diff`, which no page declares, and `patchIn` reads it back in a later process, so a draft crosses between commands through it. The declared `edits` file is `uncommitted: true`. The successor exists: `edits-keeping`, `edits-landing`, and `subagent-handed:37` finds handed work through `editsAt(page)`. Two readers of the patch remain, both in the frozen presence file: `patchesUnder:205` spells the name by hand, and `:170` calls `tookIn`.",
    },
    {
      statement: "A file that is not text is moved by path and refused every other change.",
      workingMemory:
        "Half of this landed at `b9c32ad613`: a move no other edit names is handed on as a carried path, both paths left out of the bodies, so nothing decodes and git records a rename. Twelve PNG bytes in, twelve out. What is left is the refusal. `textAt` at `edits-keeping:92` reads `utf8`, which never fails, so the `NOT_TEXT` sentinel is dead and two invariants contradict each other. `World` must tell no body from a body that is not text before `page-claiming:12` can keep the wallpapers claimed.\n",
    },
  ],
  constraints: [
    "A read hands back the body at HEAD rather than the body the patch would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A patch holding conflicts does not apply.",
    "An agent id carries at most one patch.",
    "The edits an agent keeps are an uncommitted file appended to in place.",
    "A draft is an authored change.",
    "A patch runs the checks and the warrants that any change drafted into it runs.",
    "Alan settles each block's shape before it lands.",
    "A mechanical change is landed by a change page rather than by the command that page replaces.",
    "A change page takes no dry run.",
    "The edits a draft keeps are the dry run.",
    "An intent reaching `subagent-presence` waits: its test file costs more than a test file may, so every change carrying it is refused.",
  ],
} as const satisfies Initiative
