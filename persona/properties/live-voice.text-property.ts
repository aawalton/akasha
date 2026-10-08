import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const liveVoice = {
  id: "01a11b5c-2021-7b32-a00c-fc584f61bf2e",
  type: "page-type/text-property",
  slug: "live-voice",
  propertySlug: "live-voice",
  definition: "the prebuilt Gemini voice a persona speaks in when Alan talks to her seat",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona stating no voice speaks in Gemini's default one.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Gemini speaks a name that is none of its voices in its default one, unrefused.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
