import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const flexibility = {
  id: "01a09111-9cc5-7576-83ef-2d6621b37793",
  type: "page-type/domain",
  slug: "flexibility",
  definition: "how Alan trains his flexibility",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "flexibility" }],
  parts: ["page-type/flexibility-log"],
} as const satisfies Domain
