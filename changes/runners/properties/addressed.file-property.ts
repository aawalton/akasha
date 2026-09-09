import type { FileProperty } from "@akasha/pages/file-property"

export type Addressed = "ts"

export const addressed = {
  id: "01a077c9-302e-73d9-ab09-7e86e4854566",
  pageTypeSlug: "file-property",
  slug: "addressed",
  propertySlug: "addressed",
  definition: "the type binding each change address to that change's own arguments",
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The map is beside the page of the runner stating this property.",
    },
    {
      invariantKind: "departure",
      statement: "The map is written by the landing rather than by an author or by a command.",
    },
    {
      invariantKind: "departure",
      statement: "The map binds an address to the arguments the change takes.",
    },
    {
      invariantKind: "departure",
      statement: "The map reads a change's signature rather than restating that signature.",
    },
    {
      invariantKind: "departure",
      statement: "A runner reads the map as a type rather than as a way to reach a change.",
    },
    {
      invariantKind: "departure",
      statement: "An address the map does not have is refused where that address is written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the map holds survives into the code that runs.",
    },
  ],
} as const satisfies FileProperty
