import type { ControlCharSpec } from "../data-encode-types/data-encode-types.module.code.ts"

export const LIB_NAME = "LibDataEncode"
export const SHORT_NAME = "LDE"
export const VERSION = "2"

export const CHARSET =
  " ()*-./0123456789:;<>@ABCDEFGHIJKLMNOPQRSTUVWXYZ]^_`abcdefghijklmnopqrstuvwxyz|}~"

export const CHARSET_LENGTH = CHARSET.length

export const CONTROL_CHAR_CONFIG: Record<string, ControlCharSpec> = {
  ",": { name: "END" },
  "!": { name: "TRUE", length: 1, decoder: "DecodeBool" },
  "?": { name: "FALSE", length: 1, decoder: "DecodeBool" },
  "#": { name: "STRINGID_1", length: 1, decoder: "DecodeStringId" },
  "&": { name: "STRINGID_2", length: 2, decoder: "DecodeStringId" },
  "§": { name: "STRINGID_3", length: 3, decoder: "DecodeStringId" },
  $: { name: "STRING", decoder: "DecodeString" },
  "%": { name: "STRING_LONG", decoder: "DecodeString" },
  "{": { name: "TABLE", decoder: "DecodeTable" },
  "[": { name: "ARRAY", decoder: "DecodeArray" },
  "+": { name: "UINT", decoder: "DecodeInteger" },
  "=": { name: "NUMERIC", decoder: "DecodeNumeric" },
}

export const VALUE_TO_CHAR: Record<number, string> = {}
export const CHAR_TO_VALUE: Record<string, number> = {}

for (let i = 1; i <= CHARSET_LENGTH; i++) {
  const char = string.sub(CHARSET, i, i)
  VALUE_TO_CHAR[i - 1] = char
  CHAR_TO_VALUE[char] = i - 1
}

export const CONTROL_CHARS = {
  END: ",",
  TRUE: "!",
  FALSE: "?",
  STRINGID_1: "#",
  STRINGID_2: "&",
  STRINGID_3: "§",
  STRING: "$",
  STRING_LONG: "%",
  TABLE: "{",
  ARRAY: "[",
  UINT: "+",
  NUMERIC: "=",
} as const

export const DECODER_FUNCTION_NAMES: Record<string, string> = {}

for (const [char, spec] of pairs(CONTROL_CHAR_CONFIG)) {
  if (CHAR_TO_VALUE[char] !== undefined) {
    error(
      "Error: A char cannot be part of the control character set and the encoder character set at the same time!"
    )
  }
  if (spec.decoder !== undefined) {
    DECODER_FUNCTION_NAMES[char] = spec.decoder
  }
}
