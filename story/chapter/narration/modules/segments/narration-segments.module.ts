import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationSegments = {
  id: "01a10dc1-6462-7fc5-8567-7b9132654b76",
  type: "page-type/module",
  slug: "narration-segments",
  definition: "a chapter's prose cut into the segments narration speaks, each with its pause",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The same prose always gives the same segments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first segment is the first sentence alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A segment holds whole sentences, up to three hundred and fifty characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That limit keeps a segment within the 510 phonemes Kokoro speaks in one call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A segment ends with its paragraph once it holds a hundred characters or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shorter segment runs on into the next paragraph, and that paragraph's pause is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence longer than that is cut at its last comma or space before the limit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title or an initial ends no sentence, and a closing quote stays with its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scene break, a heading, a window or a screen leaves a longer pause than a paragraph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Markdown is said as the words it marks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line with no letter and no digit is a pause and is never spoken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a line is a scene break unless it holds only an ellipsis or quotes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of dashes inside a line is said as a comma.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Square brackets are dropped and their words kept, since the voice reads them as markup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any mark between two letters in the place of an apostrophe is said as one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An ellipsis joining two words is followed by a space, so the voice says two words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link, an ornament, an image placeholder or a hidden character is never spoken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last segment of a chapter leaves the longer pause before the next chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word a pronunciation names is said as that pronunciation respells it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word whose pronunciation states phonemes is handed on in Kokoro's markup with those phonemes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pronounced word followed by s, es, ed, ing or a possessive is pronounced with that ending too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An ending's sound follows the word's last sound, as misaki gives it to words it knows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pronounced word ending in e is pronounced with a d after it, or with ing in place of its e.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pronunciation naming a form outright is said rather than the form built for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pronounced word written all in capitals is pronounced as the word is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where two pronunciations reach one word, the one handed on later is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word already handed on in markup is never pronounced again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word written as a sound is handed on as the sound it means.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A homograph whose sense the words beside it settle is handed on with that reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A segment states how many of the prose's own words come before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word is counted as the chapter's length counts it, markup and window lines too.",
    },
  ],
  updatedAt: "2026-10-10T11:32:47.338Z",
  createdAt: "2026-10-05T20:29:00.386Z",
} as const satisfies Module
