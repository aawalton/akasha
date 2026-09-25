import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const localVolume = {
  id: "01a0658b-0f02-7435-bfcf-e778c41f839f",
  type: "page-type/domain",
  slug: "local-volume",
  definition: "a node-pinned filesystem under other stores",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "local volume" },
    { partOfSpeech: "part-of-speech/noun", spelling: "local volumes" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A store no other store rests on is a local volume.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A volume is not backed up by default.",
    },
  ],
} as const satisfies Domain
