const sub = string.sub
const byte = string.byte
const sChar = string.char
const sFormat = string.format
const concat = table.concat
const sort = table.sort

function byteAt(this: void, s: string, i: number): number {
  return byte(s, i) ?? 0
}

function isFiniteNumber(this: void, n: number): boolean {
  return n === n && n !== math.huge && n !== -math.huge
}

function encodeNumber(this: void, n: number): string {
  if (!isFiniteNumber(n)) return "null"
  if (n === math.floor(n) && math.abs(n) < 1e15) {
    return sFormat("%d", n)
  }
  return sFormat("%.14g", n)
}

function encodeString(this: void, s: string): string {
  const parts: string[] = []
  let partIdx = 0
  let runStart = 1
  const len = s.length
  for (const i of $range(1, len)) {
    const b = byteAt(s, i)
    let escaped: string | undefined
    if (b === 0x22) escaped = '\\"'
    else if (b === 0x5c) escaped = "\\\\"
    else if (b === 0x08) escaped = "\\b"
    else if (b === 0x0c) escaped = "\\f"
    else if (b === 0x0a) escaped = "\\n"
    else if (b === 0x0d) escaped = "\\r"
    else if (b === 0x09) escaped = "\\t"
    else if (b < 0x20) escaped = sFormat("\\u%04x", b)
    if (escaped !== undefined) {
      if (i > runStart) {
        parts[partIdx] = sub(s, runStart, i - 1)
        partIdx++
      }
      parts[partIdx] = escaped
      partIdx++
      runStart = i + 1
    }
  }
  if (runStart <= len) {
    parts[partIdx] = sub(s, runStart, len)
  }
  return `"${concat(parts)}"`
}

interface ArrayShape {
  isArray: boolean
  length: number
}

function classifyShape(this: void, t: any): ArrayShape {
  let count = 0
  let max = 0
  for (const [k] of pairs(t)) {
    count++
    if (typeof k !== "number") return { isArray: false, length: 0 }
    if (k < 1 || k !== math.floor(k)) return { isArray: false, length: 0 }
    if (k > max) max = k
  }
  if (count === 0) return { isArray: true, length: 0 }
  if (count !== max) return { isArray: false, length: 0 }
  return { isArray: true, length: max }
}

function encodeValue(this: void, value: any): string | undefined {
  if (value === undefined || value === null) return "null"
  const t = type(value)
  if (t === "boolean") return value === true ? "true" : "false"
  if (t === "number") return encodeNumber(value)
  if (t === "string") return encodeString(value)
  if (t === "table") {
    const shape = classifyShape(value)
    if (shape.isArray) {
      const parts: string[] = []
      for (const i of $range(1, shape.length)) {
        const enc = encodeValue(value[i])
        parts[i - 1] = enc === undefined ? "null" : enc
      }
      return `[${concat(parts, ",")}]`
    }
    const keys: string[] = []
    let keyIdx = 0
    for (const [k] of pairs(value)) {
      keys[keyIdx] = tostring(k)
      keyIdx++
    }
    sort(keys)
    const parts: string[] = []
    let partIdx = 0
    for (const i of $range(1, keyIdx)) {
      const k = keys[i - 1]
      const enc = encodeValue(value[k])
      if (enc !== undefined) {
        parts[partIdx] = `${encodeString(k)}:${enc}`
        partIdx++
      }
    }
    return `{${concat(parts, ",")}}`
  }
  return undefined
}

function __TS__JSONStringify(this: void, value: any): string {
  const enc = encodeValue(value)
  return enc ?? "null"
}

interface ParseState {
  src: string
  pos: number
}

function parseError(this: void, state: ParseState, msg: string): never {
  throw new SyntaxError(`JSON.parse: ${msg} at byte ${state.pos}`)
}

function skipWs(this: void, state: ParseState): undefined {
  const len = state.src.length
  while (state.pos <= len) {
    const b = byteAt(state.src, state.pos)
    if (b !== 0x20 && b !== 0x09 && b !== 0x0a && b !== 0x0d) break
    state.pos++
  }
}

function utf8Encode(this: void, cp: number): string {
  if (cp < 0x80) return sChar(cp)
  if (cp < 0x800) return sChar(0xc0 + math.floor(cp / 0x40), 0x80 + (cp % 0x40))
  return sChar(
    0xe0 + math.floor(cp / 0x1000),
    0x80 + (math.floor(cp / 0x40) % 0x40),
    0x80 + (cp % 0x40)
  )
}

function parseString(this: void, state: ParseState): string {
  state.pos++
  const parts: string[] = []
  let partIdx = 0
  let runStart = state.pos
  const len = state.src.length
  while (state.pos <= len) {
    const b = byteAt(state.src, state.pos)
    if (b === 0x22) {
      if (state.pos > runStart) {
        parts[partIdx] = sub(state.src, runStart, state.pos - 1)
        partIdx++
      }
      state.pos++
      return concat(parts)
    }
    if (b === 0x5c) {
      if (state.pos > runStart) {
        parts[partIdx] = sub(state.src, runStart, state.pos - 1)
        partIdx++
      }
      state.pos++
      if (state.pos > len) parseError(state, "unterminated escape sequence")
      const esc = byteAt(state.src, state.pos)
      let decoded = ""
      if (esc === 0x22) decoded = '"'
      else if (esc === 0x5c) decoded = "\\"
      else if (esc === 0x2f) decoded = "/"
      else if (esc === 0x62) decoded = "\b"
      else if (esc === 0x66) decoded = "\f"
      else if (esc === 0x6e) decoded = "\n"
      else if (esc === 0x72) decoded = "\r"
      else if (esc === 0x74) decoded = "\t"
      else if (esc === 0x75) {
        if (state.pos + 4 > len) parseError(state, "incomplete \\u escape")
        const hex = sub(state.src, state.pos + 1, state.pos + 4)
        const cp = tonumber(hex, 16)
        if (cp === undefined) parseError(state, "invalid \\u escape")
        decoded = utf8Encode(cp)
        state.pos += 4
      } else parseError(state, "unknown escape sequence")
      state.pos++
      parts[partIdx] = decoded
      partIdx++
      runStart = state.pos
    } else {
      state.pos++
    }
  }
  parseError(state, "unterminated string")
}

function parseNumber(this: void, state: ParseState): number {
  const start = state.pos
  const len = state.src.length
  let p = state.pos
  if (p <= len && byte(state.src, p) === 0x2d) p++
  if (p > len) parseError(state, "invalid number")
  const lead = byteAt(state.src, p)
  if (lead === 0x30) {
    p++
  } else if (lead >= 0x31 && lead <= 0x39) {
    while (p <= len) {
      const d = byteAt(state.src, p)
      if (d < 0x30 || d > 0x39) break
      p++
    }
  } else {
    parseError(state, "invalid number")
  }
  if (p <= len && byte(state.src, p) === 0x2e) {
    p++
    const fracStart = p
    while (p <= len) {
      const d = byteAt(state.src, p)
      if (d < 0x30 || d > 0x39) break
      p++
    }
    if (p === fracStart) parseError(state, "invalid number (no digits after '.')")
  }
  if (p <= len) {
    const e = byteAt(state.src, p)
    if (e === 0x65 || e === 0x45) {
      p++
      if (p <= len) {
        const sign = byteAt(state.src, p)
        if (sign === 0x2b || sign === 0x2d) p++
      }
      const expStart = p
      while (p <= len) {
        const d = byteAt(state.src, p)
        if (d < 0x30 || d > 0x39) break
        p++
      }
      if (p === expStart) parseError(state, "invalid number (no digits in exponent)")
    }
  }
  const text = sub(state.src, start, p - 1)
  state.pos = p
  const n = tonumber(text)
  if (n === undefined) parseError(state, "invalid number")
  return n
}

function parseLiteral(this: void, state: ParseState): unknown {
  if (sub(state.src, state.pos, state.pos + 3) === "true") {
    state.pos += 4
    return true
  }
  if (sub(state.src, state.pos, state.pos + 4) === "false") {
    state.pos += 5
    return false
  }
  if (sub(state.src, state.pos, state.pos + 3) === "null") {
    state.pos += 4
    return undefined
  }
  parseError(state, "expected literal (true/false/null)")
}

function parseValue(this: void, state: ParseState): unknown {
  skipWs(state)
  if (state.pos > state.src.length) parseError(state, "unexpected end of input")
  const b = byteAt(state.src, state.pos)
  if (b === 0x7b) return parseObject(state)
  if (b === 0x5b) return parseArray(state)
  if (b === 0x22) return parseString(state)
  if (b === 0x74 || b === 0x66 || b === 0x6e) return parseLiteral(state)
  return parseNumber(state)
}

function parseObject(this: void, state: ParseState): Record<string, unknown> {
  state.pos++
  const result: Record<string, unknown> = {}
  skipWs(state)
  if (state.pos <= state.src.length && byte(state.src, state.pos) === 0x7d) {
    state.pos++
    return result
  }
  while (true) {
    skipWs(state)
    if (state.pos > state.src.length || byte(state.src, state.pos) !== 0x22) {
      parseError(state, "expected '\"' (object key)")
    }
    const key = parseString(state)
    skipWs(state)
    if (state.pos > state.src.length || byte(state.src, state.pos) !== 0x3a) {
      parseError(state, "expected ':' after object key")
    }
    state.pos++
    result[key] = parseValue(state)
    skipWs(state)
    if (state.pos > state.src.length) parseError(state, "unterminated object")
    const sep = byteAt(state.src, state.pos)
    if (sep === 0x7d) {
      state.pos++
      return result
    }
    if (sep !== 0x2c) parseError(state, "expected ',' or '}' in object")
    state.pos++
  }
}

function parseArray(this: void, state: ParseState): unknown[] {
  state.pos++
  const result: unknown[] = []
  skipWs(state)
  if (state.pos <= state.src.length && byte(state.src, state.pos) === 0x5d) {
    state.pos++
    return result
  }
  let idx = 0
  while (true) {
    result[idx] = parseValue(state)
    idx++
    skipWs(state)
    if (state.pos > state.src.length) parseError(state, "unterminated array")
    const sep = byteAt(state.src, state.pos)
    if (sep === 0x5d) {
      state.pos++
      return result
    }
    if (sep !== 0x2c) parseError(state, "expected ',' or ']' in array")
    state.pos++
  }
}

function __TS__JSONParse(this: void, text: string): unknown {
  const state: ParseState = { src: text, pos: 1 }
  const result = parseValue(state)
  skipWs(state)
  if (state.pos <= state.src.length) parseError(state, "trailing content")
  return result
}

export const JSON = {
  parse: __TS__JSONParse,
  stringify: __TS__JSONStringify,
}
