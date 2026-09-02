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
      statement: "An addon carrying no tsconfig refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The whole run is bounded rather than each addon.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaching its bound refuses by naming the addon being compiled.",
    },
  ],
} as const satisfies Command
