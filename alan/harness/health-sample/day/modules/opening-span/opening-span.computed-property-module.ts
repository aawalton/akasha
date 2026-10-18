import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const openingSpan = {
  id: "01a14f49-6d8f-71aa-90d2-a90dab88d2a8",
  type: "page-type/computed-property-module",
  slug: "opening-span",
  definition:
    "the span from one opening of Alan's day to the next, out of the sleep blocks handed in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day opens when the first sleep block starting or running past six the evening before began.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Six in the evening is read on a Utah clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first of two blocks is the block that started earlier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block titled anything but sleep is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stretch titled rest is sleep not yet known to be sleep and is titled sleep in the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block ending at or before that hour opens no day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A block starting at or after six in the evening opens the day after rather than that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window closes at the moment the day after opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Six in the evening in Utah brackets which sleep opens a day and bounds no window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day whose next opening is not recorded closes at the ESO reset that closes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day whose own opening is not recorded opens at the ESO reset that opens it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The blocks are handed in rather than read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The opening window module reads the blocks and asks here what they open.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
  createdAt: "2026-10-18T13:52:54.670Z",
  updatedAt: "2026-10-18T13:52:54.670Z",
} as const satisfies ComputedPropertyModule
