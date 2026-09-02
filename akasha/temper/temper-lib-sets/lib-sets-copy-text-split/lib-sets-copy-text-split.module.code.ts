import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"

const strlen = string.len
const strsub = string.sub
const strbyte = string.byte

export function strLensplit(this: void, text: string, maxChars: number): string[] {
  const ret: string[] = []
  const textLen = strlen(text)
  let utfAdditionalBytes = 0
  let doCut = true

  if (textLen <= maxChars) {
    ret[ret.length] = text
  } else {
    let splittedStart = 0
    let splittedEnd = splittedStart + maxChars - 1

    let splittedString: string | undefined
    while (doCut) {
      utfAdditionalBytes = 0

      splittedEnd = splittedStart + maxChars - 1

      if (splittedEnd >= textLen) {
        splittedEnd = textLen
        doCut = false
      } else if (asPresent(strbyte(text, splittedEnd, splittedEnd)[0]) > 128) {
        utfAdditionalBytes = 1

        const lastByte = splittedString !== undefined ? strbyte(splittedString, -1) : 0
        const beforeLastByte =
          splittedString !== undefined ? asPresent(strbyte(splittedString, -2, -2)[0]) : 0

        if (lastByte < 128) {
        } else if (lastByte >= 128 && lastByte < 192) {
          if (beforeLastByte >= 192 && beforeLastByte < 224) {
          } else if (beforeLastByte >= 128 && beforeLastByte < 192) {
          } else if (beforeLastByte >= 224 && beforeLastByte < 240) {
            utfAdditionalBytes = 1
          }

          splittedEnd = splittedEnd + utfAdditionalBytes
          splittedString = strsub(text, splittedStart, splittedEnd)
        } else if (lastByte >= 192 && lastByte < 224) {
          utfAdditionalBytes = 1
          splittedEnd = splittedEnd + utfAdditionalBytes
        } else if (lastByte >= 224 && lastByte < 240) {
          utfAdditionalBytes = 2
          splittedEnd = splittedEnd + utfAdditionalBytes
        }
      }

      ret[ret.length] = strsub(text, splittedStart, splittedEnd)

      splittedStart = splittedEnd + 1
    }
  }
  return ret
}
