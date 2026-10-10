import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationSounds = {
  id: "01a11cea-1332-7817-9b4d-a4c43716a0cd",
  type: "page-type/module",
  slug: "narration-sounds",
  definition: "a word written as a sound, handed to the voice as the sound it means",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word broken off before its first vowel is said with an added uh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word in capitals broken off, such as TV or GPS, is given no added uh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sound with no vowel, such as a hum or a hush, is never given an added uh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A grunt the voice would spell out is handed on as the sound a fixed table gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grunt is looked up with its repeated letters run together, in any case.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No grunt the voice already says well is in that table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stutter of a word's opening consonants is said as those consonants and an uh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stutter whose word does not open with it, or opening with a vowel, is said as written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word opening shm is handed on opening schm, the spelling the voice says as one sound.",
    },
  ],
  createdAt: "2026-10-08T19:07:44.817Z",
  updatedAt: "2026-10-10T15:51:15.516Z",
} as const satisfies Module
