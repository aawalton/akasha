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
        "102,798 files tracked: 32,905 in akasha, 69,893 outside. 64,226 of those outside are `pages/`, content to adapt across 261 folders, whose page types and properties mostly do not exist yet; the bulk migrates programmatically once they do. Alan puts 10,000-20,000 of the outside files as already accreted and never ablated, so sweeping those is the cheapest first mass. 11 tracked files sit at the repo root, and the subfolder becomes the root at the end, which is how this intent is finally met.",
    },
  ],
  constraints: [
    "Nothing is out of reach and everything may break while the migration runs. Completing the migration is the sole priority, not keeping systems outside akasha stable while it proceeds.",
    "Do not stop. If you are unsure what to do in a specific case, file a finding, make a decision, and then keep going. Do not stop to ask Alan for guidance.",
    "Fix small issues inline rather than filing them as findings or asking for approval.",
    "Do not work on the initiative directly. Delegate and coordinate work through subagents.",
    "Make massively parallel progress. Aim to have at least 20 concurrent direct subagents whenever you can use them to do productive work. Maximum 40 concurrent direct subagents.",
    "Add intent to the initiative to keep track of what is in flight. Remove intent from the initiative when it is done.",
    "Do not simply copy files into the akasha folder. The new system has a different structure, so files need to be adapted for the new structure.",
    "Create new page types, page properties, and page property types as needed to accomplish the work, parallel to existing patterns in the new system when possible.",
    "Remove files outside the akasha folder whose content has migrated into the folder.",
    "Do not change this list of constraints.",
    "Set a systemd reminder to remind you of the initiative objective and these constraints every 15 minutes to avoid getting stuck.",
  ],
} as const satisfies Initiative
