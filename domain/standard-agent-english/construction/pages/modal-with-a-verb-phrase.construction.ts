import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const modalWithAVerbPhrase = {
  id: "01a0ca71-1f68-72f2-89ae-06af0abbbaad",
  type: "page-type/construction",
  slug: "modal-with-a-verb-phrase",
  definition: "a verb phrase written from a modal and the verb phrase that modal bears on",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/modal", "phrase-kind/verb-phrase"],
  admits: ["can read", "can read from a page", "can endure on a day"],
  refuses: ["read can", "can a page"],
} as const satisfies Construction
