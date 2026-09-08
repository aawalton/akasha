import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const addCopiedPropertyToEveryPage = {
  id: "01a0818b-41a9-7979-8f73-363f167029ce",
  pageTypeSlug: "change-agent",
  slug: "add-copied-property-to-every-page",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/page-type",
  changeTargetSubtypeSlug: "change-target-subtype/page-type-page-property",
  definition: "the one value a page carries under one key put on that page under another key",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages written are the pages the index names of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "The value written is read off the page rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming a page is written as that page's slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying other than one value under the key copied from is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key its page type says carries many values is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Putting the key in is left to the mechanical change adding one key.",
    },
    {
      invariantKind: "stopgap",
      statement: "This change carries one page type from an old shape to a new one and then goes.",
    },
  ],
} as const satisfies ChangeAgent
