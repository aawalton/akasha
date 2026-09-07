import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "Alan can see how much each widget on his phone is used.",
      workingMemory:
        "All seven tiles carry the `#widget=` fragment their pages state, page and Swift matching one by one. Alan verified the first six on build 206, and `alanwalton-claude-usage` reads taps 1. The seventh had nowhere to go, so an Attributes nav and two views landed (40acd04b, 0a0b2020) and the tile opens the readings view (d82923eb). The web carries them and the index answers 26 navs. Build 207 ships the link. What is unseen from here is Alan tapping the Attributes tile.",
    },
    {
      statement: "Alan's nav items load in the native app.",
      workingMemory:
        "The cause is fixed and live at fa63d016: the page and page-type routes answer the shell's preflight 204 with the cross-origin headers, and read a bearer token as well as a session cookie. Verified from here with `Origin: capacitor://localhost` and Alan's bearer: nav answers 200 carrying 24 rows, and page types answers 464. What is unseen from here is his phone drawing them.",
    },
    {
      statement: "Alan reaches the akasha commands tree from a panel in his editor.",
      workingMemory:
        "The panel is landed at c794b8b0: `command-tree-assemble` narrows the domain tree to the parts of the command page type, `commandTreeLine` puts each row into the row every tree carries, and the watcher writes `command-tree.…state.uncommitted.json`. Verified live: the service wrote 54 roots, 286 rows, 238 of them commands, none unreached, each carrying its own definition and a whole path. What is unseen from here is Alan reloading his window and the Commands panel drawing.",
    },
    {
      statement: "The git origin clears the debris an aborted push leaves behind it.",
      workingMemory:
        "The sweep is landed at 72b46fea and the step applying it at 13e1d86c, but the CronJob is in no namespace: `kubectl get cronjob -n git` answers none. The origin is at 83db1ea3 from 08:08 while this checkout is 831 commits past it, so no run has ever seen the step. The origin carries no debris at this moment either, nothing named `tmp_objdir-*` or `tmp_pack_*` under its 2.6G of repositories. What is left is a push reaching the origin.",
    },
  ],
} as const satisfies Initiative
