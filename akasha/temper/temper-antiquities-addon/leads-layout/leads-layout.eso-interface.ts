import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const leadsLayout = {
  id: "01a06274-b08b-7c8c-bbc7-d352dfe6b43f",
  pageTypeSlug: "eso-interface",
  slug: "leads-layout",
  definition: "the whole antiquity lead window, from its title row to its list rows",
  markup: "xml",
  loadedAs: "TemperAntiquities.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every control the lead code reaches is declared here and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "The document loads after the Lua bundle.",
    },
    {
      invariantKind: "departure",
      statement: "A row of the list is a virtual control the list clones.",
    },
  ],
} as const satisfies EsoInterface
