import { isRecord } from "@akasha/utils-narrow/is-record"
import { z } from "zod"

interface MatchHead {
  readonly fullLength: number
  readonly index: number
}
const MATCH_HEAD_SCHEMA = z
  .unknown()
  .refine((v): v is RegExpMatchArray | null => v === null || Array.isArray(v))
  .transform<MatchHead | null>((v) => {
    if (v === null) return null
    if (typeof v[0] !== "string" || typeof v.index !== "number") return null
    return { fullLength: v[0].length, index: v.index }
  })

export function parseLuaSavedVariablesFile(
  content: string,
  variableName: string
): Record<string, unknown> {
  const pattern = new RegExp(`${escapeRegex(variableName)}\\s*=\\s*`)
  const head = MATCH_HEAD_SCHEMA.parse(content.match(pattern))
  if (head === null) {
    throw new Error(`Invalid SavedVariables format: missing ${variableName} assignment`)
  }

  const luaContent = content.slice(head.index + head.fullLength)
  const parsed = parseLuaValue(luaContent, 0)
  if (!isRecord(parsed.value)) {
    throw new Error(`Expected top-level table in ${variableName}, got ${typeof parsed.value}`)
  }
  return parsed.value
}

function parseLuaValue(input: string, startIndex: number): { value: unknown; endIndex: number } {
  let i = startIndex

  i = skipTrivia(input, i)

  if (input.charAt(i) === "{") {
    return parseLuaTable(input, i)
  }

  if (input.charAt(i) === '"') {
    return parseLuaString(input, i)
  }

  if (input.charAt(i) === "-" || /\d/.test(input.charAt(i))) {
    return parseLuaNumber(input, i)
  }

  if (input.slice(i, i + 4) === "true") {
    return { value: true, endIndex: i + 4 }
  }
  if (input.slice(i, i + 5) === "false") {
    return { value: false, endIndex: i + 5 }
  }
  if (input.slice(i, i + 3) === "nil") {
    return { value: null, endIndex: i + 3 }
  }

  if (/[a-zA-Z_]/.test(input.charAt(i))) {
    let ident = ""
    while (i < input.length && /[a-zA-Z0-9_]/.test(input.charAt(i))) {
      ident += input.charAt(i)
      i++
    }
    return { value: ident, endIndex: i }
  }

  throw new Error(
    `Lua parse error at position ${i}: unexpected character '${input.charAt(i)}' ... context: "...${input.slice(Math.max(0, i - 30), i + 30)}..."`
  )
}

function parseLuaString(input: string, startIndex: number): { value: string; endIndex: number } {
  let i = startIndex + 1
  let str = ""

  while (i < input.length && input.charAt(i) !== '"') {
    if (input.charAt(i) === "\\") {
      i++
      if (input.charAt(i) === "n") str += "\n"
      else if (input.charAt(i) === "t") str += "\t"
      else if (input.charAt(i) === "r") str += "\r"
      else if (input.charAt(i) === "\\") str += "\\"
      else if (input.charAt(i) === '"') str += '"'
      else str += input.charAt(i)
    } else {
      str += input.charAt(i)
    }
    i++
  }

  return { value: str, endIndex: i + 1 }
}

function parseLuaBracketKeyString(
  input: string,
  startIndex: number
): { value: string; endIndex: number } {
  let i = startIndex + 1
  let str = ""

  while (i < input.length) {
    const ch = input.charAt(i)

    if (ch === "\\") {
      i++
      const esc = input.charAt(i)
      if (esc === "n") str += "\n"
      else if (esc === "t") str += "\t"
      else if (esc === "r") str += "\r"
      else if (esc === "\\") str += "\\"
      else if (esc === '"') str += '"'
      else str += esc
      i++
      continue
    }

    if (ch === '"' && input.charAt(i + 1) === "]") {
      let k = i + 2
      k = skipTrivia(input, k)
      if (input.charAt(k) === "=") {
        return { value: str, endIndex: i + 1 }
      }
    }

    str += ch
    i++
  }

  throw new Error(
    `Lua parse error: unterminated bracketed string key starting at position ${startIndex}`
  )
}

function parseLuaNumber(input: string, startIndex: number): { value: number; endIndex: number } {
  let i = startIndex
  let num = ""

  if (input.charAt(i) === "-") {
    num += input.charAt(i)
    i++
  }

  while (i < input.length && /[\d.eE+-]/.test(input.charAt(i))) {
    num += input.charAt(i)
    i++
  }

  return { value: parseFloat(num), endIndex: i }
}

function parseLuaTable(
  input: string,
  startIndex: number
): { value: Record<string, unknown> | readonly unknown[]; endIndex: number } {
  let i = startIndex + 1

  i = skipTrivia(input, i)

  let isArray = false
  if (
    input.charAt(i) === '"' ||
    input.charAt(i) === "{" ||
    input.charAt(i) === "-" ||
    /\d/.test(input.charAt(i)) ||
    input.slice(i, i + 4) === "true" ||
    input.slice(i, i + 5) === "false" ||
    input.slice(i, i + 3) === "nil"
  ) {
    isArray = true
  }

  if (isArray) {
    const arr: unknown[] = []
    let mixedKeys = false

    while (i < input.length && input.charAt(i) !== "}") {
      i = skipTrivia(input, i)
      while (input.charAt(i) === ",") i = skipTrivia(input, i + 1)
      if (input.charAt(i) === "}") break

      if (input.charAt(i) === "[") {
        if (input.charAt(i + 1) === '"') {
          mixedKeys = true
          break
        }

        i++
        let indexStr = ""
        while (i < input.length && /\d/.test(input.charAt(i))) {
          indexStr += input.charAt(i)
          i++
        }
        const index = parseInt(indexStr, 10)

        if (index === 0) {
          i -= indexStr.length + 1
          mixedKeys = true
          break
        }

        i = skipTrivia(input, i)
        while (input.charAt(i) === "]") i = skipTrivia(input, i + 1)
        if (input.charAt(i) === "=") i++
        i = skipTrivia(input, i)

        const result = parseLuaValue(input, i)
        arr[index - 1] = result.value
        i = result.endIndex
      } else {
        const result = parseLuaValue(input, i)
        arr.push(result.value)
        i = result.endIndex
      }
    }

    if (!mixedKeys) {
      if (input.charAt(i) === "}") i++
      return { value: arr, endIndex: i }
    }

    const obj: Record<string, unknown> = {}
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] !== undefined) {
        obj[String(j + 1)] = arr[j]
      }
    }

    return parseTableEntries(input, i, obj)
  }

  return parseTableEntries(input, i, {})
}

function parseTableEntries(
  input: string,
  startIndex: number,
  obj: Record<string, unknown>
): { value: Record<string, unknown>; endIndex: number } {
  let i = startIndex
  let implicitIndex = 1

  while (i < input.length && input.charAt(i) !== "}") {
    i = skipTrivia(input, i)
    while (input.charAt(i) === ",") i = skipTrivia(input, i + 1)
    if (input.charAt(i) === "}") break

    let key: string | null = null
    const entryStart = i

    if (input.charAt(i) === "[") {
      i++

      if (input.charAt(i) === '"') {
        const keyResult = parseLuaBracketKeyString(input, i)
        key = keyResult.value
        i = keyResult.endIndex
      } else if (/[\d.-]/.test(input.charAt(i))) {
        let numKey = ""
        while (i < input.length && /[\d.eE+-]/.test(input.charAt(i))) {
          numKey += input.charAt(i)
          i++
        }
        key = numKey
      }

      i = skipTrivia(input, i)
      while (input.charAt(i) === "]") i = skipTrivia(input, i + 1)
    } else if (/[a-zA-Z_]/.test(input.charAt(i))) {
      let word = ""
      let j = i
      while (j < input.length && /[a-zA-Z0-9_]/.test(input.charAt(j))) {
        word += input.charAt(j)
        j++
      }
      let k = j
      k = skipTrivia(input, k)

      if (input.charAt(k) === "=") {
        key = word
        i = k
      }
    }

    if (key !== null && input.charAt(i) === "=") {
      i++
      i = skipTrivia(input, i)

      const result = parseLuaValue(input, i)
      obj[key] = result.value
      i = result.endIndex
    } else {
      i = entryStart
      const ch = input.charAt(i)
      if (ch === '"' || ch === "{" || ch === "-" || /\d/.test(ch) || /[a-zA-Z_]/.test(ch)) {
        const result = parseLuaValue(input, i)
        obj[String(implicitIndex)] = result.value
        implicitIndex++
        i = result.endIndex
      } else {
        throw new Error(
          `Lua parse error at position ${i}: unexpected character '${input.charAt(i)}' in table entries ... context: "...${input.slice(Math.max(0, i - 30), i + 30)}..."`
        )
      }
    }
  }

  if (input.charAt(i) === "}") i++

  return { value: obj, endIndex: i }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function skipTrivia(input: string, start: number): number {
  let i = start
  for (;;) {
    if (i < input.length && /\s/.test(input.charAt(i))) {
      i++
      continue
    }
    if (input.charAt(i) === "-" && input.charAt(i + 1) === "-") {
      i += 2
      if (input.charAt(i) === "[") {
        let eq = 0
        let j = i + 1
        while (input.charAt(j) === "=") {
          eq++
          j++
        }
        if (input.charAt(j) === "[") {
          const close = `]${"=".repeat(eq)}]`
          const end = input.indexOf(close, j + 1)
          i = end === -1 ? input.length : end + close.length
          continue
        }
      }
      while (i < input.length && input.charAt(i) !== "\n") i++
      continue
    }
    break
  }
  return i
}
