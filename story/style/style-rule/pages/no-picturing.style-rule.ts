import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const noPicturing = {
  id: "01a0e346-dc48-7243-9c3f-6feebd929240",
  type: "page-type/style-rule",
  slug: "no-picturing",
  name: "No Picturing",
  act: "State what is there; never ask the reader to picture, imagine, envision or see it in the mind's eye.",
  warrant:
    "Alan cannot picture anything, so a line asking him to hands him nothing where the thing should be.",
  aids: [
    "You can picture, imagine this, envision and you can see, said to the reader, all ask.",
    "A character imagining something in the story is no break.",
  ],
  examples: [
    {
      before: "She holds a paperback, the kind you can picture her reading on a train.",
      after: "She holds a paperback with a train ticket tucked in for a bookmark.",
    },
  ],
} as const satisfies StyleRule
