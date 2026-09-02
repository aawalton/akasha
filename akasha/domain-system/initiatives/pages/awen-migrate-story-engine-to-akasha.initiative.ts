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
      statement:
        "The story engine's code is in akasha rather than in `alanwalton/web` and `tools`.",
      workingMemory:
        "`akasha/story/engine/core` holds all that landed: 39 modules over 102 files and 5,899 lines, 20 of them tested, publishing 38 export keys — `schema-violation` is a part with no key. Outside it are the reader at `alanwalton/web/app/awen`, 51 files and 3,160 lines with no test, four API routes, `ops tower` at 6 commands and 740 lines, and `tools/lib/tower-game-access.ts`. `tower`, `tower-core` and `tower-engine` are in akasha untested, and `@akasha/tower` reaches out to `@stories/text`.",
    },
    {
      statement: "Every world, story, chapter and turn the story engine keeps is a page in akasha.",
      workingMemory:
        "Not one byte of the data has moved. 34 folders under `pages/` hold 30,341 markdown and 10,497 `.jsonl`, 40,871 files, 55.5% of every page markdown in the repo. The mass is 10,469 `*.references.jsonl` carrying 126,962 rows, then 18,073 Royal Road chapters and 4,542 skills. What was played is small: 8 games, 139 turns, 149 worlds, 123 played chapters. Mechanics carry `world-slug` and stories carry `world`, two spellings of one join.",
    },
    {
      statement: "No part of a story or a world exists only in the database.",
      workingMemory:
        "`dirty/` holds 1,898 files that are database rows dumped to disk rather than pages: `story-skill` 911, `story-class` 362, `story-character-timeline` 137, `story-wiki` 33, `story-build` 3, `story-decision` 2. None of the six has a page type. They give themselves away by a camelCase `pageType`, `createdAt` and `updatedAt` in timestamptz, and `story` naming a uuid rather than a slug. No `.sql` file and no `.from(` call is anywhere in the tree, so what is still live in Supabase is unread.",
    },
    {
      statement: "Alan can play a game again.",
      workingMemory:
        "The engine is refused at both ends. `31a72a6f1a` on 1 September severed the server read half, so `loadGame`, `loadLatestState`, `loadStoryLedger` and `loadActionInputs` throw through `unheld()`, and every awen route calls `loadGame` first. The action box answers empty by design: `pendingActions` gives `[]`, and `actionBoxIsRebuilding` says there is nowhere for an action to land. The specs that start a stopped game master still name `iris` and `aria`, whom no game page names.",
    },
    {
      statement: "Everything in `stories/dirty` has been resolved.",
      workingMemory:
        "`stories/dirty/open-readings.md` holds 133 bullets, 127 of them Wandering Inn mechanic names read twice and never ruled on: 121 alone, 6 echoing a settled name, 2 pairs that are variants of one another, and 2 questions that would settle many at once. A ruling lands in `the-wandering-inn.world.mechanic-readings.jsonl`, which holds 11,354 already.",
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
      statement: "No deployed code names one story or one world.",
      workingMemory:
        "Three hostnames name games: `awen.alanwalton.com` goes to `/games`, `tower.alanwalton.com` to `the-tower-29644e7b`, `dragons.alanwalton.com` to `dragons-dungeons-92c712df`. They are declared in `alanwalton/web/server.ts` and on the `alanwalton-web` web-app page, and each lands on a route that throws.",
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
