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
        "At dispatch 69,894 files outside akasha against 32,904 inside; now 61,906 outside and 36,914 inside. The 261 `pages/` folders group into 18 families sharing no page type, mapped in ten findings. 17,041 files are already accreted, all under `pages/`. RUN `akasha audit` IN ONE AGENT ONLY: many at once exhausted memory and killed the session at 22:00. Checks are scoped to the paths a landing names, so a break elsewhere does not block you.",
    },
    {
      statement: "The story chapters are akasha pages.",
      workingMemory:
        "19,080 files: story-chapter-royal-road 18,091 and story-chapter-wandering-inn 832, the read and written records the rest. The beside-file grammar now carries partN and uncommitted sidecars (77721a3a40), so this is unblocked. story-chapter-played means a chapter of a story nobody wrote, the wrong invariant for a real serial or for Alan's own fiction, so the types needed are siblings of it. Number parts contiguously from part1; a gap is refused at write time.",
    },
    {
      statement: "The game content is akasha pages.",
      workingMemory:
        "21,300 files and the largest single assignment: skill 8,972, class 8,380, spell 3,597, then item, condition, enchantment, title, quest and the smaller kinds. One shared shape to be found first, page types built once, then the mass through landedMechanically. Distinct from the temper family despite the overlapping vocabulary.",
    },
    {
      statement: "Alan's own records are akasha pages.",
      workingMemory:
        "Roughly 9,300 files: persona-day 2,079 against the live persona system, the library family near 2,600, location 1,210, exercise 884, relationship 697, food-entry 333, the car hierarchy 644, monarch and money near 700. Accuracy matters more than speed here and some of it is live data the running system reads.",
    },
    {
      statement: "The code outside akasha is akasha modules.",
      workingMemory:
        "tools 1,649, dirty 1,506, infra 716, lua-compiler 288, editor-extension 84, and the smaller service and deploy directories. Target shape is module page plus code beside plus test, and workspace packages whose manifest names every way in. Load-bearing: the supervisor, the second commit path, and whatever is actively writing code-editor-* pages tonight.",
    },
    {
      statement: "Nothing outside akasha duplicates what is already inside it.",
      workingMemory:
        "MATCH ON SLUG AND FIELDS, NEVER ON ID. No migration has carried a page id across: temper-skill matches 1,636 of 1,636 on slug and 0 of 1,636 on id, so an id-keyed check clears nothing while looking like a correct negative. 10,469 sidecars beside already-migrated stubs hold 126,962 reference rows with no home in akasha, so a folder-level sweep destroys them. The shared tools are at akasha/migration-system/, reached by `akasha migration-reach`.",
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
