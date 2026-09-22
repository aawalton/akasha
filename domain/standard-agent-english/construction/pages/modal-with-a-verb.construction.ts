import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const modalWithAVerb = {
  id: "01a0ca71-1f68-72f2-89ae-06af0abbbaad",
  type: "page-type/construction",
  slug: "modal-with-a-verb",
  definition: "a verb phrase written from a modal and the verb that modal bears on",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/modal", "part-of-speech/verb"],
  admits: ["can read", "can run", "can have"],
  refuses: ["read can", "can a page"],
} as const satisfies Construction
