import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerTheHostTrueform02 = {
  id: "01a0d450-b459-77eb-afd0-b53ca5a60aba",
  type: "page-type/lore",
  slug: "the-tower-the-host-trueform-02",
  title: "The Host's True Form",
  world: "world/personas",
  about: "character-other/the-tower-the-host-trueform-02",
  facts: [
    {
      fact: "The Host's true form lies dead by the wreck of its seat, a lean grey husk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The husk of the Host's true form is cold and holds nothing a forge can use.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
