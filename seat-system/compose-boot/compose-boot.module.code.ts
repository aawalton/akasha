import {
  ATTRIBUTES,
  type Attributes,
  attributesOf,
} from "../seat-attributes/seat-attributes.module.code.ts"

function claim(attributes: Attributes): string {
  const named = ATTRIBUTES.flatMap((key) => {
    const one = attributes[key]
    return one === undefined ? [] : [`${key} \`${one.slug}\``]
  })
  return named.length === 0 ? "" : named.join(", ")
}

export const SEAT_READ = "akasha read"

const READING =
  "What that means is in pages, and none of them is here. They are read rather than handed " +
  "over, so that what you act on is the text on disk now rather than the text that was composed when " +
  "you started. This one call reaches every one of them and hands back as many as one answer carries:"

const UNKNOWN =
  "Nothing here states who you are: no persona, no domain and no role reached this prompt. Where " +
  "that is stated is behind the read below, so run it before you take yourself for nobody."

export function compose(seat: string, sent = ""): string {
  return (
    (seat === "" ? `${UNKNOWN}\n` : `You are ${seat}.\n`) +
    (sent === "" ? "" : `\n${sent}\n`) +
    `\n${READING}\n\n    ${SEAT_READ}\n\nRun it before you act.\n`
  )
}

export function compositionFor(agent: string): string {
  return compose(claim(attributesOf(agent)))
}
