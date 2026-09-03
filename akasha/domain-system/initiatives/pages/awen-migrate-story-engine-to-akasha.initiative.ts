import type { Initiative } from "../initiative.page-type.ts"

export const awenMigrateStoryEngineToAkasha = {
  id: "01a0627a-ca84-7d24-832f-215de8c83ce9",
  pageTypeSlug: "initiative",
  slug: "awen-migrate-story-engine-to-akasha",
  domainSlug: "domain/story-engine",
  personaSlug: "awen",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement: "Every world, story, chapter and turn the story engine keeps is a page in akasha.",
      workingMemory:
        "149 worlds, 13 stories and 123 chapters are pages, their markdown gone at `09a6112fe2`, `d34c77b0aa` and `fde71649a6`. Left: 139 turns and 8 games. Prose over the 15,000 byte file ceiling is split into the numbered files `page-file-parts` defines, the first unsuffixed and the rest `.part2` on; 99 chapters needed it. A page type lands before its pages, since `runsTabooCheck` is read from the index. Ids are v5 and re-mint to v7 keeping the last eight hex.",
    },
    {
      statement: "No part of a story or a world exists only in the database.",
      workingMemory:
        "`dirty/` holds 1,898 files that are database rows dumped to disk rather than pages: `story-skill` 911, `story-class` 362, `story-character-timeline` 137, `story-wiki` 33, `story-build` 3, `story-decision` 2, none with a page type. They give themselves away by a camelCase `pageType` and by `story` naming a uuid. 20 story-engine kinds do have a page type and declare `files: none`, meaning no file of their own: their rows are entries in a parent page's sidecar, on disk. `game-turn` answers 139.",
    },
    {
      statement: "Alan can play a game again.",
      workingMemory:
        "The engine is refused at both ends. `31a72a6f1a` on 1 September severed the server read half, so `loadGame`, `loadLatestState`, `loadStoryLedger` and `loadActionInputs` throw through `unheld()`, and every awen route calls `loadGame` first. The action box answers empty by design: `pendingActions` gives `[]`, and `actionBoxIsRebuilding` says there is nowhere for an action to land. The specs that start a stopped game master still name `iris` and `aria`, whom no game page names.",
    },
    {
      statement: "Everything in `stories/dirty` has been resolved.",
      workingMemory:
        "Every one of the 131 names in `stories/dirty/open-readings.md` already carries a reading in `the-wandering-inn.world.mechanic-readings.jsonl`. Three stay `unsure`: `Bane`, `Crusade`, `Midnight Journey`. Both questions that file calls open are answered by the rows. 32 names carry two readings under one `mechanic-slug`. `enchantment` has been a kind all along, holding 26 rows including `sharpness-enchantment`. The file is to go once those three are ruled.",
    },
    {
      statement:
        "Every kind of thing the story engine keeps has a domain that defines it and a file that carries it.",
      workingMemory:
        "Six shapes kept in `dirty/` have no page type at all. Of the types that do, `game-turn`, `game-state`, `tower-session` and `story-chapter` declare `files: none`, so no file carries them and they are read only as rows. 166 property definitions under `pages/page-property-definition` belong to this domain, 30 of them to `game` alone.",
    },
    {
      statement: "Every word a game master is served changes without a deploy.",
      workingMemory:
        "The doctrine is in `pages/gm-doctrine-pack` as one page and four attachment files, and `gm-doctrine-pack` and `gm-context-schema` are modules of the engine. Which words reach a game master from a page and which from code is not yet traced.",
    },
    {
      statement: "Nothing akasha holds calls the story engine narrative.",
      workingMemory:
        "The persona's championed domain, the seat's assignment and the domain page are moved to `story-engine` at `81438d1eb0`. What is left: the persona's purpose prose, two subagent pages, and `narrative-continuity-schema` as a module, an export key, a part slug and a `narrativeContinuity` field read at eight sites across `game-config-schema` and `rollback`. A beat being narrative rather than system is fiction vocabulary and stays.",
    },
  ],
  constraints: [
    "Every part of the story engine migrated into akasha lands under `akasha/story`.",
    "The intent stack and its working memory hold where the work is, so a fresh context resumes from the page rather than from what it remembers.",
    "Work never halts on doubt: a finding is filed, a decision is made, and the work goes on.",
    "Changes swarm across as many as twenty agents this initiative's persona spawns and shepherds, and the akasha commands are left to settle what collides.",
    "Every change goes through an akasha command, and a command that cannot do what is needed is enhanced or written rather than bypassed.",
    "The story engine is recreated in the new paradigms rather than carried across, and a feature lost in the recreation is filed as a finding.",
    "No directive comes across, and each directive left behind is filed as a finding.",
    "A world, a story, a chapter or a turn Alan played is never lost: what cannot be recreated is carried across whole.",
    "The story engine is allowed to stay unplayable until this initiative is done.",
    "A reminder every fifteen minutes restates these constraints and says to keep going.",
  ],
} as const satisfies Initiative
