import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const addressed = {
  id: "01a077c9-302e-73d9-ab09-7e86e4854566",
  type: "file-property",
  slug: "addressed",
  propertySlug: "addressed",
  definition: "the type binding each change address to that change's own arguments",
  extensions: ["ts"],
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
      invariantKind: "departure",
      statement: "A runner naming no page type has no map written for that runner.",
    },
    {
      invariantKind: "departure",
      statement: "A change exporting the run is reached by the map.",
    },
    {
      invariantKind: "departure",
      statement: "A change exporting no run is left out of the map rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a change exports the run is read from that change's own code.",
    },
    {
      invariantKind: "departure",
      statement: "The addresses come out sorted rather than in the order the index answers.",
    },
    {
      invariantKind: "departure",
      statement: "Every body the map reads is read through the change rather than off the disk.",
    },
    {
      invariantKind: "gap",
      statement: "A generator that throws leaves a stale map for the typecheck to refuse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the map holds survives into the code that runs.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
