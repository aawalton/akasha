import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAmy = {
  id: "01a0de54-1c10-7be9-a617-4f45c7057bb9",
  type: "page-type/lore",
  slug: "partners-amy",
  title: "Amy",
  world: "world/personas",
  about: "character-other/partners-amy",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Amy is the first sister: Alan's partner and co-founder, and the tender of the household's web.",
    "Amy hosted Hearthholt's first dinner on the evening of the second day.",
    "Amy honored Aelwyn's garden greens at that dinner.",
    "On her steward's word Amy claimed Aelwyn's cuttings, to be in good ground by the third day's dark.",
    "Amy put the garden wall out of use: Aelwyn comes the front way from now on.",
    "Amy made a rule that a guest takes the warm seat, and means to keep it.",
    "Amy set Alan's 'with us' down gently, holding Aelwyn to no terms that night.",
    "Amy told Aelwyn that anything larger the evening can decide for itself.",
    "Amy and Alan's terms hold: honesty always, and the job.",
    "Amy has told Alan a plain yes: theirs, unhurried and soon, though not that night.",
  ],
} as const satisfies Lore
