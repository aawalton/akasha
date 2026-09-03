import type { Initiative } from "../initiative.page-type.ts"

export const akashaMigration = {
  id: "01a05324-954d-752a-82d1-e049ecc0f807",
  pageTypeSlug: "initiative",
  slug: "akasha-migration",
  domainSlug: "domain/akasha-migration",
  personaSlug: "akasha",
  intents: [
    {
      statement: "All files in the akasha repo are in the akasha subfolder.",
      workingMemory:
        "Now 5,059 outside akasha against 133,571 inside, from 69,894 and 32,904 at dispatch. MEASURED: `akasha read` records a read only where stdout and stderr reach the same file, so `> f 2>&1` records while a bare `>`, a pipe and /dev/null exit 1 and record nothing. The read record is contended; one contrary reading is not evidence. NEVER run `akasha service install`: its plan removes 37 units, 20 of them live, among them the seat system and Alan's tracking.",
    },
    {
      statement: "Alan's own records are akasha pages.",
      workingMemory:
        "Roughly 9,300 files: persona-day 2,079 against the live persona system, the library family near 2,600, location 1,210, exercise 884, relationship 697, food-entry 333, the car hierarchy 644, monarch and money near 700. Accuracy matters more than speed here and some of it is live data the running system reads.",
    },
    {
      statement: "The code outside akasha is akasha modules.",
      workingMemory:
        "tools 1,649, dirty 1,506, infra 716, lua-compiler 288, editor-extension 84. Shape: module page, code beside, test. MEASURED, correcting this: an import out of akasha is refused ONLY where a manifest names that specifier; `exports` of `./*` files literally as `@pkg/*`, matching nothing, so `@tools/lib` rides a blind spot 22 files lean on while an enumerated manifest is refused. Move leaves-first. `akasha move` carries no file in: `akasha write` plus `akasha remove`, nothing repoints readers.",
    },
    {
      statement: "Nothing outside akasha duplicates what is already inside it.",
      workingMemory:
        "MATCH ON SLUG AND FIELDS; report the id, never key on it. Never re-mint an id before counting what points at it. DISTINCTNESS has three arms, none implying another; body-only must strip id, slug AND the export name, since a re-filed page carries a new export name, so a two-line strip is blind. An arm is proven only when a seeded pair collapses under it. `migration-reach` cannot judge code; only `--told` reaches code. 10,469 sidecars hold 126,962 rows with no home; a folder sweep destroys them.",
    },
  ],
  constraints: [
    "Nothing is out of reach and everything may break while the migration runs. Completing the migration is the sole priority, not keeping systems outside akasha stable while it proceeds.",
    "The new akasha system merges code, data and text into a single integrated whole. This repo is both the working development copy and the master copy of the database.",
    "Only your swarm changes this repo during the migration. The `alan` handler also runs, writing daily tracking changes alone.",
    "Do not stop. If you are unsure what to do in a specific case, file a finding, make a decision, and then keep going. Do not stop to ask Alan for guidance.",
    "If a write is refused naming a read you already did, the file changed since you read it, which with a swarm running is ordinary. Re-read what the refusal names and carry on.",
    "Fix small issues inline rather than filing them as findings or asking for approval.",
    "All Alan approvals are released for this migration. When you land a change an Alan Approves directive covers, land it directly and file a finding to review it with Alan later.",
    "Do not work on the initiative directly. Delegate and coordinate work through subagents.",
    "Make massively parallel progress. Aim to have at least 20 concurrent direct subagents whenever you can use them to do productive work. Maximum 40 concurrent direct subagents.",
    "A subagent inherits none of your reads or constraints. Have every subagent open by reading its own subagent page, which hands it this initiative and these constraints.",
    "Git here handles a hundred concurrent agents and twenty commits a second. Do not throttle the swarm to protect it, and batch commits within a migration.",
    "The akasha commands handle concurrent edits automatically. Do not throttle the swarm to avoid having parallel agents that might touch the same files.",
    "Add intent to the initiative to keep track of what is in flight. Remove intent from the initiative when it is done.",
    "Only agent-authored changes go through gates. Mechanical changes land without them. Run `akasha audit` after larger sets of mechanical changes to catch issues, but not after every change.",
    "A custom migration lands its changes with `landedMechanically` from `@akasha/command-system/asking`, never through edit or write, which run warrants and stall on a read per file.",
    "Commits stay local for this migration. Do not push to the remote.",
    "The old markdown pages system is being entirely removed, so all readers and writers must use the new TypeScript pages system.",
    "Code that runs off-workstation must access pages data through the pages-system-service, NEVER by reading the checkout copy directly.",
    "Code that runs on-workstation must access pages data directly through the appropriate functions, NEVER by calling the pages-system-service.",
    "Do not simply copy files into the akasha folder. The new system has a different structure, so files need to be adapted for the new structure.",
    "Create new page types, page properties, and page property types as needed to accomplish the work, parallel to existing patterns in the new system when possible.",
    "There is a full backup reference copy at `/var/home/walton/repos/akasha-backup-2026-09-02`, so do not hesitate to ablate migrated or obsoleted files from the repo. Do not edit the backup copy.",
    "Remove files outside the akasha folder whose content has migrated into the folder, on a positive match per file rather than on the folder having been migrated.",
    "Moving the akasha subfolder to the repo root is the last step. Execute it when everything else is done rather than halting for Alan.",
    "Do not change this list of constraints.",
    "Keep a reminder to remind you of the initiative objective and these constraints every 15 minutes to avoid getting stuck.",
  ],
} as const satisfies Initiative
