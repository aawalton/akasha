import type { Command } from "@akasha/command-system/command"

export const temperAddonResolve = {
  id: "01a0603c-c1cb-701c-8c07-d388419d9fed",
  pageTypeSlug: "command",
  slug: "temper-addon-resolve",
  definition: "the command answering which addon a name reaches",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "<name>",
      takes: "the canonical name, flat directory leaf or nested parent domain to resolve",
    },
    { said: "--repo-root <path>", takes: "the checkout the addons are discovered in" },
  ],
  helpNotes: [
    "a canonical name, a flat directory leaf and a nested parent domain all reach the same addon.",
    "a name reaching no addon is refused by name.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One addon is reached by more than one name.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no addon is refused by name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the game folder.",
    },
  ],
} as const satisfies Command
