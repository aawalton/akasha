import type { TrackType } from "akasha/alan/music/catalog/track/properties/track-type.select-property.types.ts"

const ASIDE = /[([]([^)\]]*)[)\]]/gu

const TAIL = /\s[-–—]\s(.*)$/u

const STUDIO = "studio"

const KINDS: readonly (readonly [TrackType, RegExp])[] = [
  ["remix", /\b(?:re-?mix(?:es|ed)?|nightcore|bootleg|mashup|mix)\b/iu],
  ["live", /\b(?:live|unplugged|concert|sessions?)\b/iu],
  ["a-cappella", /\ba\s?ca?pp?ella\b/iu],
  ["instrumental", /\b(?:instrumental|karaoke)\b/iu],
  ["acoustic", /\b(?:acoustic|stripped)\b/iu],
  ["demo", /\b(?:demo|rehearsal|work\s?tape|outtake)\b/iu],
  ["remaster", /\bremaster(?:ed)?\b/iu],
  ["version", /\b(?:version|edit|extended|mono|stereo)\b|\bsped\s*up\b|\bslowed\b/iu],
]

export function asidesIn(title: string): readonly string[] {
  const held: string[] = []
  for (const one of title.matchAll(ASIDE)) {
    const said = one[1]
    if (said !== undefined) held.push(said)
  }
  const tail = TAIL.exec(title.replace(ASIDE, " "))
  const rest = tail?.[1]
  if (rest !== undefined) held.push(rest)
  return held
}

export function trackTypeFor(title: string): TrackType {
  const said = asidesIn(title).join(" | ")
  for (const [kind, reading] of KINDS) {
    if (reading.test(said)) return kind
  }
  return STUDIO
}
