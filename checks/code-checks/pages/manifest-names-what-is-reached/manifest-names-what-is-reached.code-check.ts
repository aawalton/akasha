import type { CodeCheck } from "../../code-check.page-type.ts"

export const manifestNamesWhatIsReached = {
  id: "01a0597b-d723-72c8-ab64-118c9e5eb650",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "manifest-names-what-is-reached",
  definition:
    "the check judging a package's dependencies and the packages its own code reaches to be one set",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package reached and not named is one half of the rule.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency named and not reached is the other half.",
    },
    {
      invariantKind: "departure",
      statement: "One reading of the manifests and the reaches answers both halves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dependency is a name the manifest states under any dependency field of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dependency judged for going unreached is stated under `dependencies` or `devDependencies`.",
    },
    {
      invariantKind: "departure",
      statement: "A reach in code is read from the parse rather than from the text.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet names a module by an `@import` or by a `url()`.",
    },
    {
      invariantKind: "departure",
      statement: "A reach in a stylesheet is found by scanning rather than by a parse.",
    },
    {
      invariantKind: "departure",
      statement: "A url naming a scheme or a fragment reaches no package.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet's reach credits a dependency rather than refusing the stylesheet.",
    },
    {
      invariantKind: "gap",
      statement: "A stylesheet is read by a parser rather than by a scan.",
    },
    {
      invariantKind: "absence",
      statement: "A specifier spelt inside a string a body has reaches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming a path reaches no package.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming a protocol reaches no package.",
    },
    {
      invariantKind: "departure",
      statement: "A bare specifier naming a builtin of the runtime reaches no package.",
    },
    {
      invariantKind: "departure",
      statement: "The builtins are asked of the runtime rather than listed here.",
    },
    {
      invariantKind: "departure",
      statement: "A reach at a package the akasha folder itself has is let through.",
    },
    {
      invariantKind: "departure",
      statement: "The name the root's own manifest states is a package the akasha folder has.",
    },
    {
      invariantKind: "departure",
      statement: "The root is reached without any manifest naming the root.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency naming a package the akasha folder itself has is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A file is judged against the innermost package whose folder has that file.",
    },
    {
      invariantKind: "absence",
      statement: "A file standing under no package is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files a package has are the files the index names as the change leaves those files.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package reached is named by its own name or by the `@types` package standing for that package.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a reach is erased at compile time is not read here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dependency a package states as a peer of its own is reached by the installer of that package.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dependency another dependency states as a peer is reached by that other dependency.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency a script names as a command is reached by that script.",
    },
    {
      invariantKind: "departure",
      statement: "`typescript` is reached by a `tsconfig.json` standing in the package's folder.",
    },
    {
      invariantKind: "departure",
      statement: "`@types/bun` is reached by a `bun:` specifier.",
    },
    {
      invariantKind: "departure",
      statement: "`@types/node` is reached by a `node:` specifier.",
    },
    {
      invariantKind: "departure",
      statement: "An `@types` package is reached by the package the `@types` package stands for.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency a package's page names under `tool-reached` is reached by a tool.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tool taking a dependency out of the manifest leaves no import for this check to read.",
    },
    {
      invariantKind: "departure",
      statement: "The list is read off the page whose folder has the manifest.",
    },
    {
      invariantKind: "departure",
      statement: "The page is read as the change leaves the page.",
    },
    {
      invariantKind: "absence",
      statement: "A page naming nothing under `tool-reached` credits nothing by that list.",
    },
    {
      invariantKind: "departure",
      statement: "A file reaching a package its manifest does not name is refused by its own path.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency reached by nothing is refused at its manifest's path.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency reached by nothing is judged where the change has its manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that is absent or will not parse leaves its package unjudged.",
    },
    {
      invariantKind: "absence",
      statement: "An index naming no package judges clean.",
    },
  ],
} as const satisfies CodeCheck
