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
        "The links are landed at bafffd04: each of Alan's six tiles opens the link its page states, naming itself after `#widget=`, and every page's `opens` was compared against its Swift literal, six of six matching. A Widgets nav and a Use view landed at a56139ae so the counts have a screen. `alanwalton-attribute-stoplights` still carries no `opens`, there being no attributes screen to open. What is unseen from here is Alan building the app and tapping a tile.",
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
      statement: "Alan's Endurance stoplight shows a reading rather than zero.",
      workingMemory:
        "Traced end to end and nothing here reads zero: the readout sidecar carries lastValue 0.174355 written minutes ago, and `readingSaid(0.174355)` run here answers 0.17, the number measure's second column prints. The `0` is `StoplightRing`'s fallback, drawn only where the JSON carries no reading at all, which this server never sends. Measure's first column is the level, zero because 0.17 points is under the first rung at 10. Only Alan can see his tile.",
    },
    {
      statement: "The git origin clears the debris an aborted push leaves behind it.",
      workingMemory:
        "The sweep is landed at 72b46fea and the step applying it at 13e1d86c, but the CronJob is in no namespace: `kubectl get cronjob -n git` answers none. The origin is at 83db1ea3 from 08:08 while this checkout is 831 commits past it, so no run has ever seen the step. The origin carries no debris at this moment either, nothing named `tmp_objdir-*` or `tmp_pack_*` under its 2.6G of repositories. What is left is a push reaching the origin.",
    },
  ],
} as const satisfies Initiative
