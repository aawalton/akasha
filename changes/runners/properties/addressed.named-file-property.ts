import type { NamedFileProperty } from "@akasha/pages/named-file-property"

export type Addressed = "ts"

export const addressed = {
  id: "01a077c2-e56c-7a83-b853-f1e2a316e26f",
  pageTypeSlug: "named-file-property",
  slug: "addressed",
  propertySlug: "addressed",
  definition: "the type binding each change address to that change's own arguments",
  fileName: "addressed.d.ts",
  machineWritten: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The map is beside the page of the runner stating this property.",
    },
    {
      invariantKind: "departure",
      statement: "The map is written by a command rather than by an author.",
    },
    {
      invariantKind: "departure",
      statement: "TypeScript reads a name ending `.d.ts` as a declaration.",
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
      statement: "An address the map does not hold is refused where that address is written.",
    },
    {
      invariantKind: "absence",
      statement: "A compiler emits nothing from the map.",
    },
  ],
} as const satisfies NamedFileProperty
