import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const doSupportNegation = {
  id: "01a05db8-c09a-77f8-83ad-efc80512c071",
  pageTypeSlug: "sentence-shape",
  slug: "do-support-negation",
  definition: "`does` followed by `not` and a verb taking no ending",
  rules: ["VP -> AUX NEG VB"],
} as const satisfies SentenceShape
