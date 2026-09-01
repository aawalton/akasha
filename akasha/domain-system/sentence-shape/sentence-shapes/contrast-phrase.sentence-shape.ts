import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const contrastPhrase = {
  id: "01a05deb-2cee-709c-a0fe-df863eca85c9",
  pageTypeSlug: "sentence-shape",
  slug: "contrast-phrase",
  definition: "two things of one kind set against each other by `rather than`",
  rules: [
    "CONTRAST -> RATHER THAN",
    "VP -> VP CONTRAST VP | VP CONTRAST VEN",
    "NP -> NP CONTRAST NP",
    "NOM -> NOM CONTRAST NOM",
    "PP -> PP CONTRAST PP",
    "ADJP -> ADJP CONTRAST ADJP",
  ],
} as const satisfies SentenceShape
