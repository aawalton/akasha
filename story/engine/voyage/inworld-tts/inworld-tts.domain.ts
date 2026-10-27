import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const inworldTts = {
  id: "01a17ea3-56ff-7c26-a90e-219e1714a59d",
  type: "page-type/domain",
  slug: "inworld-tts",
  definition: "the text-to-speech models Inworld sells through its API",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Inworld" }],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld TTS 1.5 comes in two sizes, Mini and Max.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Inworld TTS 2.0 is Realtime TTS-2, model `inworld-tts-2`, generally available 2026-08-31.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Realtime TTS-2 Flash, model `inworld-tts-2-flash`, is the smaller and faster TTS 2.0.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Inworld marks `inworld-tts-1.5-max` and `inworld-tts-1.5-mini` deprecated, with no end date.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld publishes no weights for any TTS 1.5 or TTS 2.0 model.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every Inworld TTS 1.5 and TTS 2.0 model is proprietary.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "`github.com/inworld-ai/tts` holds MIT-licensed TTS-1 training code and no weights.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld states no parameter count for any TTS 1.5 or TTS 2.0 model.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Inworld TTS-1, the generation before 1.5, has 1.6B parameters, and TTS-1-Max has 8.8B.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "No Inworld TTS 1.5 or TTS 2.0 model runs on local hardware.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld's own pages offer no on-premises or on-device TTS.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld TTS runs in Inworld's cloud or in a customer's private VPC.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Pay-as-you-go Realtime TTS-2 costs $25 per million characters, about $0.025 a minute.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Pay-as-you-go Realtime TTS-2 Flash costs $15 per million characters.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Inworld's $1,500-a-month Growth plan prices TTS-2 at $12.50 and Flash at $7 per million.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld's enterprise price for TTS-2 is as low as $5 per million characters.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld's pay-as-you-go plan includes up to 70 minutes of TTS free.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "At launch on 2026-01-21, TTS 1.5 Mini cost $15 and Max $25 per million characters.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld's pricing page lists no TTS 1.5 price.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld states TTS-2 reaches first audio in 100 ms at P90, and Flash in 20 ms.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld states TTS-2 speaks over 200 languages and locales.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Inworld TTS-2 clones a voice from 5 to 15 seconds of audio.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Artificial Analysis's speech arena ranks Realtime TTS-2 seventh, at Elo 1267.",
    },
  ],
  createdAt: "2026-10-27T18:33:16.286Z",
  updatedAt: "2026-10-27T18:33:16.286Z",
} as const satisfies Domain
