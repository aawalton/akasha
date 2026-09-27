import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reviewQueue = {
  id: "01a0deba-4cb9-7988-986a-cafd962637b7",
  type: "page-type/module",
  slug: "review-queue",
  definition: "the images a review holds, the one shown, and what a key does to them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys 7 8 9 grade `S-` `S` `S+`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys 4 5 6 grade `A-` `A` `A+`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys 1 2 3 grade `B-` `B` `B+`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key 0 grades an image `F`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key 0 reads as Delete, since an image graded `F` is deleted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade's color is read off the grade ladder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Grading an image shows the next image the review covers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Skipping past the last image the review covers comes round to the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stepping back before the first image comes round to the last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Undoing the last grade shows that image again and counts it back in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image graded elsewhere leaves the review.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image whose grade is still being written is left out of what the store answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade that fails to be written puts its image back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A review asks the store for more images before the images it holds run out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A review asks for more images while a hundred are still held ahead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hundred images after the one shown are held ahead.",
    },
  ],
} as const satisfies Module
