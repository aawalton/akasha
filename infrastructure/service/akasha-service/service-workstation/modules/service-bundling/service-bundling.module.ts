import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceBundling = {
  id: "01a0c9a2-b39b-7892-83e5-95e2a282b2b9",
  type: "page-type/module",
  slug: "service-bundling",
  definition: "a workstation service's running code built into one file that needs no checkout",
  code: "ts",
  test: "ts",
  allowsTmpPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is named by its slug rather than by the file holding its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code bundled is the entry handed in rather than one this finds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service's entry is the `running` group beside that service's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The teller is bundled here too, its entry being the code its own page holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The teller's stub passes on the name of the unit that failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The teller's bundle is filed under its unit template's stem rather than under a slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bundle filed under that stem is swept by reading the template that starts it.",
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
      statement:
        "The stub awaits the run the caller names, which that code holds no call to itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stub hands that run what the caller spells, and nothing by default.",
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
      decisionKind: "decision-kind/departure",
      statement:
        "A bundle is built from the repository root, so one commit bundles to the same bytes from any caller.",
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
      statement: "The bundle is filed under the commit the caller names rather than under HEAD.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every file the bundler read is recorded as it is read, and those are the closure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bundle is built from the commit's code, checked out apart from the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That checkout holds only the kinds of file the bundler reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That checkout is kept and moved to each commit a deploy builds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing but a deploy moves that checkout or writes into it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move writes over whatever else that checkout holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The packages are reached there through a link to the checkout's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing during a build changes nothing that build reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller checks the commit out once for every service it bundles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record missing the running code refuses rather than passing on a closure of nothing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Git answers for no file git ignores, so `node_modules` is outside that question.",
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
      statement: "Every workstation service starts from its bundle, so no list says which do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which services those are is read from the index rather than spelled here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A bundle resolves a bare specifier against its own directory, where no package sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A late-loaded name is spelled where it is imported, so the bundler carries it in.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A green tick is weak evidence, because the branch that loads a name late may not have run.",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a service was last put up at is read off the bundle its unit names.",
    },
  ],
} as const satisfies Module
