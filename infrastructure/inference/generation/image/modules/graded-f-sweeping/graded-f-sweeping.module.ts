import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gradedFSweeping = {
  id: "01a0ded9-6457-7a9f-b369-1ba6ecbdf928",
  type: "page-type/module",
  slug: "graded-f-sweeping",
  definition: "every image graded `F` fifteen minutes ago or more deleted, with its bytes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image goes where its grade is `F` and was written fifteen minutes ago or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image graded `F` fewer than fifteen minutes ago stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "When a grade was written is read off the last commit to the image's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any later commit to the page starts those fifteen minutes again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image whose last commit went unread stays and is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image another page names stays graded `F`, and the sweep names each page naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages naming an image are what its referenced-by index answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The images are what the index answers rather than a folder listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The removal is asked of the pages service rather than landed in process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The removal states the commit the checkout was at before its images were read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image whose page changed after that commit is refused by the landing and stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes beside an image go with a plain remove after its page has landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The images go in one call to land in one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image is tried alone where that call refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is deleted unless the sweep is asked to.",
    },
  ],
} as const satisfies Module
