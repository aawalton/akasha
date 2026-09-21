import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const visualStyle = {
  id: "01a06577-f385-7c1c-8e0b-5a8d4ac8821f",
  type: "page-type/text-property",
  slug: "visual-style",
  propertySlug: "visual-style",
  definition: "how a story's pictures are meant to look",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The default is no picture, and one goes live only where that picture adds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spare prose page holds a picture to a higher bar than a crunchy one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture's mood matches the voice of the prose it sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture shows a moment the chapter has, with its setting, its figures and its facts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crunchy game allows a picture to be a poster rather than a photograph of a scene.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every picture of one story reads as one illustrated world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture carrying a generator's tell, a mangled hand or garbled text, does not go live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A system element in a picture is a glyph rather than a spelled word.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No picture shows what the player-facing prose withholds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture's subject survives the banner crop and reads at the size a cover is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture that misses came from the story's visual style, the chapter's prompt, or the generator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Word of a miss names which of those three the miss came from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing automatic judges whether a picture is good.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture goes live only in a set someone has looked at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture that misses is cleared and made again rather than left live.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
