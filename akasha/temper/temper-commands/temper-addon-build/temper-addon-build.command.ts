import type { Command } from "@akasha/command-system/command"

export const temperAddonBuild = {
  id: "01a0603c-c1c7-7e2e-b000-f317682d25d6",
  pageTypeSlug: "command",
  slug: "temper-addon-build",
  definition: "the command compiling an addon to Lua and installing it into the game folder",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "<name>",
      takes: "the addon to build, by canonical name, flat directory leaf or nested parent domain",
    },
    { said: "--all", takes: "build every addon on the roster rather than one named addon" },
    {
      said: "--build-only",
      takes: "stop once `dist/` is written and install nothing into the game folder",
    },
    { said: "--watch", takes: "hand `--watch` to the compiler and stay in it" },
    { said: "--code-root <path>", takes: "the checkout built from" },
    { said: "--tstl-root <path>", takes: "the compiler built with" },
  ],
  helpNotes: [
    "one addon is named or `--all` is said, never both and never neither.",
    "`--watch` takes one addon, copies nothing and installs nothing, so `--all` and `--build-only` are refused beside it.",
    "an addon folder holding no `tsconfig.json` has one written into `dist/.tstl/` from the bundle entry its page names.",
    "the answer says how many bytes of Lua each addon left, because a compiler writing nothing and a compiler finding nothing wrong read alike.",
    "installing waits on `temper-addon-install`, so `--build-only` is said or the call is refused before anything compiles.",
    "the addon's build output is emptied before the compiler runs, and the metadata is written back once the Lua is there.",
    "the whole run is bounded at an hour, and a run reaching that bound refuses with what it was compiling.",
    "a checkout holding no compiler at the root named is refused before anything is compiled.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build names one addon or every addon.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming one addon beside `--all` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Watching compiles one addon and installs nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An addon holding no tsconfig is compiled against settings written from its page.",
    },
    {
      invariantKind: "departure",
      statement: "An addon whose page names no bundle entry refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A compile leaving no bundle refuses rather than reporting a build.",
    },
    {
      invariantKind: "departure",
      statement: "The first addon that does not compile ends the run.",
    },
    {
      invariantKind: "departure",
      statement: "The whole run is bounded rather than each addon.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaching its bound refuses by naming the addon being compiled.",
    },
    {
      invariantKind: "departure",
      statement: "An addon's build output is emptied before that addon is compiled.",
    },
    {
      invariantKind: "departure",
      statement: "The build output an emptied folder held is written again once the Lua is there.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling addon's build output is emptied beside the addon shipping the sibling.",
    },
    {
      invariantKind: "gap",
      statement: "Installing what was built waits on the command that installs.",
    },
  ],
} as const satisfies Command
