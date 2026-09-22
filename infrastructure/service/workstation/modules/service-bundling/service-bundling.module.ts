import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceBundling = {
  id: "01a0c9a2-b39b-7892-83e5-95e2a282b2b9",
  type: "page-type/module",
  slug: "service-bundling",
  definition: "a workstation service's running code built into one file that needs no checkout",
  code: "ts",
  allowsTmpPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is named by its slug rather than by the file holding its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code bundled is the `running` group beside that service's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a slug names is read from the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The entry handed to the bundler is a stub outside the repository rather than a file in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stub names the running code by its absolute path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stub awaits `runService`, which the running code holds no call to itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is not minified, because a bundle read by a person is worth its size.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The bundle carries an inline source map, because a trace naming its source is worth the size.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A frame's path is the repository-relative source under the bundle's directory.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "No file sits at the path a frame names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A specifier only a dead branch requires is left for the runtime to resolve.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reason a specifier is left that way is held beside that specifier.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "`playwright-core` requires `chromium-bidi` only inside its BiDi transport setup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service driving a browser over CDP never enters that setup, so `chromium-bidi` is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is filed under the commit the checkout is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is written beside the units rather than into the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no service page carries is parted from code that would not bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service named here starts from its bundle rather than from the pinned tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`service-watching` is the one service named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The list says how far the move off the pinned tree has got rather than forking the fleet for good.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The list is done with once it holds every service and the pinned tree goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is named here after its bundle has been run by hand and worked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy builds the bundle of every service named here before any unit is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bundle that will not build refuses that deploy, so no unit names a file that is not there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A unit spells the bundle the deploy built rather than working that path out as it starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bundle path carries the commit it was built at, so a restart runs the bytes the deploy built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit starting from a bundle reads its pages from the working checkout still.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing leaves such a unit as the deploy wrote it, since a landing builds no bundle.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Each bundle is tens of megabytes, and one is written for every commit built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service keeps at most two bundles, swept after each new one is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle just written is always one of the two kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The other kept is the bundle the service's installed unit starts from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two are kept, not one, so a running unit's bundle survives a newer one being built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The unit's ExecStart is read rather than guessed, and mtime only settles the fallback.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An installed unit for a service named nowhere here starts from a pinned tree rather than a bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where the unit names no bundle, the most recent other one is kept as the rollback.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a file in that directory named for a commit and suffixed `.js` is swept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The answer names every bundle removed, because a silent removal is hard to diagnose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A named service's unit names its bundle in its ExecStart, so the sweep reads which one to keep.",
    },
  ],
} as const satisfies Module
