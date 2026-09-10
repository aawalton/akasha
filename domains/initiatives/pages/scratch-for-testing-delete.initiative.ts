import type { Initiative } from "../initiative.page-type.types.ts"

export const scratchForTestingDelete = {
  id: "01a08c60-a4b9-7ac1-89f4-872cfba28f17",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "scratch-for-testing-delete",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Alan deletes this intent and the one below it remains.",
      workingMemory:
        "This initiative is scratch, made for Alan to try the Work Panel's new right click menu on. Deleting this intent should leave the second one and the initiative itself as they are.",
    },
    {
      statement: "Alan deletes this whole scratch initiative and its page goes.",
      workingMemory:
        "The second of two, here so that deleting the first shows a sibling remaining. Deleting the initiative takes the page and both intents at once, behind a modal the intent delete does not ask for.",
    },
  ],
} as const satisfies Initiative
