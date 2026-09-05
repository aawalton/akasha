import type { Initiative } from "../initiative.page-type.ts"

export const awenStoryCleanup = {
  id: "01a06cc9-3a10-7868-a962-917ffb04e8df",
  pageTypeSlug: "initiative",
  slug: "awen-story-cleanup",
  domainSlug: "domain/story-engine",
  personaSlug: "awen",
  intents: [
    {
      statement: "All story engine and story content files are organized in the story/ folder.",
      workingMemory:
        "`game` and its 8 pages moved to `story/games`, and `domain/story-engine` claims the type in place of `domain/games`. Every game names awen as its engine. Each already had a matching `story-played` page with its turns mirrored one for one as `story-turn-played` pages — 12, 18, 18, 20, 32, 2, 33, 4, every count exact — so `game` is the head of a pipeline `narrative-story-turn-promotion` gathers into chapters. Left: `alan/world-lore` and `alan/narrative-production`.",
    },
    {
      statement: "The story/ tree passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`folder-matches-a-shape` over `story` answers 29 refusals. 10 are a folder still opening with the `story-` the domain above it says; `builds` and `chapters-played` are renamed, and `story-chapters-read` holds 37866 files and outgrew the workstation mid-move. 18 are a `pages` folder mixing bare page files with per-page folders; either alone passes, and Alan has not said which. `story/world-mechanics/mechanics` wants the name its parent folder already has.",
    },
    {
      statement: "Typechecking a small patch costs a small patch's worth of memory.",
      workingMemory:
        "One changed path cost 7.88GB and 15.1s, and costs about 1.0GB and 2.8s now. Two separate wastes: the program was built over every indexed file however few paths changed, and it asked for diagnostics with no file named, so it checked all 80967 and threw all but the roots away. Roots are now the change plus its importer closure, and `programKeptOver` is taken only where the change leaves the whole folder compiling; that path has now run, and the build info it keeps grew from 16.8MB to 24.0MB. One path is about 1.0GB only where its closure is small: a hub file half the tree reaches still costs 4.59GB under TS5 and 1.08GB under TS7, so the 8x I first reported was measured on a kind file and generalised. About 370MB of the check's overhead is unexplained; I guessed the eager body reads were it and was wrong, they were 90MB. `typecheck` runs at patch phase alone, so a plain `akasha audit` skips it, and 3 of about 39 checks run on patch at all.",
    },
    {
      statement: "The compiler judging a patch is the fastest one that gives the same verdict.",
      workingMemory:
        "`typescript-7` is a second check beside `typecheck`, on `typescript@7.1.0-dev.20260904.1` aliased as `typescript-7`. Measured back to back over 78722 files under bun, the runtime the gate uses, the two find the same 199 diagnostics: TS7 24.3s and 5.13GB against TS5 42.7s and 15.4GB, so 1.8x the speed and a third of the memory. The 3.6x I first reported was node driving the sync API, which the gate cannot run. Build time is a wash at about 6.8s each and the whole gain is in checking, so scoping what gets checked still pays for both. The sync API reads `stdout._handle.fd`, a node internal bun does not give it, so it can never run in the gate; the async API runs under both and is what the check uses. Its first end-to-end test found `fileExists` answering undefined for every path but the config, which sends the compiler to the disk, so the check judged nothing for any change that adds a file — the ordinary patch. Both faults were caught by running the two checks over one input and seeing them differ, which is why `typecheck` stays on. Judging it through `akasha audit --check` is no way round this: 11 of 11 runs threw on a stale index, because `index refresh --unlanded` holds the landing lock for minutes and HEAD moves under the run. TS7 also draws in no ambient types unasked, so the served config names every package under `node_modules/@types` where TS5 auto-includes all 34, and it throws on a root that does not exist where TS5 ignores one.",
    },
  ],
} as const satisfies Initiative
