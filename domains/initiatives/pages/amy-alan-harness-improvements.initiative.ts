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
        "The counting path is landed whole: a widget's `opens` link names that widget after `#widget=`, `deep-link-open-sync` posts `/api/widget-tap`, and `countTap` writes `taps` and `lastTappedAt`. No tap has ever been counted. The shipped Swift carries the link without the fragment. `alanwalton-attribute-stoplights` carries no `opens`. Nothing shows the counts: no view, no readout, no detail screen names them.",
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
        "Reported by Alan on 2026-09-07, a second time: the stoplight reads zero while `akasha measure attributes` prints `Endurance 0 0.17`. The data is landing — the 06:30 run patched 2026-09-04 and 2026-09-07, and 2026-09-07 carries activeCalories 69.742. So what diverges is what the stoplight reads against what the measure reads, rather than what the harness has. Which of the two columns the stoplight is meant to show is unasked.",
    },
    {
      statement: "The git origin clears the debris an aborted push leaves behind it.",
      workingMemory:
        "The sweep is landed at 72b46fea: a `git-transport-janitor` CronJob runs hourly on node-03, mounts the repositories, and takes away every `tmp_objdir-*` and `tmp_pack_*` older than 180 minutes, naming each path removed. The YAML renders and the sweep was run here over a fake tree, taking the two stale entries and leaving the fresh ones. The workflow step applying the CronJob landed at 13e1d86c, so what is unseen from here is the cluster running the job.",
    },
  ],
} as const satisfies Initiative
