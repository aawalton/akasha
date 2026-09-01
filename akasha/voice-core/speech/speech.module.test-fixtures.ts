import { MAX_SPEECH_CHARS } from "./speech.module.code.ts"

export const longMultiSegmentText = (): string => {
  const sentence = `${"word ".repeat(30).trim()}.`
  return `${sentence} `.repeat(40).trim()
}

export const giantSingleSentence = (): string => `${"supercalifragilistic ".repeat(120).trim()}.`

export const pathologicalWord = (): string => "x".repeat(MAX_SPEECH_CHARS * 2 + 50)

export const packedAlphaText = (): string =>
  `${"alpha bravo charlie delta echo foxtrot.".repeat(3)} `.repeat(25).trim()
