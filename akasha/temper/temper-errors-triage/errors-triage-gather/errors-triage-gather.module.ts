import type { Module } from "@akasha/code-system/module"

export const errorsTriageGather = {
  id: "01a060cd-5652-70fe-ac43-14c6188a70ae",
  pageTypeSlug: "module",
  slug: "errors-triage-gather",
  definition: "the deployed build ids an error is judged against, read off the addons folder",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A build id is read from the build-id file the addon build leaves beside an addon.",
    },
    {
      invariantKind: "departure",
      statement: "An addon folder read for one error is not read again for a later error.",
    },
    {
      invariantKind: "departure",
      statement:
        "An addon folder carrying no readable build id is remembered as carrying no build id.",
    },
    {
      invariantKind: "departure",
      statement: "An error the game attributed reads only the attributed addon's build id.",
    },
  ],
} as const satisfies Module
